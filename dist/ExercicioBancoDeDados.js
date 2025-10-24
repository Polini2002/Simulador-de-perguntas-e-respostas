"use strict";
//Caio Henry Ferreira Polini - 2510157
//Gabriela Alves Ciaramicolli 2412383
//Jhonatas Leite Diniz - 2509018
//Ryan Alves da Silva - 2511236 
Object.defineProperty(exports, "__esModule", { value: true });
// Usando a sintaxe CommonJS 'require' que é 100% compatível
const { Pool } = require('pg');
const readlineSync = require('readline-sync');
// Nunca use senha e usuario nos codgos - este é apenas um exemplo de aulas
// No mundo real isso é uma baita vulnerabilidade
const dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030',
    port: 5432,
};
const pool = new Pool(dbConfig);
async function inserirDados() {
    console.log("--- Cadastro de Novo Aluno ---");
    const nome = readlineSync.question('Digite o nome: ');
    const serie = readlineSync.questionInt('Digite a série: ');
    const idade = readlineSync.question('Digite a idade: ');
    let soma = 0;
    const totalNotas = 8;
    let mediaMat;
    for (let i = 1; i <= totalNotas; i++) {
        const notaMat = Number(readlineSync.question(`Digite a nota de Matemática ${i}: `));
        if (isNaN(notaMat) || notaMat < 0 || notaMat > 10) {
            console.log("Por favor, digite uma nota válida entre 0 e 10.");
            i--; // repete a mesma posição se o valor for inválido
        }
        else {
            soma += notaMat;
        }
    }
    mediaMat = soma / totalNotas;
    let soma2 = 0;
    const totalNotasGeo = 8;
    let mediaGeo;
    for (let i = 1; i <= totalNotasGeo; i++) {
        const notaGeo = Number(readlineSync.question(`Digite a nota de Geografia ${i}: `));
        if (isNaN(notaGeo) || notaGeo < 0 || notaGeo > 10) {
            console.log("Por favor, digite uma nota válida entre 0 e 10.");
            i--; // repete a mesma posição se o valor for inválido
        }
        else {
            soma2 += notaGeo;
        }
    }
    mediaGeo = soma2 / totalNotasGeo;
    let soma3 = 0;
    const totalNotasHis = 8;
    let mediaHis;
    for (let i = 1; i <= totalNotasHis; i++) {
        const notaHis = Number(readlineSync.question(`Digite a nota de História ${i}: `));
        if (isNaN(notaHis) || notaHis < 0 || notaHis > 10) {
            console.log("Por favor, digite uma nota válida entre 0 e 10.");
            i--; // repete a mesma posição se o valor for inválido
        }
        else {
            soma3 += notaHis;
        }
    }
    mediaHis = soma3 / totalNotasHis;
    if (!nome || !idade || !serie || !mediaMat || !mediaGeo || !mediaHis) {
        console.error("Erro: Todos os campos são obrigatórios! Operação cancelada.");
        await pool.end();
        return;
    }
    try {
        console.log("\nConectando ao banco de dados...");
        const client = await pool.connect();
        console.log("Conexão bem-sucedida! Inserindo dados...");
        const insertQuery = `
            INSERT INTO public.alunos (nome, serie, idade, mat_media, geo_media, his_media)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [nome, serie, idade, mediaMat, mediaGeo, mediaHis];
        await client.query(insertQuery, values);
        client.release();
        console.log("-----------------------------------------");
        console.log(`Dados inseridos com sucesso!`);
        console.log(`Nome: ${nome}, Série: ${serie}, Idade: ${idade}, Média de Matemática: ${mediaMat}, Média de Geografia: ${mediaGeo}, Média de História: ${mediaHis}`);
        console.log("-----------------------------------------");
    }
    catch (error) {
        console.error("Ocorreu um erro ao interagir com o banco de dados:", error);
    }
    finally {
        await pool.end();
        console.log("Conexão com o banco de dados encerrada.");
    }
}
inserirDados();
