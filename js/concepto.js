
var action = "";
var rowId;
var rowdesConcepto;
var rowpuntosRequeridos;

function loadConcept(){

    console.log("Cargar conceptos de puntos");
    $("#conceptTable").empty();

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/concepto-canje",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', 
        success: function(res) {
            $.each(res, function(i, f){
                var tableRow = "<tr id="+f.id+" >"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td class='descConcepto'>"+f.descConcepto+"</td>" +     
                            "<td class='puntosRequeridos'>"+f.puntosRequeridos+"</td>" +
                            "<td>" + 
                              "<button class='btn btn-warning edit' data-toggle='modal' data-target='#exampleModal'>Editar</button> &nbsp" +
                              "<button class='btn btn-danger delete' data-toggle='modal' data-target='#deleteModal'>Eliminar</button>" +
                            "</td>" +
                          "</tr>";

                $(tableRow).appendTo("#conceptTable");
            });

        }
    });

}
$(document).ready(function () {

    console.log("Pagina de conceptos");

    loadConcept();

    $('#new').on('click', function (e) {
        action = "new"
        document.getElementById('conceptoDesc').value = "";
        document.getElementById('conceptPoint').value = "";
    });

    $(document).on('click', '.delete', function (e) {
        console.log("Eliminar");
        var id = $(e.target).closest("tr").attr('id');
        console.log(id);        

        $.ajax({
            method: "DELETE",
            type: "DELETE",
            url: "http://localhost:8080/fidelus/concepto-canje/"+id,
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                console.log("DELETE funcional");
                loadConcept();
            },
            error: function () {
                loadConcept();
            }
        });


    });
    $(document).on('click', '.edit', function (e) {
        console.log("Editar");
        action = "edit"

        //se guardan los datos del registro
        rowId = $(e.target).closest("tr").attr('id');
        rowdesConcepto = $(e.target).closest("tr").find(".descConcepto").html();
        rowpuntosRequeridos = $(e.target).closest("tr").find(".puntosRequeridos").html();
        
        

        console.log(rowId);
        console.log(rowdesConcepto);
        console.log(rowpuntosRequeridos);
        /* */

        //se cargan los datos en el modal
        document.getElementById('conceptoDesc').value = rowdesConcepto;
        document.getElementById('conceptPoint').value = rowpuntosRequeridos;
    });

    $('#guardar').on('click', function (e) {

        console.log(action);
        if (action == "new") {
            console.log("confirmar nuevo registro");
            body = {
                "descConcepto": document.getElementById('conceptoDesc').value,
                "puntosRequeridos": document.getElementById('conceptPoint').value
            }
            $.ajax({
                method: "POST",
                type: "POST",
                url: "http://localhost:8080/fidelus/concepto-canje",
                data:  JSON.stringify(body),
                crossDomain: true,
                contentType: "application/json; charset=utf-8", 
                dataType: 'json', // added data type
                success: function(res) {
                    console.log("POST funcional");
                    loadConcept();
                },
                error: function () {
                    loadConcept();
                }
            });
        }else{
            console.log("confirmar edicion en "+rowId);

            body = {
                "descConcepto": document.getElementById('conceptoDesc').value,
                "puntosRequeridos": document.getElementById('conceptPoint').value
            }
    
            $.ajax({
                method: "PUT",
                type: "PUT",
                url: "http://localhost:8080/fidelus/concepto-canje/"+rowId,
                data:  JSON.stringify(body),
                crossDomain: true,
                contentType: "application/json; charset=utf-8", 
                dataType: 'json', // added data type
                success: function(res) {
                    console.log("PUT funcional");
                    loadConcept();
                },
                error: function () {
                    loadConcept();
                }
            }); /* */
           
        }

    });

});

