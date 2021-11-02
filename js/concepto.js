
var action = "";


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
                            "<td>"+f.descConcepto+"</td>" +     
                            "<td>"+f.puntosRequeridos+"</td>" +
                            "<td>" + 
                              "<button class='btn btn-warning' data-toggle='modal' data-target='#exampleModal'>Editar</button> &nbsp" +
                              "<button class='btn btn-danger delete' data-toggle='modal' data-target='#deleteModal'>Eliminar</button>" +
                            "</td>" +
                          "</tr>";

                $(tableRow).appendTo("#conceptTable");
            });

        }
    });

}
$(document).ready(function () {

    console.log("Pagina de reglas");

    loadConcept();

    $('#new').on('click', function (e) {
        console.log("Nuevo");
        action = "new"
        
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

    $('#guardar').on('click', function (e) {

        console.log(action);

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

    });

});

