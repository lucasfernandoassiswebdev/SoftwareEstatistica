$("#varQualitativa").click(function () {
    $.get("/QualitativasQuantitativas/Qualitativas").done(function (data) {
        $("#corpoSite").html(data);
    }).fail(erro);
});

$("#varDiscreta").click(function () {
    $.get("/QualitativasQuantitativas/Quantitativas", {
        tipo: "D"
    }).done(function (data) {
        $("#corpoSite").html(data);
    }).fail(erro);
});

$("#varContinua").click(function () {
    $.get("/QualitativasQuantitativas/Quantitativas", {
        tipo: "C"
    }).done(function (data) {
        $("#corpoSite").html(data);
    }).fail(erro);
});

$("#distribuicaoBinomial").click(function () {
    $.get("/QualitativasQuantitativas/DistribuicaoBinomial").done(function (data) {
        $("#corpoSite").html(data);
    }).fail(erro);
});