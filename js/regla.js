
var action = "";

function cargarDatos(){
    console.log("Cargar datos clientes");
};


$(document).ready(function () {

    console.log("Pagina de reglas");

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/regla",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', // added data type
        success: function(res) {
            //console.log("Peticion funcional");
            //console.log(res);

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

});