"use strict";
//Caio Henry Ferreira Polini - 2510157
//Gabriela Alves Ciaramicolli 2412383
//Jhonatas Leite Diniz - 2509018
//Ryan Alves da Silva - 2511236 
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const readlineSync = __importStar(require("readline-sync"));
const dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'postgres',
    password: '102030',
    port: 5432,
};
/**
 * Função para cadastrar uma nova pergunta e sua resposta no banco.
 * Usa uma transação para garantir que ambas sejam inseridas.
 */
async function cadastrarPergunta(pool) {
    let client;
    console.log('\n---  Cadastro de Nova Pergunta ---');
    try {
        // 1. Coleta os dados do usuário
        const enunciado = readlineSync.question('Digite o enunciado da nova pergunta: ');
        let resposta = '';
        while (resposta !== 'true' && resposta !== 'false') {
            resposta = readlineSync.question('A resposta correta e [true/false]: ').toLowerCase();
        }
        // Converte a string 'true'/'false' para um booleano real
        const respostaCorreta = (resposta === 'true');
        client = await pool.connect();
        // 2. Inicia a transação
        await client.query('BEGIN');
        // 3. Insere a pergunta e obtém o ID gerado
        const resPergunta = await client.query('INSERT INTO "perguntas" (enunciado) VALUES ($1) RETURNING id_pergunta', [enunciado]);
        const idPergunta = resPergunta.rows[0].id_pergunta;
        // 4. Insere a resposta usando o ID da pergunta
        await client.query('INSERT INTO "respostas" (id_pergunta, resposta_correta) VALUES ($1, $2)', [idPergunta, respostaCorreta]);
        // 5. Se tudo deu certo, confirma a transação
        await client.query('COMMIT');
        console.log(' Pergunta cadastrada com sucesso!');
    }
    catch (error) {
        if (client) {
            // 6. Se algo deu errado, reverte a transação
            await client.query('ROLLBACK');
        }
        console.error('Erro ao cadastrar pergunta. A transação foi revertida.', error);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}
/**
 * Função principal do Quiz, que busca perguntas, valida respostas
 * e salva a pontuação do usuário.
 */
async function jogarQuiz(pool) {
    let client;
    console.log('\n--- Iniciando o Quiz ---');
    try {
        const nomeUsuario = readlineSync.question('Por favor, digite seu nome: ');
        client = await pool.connect();
        // Salva o usuário no banco e pega o ID
        const resUsuario = await client.query(`INSERT INTO "usuario" (nome) VALUES ($1) 
         ON CONFLICT (nome) DO UPDATE SET nome = EXCLUDED.nome 
         RETURNING id_usuario`, [nomeUsuario]);
        const idUsuario = resUsuario.rows[0].id_usuario;
        console.log(`\nOlá, ${nomeUsuario} (ID: ${idUsuario})! Boa sorte.`);
        // Busca todas as perguntas
        const perguntasResult = await client.query('SELECT id_pergunta, enunciado FROM "perguntas"');
        const perguntas = perguntasResult.rows;
        let pontos = 0;
        for (const pergunta of perguntas) {
            console.log(`\nPergunta: ${pergunta.enunciado}`);
            let respostaUsuario = readlineSync.question('Responda [true/false]: ').toLowerCase();
            while (respostaUsuario !== 'true' && respostaUsuario !== 'false') {
                console.log('Por favor, digite "true" ou "false".');
                respostaUsuario = readlineSync.question('responda [true/false]: ').toLowerCase();
            }
            // Busca a resposta correta
            const respostaResult = await client.query('SELECT resposta_correta FROM "respostas" WHERE id_pergunta = $1', [pergunta.id_pergunta]);
            const respostaCerta = respostaResult.rows[0]?.resposta_correta;
            // Compara a resposta (string do usuário com string do booleano)
            const correto = respostaUsuario === String(respostaCerta);
            if (correto) {
                console.log(' Resposta correta!');
                pontos++;
            }
            else {
                console.log(' Resposta incorreta!');
            }
        }
        console.log(`\n${nomeUsuario}, sua pontuação final foi: ${pontos} de ${perguntas.length}`);
        // Salva a pontuação final no banco
        await client.query('INSERT INTO "pontos" (id_usuario, pontos) VALUES ($1, $2)', [idUsuario, pontos]);
        console.log('Pontuação salva no banco de dados!');
    }
    catch (error) {
        console.error('Erro durante o quiz:', error);
    }
    finally {
        if (client) {
            client.release(); // Apenas libera o client, não fecha o pool
        }
    }
}
/**
 * Menu principal que gerencia o fluxo da aplicação.
 */
async function mainMenu() {
    // Cria o pool de conexões que será usado por todas as funções
    const pool = new pg_1.Pool(dbConfig);
    while (true) {
        console.log('\n---Menu Principal do Quiz ---');
        console.log('1. Jogar o Quiz');
        console.log('2. Cadastrar Nova Pergunta');
        console.log('3. Sair');
        const opcao = readlineSync.question('Escolha uma opcao: ');
        switch (opcao) {
            case '1':
                await jogarQuiz(pool);
                break;
            case '2':
                await cadastrarPergunta(pool);
                break;
            case '3':
                console.log('Ate a próxima!');
                await pool.end(); // Fecha o pool de conexões ao sair
                return; // Encerra o loop e a função
            default:
                console.log('Opcao inválida. Tente novamente.');
        }
    }
}
// Inicia a aplicação pelo menu principal
mainMenu();
