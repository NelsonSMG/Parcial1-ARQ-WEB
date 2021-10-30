//

$(document).ready(function () {

    console.log("Pagina de conversion");

    $('#convertir').on('click', function (e) {

        e.preventDefault();
        console.log("Convertir");

        var monto = $('#montoInput').val();
        console.log(monto)

        if (monto == "") {
            monto = 0;
        }

        $.ajax({
            method: "POST",
            type: "POST",
            url: "http://localhost:8080/fidelus/regla/"+monto,
            crossDomain: true,
            contentType: "application/json; charset=utf-8", 
            dataType: 'json', // added data type
            success: function(res) {
                console.log(res);
                var montoInput = document.getElementById('equivPuntos');
                montoInput.value = res;
            }
        });
        
    });

});