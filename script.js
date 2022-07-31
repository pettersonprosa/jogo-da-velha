var jogo = [[],[],[]]; // matriz
var tabuleiro = [[],[],[]]; //guardar posições
var jogador_atual = 2; // 1 => 1° Jogador1; 2 => 2° Jogador
var jogando = true;
var jogador_inicial = 2;

function verifica_vitoria() {
    var linha;
    var coluna;

    //Linhas
    for(linha=0;linha<3;linha++){
        if((jogo[linha][0]==jogo[linha][1])&&(jogo[linha][1]==jogo[linha][2])){ 
            return jogo[linha][0];
        }
    }
    //Colunas
    for(coluna=0;coluna<3;coluna++){
        if((jogo[0][coluna]==jogo[1][coluna])&&(jogo[1][coluna]==jogo[2][coluna])){
            return jogo[0][coluna];
        }
    }
    //Diagonal Princial
    if((jogo[0][0]==jogo[1][1])&&(jogo[1][1]==jogo[2][2])){
        return jogo[0][0];
    }
    //Diagonal Secundária
    if((jogo[0][2]==jogo[1][1])&&(jogo[1][1]==jogo[2][0])){
        return jogo[0][2];
    }

    return "";
}

function alerta_continuar_jogo() {
    continuar_jogo = prompt("Deseja continuar jogando? \n s: sim \n n: não")
    if(continuar_jogo == "n") {
        jogando = false
    } else if (continuar_jogo == "s") {
        inicia_jogo()
    }
}

function marcar_jogada(linha, coluna){
    if(jogo[linha][coluna] == "" && jogador_atual == 1) {
        jogo[linha][coluna] = "X";
        num_jogadas++;
        jogador_atual = 2;
        atualiza_tabuleiro();
        //verifica_vitoria();
        if(verifica_vitoria() == "X") {
            alert("Vitória do Jogador 1(X)");
            alerta_continuar_jogo();
        } else if (num_jogadas == 8) {
            alert("Empate")
            alerta_continuar_jogo();
        }
    } else if (jogo[linha][coluna] == "" && jogador_atual == 2) {
        jogo[linha][coluna] = "O";
        num_jogadas++;
        jogador_atual = 1;
        atualiza_tabuleiro();
        //verifica_vitoria();
        if(verifica_vitoria() == "O") {
            alert("Vitória do Jogador 2(Y)")
            alerta_continuar_jogo();
        } else if (num_jogadas == 8) {
            alert("Empate")
            alerta_continuar_jogo();
        }
    }
}


function jogar(posicao) {
    if(jogando) {
        switch(posicao) {
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
    for(var linha=0; linha<3; linha++) {
        for(var coluna=0; coluna<3; coluna++) {
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

    tabuleiro = [[],[],[]];

    tabuleiro = [
        [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3")],
        [document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")],
        [document.getElementById("p7"), document.getElementById("p8"), document.getElementById("p9")]
    ];

    atualiza_tabuleiro();

    if(jogador_inicial == 2) {
        jogador_inicial = 1;
        jogador_atual = jogador_inicial;
        document.getElementById("div-jogador-inicia").innerHTML = "Quem Começa: 1° Jogador";
    } else {
        jogador_inicial = 2;
        jogador_atual = jogador_inicial;
        document.getElementById("div-jogador-inicia").innerHTML = "Quem Começa: 2° Jogador";
    }

    window.addEventListener("load", inicia_jogo)
}

function nova_partida() {
    var jogo = [[],[],[]]; // matriz
    var tabuleiro = [[],[],[]]; //guardar posições
    var jogador_atual = 2; // 1 => 1° Jogador1; 2 => 2° Jogador
    var jogando = true;
    var jogador_inicial = 2;
}