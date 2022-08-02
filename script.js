var jogo = [[], [], []]; // matriz
var tabuleiro = [[], [], []]; //guardar posições

var jogador_um = {
    'nome': "Jogador 1",
    'pontos': 0
}

var jogador_dois = {
    'nome': "Jogador 2",
    'pontos': 0
}

var jogador_atual = jogador_dois;
var jogador_inicial = jogador_dois;

var jogando = true;

function verifica_vitoria() {
    var linha;
    var coluna;

    // Linhas
    for (linha = 0; linha < 3; linha++) {
        if ((jogo[linha][0] == jogo[linha][1]) && (jogo[linha][1] == jogo[linha][2])) {
            return jogo[linha][0];
        }
    }
    // Colunas
    for (coluna = 0; coluna < 3; coluna++) {
        if ((jogo[0][coluna] == jogo[1][coluna]) && (jogo[1][coluna] == jogo[2][coluna])) {
            return jogo[0][coluna];
        }
    }
    // Diagonal Principal
    if ((jogo[0][0] == jogo[1][1]) && (jogo[1][1] == jogo[2][2])) {
        return jogo[0][0];
    }
    // Diagonal Secundária
    if ((jogo[0][2] == jogo[1][1]) && (jogo[1][1] == jogo[2][0])) {
        return jogo[0][2];
    }

    return "";
}

function alerta_continuar_jogo() {
    let continuar_jogo = confirm("Deseja continuar jogando?")

    if (continuar_jogo) {
        inicia_jogo()
    } else {
        jogando = false
    }
}

function marcar_jogada(linha, coluna) {
    if (jogo[linha][coluna] == "" && jogador_atual == jogador_um) {
        jogo[linha][coluna] = "X";
        num_jogadas++;
        jogador_atual = jogador_dois;
        
        atualiza_tabuleiro();
        
        if (verifica_vitoria() == "X") {
            jogador_um.pontos++
            document.getElementById("jogador-um-pontos").innerText = `Pontos: ${jogador_um.pontos}`
            setTimeout(declara_vitoria_jogador_um, 150);
        } else if (num_jogadas == 9) {
            setTimeout(declara_empate, 150);
        }
    } else if (jogo[linha][coluna] == "" && jogador_atual == jogador_dois) {
        jogo[linha][coluna] = "O";
        num_jogadas++;
        jogador_atual = jogador_um;
        
        atualiza_tabuleiro();

        if (verifica_vitoria() == "O") {
            jogador_dois.pontos++
            document.getElementById("jogador-dois-pontos").innerText = `Pontos: ${jogador_dois.pontos}`
            setTimeout(declara_vitoria_jogador_dois, 150);
        } else if (num_jogadas == 9) {
            setTimeout(declara_empate, 150);
        }
    }
}

function declara_vitoria_jogador_um() {
    alert(`Vitória de ${jogador_um.nome}`);
    alerta_continuar_jogo();
}

function declara_vitoria_jogador_dois() {
    alert(`Vitória de ${jogador_dois.nome}`);
    alerta_continuar_jogo();
}

function declara_empate() {
    alert("Empate")
    alerta_continuar_jogo();
}

function jogar(posicao) {
    if (jogando) {
        switch (posicao) {
            case 1:
                marcar_jogada(0, 0);
                break;

            case 2:
                marcar_jogada(0, 1);
                break;

            case 3:
                marcar_jogada(0, 2);
                break;

            case 4:
                marcar_jogada(1, 0);
                break;

            case 5:
                marcar_jogada(1, 1);
                break;

            case 6:
                marcar_jogada(1, 2);
                break;

            case 7:
                marcar_jogada(2, 0);
                break;

            case 8:
                marcar_jogada(2, 1);
                break;

            case 9:
                marcar_jogada(2, 2);
                break;
        }
    }
}

function atualiza_tabuleiro() {
    for (var linha = 0; linha < 3; linha++) {
        for (var coluna = 0; coluna < 3; coluna++) {
            if (jogo[linha][coluna] == "X") {
                tabuleiro[linha][coluna].innerHTML = "X";
                tabuleiro[linha][coluna].style.cursor = "default";
            } else if (jogo[linha][coluna] == "O") {
                tabuleiro[linha][coluna].innerHTML = "O";
                tabuleiro[linha][coluna].style.cursor = "default";
            } else {
                tabuleiro[linha][coluna].innerHTML = "";
                tabuleiro[linha][coluna].style.cursor = "pointer";
            }
        }
    }
}

function inicia_jogo() {
    jogando = true;

    num_jogadas = 0;

    jogo = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    tabuleiro = [[], [], []];

    tabuleiro = [
        [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3")],
        [document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")],
        [document.getElementById("p7"), document.getElementById("p8"), document.getElementById("p9")]
    ];

    atualiza_tabuleiro();

    if (jogador_inicial == jogador_dois) {
        jogador_inicial = jogador_um;
        jogador_atual = jogador_inicial;
    } else {
        jogador_inicial = jogador_dois;
        jogador_atual = jogador_inicial;
    }

    preenche_textos()
}

function preenche_textos() {
    document.getElementById("texto-jogador-inicia").innerText = `Quem Começa: ${jogador_inicial.nome}`;

    document.getElementById("jogador-um-nome").innerText = jogador_um.nome
    document.getElementById("jogador-dois-nome").innerText = jogador_dois.nome

    document.getElementById("jogador-um-pontos").innerText = `Pontos: ${jogador_um.pontos}`
    document.getElementById("jogador-dois-pontos").innerText = `Pontos: ${jogador_dois.pontos}`
    
}

function nome_valido(nome) {
    return nome != null && nome.length > 0
}

let nome_jogador_um = prompt("Qual é o nome do jogador 1?")
let nome_jogador_dois = prompt("Qual é o nome do jogador 2?")

jogador_um.nome = nome_valido(nome_jogador_um) ? nome_jogador_um : "Jogador 1"
jogador_dois.nome = nome_valido(nome_jogador_dois) ? nome_jogador_dois : "Jogador 2"

inicia_jogo()