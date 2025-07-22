$(document).ready(function () {
    ViewData();
    $('#btnUpdate').prop('disabled', true); // Disable update button initially
});

function fnInsert() {
    var FirstName = $("#Fname").val();
    var LastName = $("#Lname").val();
    var Mobno = $("#Mobno").val();
    var Address = $("#Address").val();
    $.ajax({
        type: "POST",
        url: "/Home/InsertFields/",
        datatype: "json",
        contentType: "application/json charset=utf-8",
        data: JSON.stringify({ FirstName: FirstName, LastName: LastName, Mobno: Mobno, Address: Address }),
        success: function (json) {

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
// Global function
function ViewData() {
    $.ajax({
        type: "POST",
        url: "/Home/ViewData/",
        datatype: "json",
        contentType: "application/json charset=utf-8",
        data: JSON.stringify({}),
        success: function (json1) {
            var tableload = json1.html;
            var dataset = eval("[" + tableload + "]");

            $('#ViewValues').DataTable({
                ordering: false,
                destroy: true,
                data: dataset,
                columns: [
                    { title: "Sl" },
                    { title: "First Name" },
                    { title: "Last Name" },
                    { title: "Mobile Number" },
                    { title: "Address" },
                    { title: "Action" }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

// Global delete function
function fnDelete(id) {
    $.ajax({
        type: "POST",
        url: "/Home/DeleteData/",
        datatype: "json",
        contentType: "application/json charset=utf-8",
        data: JSON.stringify({ id: id }),
        success: function (json) {
            $('#ViewValues').DataTable().destroy();
            ViewData(); // Now this works ✅
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function fnEdit(id) {
    alert("Edit clicked: " + id);
    $.ajax({
        type: "POST",
        url: "/Home/EditData",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ id: id }),
        success: function (data) {
            $('#Fname').val(data.FirstName);
            $('#Lname').val(data.LastName);
            $('#Mobno').val(data.MobileNumber);
            $('#Address').val(data.Address);
            $('#hiddenId').val(data.Id);
            // Enable the Update button
            $('#btnUpdate').prop('disabled', false);
        },
        error: function (err) {
            alert("Error loading data for editing.");
        }
    });
}

function updateData() {
    var updatedRecord = {
        Id: $('#hiddenId').val(),
        Fname: $('#Fname').val(),
        Lname: $('#Lname').val(), // was LnName — fixed
        Mobno: $('#Mobno').val(),
        Address: $('#Address').val()
    };

    $.ajax({
        type: "POST",
        url: "/Home/UpdateData",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updatedRecord),
        success: function (res) {
            alert("Updated successfully!");
            ViewData();
        },
        error: function () {
            alert("Error while updating!");
        }
    });
}