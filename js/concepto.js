
var action = "";

function cargarDatos(){
    console.log("Cargar conceptos de puntos");
};


$(document).ready(function () {

    console.log("Pagina de conceptos");

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/concepto-canje",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', 
        success: function(res) {
            $.each(res, function(i, f){
                var tableRow = "<tr>"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td>"+f.descConcepto+"</td>" +     
                            "<td>"+f.puntosRequeridos+"</td>" +
                            "<td>" + 
                              "<button class='btn btn-warning' data-toggle='modal' data-target='#exampleModal'>Editar</button> &nbsp" +
                              "<button class='btn btn-danger' data-toggle='modal' data-target='#deleteModal'>Eliminar</button>" +
                            "</td>" +
                          "</tr>";

                $(tableRow).appendTo("#conceptTable");
            });

        }
    });

});