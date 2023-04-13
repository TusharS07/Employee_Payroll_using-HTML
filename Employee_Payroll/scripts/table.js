addUser = () => {
    window.location.href="/pages/empForm.html";
}

$(document).ready(function() {
    fetchAllData();
})


function fetchAllData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/employees",
        contentType: "application/json",

        success: function(data) {
            console.log(data);
            var tblbody = $(".tblbody");
            tblbody.empty();

            $.each(data, function (index, value) {
                var tableData = $("<tr class='body'>");

                tableData.append("<td class='profileimgcol'><img class='image' src='" + value.profileUrl + "' alt='Pic1'>");
                tableData.append("<td class='namecol'>" + value.name + "</td>");
                tableData.append("<td class='gendercol'>" + value.gender + "</td>");


                var deptcol = $("<td>");
                var deptdiv = $("<div class='dept'>");
                var dept = value.department.map(i => "<span class='dept-name'>" + i + "</span>");
                deptdiv.append(dept);
                deptcol.append(deptdiv);
                tableData.append(deptcol);

                tableData.append("<td>"+"₹ "+ value.salary + "</td>");
                tableData.append("<td>" + value.startDate + "</td>");
                tableData.append("<td class='action'><img src='../assets/delete-black-18dp.svg' alt='Delete' id='deletebtn'><img src='../assets/create-black-18dp.svg' alt='Edit' id='editbtn'></td>");

                tblbody.append(tableData);
            });
            
        },
        error: function() {
          alert("Error sending data!");
        }
      });

}