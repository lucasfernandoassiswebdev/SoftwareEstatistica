$(document).on("ajaxSend", function () {
    $("#divLoad").fadeIn(300);
}).on("ajaxComplete", function (evt, xhr) {
    $("#divLoad").fadeOut(300);

    if (xhr.status == 401)
        location.reload();
});

function erro(xhr) {
    M.Toast.dismissAll();
    M.toast({ html: xhr.responseText });
}

$("#retornar").click(function () {
    $(this).hide();

    $("#resultados").hide("fast", function () {
        $("#fomulario-dados").show();
    });
    $(".btn-grafico").hide();
    $("#resultados div div, #ordinal div div, #leyer-sobreposto div div").remove();
});

$(".btn-grafico").click(function () {
    $("#leyer-sobreposto").css("display", "flex");
});

$("#fundo-leyer").click(function () {
    $("#leyer-sobreposto").hide();
});