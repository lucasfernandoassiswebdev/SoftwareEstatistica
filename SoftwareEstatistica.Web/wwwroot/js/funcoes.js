function calculaFrequencias(dados) {
    let objTabela = [],
        FrA = 0,
        retorno = [];

    for (let i = 0; i < dados.length; i++)
        if (i == 0 || objTabela[objTabela.length - 1].Var != dados[i])
            objTabela.push({ Var: dados[i], Fr: 1, FrP: 100, FrA: 1, FrAP: 100 });
        else objTabela[objTabela.length - 1].Fr++;

    objTabela.forEach(function (item) {
        item.FrP = (item.Fr * 100 / dados.length).toFixed(2).toString() + "%";
        FrA += item.Fr;
        item.FrA = FrA;
        item.FrAP = (FrA * 100 / dados.length).toFixed(2).toString() + "%";

        retorno.push(item);
    });

    return retorno;
}

function calculaFrequenciasContinua(dados) {
    const objTabela = calculaFrequencias(dados),
        maior = objTabela[objTabela.length - 1].Var,
        menor = objTabela[0].Var,
        quatLinhas = Math.trunc(Math.sqrt(objTabela[objTabela.length - 1].FrA));
    debugger;
    let intervalo = 0,
        at = maior - menor + 0.1,
        checkI;

    do {
        checkI = false;

        if (at % quatLinhas == 0) {
            intervalo = Math.trunc((at) / quatLinhas);
            checkI = true;
        } else if (at % (quatLinhas - 1) == 0) {
            intervalo = Math.trunc((at) / (quatLinhas - 1));
            checkI = true;
        } else if (at % (quatLinhas + 1) == 0) {
            intervalo = Math.trunc((at) / (quatLinhas + 1));
            checkI = true;
        }

        at = parseFloat((at + 0.1).toFixed(2));
    } while (!(checkI))

    const objContinua = [{
        Var: menor + "|---" + (menor + intervalo), Fr: 0, FrP: 0, FrA: 0, FrAP: 0,
        Pontos: [menor, (menor + intervalo)]
    }];

    while (objContinua[objContinua.length - 1].Pontos[1] <= maior) {
        objContinua.push({
            Var: objContinua[objContinua.length - 1].Pontos[1] + "|---" + (objContinua[objContinua.length - 1].Pontos[1] + intervalo),
            Fr: 0,
            FrP: 0,
            FrA: 0,
            FrAP: 0,
            Pontos: [objContinua[objContinua.length - 1].Pontos[1], objContinua[objContinua.length - 1].Pontos[1] + intervalo]
        });
    }

    objContinua.forEach(function (dadoD, indexC) {
        let checkR = false;
        objTabela.forEach(function (dado, index) {
            if (dado.Var >= dadoD.Pontos[0] && dado.Var < dadoD.Pontos[1]) {
                dadoD.Fr += parseFloat(dado.Fr);
                dadoD.FrP = (parseFloat(dadoD.FrP) + parseFloat(dado.FrP)).toFixed(2).toString() + "%";
                dadoD.FrA = dado.FrA;
                dadoD.FrAP = dado.FrAP;
                checkR = true;
            } else if (index == objTabela.length - 1 && !checkR) {
                dadoD.FrA = objContinua[indexC - 1].FrA;
                dadoD.FrAP = objContinua[indexC - 1].FrAP;
            }
        });
    });

    return objContinua;
}

function medidasEstatisticasDiscreta(dados, tipo) {
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

    dadosColetados.forEach(function (dado) {
        if (parseInt(dado.Fr) == maiorFr)
            moda.push(dado.Var);
    });

    if (moda.length == dadosColetados.length)
        moda = [null];

    //Media
    media = (media / parseInt(dadosColetados[dadosColetados.length - 1].FrA)).toFixed(2);

    //Mediana
    if (dadosColetados[dadosColetados.length - 1].FrA % 2 != 0) {
        let pontoMedio = (dadosColetados[dadosColetados.length - 1].FrA + 1) / 2;

        for (let i = 0; i < dadosColetados.length; i++)
            if (dadosColetados[i].FrA >= pontoMedio) {
                mediana = dadosColetados[i].Var;
                break;
            }
    } else {
        let pontoMedio1 = (dadosColetados[dadosColetados.length - 1].FrA) / 2,
            pontoMedio2 = pontoMedio1 + 1,
            checkPM1 = false, checkPM2 = false;

        for (let i = 0; i < dadosColetados.length; i++) {
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

    //Desvio Padrao
    dadosColetados.forEach(function (dado) {
        desvioPadrao += (Math.pow(parseFloat(dado.Var) - parseFloat(media), 2) * parseFloat(dado.Fr));
    });

    if (tipo == "P")
        desvioPadrao = Math.sqrt(desvioPadrao / dadosColetados[dadosColetados.length - 1].FrA).toFixed(2);
    else
        desvioPadrao = Math.sqrt(desvioPadrao / (dadosColetados[dadosColetados.length - 1].FrA - 1)).toFixed(2);

    coeficienteDeVariacao = ((parseFloat(desvioPadrao) / parseFloat(media)) * 100).toFixed(2) + "%";

    return {
        Media: media,
        Moda: moda,
        Mediana: mediana,
        DesvioPadrao: desvioPadrao,
        CoeficienteDeVariacao: coeficienteDeVariacao
    };
}

function medidasEstatisticasContinua(dados, tipo) {
    let dadosColetados = calculaFrequenciasContinua(dados),
        media = 0,
        modas = { modaCovencional: [], modaPearson: 0, modaKing: [], modaCzuber: [] },
        mediana = 0,
        maiorFr = 0,
        desvioPadrao = 0,
        coeficienteDeVariacao = 0;

    //media
    dadosColetados.forEach(function (dado) {
        media += (dado.Pontos[0] + ((dado.Pontos[1] - dado.Pontos[0]) / 2)) * dado.Fr;
    });

    media = (media / dadosColetados[dadosColetados.length - 1].FrA).toFixed(2);

    //mediana 
    if (dadosColetados[dadosColetados.length - 1].FrA % 2 != 0) {
        let pontoMedio = (dadosColetados[dadosColetados.length - 1].FrA + 1) / 2;

        for (let i = 0; i < dadosColetados.length; i++) {
            if (dadosColetados[i].FrA >= pontoMedio) {
                if (i != 0) {
                    mediana = dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - dadosColetados[i - 1].FrA) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]));
                    break;
                } else {
                    mediana = dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - 0) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]));
                    break;
                }
            }
        }
    } else {
        let pontoMedio1 = (dadosColetados[dadosColetados.length - 1].FrA) / 2,
            pontoMedio2 = pontoMedio1 + 1,
            checkPM1 = false, checkPM2 = false;

        for (let i = 0; i < dadosColetados.length; i++) {
            if (dadosColetados[i].FrA >= pontoMedio1 && !(checkPM1)) {
                if (i != 0) {
                    mediana += dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - dadosColetados[i - 1].FrA) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]));
                    checkPM1 = true;
                } else {
                    mediana += dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - 0) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]));
                    checkPM1 = true;
                }
            }

            if (dadosColetados[i].FrA >= pontoMedio2 && !(checkPM2)) {
                if (i != 0) {
                    mediana += dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - dadosColetados[i - 1].FrA) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]));

                    checkPM2 = true;
                } else if (i == 0) {
                    mediana += dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - 0) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]));
                    checkPM2 = true;
                }
            }

            if (checkPM1 && checkPM2)
                break;
        }

        mediana = (mediana / 2).toFixed(2);
    }

    //moda convencional
    dadosColetados.forEach(function (dado) {
        if (dado.Fr > maiorFr) {
            maiorFr = dado.Fr;
            modas.modaCovencional = [(dado.Pontos[0] + ((dado.Pontos[1] - dado.Pontos[0]) / 2)).toFixed(2)];
        } else if (dado.Fr == maiorFr)
            modas.modaCovencional.push((dado.Pontos[0] + ((dado.Pontos[1] - dado.Pontos[0]) / 2)).toFixed(2));
    });

    //moda pearson
    modas.modaPearson = ((3 * mediana) - (2 * media)).toFixed(2);

    //moda king
    dadosColetados.forEach(function (dado, index) {
        if (dado.Fr == maiorFr) {
            if (index != 0 && (index != dadosColetados.length - 1)) {
                modas.modaKing.push((dado.Pontos[0] + ((
                    (dadosColetados[index + 1].Fr)
                    / (dadosColetados[index + 1].Fr + dadosColetados[index - 1].Fr)
                ) * (dado.Pontos[1] - dado.Pontos[0])
                )).toFixed(2));
            } else if (index == 0 && (index == dadosColetados.length - 1)) {
                modas.modaKing.push((dado.Pontos[0] + ((0)
                ) * (dado.Pontos[1] - dado.Pontos[0])
                ).toFixed(2));
            } else if (index == 0) {
                modas.modaKing.push((dado.Pontos[0] + ((
                    (dadosColetados[index + 1].Fr)
                    / (dadosColetados[index + 1].Fr + 0)
                ) * (dado.Pontos[1] - dado.Pontos[0])
                )).toFixed(2));
            } else if ((index == dadosColetados.length - 1)) {
                modas.modaKing.push((dado.Pontos[0] + ((
                    (0
                        / (0 + dadosColetados[index - 1].Fr)
                    ) * (dado.Pontos[1] - dado.Pontos[0])
                ))).toFixed(2));
            }
        }
    });

    //Moda Czuber
    dadosColetados.forEach(function (dado, index) {
        if (dado.Fr == maiorFr) {
            if (index != 0 && (index != dadosColetados.length - 1)) {
                modas.modaCzuber.push((dado.Pontos[0] + (((dado.Fr - dadosColetados[index - 1].Fr)
                    / ((dado.Fr - dadosColetados[index - 1].Fr) + (dado.Fr - dadosColetados[index + 1].Fr))
                ) * (dado.Pontos[1] - dado.Pontos[0]))).toFixed(2));
            } else if (index == 0 && (index == dadosColetados.length - 1)) {
                modas.modaCzuber.push((dado.Pontos[0] + (((dado.Fr - 0)
                    / ((dado.Fr - 0) + (dado.Fr - 0))
                ) * (dado.Pontos[1] - dado.Pontos[0]))).toFixed(2));
            } else if (index == 0) {
                modas.modaCzuber.push((dado.Pontos[0] + (((dado.Fr - 0)
                    / ((dado.Fr - 0) + (dado.Fr - dadosColetados[index + 1].Fr))
                ) * (dado.Pontos[1] - dado.Pontos[0]))).toFixed(2));
            } else if ((index == dadosColetados.length - 1)) {
                modas.modaCzuber.push((dado.Pontos[0] + (((dado.Fr - dadosColetados[index - 1].Fr)
                    / ((dado.Fr - dadosColetados[index - 1].Fr) + (dado.Fr - 0))
                ) * (dado.Pontos[1] - dado.Pontos[0]))).toFixed(2));
            }
        }
    });

    if (modas.modaCovencional.length == dadosColetados.length)
        modas = { modaCovencional: null, modaPearson: null, modaKing: null, modaCzuber: null };
    //Desvio Padrao
    dadosColetados.forEach(function (dado) {
        desvioPadrao += Math.pow((dado.Pontos[0] + ((dado.Pontos[1] - dado.Pontos[0]) / 2)) - parseFloat(media), 2) * parseFloat(dado.Fr);
    });

    if (tipo == "P")
        desvioPadrao = Math.sqrt(desvioPadrao / dadosColetados[dadosColetados.length - 1].FrA).toFixed(2);
    else
        desvioPadrao = Math.sqrt(desvioPadrao / (dadosColetados[dadosColetados.length - 1].FrA - 1)).toFixed(2);

    coeficienteDeVariacao = parseFloat((desvioPadrao / parseFloat(media)) * 100).toFixed(2) + "%";

    return {
        Media: media,
        Moda: modas,
        Mediana: mediana,
        DesvioPadrao: desvioPadrao,
        CoeficienteDeVariacao: coeficienteDeVariacao
    }
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

    if (ultimaCor != undefined)
        do {
            num = Math.round(0xffffff * Math.random());
            r = num >> 16;
            g = (num >> 8) & 255;
            b = num & 255;
        } while (r == ultimaCor.r && g == ultimaCor.g && b == ultimaCor.b);

    return {
        r: r,
        g: g,
        b: b
    };
}

function montaGrafico(type, dados, context, titulo) {
    let ultimaCor, coresSorteadas = [];

    dados.Variaveis.forEach(function () {
        const corSorteada = sorteiaCor(ultimaCor);

        coresSorteadas.push("rgba(" + corSorteada.r + ", " + corSorteada.g + ", " + corSorteada.b + ",0.4)");

        ultimaCor = {
            r: corSorteada.r,
            g: corSorteada.g,
            b: corSorteada.b
        };
    });
    return new Chart(context, {
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

function distribuicaoBinomial(quantidaden, sucessop, quantidadex, opcaoSucessoErro, opcaoDistribuicao) {
    if (opcaoSucessoErro != "s") {
        sucessop = 100 - sucessop;
    }
    let porcentSoc = sucessop / 100;
    let porcentErro = 1 - porcentSoc;
    let result = 0;
    result = (fatorial(quantidaden) / (fatorial(quantidadex) * fatorial(quantidaden - quantidadex))) * Math.pow(porcentSoc, quantidadex) * Math.pow(porcentErro, quantidaden - quantidadex);
    if (opcaoDistribuicao == "maq") {
        for (var i = parseFloat(quantidadex) + 1; i <= parseFloat(quantidaden); i++) {
            result += (fatorial(quantidaden) / (fatorial(i) * fatorial(quantidaden - i))) * Math.pow(porcentSoc, i) * Math.pow(porcentErro, quantidaden - i);
        }
    } else if (opcaoDistribuicao == "meq") {
        for (var i = 0; i <= parseFloat(quantidadex) - 1; i++) {
            result += (fatorial(quantidaden) / (fatorial(i) * fatorial(quantidaden - i))) * Math.pow(porcentSoc, i) * Math.pow(porcentErro, quantidaden - i);
        }
    }
    result = (result * 100).toFixed(2);
    return result;
}

function distribuicaoUniforme(minimo, maximo, variavel, tipo, maiorQue, menorQue) {
    const minimoC = parseFloat(minimo),
        maximoC = parseFloat(maximo);
    var media = (minimoC + maximoC) / 2,
        desvioPadrao = Math.sqrt(Math.pow((maximoC - minimoC), 2) / 12),
        de = media - desvioPadrao,
        ate = media + desvioPadrao,
        cv = (desvioPadrao / media) * 100,
        intervaloAmostra = (1 / (maximoC - minimoC)),
        intervalo = 0;
    if (variavel) {
        if (tipo == "MA")
            intervalo = maximoC - variavel;
        else if (tipo == "ME")
            intervalo = variavel - minimoC;
        else
            intervalo = 0;
        if (variavel > maximoC || variavel < minimoC)
            intervaloAmostra = 0;
    } else {
        intervalo = parseFloat(maiorQue) - parseFloat(menorQue);
        if (parseFloat(maiorQue) > maximoC || parseFloat(maiorQue) < minimoC || parseFloat(menorQue) > maximoC || parseFloat(menorQue) < minimoC) {
            intervaloAmostra = 0;
        }
        if (intervalo < 0) {
            intervalo = 0;
        }
    }

    return {
        media: media,
        desvioPadrao: desvioPadrao.toFixed(2),
        zonaNormalidade: {
            de: de.toFixed(2),
            ate: ate.toFixed(2),
            cv: cv.toFixed(2)
        },
        probabilidade: (((intervaloAmostra) * intervalo) * 100).toFixed(2)
    };
}

function fatorial(n) {
    if (n < 0)
        return -1;
    else if (n == 0)
        return 1;
    else
        return (n * fatorial(n - 1));
}


function medidaSeparatrizes(med, maxMed, frequencia, tipo) {
    let indexMed = 0;
    let value = 0;
    let posMed = (med * frequencia[frequencia.length - 1].FrA) / maxMed;
    let checkMed = false;
    frequencia.forEach(function (dado, index) {
        if (dado.FrA >= posMed && !checkMed) {
            value = (dado.Var).toString();
            indexMed = index;
            checkMed = true;
        }
    });
    if (tipo == "C") {
        if (indexMed != 0) {
            value = (frequencia[indexMed].Pontos[0] + (((posMed - frequencia[indexMed - 1].FrA) / parseInt(frequencia[indexMed].Fr)) * (frequencia[indexMed].Pontos[1] - frequencia[indexMed].Pontos[0]))).toFixed(2);
        } else {
            value = (frequencia[indexMed].Pontos[0] + (((posMed - 0) / parseInt(frequencia[indexMed].Fr)) * (frequencia[indexMed].Pontos[1] - frequencia[indexMed].Pontos[0]))).toFixed(2);
        }
    }
    return value;
}