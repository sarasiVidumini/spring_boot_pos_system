$(document).ready(function () {
    const CUSTOMER_URL = "http://localhost:8080/api/v1/customers";
    const ITEM_URL = "http://localhost:8080/api/v1/items";
    const ORDER_URL = "http://localhost:8080/api/v1/orders";

    let cart = [];
    let allItems = [];

    loadSelections();
    $('#lblDate').text(new Date().toISOString().split('T')[0]);

    function loadSelections() {
        $.ajax({
            url: CUSTOMER_URL,
            method: "GET",
            success: function (res) {
                $('#cmbCustomerId').empty().append('<option value="">Select ID</option>');
                if(res.data) {
                    res.data.forEach(c => $('#cmbCustomerId').append(`<option value="${c.id}">${c.id} - ${c.name}</option>`));
                }
            }
        });

        $.ajax({
            url: ITEM_URL,
            method: "GET",
            success: function (res) {
                if(res.data) {
                    allItems = res.data;
                    $('#cmbItemId').empty().append('<option value="">Select Item</option>');
                    allItems.forEach(i => $('#cmbItemId').append(`<option value="${i.id}">${i.description}</option>`));
                }
            }
        });
    }

    $('#cmbCustomerId').change(function() {
        let id = $(this).val();
        if(!id) { $('#orderCustName').val(""); return; }

        $.ajax({
            url: CUSTOMER_URL,
            method: "GET",
            success: function (res) {
                let customer = res.data.find(c => c.id == id);
                if(customer) $('#orderCustName').val(customer.name);
            }
        });
    });

    $('#cmbItemId').change(function() {
        let id = $(this).val();
        let item = allItems.find(i => i.id == id);
        if(item) {
            $('#orderItemPrice').val(item.unitPrice);
            $('#orderQtyOnHand').val(item.qtyOnHand);
        } else {
            $('#orderItemPrice').val("");
            $('#orderQtyOnHand').val("");
        }
    });

    $('#btnAddToCart').click(function () {
        let id = $('#cmbItemId').val();
        if(!id) return alert("Please select an item!");

        let itemObj = allItems.find(i => i.id == id);
        let desc = itemObj.description;
        let qty = parseInt($('#txtBuyQty').val());
        let price = parseFloat($('#orderItemPrice').val());
        let qtyOnHand = parseInt($('#orderQtyOnHand').val());

        if(isNaN(qty) || qty <= 0 || qty > qtyOnHand) {
            alert("Invalid Quantity or Stock insufficient!");
            return;
        }

        let cartItem = cart.find(i => i.itemId == id);
        if(cartItem) {
            cartItem.qty += qty;
            cartItem.total = cartItem.qty * cartItem.unitPrice;
        } else {
            cart.push({ itemId: id, description: desc, qty: qty, unitPrice: price, total: qty * price });
        }

        refreshCart();
        $('#txtBuyQty').val("");
    });

    function refreshCart() {
        let rows = "";
        let netTotal = 0;
        cart.forEach((item, index) => {
            netTotal += item.total;
            rows += `<tr>
                <td>${item.itemId}</td>
                <td>${item.qty}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.total.toFixed(2)}</td>
                <td><button onclick="removeCart(${index})" class="btn-delete" style="color:red; cursor:pointer; border:none; background:none;">Delete</button></td>
            </tr>`;
        });


        $('#cartTableBody').html(rows);
        $('#lblTotal').text("Rs. " + netTotal.toFixed(2));
    }

    $('#btnPlaceOrder').click(function () {
        if(cart.length === 0 || !$('#cmbCustomerId').val()) {
            alert("Please select customer and add items!");
            return;
        }

        let orderDTO = {
            orderId: 0,
            date: $('#lblDate').text(),
            customerId: $('#cmbCustomerId').val(),
            orderDetail: cart.map(item => ({
                itemId: item.itemId,
                qty: item.qty,
                unitPrice: item.unitPrice
            }))
        };

        $.ajax({
            url: ORDER_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(orderDTO),
            success: function (res) {
                alert("Order Placed Successfully!");
                cart = [];
                refreshCart();
                loadSelections();
                clearFields();
            },
            error: function (err) {
                alert("Order Failed! Check if Backend DTO matches.");
            }
        });
    });

    window.removeCart = function(index) {
        cart.splice(index, 1);
        refreshCart();
    }

    function clearFields() {
        $('#orderCustName').val("");
        $('#orderItemPrice').val("");
        $('#orderQtyOnHand').val("");
        $('#cmbCustomerId').val("");
        $('#cmbItemId').val("");
        $('#txtBuyQty').val("");
    }
});