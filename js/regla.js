//

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
        dataType: 'jsonp', // added data type
        success: function(res) {
            console.log(res);
            alert(res);
        }
    });

});