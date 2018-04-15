function calculaFrequencias(jsonDados) {
    var dados = JSON.parse(jsonDados),
        objTabela = [],
        FrA = 0,
        retorno = [];

    for (let i = 0; i < dados.length; i++)
        if (i == 0 || objTabela[objTabela.length - 1].Var != dados[i])
            objTabela.push({ 'Var': dados[i], 'Fr': 1, 'FrP': 100, 'FrA': 1, 'FrAP': 100 });
        else
            objTabela[objTabela.length - 1]['Fr']++;

    objTabela.forEach(function (item, index) {
        item.FrP = (((item.Fr * 100) / dados.length).toFixed(2)).toString() + '%';
        FrA += item.Fr;
        item.FrA = FrA;
        item.FrAP = (((FrA * 100) / dados.length).toFixed(2)).toString() + '%';

        retorno.push(item);
    });

    return retorno;
}