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
                    mediana = (dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - dadosColetados[i - 1].FrA) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]))).toFixed(2);
                    break;
                } else {
                    mediana = (dadosColetados[i].Pontos[0] + (((
                        (dadosColetados[dadosColetados.length - 1].FrA / 2)
                        - 0) / dadosColetados[i].Fr)
                        * (dadosColetados[i].Pontos[1] - dadosColetados[i].Pontos[0]))).toFixed(2);
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

function distribuicaoNormal(desPadrao, media, value, tipo) {
    debugger;
    if (!Array.isArray(value)) {
        let Z = EncontrarZ(desPadrao, media, value);
        if (tipo == "MA")
            Z = parseFloat((1.0 - Z).toFixed(4));
        return (Z * 100).toFixed(2);
    } else {
        let Z1 = EncontrarZ(desPadrao, media, value[0]);
        let Z2 = EncontrarZ(desPadrao, media, value[1]);
        let ZResult = parseFloat((Z2 - Z1).toFixed(4));
        return (ZResult * 100).toFixed(2);
    }
}

function EncontrarZ(desPadrao, media, value) {
    var tabelaDesNormal = [
        [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
        [0.0389, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0754],
        [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
        [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
        [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
        [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
        [0.2258, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2518, 0.2549],
        [0.2580, 0.2612, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
        [0.2881, 0.2910, 0.2939, 0.2967, 0.2996, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
        [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
        [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
        [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
        [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
        [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
        [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
        [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
        [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
        [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
        [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
        [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
        [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4893, 0.4808, 0.4812, 0.4817],
        [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
        [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
        [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
        [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
        [0.4938, 0.4940, 0.4941, 0.4943, 0.4045, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
        [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
        [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
        [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
        [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
        [0.4986, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
        [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
        [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
        [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
        [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
        [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
        [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]
    ];
    debugger;
    let Z = ((value - media) / desPadrao).toFixed(2);
    if (parseFloat(Z) < 0)
        Z = (Z * (-1)).toFixed(2);
    if (parseFloat(Z) > 3.99)
        return 0.0000;
    let zTabela = tabelaDesNormal[parseFloat(Z.substr(0, 3)) * 10][parseInt(Z[3])];
    if (value < media) {
        zTabela = parseFloat((0.5 - zTabela).toFixed(4));
    } else {
        zTabela = parseFloat((0.5 + zTabela).toFixed(4));
    }
    return zTabela;
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

function correlacao(idependente, dependente) {
    let tabelaDispercao = [];
    let somatoriaDispercao = { "X": 0, "Y": 0, "XY": 0, "X2": 0, "Y2": 0 };
    let influencia = { coeficiente: "", direcao: "", forca: "" };
    if (idependente.length != dependente.length) {
        return "Valores não correspondem";
    }
    idependente.forEach(function (item, index) {
        tabelaDispercao.push({
            "X": parseFloat(item.toFixed(2)), "Y": parseFloat(dependente[index].toFixed(2)), "XY": parseFloat((item * dependente[index]).toFixed(2)),
            "X2": parseFloat(Math.pow(item, 2).toFixed(2)), "Y2": parseFloat(Math.pow(dependente[index], 2).toFixed(2))
        });
        somatoriaDispercao["X"] += item;
        somatoriaDispercao["Y"] += dependente[index];
        somatoriaDispercao["XY"] += (item * dependente[index]);
        somatoriaDispercao["X2"] += Math.pow(item, 2);
        somatoriaDispercao["Y2"] += Math.pow(dependente[index], 2);
    });
    influencia["coeficiente"] = (((idependente.length * somatoriaDispercao["XY"]) - (somatoriaDispercao["X"] * somatoriaDispercao["Y"])) /
        (Math.sqrt((idependente.length * somatoriaDispercao["X2"]) - Math.pow(somatoriaDispercao["X"], 2)) *
            Math.sqrt((idependente.length * somatoriaDispercao["Y2"]) - Math.pow(somatoriaDispercao["Y"], 2))
        )).toFixed(2);
    if (parseFloat(influencia["coeficiente"]) < 0) {
        influencia["direcao"] = "Negativo(Inversa)";
    } else {
        influencia["direcao"] = "Positivo(Direta)";
    }

    if (parseFloat(influencia["coeficiente"]) == 1 || parseFloat(influencia["coeficiente"]) == -1) {
        influencia["forca"] = "Perfeita";
    } else if (parseFloat(influencia["coeficiente"] == 0)) {
        influencia["forca"] = "Nula";
    } else if (parseFloat(influencia["coeficiente"]) < -0.50 || parseFloat(influencia["coeficiente"]) > 0.50) {
        influencia["forca"] = "Forte";
    } else {
        influencia["forca"] = "Fraca";
    }
    return {
        tabelaDis: tabelaDispercao,
        somatoriaDis: somatoriaDispercao,
        valoresInfluencia: influencia
    };
}

function regressao(dadosDispercao) {
    let m = (((dadosDispercao["tabelaDis"].length * dadosDispercao["somatoriaDis"]["XY"]) -
        (dadosDispercao["somatoriaDis"]["X"] * dadosDispercao["somatoriaDis"]["Y"])) /
        ((dadosDispercao["tabelaDis"].length * dadosDispercao["somatoriaDis"]["X2"]) -
            (Math.pow(dadosDispercao["somatoriaDis"]["X"], 2)))
    );
    let b = (dadosDispercao["somatoriaDis"]["Y"] / dadosDispercao["tabelaDis"].length) -
        (m * (dadosDispercao["somatoriaDis"]["X"] / dadosDispercao["tabelaDis"].length));
    let maior = 0, menor = 0, posicoes = [];
    dadosDispercao["tabelaDis"].forEach(function (item, index) {
        if (index == 0) {
            maior = item["X"];
            menor = item["X"];
        } else {
            if (item["X"] > maior)
                maior = item["X"];
            if (item["X"] < menor)
                menor = item["X"];
        }
    });
    return {
        equacaoRetaIlustrativa: "Y = " + m.toFixed(3) + "X + " + b.toFixed(3),
        valorB: b,
        valorM: m
    };
}