//

var action = "";

function cargarDatos(){
    console.log("Cargar datos clientes");

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

};


$(document).ready(function () {

    console.log("Listar clientes");

    cargarDatos();


    $('#new').on('click', function (e) {

        action = "new"
        
    });


    $(document).on('click', '.delete', function (e) {
        console.log("Eliminar");
        var id = $(e.target).closest("tr").attr('id');
        console.log(id);        

        $.ajax({
            method: "DELETE",
            type: "DELETE",
            url: "http://localhost:8080/fidelus/cliente/"+id,
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                console.log("DELETE funcional");
                loadRules();
            },
            error: function () {
                loadRules();
            }
        });


    });


    $('.edit').on('click', function (e) {

        action = "edit"
        
    });


    $('#guardar').on('click', function (e) {

        console.log(action);

        body = {
            "apellido": document.getElementById('name').value,
            "nombre": document.getElementById('lastName').value,
            "nroDocumento": document.getElementById('doc').value,
            "tipoDocumento": document.getElementById('docType').value,
            "nacionalidad": document.getElementById('country').value,
            "email": document.getElementById('mail').value,
            "telefono": document.getElementById('phone').value,
            "fechaNacimiento": document.getElementById('dateBirth').value
        }

        $.ajax({
            method: "POST",
            type: "POST",
            url: "http://localhost:8080/fidelus/cliente",
            data:  JSON.stringify(body),
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                console.log("POST funcional");
                loadRules();
            },
            error: function () {
                loadRules();
            }
        });

    });

});