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

// Call it when DOM is ready
$(document).ready(function () {
    ViewData();
});

function fnEdit(id) {
    $.ajax({
        type: "POST",
        url: "/Home/EditData", // Controller action
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ id: id }),
        success: function (data) {
            // Populate form fields with returned data
            $('#FirstName').val(data.FirstName);
            $('#LastName').val(data.LastName);
            $('#MobileNumber').val(data.MobileNumber);
            $('#Address').val(data.Address);
            $('#hiddenId').val(data.Id); // hidden field to hold the record id for update
        },
        error: function (err) {
            alert("Error loading data for editing.");
        }
    });
}
function updateData() {
    $.ajax({
        type: "POST",
        url: "/Home/UpdateData",
        data: {
            id: $('#hiddenId').val(),
            firstname: $('#FirstName').val(),
            lastname: $('#LastName').val(),
            mobilenumber: $('#MobileNumber').val(),
            address: $('#Address').val()
        },
        success: function (res) {
            alert("Updated successfully!");
            ViewData(); // Refresh your data
        },
        error: function () {
            alert("Error while updating!");
        }
    });
}




