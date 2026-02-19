$(document).ready(function () {

    const BASE_URL = "http://localhost:8080/api/v1/customers";

    getAllCustomers();

    // 1. SAVE CUSTOMER
    $('#btnSave').click(function () {
        let name = $('#custName').val();
        let address = $('#custAddress').val();

        if (name === "" || address.length < 5) {
            alert("Please enter a valid name and address");
            return;
        }

        let customerDTO = {
            name: name,
            address: address
        };

        $.ajax({
            url: BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(customerDTO),
            success: function (res) {
                alert("Customer Saved Successfully!");
                clearForm();
                getAllCustomers();
            },
            error: function (error) {
                console.error(error);
                alert("Error saving customer.");
            }
        });
    });

    // 2. GET ALL CUSTOMERS
    function getAllCustomers() {
        $.ajax({
            url: BASE_URL,
            method: "GET",
            success: function (res) {

                let rows = "";
                if (res.data && Array.isArray(res.data)) {
                    res.data.forEach(c => {
                        rows += `<tr onclick="bindRow('${c.id}', '${c.name}', '${c.address}')" style="cursor:pointer">
                            <td>${c.id}</td>
                            <td>${c.name}</td>
                            <td>${c.address}</td>
                            <td>
                                <button class="btn-delete" onclick="deleteCustomer(event, ${c.id})">
                                    Delete
                                </button>
                            </td>
                        </tr>`;
                    });
                }
                $('#customerTableBody').html(rows);
                if(window.lucide) lucide.createIcons();
            },
            error: function (error) {
                console.log("Error loading customers", error);
            }
        });
    }

    // 3. DELETE CUSTOMER
    window.deleteCustomer = function (event, id) {
        event.stopPropagation();
        if(confirm("Are you sure you want to delete this customer?")) {
            $.ajax({
                url: BASE_URL + id,
                method: "DELETE",
                success: function (res) {
                    alert("Customer Deleted!");
                    getAllCustomers();
                    clearForm();
                },
                error: function (error) {
                    alert("Delete failed!");
                }
            });
        }
    }

    // 4. UPDATE CUSTOMER
    $('#btnUpdate').click(function () {
        let id = $('#custId').val();
        if(!id) {
            alert("Please select a customer to update!");
            return;
        }

        let customerDTO = {
            id: id,
            name: $('#custName').val(),
            address: $('#custAddress').val()
        };

        $.ajax({
            url: BASE_URL,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(customerDTO),
            success: function (res) {
                alert("Customer Updated Successfully!");
                getAllCustomers();
                clearForm();
            },
            error: function (error) {
                alert("Update failed!");
            }
        });
    });

    window.bindRow = function(id, name, address) {
        $('#custId').val(id);
        $('#custName').val(name);
        $('#custAddress').val(address);
    }

    function clearForm() {
        $('#custId').val("");
        $('#custName').val("");
        $('#custAddress').val("");
    }
});