$(document).ready(function () {
    getEmpDataByIdAndSetIntoField()
})

function getEmpDataByIdAndSetIntoField() {

    const empID = localStorage.getItem('empId');

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/employees/" + empID,
        contentType: "application/json",

        success: function (data) {
            console.log(data);
            $('#fName').val(data.name);
            $('input[name="Profile"][value="' + data.profileUrl + '"]').prop('checked', true);
            $('input[name="gender"][value="' + data.gender + '"]').prop('checked', true);

            $('input[type="checkbox"]').each(function () {
                var checkboxValue = $(this).val();
                $(this).prop("checked", data.department.includes(checkboxValue));
            })

            $('#salary').val(data.salary);
            var startDate = data.startDate.split(" ");
            console.log(startDate)

            $('#day').val(startDate[0]);
            $('#month').val(startDate[1]);
            $('#year').val(startDate[2]);

            $('#notes').val(data.notes);

        },
        error: function () {
            alert("Error sending data!");
        }
    });
}


function updateEmpData() {

    const name = $('#fName').val();
    console.log(name);


    const profileImg = $('input[type="radio"]:checked').val();
    console.log(profileImg);

    const gender = $('input[name="gender"]:checked').val();
    console.log(gender);

    var department = [];
    $('input[type="checkbox"]:checked').each(function () {
        department.push($(this).val());
    });
    console.log(department);

    const salary = $('#salary').val();
    console.log(salary);

    const day = $('#day').val();
    const month = $('#month').val();
    const year = $('#year').val();
    console.log(day + '-' + month + '-' + year);

    const notes = $('#notes').val();
    console.log(notes);

    let sendData = {
        "name": name,
        "profileUrl": profileImg,
        "gender": gender,
        "department": department,
        "salary": salary,
        "startDate": day + ' ' + month + ' ' + year,
        "notes": notes,
    }

    console.log(sendData);


    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/employees/" + localStorage.getItem('empId'),
        contentType: "application/json",
        data: JSON.stringify(sendData),

        success: function (data) {
            console.log(" Employee Data Updated: ", data);
            alert("Employee Data Update successfully!");
        },
        error: function () {
            alert("Error sending data!");
        }
        
    });

    setTimeout(() => {
        console.log("work");
        window.location.href = "/pages/empTable.html";
    }, 1000);

}


const cancel = () => {
    window.location.href = "/pages/empTable.html";
}
