console.log("Welcome To Form");

const addEmp = () => {

    const name = $('#fName').val();
    console.log(name);


    const profileImg = $('input[type="radio"]:checked').val();
    console.log(profileImg);

    const gender = $('input[name="gender"]:checked').val();
    console.log(gender);

    var department = "";
    $('input[type="checkbox"]:checked').each(function () {
        department += $(this).val() + " ";
    });
    department = department.substring(0, department.length -1);
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
        type: "POST",
        url: "http://localhost:3000/employees",
        contentType: "application/json",
        data: JSON.stringify(sendData),

        success: function(data) {
            console.log("Data Added: ",data);
          alert("Employee Add successfully!");
        },
        error: function() {
          alert("Error sending data!");
        }
      });
}