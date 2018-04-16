function calculaFrequencias(dados) {
  let objTabela = [],
    FrA = 0,
    retorno = [];

  for (let i = 0; i < dados.length; i++)
    if (i == 0 || objTabela[objTabela.length - 1].Var != dados[i])
      objTabela.push({ Var: dados[i], Fr: 1, FrP: 100, FrA: 1, FrAP: 100 });
    else objTabela[objTabela.length - 1]["Fr"]++;

  objTabela.forEach(function (item, index) {
    item.FrP = (item.Fr * 100 / dados.length).toFixed(2).toString() + "%";
    FrA += item.Fr;
    item.FrA = FrA;
    item.FrAP = (FrA * 100 / dados.length).toFixed(2).toString() + "%";

    retorno.push(item);
  });

  return retorno;
}

function calculaFrequenciasContinua(dados) {
  let objTabela = calculaFrequencias(dados);
  let maior = objTabela[objTabela.length - 1].Var, menor = objTabela[0].Var;
  /*for (var i = 0; i <= objTabela.length; i++) {
    if (i == 0) {
      maior = objTabela[i]; menor = objTabela[i];
    } else {
      if(objTabela[i].Var > maior)
        maior = objTabela[i].Var;
      if(objTabela[i] < menor)
        menor = objTabela[i].Var;  
    }
  }*/
  let quatLinhas = Math.ceil(Math.sqrt(objTabela[objTabela.length - 1].FrA));
  let intervalo = 0;
  let At = maior - menor + 1;
  do{
    checkI = false;
    if(At%quatLinhas == 0){
      intervalo = Math.ceil((At) / quatLinhas);
      checkI = true;
    }else if(At%(quatLinhas - 1) == 0){
      intervalo = Math.ceil((At) / (quatLinhas - 1));
      checkI = true;
    }else if(At%(quatLinhas + 1) == 0){
      intervalo = Math.ceil((At) / (quatLinhas + 1));
      checkI = true;
    }
    At++;
  }while(!(checkI))
  let objContinua = [{
    Var: menor + "|---" +(menor + intervalo), Fr: 0, FrP: 0, FrA: 0, FrAP: 0,
    Pontos:[menor, (menor + intervalo)]
  }];
  while (objContinua[objContinua.length - 1].Pontos[1] <= maior) {
    objContinua.push({
      Var: objContinua[objContinua.length - 1].Pontos[1] + "|---" + (objContinua[objContinua.length - 1].Pontos[1] + intervalo), Fr: 0, FrP: 0, FrA: 0, FrAP: 0,
      Pontos: [objContinua[objContinua.length - 1].Pontos[1], objContinua[objContinua.length - 1].Pontos[1] + intervalo]
    });
  }
  objContinua.forEach(function (dadoD) {
    objTabela.forEach(function (dado) {
      if (dado.Var >= dadoD.Pontos[0] && dado.Var < dadoD.Pontos[1]) {
        dadoD.Fr += parseFloat(dado.Fr);
        dadoD.FrP = (parseFloat(dadoD.FrP) + parseFloat(dado.FrP)).toFixed(2).toString() + "%";
        dadoD.FrA = dado.FrA;
        dadoD.FrAP = dado.FrAP;
      }
    })
  });
  return objContinua;
}

function calculaMediaModaMediana(jsonDados) {
  let dadosColetados = calculaFrequencias(jsonDados),
    moda,
    arrayModa,
    media,
    mediana;

  //Moda
  dadosColetados.forEach(function (dado) {
    media += dado;

    if (arrayModa.length == 0)
      arrayModa.push({
        numero: dado,
        quantidade: 1
      });
    else {
      let adicionar = true;

      arrayModa.forEach(function (item) {
        if (item.numero == dado) {
          item.numero++;
          adicionar = false;
        }
      });

      if (adicionar)
        arrayModa.push({
          numero: dado,
          quantidade: 1
        });
    }

    let acm = 0;
    arrayModa.forEach(function (item, index) {
      if (index == 0) moda = item;
      else if (item > moda) moda = item;

      if (item == moda) acm++;
    });

    if (acm == arrayModa.length) moda = "Não tem moda";
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

function montaInformacoesGrafico(dados) {
  let objDados = [],
    variaveis = [],
    quantidades = [];

  dados.forEach(function (item, index) {
    if (index == 0)
      objDados.push({
        valor: item,
        quantidade: 1
      });
    else {
      let add = true;

      objDados.forEach(function (dado) {
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

  objDados.forEach(function (item) {
    variaveis.push(item.valor);
    quantidades.push(item.quantidade);
  });

  return {
    Variaveis: variaveis,
    Quantidades: quantidades
  };
}

function sorteiaCor(ultimaCor) {
  let num = Math.round(0xffffff * Math.random()),
    r = num >> 16,
    g = (num >> 8) & 255,
    b = num & 255;

  num = Math.round(0xffffff * Math.random());
  r = num >> 16;
  g = (num >> 8) & 255;
  b = num & 255;

  if (ultimaCor != undefined)
    do {
      num = Math.round(0xffffff * Math.random());
      r = num >> 16;
      g = (num >> 8) & 255;
      b = num & 255;
    } while (r == ultimaCor.r && g == ultimaCor.g && b == ultimaCor.b);

  return { r: r, g: g, b: b };
}

function montaGrafico(type, dados, ctx, titulo) {
  let ultimaCor, coresSorteadas = [];

  dados.Variaveis.forEach(function (item, index) {
    let corSorteada = sorteiaCor(ultimaCor);

    coresSorteadas.push("rgba(" + corSorteada.r + ", " + corSorteada.g + ", " + corSorteada.b + ",0.4)");

    ultimaCor = { r: corSorteada.r, g: corSorteada.g, b: corSorteada.b };
  });

  return new Chart(ctx, {
    type: type,
    data: {
      labels: dados.Variaveis,
      datasets: [{
        label: titulo,
        data: dados.Quantidades,
        backgroundColor: coresSorteadas,
        borderColor: coresSorteadas,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
