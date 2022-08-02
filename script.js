// Armazena referências aos elementos HTML do jogo
var tabuleiro = [
    document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3"),
    document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6"),
    document.getElementById("p7"), document.getElementById("p8"), document.getElementById("p9")
];

// Armazena o estado atual do tabuleiro
var jogo = [
    "", "", "",
    "", "", "",
    "", "", ""
];

// Armazena as jogadas realizadas por cada jogador
var jogo_jogador_1 = []
var jogo_jogador_2 = []

// Combinações para ganhar o jogo
var combinacoes_possiveis = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Jogadores
var jogador_um = {
    'nome': "Jogador 1",
    'pontos': 0
}

var jogador_dois = {
    'nome': "Jogador 2",
    'pontos': 0
}

// Controles do jogo
var jogador_atual = jogador_dois;
var jogador_inicial = jogador_dois;

var jogando = true;

// Funções

function iniciar_jogo() {
    jogando = true;

    limpar_jogo();

    if (jogador_inicial == jogador_dois) {
        jogador_inicial = jogador_um;
        jogador_atual = jogador_inicial;
    } else {
        jogador_inicial = jogador_dois;
        jogador_atual = jogador_inicial;
    }

    preencher_textos()
}

function limpar_jogo() {
    num_jogadas = 0;

    jogo = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    jogo_jogador_1 = [];
    jogo_jogador_2 = [];

    for (let i in tabuleiro) {
        let item = tabuleiro[i];
        item.innerHTML = "";
        item.style.cursor = "pointer";
        item.style.backgroundColor = "#FFFFFF";
    }
}

function preencher_textos() {
    document.getElementById("texto-jogador-inicia").innerText = `Quem Começa: ${jogador_inicial.nome}`;

    document.getElementById("jogador-um-nome").innerText = jogador_um.nome
    document.getElementById("jogador-dois-nome").innerText = jogador_dois.nome

    document.getElementById("jogador-um-pontos").innerText = `Pontos: ${jogador_um.pontos}`
    document.getElementById("jogador-dois-pontos").innerText = `Pontos: ${jogador_dois.pontos}`
    
}

function verificar_nome_valido(nome) {
    return nome != null && nome.length > 0
}

function jogar(posicao) {
    // Se posição já estiver preenchida ou jogo estiver encerrado, ignorar jogada
    if (!jogando || jogo[posicao] != "") {
        return;
    }

    // Atualiza o tabuleiro e verifica se algum jogador venceu a partida
    if (jogador_atual == jogador_um) {
        atualizar_tabuleiro("X", posicao);

        jogo_jogador_1.push(posicao);
        jogador_atual = jogador_dois;

        let combinacao = verificar_vitoria(jogo_jogador_1);

        if (combinacao != null) {
            jogador_um.pontos++;
            destacar_jogo_vencedor(combinacao);
            document.getElementById("jogador-um-pontos").innerText = `Pontos: ${jogador_um.pontos}`;
            setTimeout(declarar_vitoria_jogador_um, 150);
            return;
        }
    } else {        
        atualizar_tabuleiro("O", posicao);

        jogo_jogador_2.push(posicao);
        jogador_atual = jogador_um;

        let combinacao = verificar_vitoria(jogo_jogador_2);
                
        if (combinacao != null) {
            jogador_dois.pontos++;
            destacar_jogo_vencedor(combinacao);
            document.getElementById("jogador-dois-pontos").innerText = `Pontos: ${jogador_dois.pontos}`;
            setTimeout(declarar_vitoria_jogador_dois, 150);
            return;
        }
    }

    if (num_jogadas == 9) {
        setTimeout(declarar_empate, 150);
    }
}

function atualizar_tabuleiro(simbolo, posicao) {
    num_jogadas++;

    jogo[posicao] = simbolo;

    let item = tabuleiro[posicao];

    item.innerHTML = simbolo;
    item.style.cursor = "default";
}

function verificar_vitoria(jogo) {
    for (let i in combinacoes_possiveis) {
        let combinacao = combinacoes_possiveis[i];
        
        // Se o jogador tiver alguma combinação possível, retornar jogo vencedor
        if (combinacao.every(valor => jogo.includes(valor))) {
            return combinacao;
        }
    }

    // Jogador não venceu a partida nessa rodada
    return null;
}

function destacar_jogo_vencedor(jogo) {
    for (let i in jogo) {
        tabuleiro[jogo[i]].style.backgroundColor = "#3CB371";
    }
}

function declarar_vitoria_jogador_um() {
    alert(`Vitória de ${jogador_um.nome}`);
    alerta_continuar_jogo();
}

function declarar_vitoria_jogador_dois() {
    alert(`Vitória de ${jogador_dois.nome}`);
    alerta_continuar_jogo();
}

function declarar_empate() {
    alert("Empate")
    alerta_continuar_jogo();
}

function alerta_continuar_jogo() {
    let continuar_jogo = confirm("Deseja continuar jogando?")

    if (continuar_jogo) {
        iniciar_jogo()
    } else {
        jogando = false
    }
}

// Zera placar
function zerar_placar() {
    jogador_um.pontos = 0;
    jogador_dois.pontos = 0;
    preencher_textos();
}

// Alterar nomes
function altera_nomes() {
    nome_jogador_um = prompt("Qual é o nome do jogador 1?")
    nome_jogador_dois = prompt("Qual é o nome do jogador 2?")
    jogador_um.nome = verificar_nome_valido(nome_jogador_um) ? nome_jogador_um : "Jogador 1"
    jogador_dois.nome = verificar_nome_valido(nome_jogador_dois) ? nome_jogador_dois : "Jogador 2"
    preencher_textos();
}

// Inicialização do jogo

let nome_jogador_um = prompt("Qual é o nome do jogador 1?")
let nome_jogador_dois = prompt("Qual é o nome do jogador 2?")

jogador_um.nome = verificar_nome_valido(nome_jogador_um) ? nome_jogador_um : "Jogador 1"
jogador_dois.nome = verificar_nome_valido(nome_jogador_dois) ? nome_jogador_dois : "Jogador 2"

iniciar_jogo()