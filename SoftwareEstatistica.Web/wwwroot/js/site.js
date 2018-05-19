$(document).on("ajaxSend", function () {
    $("#divLoad").fadeIn(300);
}).on("ajaxComplete", function (evt, xhr) {
    setTimeout(function(){
        $("#divLoad").fadeOut(300);
    },200);
    
    if (xhr.status == 401)
        location.reload();
});

function erro(xhr){
    M.Toast.dismissAll();  
    M.toast({ html: xhr.responseText });
}

$(".sidenav-overlay").click(function(){
    $("body").css("overflow","hidden");
});

$("#retornar").click(function(){
    $(this).hide();
    $("#fomulario-dados").show();
    $("#resultados").hide();
    $("#resultados div div").remove();
    $("#ordinal div div").remove();
});