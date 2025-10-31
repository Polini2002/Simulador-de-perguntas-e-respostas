## Caio Polini - 2510157

## Gabriela Alves - 2412383

## **Jhonatas Diniz - 2509018**

## **Ryan Alves - 2511236**

### 1 - O que esse projeto faz?

Este projeto consiste em uma **API em TypeScript** desenvolvida para realizar o **cadastro de perguntas e respostas, executar perguntas e respostas, cadastrar o nome e a pontuação do usuário** em um banco de dados relacional. Ele serve como o *backend* para gerenciar informações acadêmicas, utilizando o banco de dados **PostgreSQL**.

### **2.  Pré-requisitos e Ferramentas Necessárias**

Para rodar este projeto localmente, você precisará ter as seguintes ferramentas instaladas:

- **Docker:** Para subir o banco de dados PostgreSQL em um contêiner.
- **pgAdmin:** Uma ferramenta gráfica para gerenciar o banco de dados PostgreSQL.
- **VSCode (Visual Studio Code):** O editor de código recomendado para o desenvolvimento.
- **Node.js (com NPM):** O ambiente de execução e o gerenciador de pacotes necessários para o projeto TypeScript

### **3.  Instalação das Ferramentas**

Para instalar todas as ferramentas listadas, siga as instruções oficiais nos respectivos sites:

| **Ferramenta** | **Link de Instalação** |
| --- | --- |
| **Docker** | [Get Docker | Docker Docs](https://docs.docker.com/get-started/get-docker/) |
| **pgAdmin** | [Página de Download do pgAdmin](https://www.pgadmin.org/download/) |
| **VSCode** | [Página de Download do Visual Studio Code](https://code.visualstudio.com/download) |
| **Node.js e NPM** | [Página Oficial do Node.js](https://nodejs.org/en/download/) |

### 4. Clonando o repositório

Abra seu terminal (ou Powershell).

Navegue até o diretório onde deseja salvar o projeto.

Execute o comando de clone, substituindo [URL_DO_SEU_REPOSITORIO] pela URL real do seu projeto no GitHub:

Bash

git clone [https://github.com/Polini2002/.git] Acesse a pasta do projeto após o clone:

Bash

cd [NOME_DA_PASTA_CLONADA]

### **5.  Subindo o Banco de Dados via Docker**

O banco de dados PostgreSQL será inicializado através de um contêiner Docker.

> ⚠️ Atenção: Os comandos a seguir devem ser executados no PowerShell (ou Terminal/Bash, adaptando o carácter de continuação de linha se necessário).
> 
1. **Verifique o seu nome de hostname(sera usado posteriormente)** (opcional, mas recomendado):
    
    ```
    hostname
    ```
    
2. **Verifique a instalação do Docker** (opcional, mas recomendado):
    
    ```
    docker --version
    ```
    
3. **Execute o contêiner PostgreSQL:**
    
    ```
    docker run -d `
    --name meu-postgres `
    -e POSTGRES_USER=aluno `
    -e POSTGRES_PASSWORD=102030 `
    -e POSTGRES_DB=postgres `
    -p 5432:5432 `
    postgres:latest
    ```
    
    - Este comando inicia um contêiner em segundo plano (`d`).
    - Ele mapeia a porta **5432** da sua máquina para a porta **5432** do contêiner.
    - Ele configura as credenciais do banco:
        - **Nome do Contêiner:** `meu-postgres`
        - **Usuário (POSTGRES_USER):** `aluno`
        - **Senha (POSTGRES_PASSWORD):** `102030`
        - **Nome do Banco (POSTGRES_DB):** `postgres`
    
    ### **6.  Conexão Docker e pgAdmin**
    
    Após o contêiner estar em execução, você deve conectar o pgAdmin a este banco de dados:
    
    1. **Abra o aplicativo pgAdmin.**
    2. Na interface do pgAdmin, clique em **Add New Server** (Adicionar Novo Servidor).
    3. Na aba **General** (Geral), defina um **Name** (Nome) para o servidor (ex: `Projeto ProfEdu`).
    4. Na aba **Connection** (Conexão):
        - **Host name/address:** `(Nome do seu hostname)`
        - **Port:** `5432`
        - **Maintenance database:** `postgres`
        - **Username:** `aluno`
        - **Password:** `102030`
    5. Clique em **Save** (Salvar). A conexão será estabelecida, e você verá o banco de dados `postgres` listado.

### **7. 📝 Configuração do Esquema do Banco de Dados**

Para que a API funcione, você precisa criar as tabelas necessárias no banco de dados `postgres`:

1. No pgAdmin, clique no servidor que você acabou de criar (`Projeto ProfEdu`).
2. Expanda **Databases** e clique no banco `postgres`.
3. Clique com o botão direito no banco e selecione **Query Tool** (Ferramenta de Query).
4. 
    
  
CREATE TABLE "perguntas" (
    id_pergunta SERIAL PRIMARY KEY,
    enunciado TEXT NOT NULL   
);

CREATE TABLE "respostas" (
    id_resposta SERIAL PRIMARY KEY,  
    id_pergunta INTEGER NOT NULL,    
    resposta_correta BOOLEAN NOT NULL,    
    
    CONSTRAINT fk_pergunta
        FOREIGN KEY (id_pergunta)
        REFERENCES "perguntas" (id_pergunta)
        ON DELETE CASCADE 
);


INSERT INTO "perguntas" (enunciado) VALUES
    ('A Muralha da China é visível do espaço a olho nu.'), 
    ('Os pinguins conseguem voar, mas apenas em altitudes baixas.'),      
    ('O elemento químico mais abundante no universo é o Hidrogênio.'),    
    ('O Brasil foi o único país das Américas a ter um imperador.'),      
    ('O crânio é o osso mais forte do corpo humano.');             

INSERT INTO "respostas" (id_pergunta, resposta_correta) VALUES
    (1, FALSE),
    (2, FALSE), 
    (3, TRUE), 
    (4, TRUE),  
    (5, FALSE); 

-- 
-- ⬇️ NOVAS TABELAS ADICIONADAS AQUI ⬇️
--

-- Tabela para armazenar os jogadores
CREATE TABLE "usuario" (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE -- UNIQUE para não ter nomes repetidos
);

-- Tabela para armazenar as pontuações de cada jogador
CREATE TABLE "pontos" (
    id_pontuacao SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL, -- Chave estrangeira para "usuario"
    pontos INTEGER NOT NULL, -- A pontuação que o usuário fez
    data_jogo TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora do jogo
    
    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES "usuario" (id_usuario)
        ON DELETE CASCADE -- Se o usuário for deletado, suas pontuações somem
);
    
   
### **8.  Dando Início ao Projeto Node.js/TypeScript**

Dentro da pasta do projeto, siga os passos para configurar o ambiente de desenvolvimento.

1. **Abra o terminal** na pasta raiz do projeto.
2. **Inicie o projeto Node.js** e instale as dependências:
    
    `# Inicia o projeto Node.js (cria o package.json)
    npm init -y

    # Instale as definições de tipos do Node
    npm i --save-dev @types/node
    
    # Instala as bibliotecas de produção (pg para PostgreSQL, readline-sync para entrada de dados)
    npm install pg readline-sync
    
    # Instala o TypeScript e os tipos como dependências de desenvolvimento
    npm install -D typescript @types/pg @types/readline-sync
    
    # Cria o arquivo de configuração do TypeScript (tsconfig.json)
    npx tsc --init`
    

### **9. Mão na Massa!**

Dê início ao projeto usando o comando adequado (ex: `npm start` se configurado, ou o comando para executar o arquivo principal).