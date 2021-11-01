//

var action = "";

function cargarDatos(){
    console.log("Cargar datos clientes");
};


$(document).ready(function () {

    console.log("Listar clientes");

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/cliente",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', // added data type
        success: function(res) {
            console.log("Peticion funcional");
            console.log(res);

            $.each(res, function(i, f){
                var tableRow = "<tr>"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td>"+f.nombre+"</td>" +
                            "<td>"+f.apellido+"</td>" +
                            "<td>"+f.nroDocumento+"</td>" +
                            "<td>"+f.tipoDocumento+"</td>" +
                            "<td>"+f.nacionalidad+"</td>" +
                            "<td>"+f.email+"</td>" +
                            "<td>"+f.telefono+"</td>" +
                            "<td>"+f.fechaNacimiento+"</td>" +
                            "<td>" + 
                              "<button class='btn btn-warning edit' data-toggle='modal' data-target='#exampleModal'>Editar</button> &nbsp" +
                              "<button class='btn btn-danger delete' data-toggle='modal' data-target='#deleteModal'>Eliminar</button>" +
                            "</td>" +
                          "</tr>";

                $(tableRow).appendTo("#clientsTable");
            });

        }
    });


    $('#new').on('click', function (e) {

        action = "new"
        
    });


    $('.delete').on('click', function (e) {

        console.log("Eliminar");
        
    });


    $('.edit').on('click', function (e) {

        action = "edit"
        
    });


    $('#guardar').on('click', function (e) {

        console.log(action);

    });

});