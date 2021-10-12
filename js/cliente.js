//

var action = "";

function cargarDatos(){
    console.log("Cargar datos clientes");
};


$(document).ready(function () {

    console.log("Listar clientes");


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