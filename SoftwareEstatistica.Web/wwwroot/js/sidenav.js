$("#varQualitativa").click(function () {
    $.get("/QualitativasQuantitativas/Qualitativas").done(function (data) {
        $("#corpoSite").html(data);
    }).error(function (xhr) {
        M.Toast.dismissAll();
        M.toast({ html: xhr.responseText });
    });
});

$("#varDiscreta").click(function () {
    $.get("/QualitativasQuantitativas/Quantitativas",{
        tipo: "D"
    }).done(function (data) {
        $("#corpoSite").html(data);
    }).error(function (xhr) {
        M.Toast.dismissAll();
        M.toast({ html: xhr.responseText });
    });
});

$("#varContinua").click(function () {
    $.get("/QualitativasQuantitativas/Quantitativas",{
        tipo: "C"
    }).done(function (data) {
        $("#corpoSite").html(data);
    }).error(function (xhr) {
        M.Toast.dismissAll();
        M.toast({ html: xhr.responseText });
    });
});