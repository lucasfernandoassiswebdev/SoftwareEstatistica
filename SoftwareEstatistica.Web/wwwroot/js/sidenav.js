$("#varQualitativa").click(function () {
    $.get("/QualitativasQuantitativas/Qualitativas").done(function (data) {
        $("#corpoSite").html(data);
    }).error(erro);
});

$("#varDiscreta").click(function () {
    $.get("/QualitativasQuantitativas/Quantitativas",{
        tipo: "D"
    }).done(function (data) {
        $("#corpoSite").html(data);
    }).error(erro);
});

$("#varContinua").click(function () {
    $.get("/QualitativasQuantitativas/Quantitativas",{
        tipo: "C"
    }).done(function (data) {
        $("#corpoSite").html(data);
    }).error(erro);
});