
var url = "http://localhost:8080/fidelus/canje-puntos/listar/";
var tab = "1";
var option = "";

$(document).ready(function () {

    console.log("Página de reportes");


    $('#nav-home-tab').on('click', function (e) {
        url = "http://localhost:8080/fidelus/canje-puntos/listar/";
        tab = "1";
        
    });

    $('#nav-bolsa-tab').on('click', function (e) {
        url = "http://localhost:8080/fidelus/bolsa-puntos";
        tab = "2";
        
    });

    $('#nav-vence-tab').on('click', function (e) {
        url = "http://localhost:8080/fidelus/cliente/";
        tab = "3";
        
    });

    $('#nav-client-tab').on('click', function (e) {
        url = "http://localhost:8080/fidelus/cliente";
        tab = "4";
        console.log("Consulta de clientes");
    });


    $('#generate').on('click', function (e) {
        
        console.log("Generar reporte");

        baseUrl = url;

        if (tab == "1") {

            console.log("Uso de puntos");
            option = $('#usoPuntosSelect').val(); 

            if (option == 1){
                var idConceptUse = document.getElementById('idConceptUse').value;
                url = url + "concepto?idConcepto=" + idConceptUse;

            }   else if (option == 2) {
                var useDate = document.getElementById('useDate').value;
                url = url + "fecha-uso?fechaCanje=" + useDate;

            }   else {
                var idClientUse = document.getElementById('idClientUse').value;
                url = url + "cliente?idCliente=" + idClientUse;
            }

        } else if (tab == "2") {

            console.log("Bolsa de puntos");
            option = $('#bolsaPuntosSelect').val(); 

            if (option == 1){

            }  else {
                var idCliente = document.getElementById('idClient').value;
                var monto = document.getElementById('amount').value;
            }

        } else if (tab == "3") {

            console.log("Clientes con Puntos a vencer");

            var days = document.getElementById('days').value;
            url = url + "vencer?dias=" + days;

        } else if (tab == "4") {

            console.log("Consulta de clientes");
            option = $('#clienteSelect').val(); 

            if (option == 1){

            }   else if (option == 2) {

            }   else {

            }

        };

        console.log(option);

        console.log(url);

        $.ajax({
            method: "GET",
            type: "GET",
            url: url,
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                
                console.log(res)
    
            }
        });

        url = baseUrl;

        //GET Request


    });


});