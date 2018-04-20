function calculaFrequencias(dados) {
  let objTabela = [],
    FrA = 0,
    retorno = [];

  for (let i = 0; i < dados.length; i++)
    if (i == 0 || objTabela[objTabela.length - 1].Var != dados[i])
      objTabela.push({ Var: dados[i], Fr: 1, FrP: 100, FrA: 1, FrAP: 100 });
    else objTabela[objTabela.length - 1].Fr++;

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
  let objTabela = calculaFrequencias(dados),
    maior = objTabela[objTabela.length - 1].Var, menor = objTabela[0].Var,
    quatLinhas = Math.trunc(Math.sqrt(objTabela[objTabela.length - 1].FrA)),
    intervalo = 0,
    At = maior - menor + 1;

  do {
    checkI = false;

    if (At % quatLinhas == 0) {
      intervalo = Math.trunc((At) / quatLinhas);
      checkI = true;
    } else if (At % (quatLinhas - 1) == 0) {
      intervalo = Math.trunc((At) / (quatLinhas - 1));
      checkI = true;
    } else if (At % (quatLinhas + 1) == 0) {
      intervalo = Math.trunc((At) / (quatLinhas + 1));
      checkI = true;
    }

    At++;
  } while (!(checkI))
  
  let objContinua = [{
    Var: menor + "|---" + (menor + intervalo), Fr: 0, FrP: 0, FrA: 0, FrAP: 0,
    Pontos: [menor, (menor + intervalo)]
  }];

  while (objContinua[objContinua.length - 1].Pontos[1] <= maior) {
    debugger;
    objContinua.push({
      Var: objContinua[objContinua.length - 1].Pontos[1] + "|---" + (objContinua[objContinua.length - 1].Pontos[1] + intervalo), 
      Fr: 0, 
      FrP: 0, 
      FrA: 0, 
      FrAP: 0,
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
    });
  });

  return objContinua;
}

function medidasEstatisticasDiscreta(dados, amostra) {
  debugger;
  let dadosColetados = calculaFrequencias(dados),
    moda = [],
    maiorFr = 0,
    media = 0,
    mediana = 0,
    desvioPadrao = 0,
    coeficienteDeVariacao = 0;

  //Moda
  dadosColetados.forEach(function (dado, index) {
    media += (parseFloat(dado.Fr) * parseFloat(dado.Var));

    if (index == 0 || parseInt(dado.Fr) >= maiorFr)
      maiorFr = parseInt(dado.Fr);
  });
  debugger;
  dadosColetados.forEach(function (dado) {
    if (parseInt(dado.Fr) == maiorFr)
      moda.push(dado.Var);
  });

  if (moda.length == dadosColetados.length)
    moda = null;

  //Media
  media = (media / parseInt(dadosColetados[dadosColetados.length - 1].FrA)).toFixed(2);

  //Mediana
  if (dadosColetados[dadosColetados.length - 1].FrA % 2 != 0) {
    let pontoMedio = (dadosColetados[dadosColetados.length - 1].FrA + 1) / 2;

    for (var i = 0; i < dadosColetados.length; i++)
      if (dadosColetados[i].FrA >= pontoMedio) {
        mediana = dadosColetados[i].Var;
        break;
      }
  } else {
    let pontoMedio1 = (dadosColetados[dadosColetados.length - 1].FrA) / 2,
      pontoMedio2 = pontoMedio1 + 1,
      checkPM1 = false, checkPM2 = false;

    for (var i = 0; i < dadosColetados.length; i++) {
      if (dadosColetados[i].FrA >= pontoMedio1 && !(checkPM1)) {
        mediana += parseFloat(dadosColetados[i].Var);
        checkPM1 = true;
      }

      if (dadosColetados[i].FrA >= pontoMedio2 && !(checkPM2)) {
        mediana += parseFloat(dadosColetados[i].Var);
        checkPM2 = true;
      }

      if (checkPM1 && checkPM2)
        break;
    }
    mediana = (mediana / 2).toFixed(2);
  }

  dadosColetados.forEach(function (dado) {
    desvioPadrao += Math.pow(parseFloat(dado.Var) - media, 2) * parseFloat(dado.Fr);
  });

  if(!amostra == "A")
    desvioPadrao = Math.sqrt(desvioPadrao/dadosColetados[dadosColetados.length - 1].FrA).toFixed(2);
  else
    desvioPadrao = Math.sqrt(desvioPadrao / (dadosColetados[dadosColetados.length - 1].FrA - 1)).toFixed(2);
  
  coeficienteDeVariacao = (desvioPadrao/media)*100;
  return {
    Media: media,
    Moda: moda,
    Mediana: mediana,
    DesvioPadrao: desvioPadrao,
    CoeficienteDeVariacao: coeficienteDeVariacao
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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  });
}
