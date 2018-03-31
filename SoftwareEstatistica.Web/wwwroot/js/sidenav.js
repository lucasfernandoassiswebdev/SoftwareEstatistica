$("#varQualitativa").click(function () {
    $.get("/QualitativasQuantitativas/Qualitativas").done(function (data) {
        $("#corpoSite").html(data);
    }).error(function (xhr) {
        M.toast({ html: 'Algo deu errado :(' });
        $("#corpoSite").html(xhr.responseText);
    });
});
