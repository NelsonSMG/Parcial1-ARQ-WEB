//

var action = "";

var rowId;
var rowNombre;
var rowApellido;
var rowNroDoc;
var rowTipoDoc;
var rowNac;
var rowEmail;
var rowPhone;
var rowFechaNac;

function cargarDatos(){
    console.log("Cargar datos clientes");
    $("#clientsTable").empty();

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/cliente",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', // added data type
        success: function(res) {

            $.each(res, function(i, f){
                var tableRow = "<tr id="+f.id+" >"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td class='nombre'>"+f.nombre+"</td>" +
                            "<td class='apellido'>"+f.apellido+"</td>" +
                            "<td class='nroDoc'>"+f.nroDocumento+"</td>" +
                            "<td class='tipoDoc'>"+f.tipoDocumento+"</td>" +
                            "<td class='nac'>"+f.nacionalidad+"</td>" +
                            "<td class='email'>"+f.email+"</td>" +
                            "<td class='phone'>"+f.telefono+"</td>" +
                            "<td class='fechaNac'>"+f.fechaNacimiento+"</td>" +
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
        //se cargan los datos en el modal
        document.getElementById('name').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('doc').value = "";
        document.getElementById('docType').value = "";
        document.getElementById('country').value = "";
        document.getElementById('mail').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('dateBirth').value = "";
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
                cargarDatos();
            },
            error: function () {
                cargarDatos();
            }
        });


    });


    $(document).on('click', '.edit', function (e) {
        console.log("Editar");
        action = "edit"

        //se guardan los datos del registro
        rowId = $(e.target).closest("tr").attr('id');
        rowNombre = $(e.target).closest("tr").find(".nombre").html();
        rowApellido = $(e.target).closest("tr").find(".apellido").html();
        rowNroDoc = $(e.target).closest("tr").find(".nroDoc").html();
        rowTipoDoc = $(e.target).closest("tr").find(".tipoDoc").html();
        rowNac = $(e.target).closest("tr").find(".nac").html();
        rowEmail = $(e.target).closest("tr").find(".email").html();
        rowPhone = $(e.target).closest("tr").find(".phone").html();
        rowFechaNac = $(e.target).closest("tr").find(".fechaNac").html();

        console.log(rowId);
        console.log(rowNombre);
        console.log(rowApellido);
        console.log(rowNroDoc);
        console.log(rowTipoDoc);
        console.log(rowNac);
        console.log(rowEmail);
        console.log(rowPhone);
        console.log(rowFechaNac);
        /* */

        //se cargan los datos en el modal
        document.getElementById('name').value = rowNombre;
        document.getElementById('lastName').value = rowApellido;
        document.getElementById('doc').value = rowNroDoc;
        document.getElementById('docType').value = rowTipoDoc;
        document.getElementById('country').value = rowNac;
        document.getElementById('mail').value = rowEmail;
        document.getElementById('phone').value = rowPhone;
        document.getElementById('dateBirth').value = rowFechaNac;

    });


    $('#guardar').on('click', function (e) {

        console.log(action);

        if (action == "new") {

            console.log("confirmar nuevo registro");

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
                    cargarDatos();
                },
                error: function () {
                    cargarDatos();
                }
            }); /* */

        } else {

            console.log("confirmar edicion en "+rowId);

            body = {
                "nombre": document.getElementById('lastName').value,
                "apellido": document.getElementById('name').value,
                "nroDocumento": document.getElementById('doc').value,
                "tipoDocumento": document.getElementById('docType').value,
                "nacionalidad": document.getElementById('country').value,
                "email": document.getElementById('mail').value,
                "telefono": document.getElementById('phone').value,
                "fechaNacimiento": document.getElementById('dateBirth').value
            }
    
            $.ajax({
                method: "PUT",
                type: "PUT",
                url: "http://localhost:8080/fidelus/cliente/"+rowId,
                data:  JSON.stringify(body),
                crossDomain: true,
                contentType: "application/json; charset=utf-8", 
                dataType: 'json', // added data type
                success: function(res) {
                    console.log("PUT funcional");
                    cargarDatos();
                },
                error: function () {
                    cargarDatos();
                }
            }); /* */

        }

        

    });

});