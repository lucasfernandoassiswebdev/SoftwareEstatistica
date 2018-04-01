$(document).on("ajaxSend", function () {
    $("#divLoad").fadeIn(300);
}).on("ajaxComplete", function (evt, xhr) {
    setTimeout(function(){
        $("#divLoad").fadeOut(300);
    },200);
    
    if (xhr.status == 401)
        location.reload();
});