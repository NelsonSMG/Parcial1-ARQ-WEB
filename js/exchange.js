
var action = "";
var conceptId;


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
                var tableRow = "<div class='col-lg-4'>"+
                                "<div class='card'>"+
                                    "<div class='card-header'>" +
                                        "<h2 class='display h4'> Producto "+f.id+"</h2>" +     
                                    "</div>" +
                                    "<div class='card-body d-flex flex-column'>" + 
                                        "<div class='row d-flex'>"+ 
                                            "<div class='col-sm-6'>"+
                                                "<img src="+"img\\mockup6.jpg"+" class='img-fluid' alt='Imagen'>"+
                                            "</div>" +
                                            "<div class='col-sm-6' id="+f.id+" >"+
                                                "<h3>"+f.descConcepto+"</h3>"+
                                                "<p>Descripción producto</p>"+
                                                "<p>"+f.puntosRequeridos+" Puntos</p>"+
                                                "<button class='btn btn-primary mt-auto btn-block concept' data-toggle='modal' data-target='#exampleModal'>Canjear</button>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                          "</div>";

                $(tableRow).appendTo("#exchangeRow");
            });

        }
    });

}
$(document).ready(function () {

    loadConcept();

    $(document).on('click', '.concept', function (e) {

        conceptId = $(e.target).closest("div").attr('id');
        console.log(conceptId);
        document.getElementById('concept').value = conceptId;
       
    });

    $(document).on('click', '#exchange', function (e) {
        console.log("Canjear");
       
        var client= document.getElementById('clientId').value;
        var concept= document.getElementById('concept').value;

        $.ajax({
            method: "POST",
            type: "POST",
            url: "http://localhost:8080/fidelus/canje-puntos/canjear?idConceptoCanje="+concept+"&idCliente="+client,
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                console.log("POST funcional");
                $('#exampleModal').modal('hide');
            },
            error: function () {
                $('#exampleModal').modal('hide');
            }
        });


    });

});

