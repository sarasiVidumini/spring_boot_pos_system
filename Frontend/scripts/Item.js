$(document).ready(function () {

    const BASE_URL = "http://localhost:8080/api/v1/items";

    getAllItems();

    // 1. SAVE ITEM
    $('#btnSaveItem').click(function () {
        let desc = $('#itemDesc').val();
        let price = $('#itemPrice').val();
        let qty = $('#itemQty').val();

        if (desc === "" || price === "" || qty === "") {
            alert("Please fill all fields!");
            return;
        }

        let itemDTO = {
            description: desc,
            unitPrice: parseFloat(price),
            qtyOnHand: parseInt(qty)
        };

        $.ajax({
            url: BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(itemDTO),
            success: function (res) {
                alert("Item Saved Successfully!");
                clearForm();
                getAllItems();
            },
            error: function (error) {
                alert("Error saving item: Check if description is unique or valid.");
            }
        });
    });

    // 2. GET ALL ITEMS
    function getAllItems() {
        $.ajax({
            url: BASE_URL,
            method: "GET",
            success: function (res) {
                console.log("Items received:", res);
                let rows = "";


                if (res.data) {
                    res.data.forEach(item => {
                        rows += `<tr onclick="bindItemRow('${item.id}', '${item.description}', '${item.unitPrice}', '${item.qtyOnHand}')" style="cursor:pointer">
                            <td>${item.id}</td>
                            <td>${item.description}</td>
                            <td>Rs. ${parseFloat(item.unitPrice).toFixed(2)}</td>
                            <td>${item.qtyOnHand}</td>
                            <td style="text-align: center;">
                                <button class="btn-delete" onclick="deleteItem(event, ${item.id})">
                                    Delete
                                </button>
                            </td>
                        </tr>`;
                    });
                }
                $('#itemTableBody').html(rows);
                if(window.lucide) lucide.createIcons();
            },
            error: function (error) {
                console.log("Error loading items", error);
            }
        });
    }

    // 3. DELETE ITEM
    window.deleteItem = function (event, id) {
        event.stopPropagation();
        if(confirm("Are you sure you want to delete this item?")) {
            $.ajax({
                url: BASE_URL + id,
                method: "DELETE",
                success: function (res) {
                    alert("Item Deleted!");
                    getAllItems();
                    clearForm();
                },
                error: function (error) {
                    alert("Failed to delete item!");
                }
            });
        }
    }

    // 4. UPDATE ITEM
    $('#btnUpdateItem').click(function () {
        let id = $('#itemId').val();
        if(!id) return alert("Please select an item from table first!");

        let itemDTO = {
            id: id,
            description: $('#itemDesc').val(),
            unitPrice: parseFloat($('#itemPrice').val()),
            qtyOnHand: parseInt($('#itemQty').val())
        };

        $.ajax({
            url: BASE_URL,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(itemDTO),
            success: function (res) {
                alert("Item Updated Successfully!");
                getAllItems();
                clearForm();
            },
            error: function (error) {
                alert("Update failed!");
            }
        });
    });

    window.bindItemRow = function(id, desc, price, qty) {
        $('#itemId').val(id);
        $('#itemDesc').val(desc);
        $('#itemPrice').val(price);
        $('#itemQty').val(qty);
    }

    function clearForm() {
        $('#itemId').val("");
        $('#itemDesc').val("");
        $('#itemPrice').val("");
        $('#itemQty').val("");
    }
});