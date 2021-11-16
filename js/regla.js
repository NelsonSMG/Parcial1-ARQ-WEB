
var action = "";

var rowId;
var rowLimiteMin;
var rowLimiteMax;
var rowAmount;

function loadRules(){

    console.log("Cargar Reglas");
    $("#rulesTable").empty();

    $.ajax({
        method: "GET",
        type: "GET",
        url: "http://localhost:8080/fidelus/regla",
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json', // added data type
        success: function(res) {
            $.each(res, function(i, f){
                var tableRow = "<tr id="+f.id+" >"+
                            "<th scope='row'>"+f.id+"</th>" +
                            "<td class='min'>"+f.limiteMin+"</td>" +
                            "<td class='max'>"+f.limiteMax+"</td>" +
                            "<td class='amount'>"+f.montoEquivalencia+"</td>" +
                            "<td>1</td>" +
                            "<td>" + 
                              "<button class='btn btn-warning edit' data-toggle='modal' data-target='#exampleModal'>Editar</button> &nbsp" +
                              "<button class='btn btn-danger delete' data-toggle='modal' data-target='#deleteModal'>Eliminar</button>" +
                            "</td>" +
                          "</tr>";

                $(tableRow).appendTo("#rulesTable");
            });

        }
    });
}

$(document).ready(function () {

    console.log("Pagina de reglas");

    loadRules();


    $(document).on('click', '.edit', function (e) {
        console.log("Editar");
        action = "edit"

        //se guardan los datos del registro
        rowId = $(e.target).closest("tr").attr('id');
        rowLimiteMin = $(e.target).closest("tr").find(".min").html();
        rowLimiteMax = $(e.target).closest("tr").find(".max").html();
        rowAmount = $(e.target).closest("tr").find(".amount").html();

        /* console.log(rowId);
        console.log(rowLimiteMin);
        console.log(rowLimiteMax);
        console.log(rowAmount); */

        //se cargan los datos en el modal
        document.getElementById('limInf').value = rowLimiteMin;
        document.getElementById('limMax').value = rowLimiteMax;
        document.getElementById('amount').value = rowAmount;

    });

    $('#new').on('click', function (e) {
        console.log("Nuevo");
        action = "new"
    });

    
    //ELIMINAR
    $(document).on('click', '.delete', function (e) {
        console.log("Eliminar");
        var id = $(e.target).closest("tr").attr('id');
        console.log(id);        

        $.ajax({
            method: "DELETE",
            type: "DELETE",
            url: "http://localhost:8080/fidelus/regla/"+id,
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

    //GUARDAR
    $('#guardar').on('click', function (e) {

        console.log(action);

        if (action == "new") {

            console.log("confirmar nuevo registro");

            body = {
                "limiteMin": document.getElementById('limInf').value,
                "limiteMax": document.getElementById('limMax').value,
                "idVencimiento": 1,
                "montoEquivalencia": document.getElementById('amount').value
            }
    
            $.ajax({
                method: "POST",
                type: "POST",
                url: "http://localhost:8080/fidelus/regla",
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

        } else {

            console.log("confirmar edicion en "+rowId);

            body = {
                "limiteMin": document.getElementById('limInf').value,
                "limiteMax": document.getElementById('limMax').value,
                "idVencimiento": 1,
                "montoEquivalencia": document.getElementById('amount').value
            }
    
            $.ajax({
                method: "PUT",
                type: "PUT",
                url: "http://localhost:8080/fidelus/regla/"+rowId,
                data:  JSON.stringify(body),
                crossDomain: true,
                contentType: "application/json; charset=utf-8", 
                dataType: 'json', // added data type
                success: function(res) {
                    console.log("PUT funcional");
                    loadRules();
                },
                error: function () {
                    console.log("PUT funcional");
                    loadRules();
                }
            });/**/

        }

    
    });

});