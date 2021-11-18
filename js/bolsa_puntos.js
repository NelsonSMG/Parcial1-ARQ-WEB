

function loadBolsa(){

    console.log("Cargar bolsa de puntos");
    $("#bolsaPuntos").empty();

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/bolsa-puntos",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', 
        success: function(res) {
            $.each(res, function(i, f){
                var tableRow = "<tr id="+f.id+" >"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td>"+f.idCliente+"</td>" +     
                            "<td>"+f.fechaAsignacion+"</td>" +
                            "<td>"+f.fechaVencimiento+"</td>" +     
                            "<td>"+f.puntajeAsignado+"</td>" +   
                            "<td>"+f.puntajeUtilizado+"</td>" +
                            "<td>"+f.saldo+"</td>" +
                            "<td>"+f.monto+"</td>" +
                          "</tr>";

                $(tableRow).appendTo("#bolsaPuntos");
            });

        }
    });

}
$(document).ready(function () {

    console.log("Pagina de bolsa");

    loadBolsa();

//GUARDAR
$('#guardar').on('click', function (e) {

    console.log("confirmar nuevo registro");

    var idCliente = document.getElementById('idClient').value;
    var monto = document.getElementById('amount').value;

    $.ajax({
        method: "POST",
        type: "POST",
        url: "http://localhost:8080/fidelus/bolsa-puntos?idCliente="+idCliente+"&monto="+monto,
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', // added data type
        success: function(res) {
            console.log("POST funcional");
            loadBolsa();
        },
        error: function () {
            loadBolsa();
        }
    });

    


});


});