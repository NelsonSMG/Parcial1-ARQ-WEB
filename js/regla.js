
var action = "";


function loadRules(){

    console.log("Cargar Reglas");
    $("#rulesTable").empty();

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/regla",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', // added data type
        success: function(res) {
            $.each(res, function(i, f){
                var tableRow = "<tr>"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td>"+f.limiteMin+"</td>" +
                            "<td>"+f.limiteMax+"</td>" +
                            "<td>"+f.montoEquivalencia+"</td>" +
                            "<td>1</td>" +
                            "<td>" + 
                              "<button class='btn btn-warning' data-toggle='modal' data-target='#exampleModal'>Editar</button> &nbsp" +
                              "<button class='btn btn-danger' data-toggle='modal' data-target='#deleteModal'>Eliminar</button>" +
                            "</td>" +
                          "</tr>";

                $(tableRow).appendTo("#rulesTable");
            });

        }
    });
}

$(document).ready(function () {

    console.log("Pagina de reglas");

    loadRules();

    $('#new').on('click', function (e) {

        action = "new"
        
    });

    $('#guardar').on('click', function (e) {

        console.log(action);

        body = {
            "limiteMin": document.getElementById('limInf').value,
            "limiteMax": document.getElementById('limMax').value,
            "idVencimiento": 1,
            "montoEquivalencia": document.getElementById('amount').value
        }

        $.ajax({
            method: "POST",
            type: "POST",
            url: "http://localhost:8080/fidelus/regla",
            data:  JSON.stringify(body),
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                console.log("POST funcional");
                loadRules();
            }
        });

    });

});