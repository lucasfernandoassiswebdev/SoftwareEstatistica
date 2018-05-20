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

$(".sidenav-overlay").click(function () {
    $("body").css("overflow", "hidden");
});

$("#retornar").click(function () {
    $(this).hide();

    $("#resultados").hide("fast", function () {
        $("#fomulario-dados").show();
    });

    $("#resultados div div, #ordinal div div").remove();
});