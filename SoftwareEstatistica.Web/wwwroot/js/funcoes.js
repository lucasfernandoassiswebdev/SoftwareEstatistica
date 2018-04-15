function calculaFrequencias(jsonDados) {
  let dados = JSON.parse(jsonDados),
    objTabela = [],
    FrA = 0,
    retorno = [];

  for (let i = 0; i < dados.length; i++)
    if (i == 0 || objTabela[objTabela.length - 1].Var != dados[i])
      objTabela.push({ Var: dados[i], Fr: 1, FrP: 100, FrA: 1, FrAP: 100 });
    else objTabela[objTabela.length - 1]["Fr"]++;

  objTabela.forEach(function(item, index) {
    item.FrP = (item.Fr * 100 / dados.length).toFixed(2).toString() + "%";
    FrA += item.Fr;
    item.FrA = FrA;
    item.FrAP = (FrA * 100 / dados.length).toFixed(2).toString() + "%";

    retorno.push(item);
  });

  return retorno;
}

function calculaMediaModaMediana(jsonDados) {
  let dadosColetados = calculaFrequencias(jsonDados),
    moda,
    arrayModa,
    media,
    mediana;

  //Moda
  dadosColetados.forEach(function(dado) {
    media += dado;

    if (arrayModa.length == 0)
      arrayModa.push({
        numero: dado,
        quantidade: 1
      });
    else
      arrayModa.forEach(function(item) {
        if (item.numero == dado) item.numero++;
        else
          arrayModa.push({
            numero: dado,
            quantidade: 1
          });
      });

    var acm = 0;
    arrayModa.forEach(function(item, index) {
      if (index == 0) moda = item;
      else if (item > moda) moda = item;

      if (item == moda) acm++;
    });

    if (acm == arrayModa.length) modal = "Não tem moda";
  });

  //Media
  media = media / dadosColetados.length;

  //Mediana
  if ("@ViewBag.tipo" == "C") {
  } else {
    var ve = arrayModa.length;

    if (ve % 2 == 0) {
      var posicao = dadosColetados[dadosColetados.length - 1].FrA / 2,
        vlr1 = dadosColetados[posicao],
        vlr2 = vlr1 + 1;

      mediana = vlr1 + vlr2;
    }
  }

  return {
    Media: media,
    Moda: moda,
    Mediana: mediana
  };
}

function montaInformacoesGrafico(jsonDados) {
  let objDados = [],
    variaveis = [],
    quantidades = [];

  jsonDados.forEach(function(item, index) {
    if (index == 0)
      objDados.push({
        valor: item,
        quantidade: 1
      });
    else {
      let add = true;

      objDados.forEach(function(dado) {
        if (item == dado.valor) {
          dado.quantidade++;
          add = false;
        }
      });

      if (add)
        objDados.push({
          valor: item,
          quantidade: 1
        });
    }
  });

  objDados.forEach(function(item) {
    variaveis.push(item.valor);
    quantidades.push(item.quantidade);
  });

  return {
    Variaveis: variaveis,
    Quantidades: quantidades
  };
}
