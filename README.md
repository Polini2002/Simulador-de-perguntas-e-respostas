## Autores do Projeto

* Caio Polini - 2510157
* Gabriela Alves - 2412383
* Jhonatas Diniz - 2509018
* Ryan Alves - 2511236

---

### 1. O que este projeto faz?

Este projeto consiste em uma **API em TypeScript** desenvolvida para realizar o **cadastro de perguntas e respostas, executar perguntas e respostas, e cadastrar o nome e a pontuação do usuário** em um banco de dados relacional.

Ele serve como o *backend* para gerenciar um sistema de quiz, utilizando o banco de dados **PostgreSQL**.

### 2. Pré-requisitos e Ferramentas Necessárias

Para rodar este projeto localmente, você precisará ter as seguintes ferramentas instaladas:

* **Docker:** Para subir o banco de dados PostgreSQL em um contêiner.
* **pgAdmin:** Uma ferramenta gráfica para gerenciar o banco de dados PostgreSQL.
* **VSCode (Visual Studio Code):** O editor de código recomendado.
* **Node.js (com NPM):** O ambiente de execução e o gerenciador de pacotes.

### 3. Instalação das Ferramentas

Para instalar todas as ferramentas listadas, siga as instruções oficiais nos respectivos sites:

| Ferramenta | Link de Instalação |
| :--- | :--- |
| **Docker** | [Get Docker \| Docker Docs](https://docs.docker.com/get-started/get-docker/) |
| **pgAdmin** | [Página de Download do pgAdmin](https://www.pgadmin.org/download/) |
| **VSCode** | [Página de Download do Visual Studio Code](https://code.visualstudio.com/download) |
| **Node.js e NPM** | [Página Oficial do Node.js](https://nodejs.org/en/download/) |

### 4. Clonando o Repositório

1.  Abra seu terminal (ou PowerShell).
2.  Navegue até o diretório onde deseja salvar o projeto.
3.  Execute o comando de clone, substituindo `<[https://github.com/Polini2002/Simulador-de-perguntas-e-respostas]>` pela URL real do seu projeto:

    ```bash
    git clone <https://github.com/Polini2002/Simulador-de-perguntas-e-respostas>
    ```

4.  Acesse a pasta do projeto após o clone:

    ```bash
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

### 5. Iniciando o Banco de Dados com Docker

O banco de dados PostgreSQL será inicializado através de um contêiner Docker.

> ⚠️ **Atenção:** O `docker run` é um comando longo. Use `\` (para Bash/Zsh) ou `` ` `` (para PowerShell) para quebrar as linhas, ou execute como uma linha única.

1.  **Verifique a instalação do Docker** (opcional):

    ```bash
    docker --version
    ```

2.  **Execute o contêiner PostgreSQL:**

    * **Comando para Bash/Zsh (Linux/macOS):**
        ```bash
        docker run -d \
          --name meu-postgres \
          -e POSTGRES_USER=aluno \
          -e POSTGRES_PASSWORD=102030 \
          -e POSTGRES_DB=postgres \
          -p 5432:5432 \
          postgres:latest
        ```
    * **Comando para PowerShell (Windows):**
        ```powershell
        docker run -d `
          --name meu-postgres `
          -e POSTGRES_USER=aluno `
          -e POSTGRES_PASSWORD=102030 `
          -e POSTGRES_DB=postgres `
          -p 5432:5432 `
          postgres:latest
        ```

3.  Este comando inicia um contêiner com as seguintes credenciais:
    * **Nome do Contêiner:** `meu-postgres`
    * **Usuário (POSTGRES\_USER):** `aluno`
    * **Senha (POSTGRES\_PASSWORD):** `102030`
    * **Nome do Banco (POSTGRES\_DB):** `postgres`
    * **Porta Mapeada:** `5432` (sua máquina) -> `5432` (contêiner)

### 6. Conectando o pgAdmin ao Banco de Dados

Após o contêiner estar em execução, conecte o pgAdmin a este banco de dados:

1.  Abra o aplicativo **pgAdmin**.
2.  Na interface, clique em **Add New Server** (Adicionar Novo Servidor).
3.  Na aba **General** (Geral), defina um **Name** (Nome) para o servidor (ex: `Projeto Quiz`).
4.  Na aba **Connection** (Conexão):
    * **Host name/address:** `localhost`
    * **Port:** `5432`
    * **Maintenance database:** `postgres`
    * **Username:** `aluno`
    * **Password:** `102030`
5.  Clique em **Save** (Salvar).

### 7. Configurando o Esquema do Banco

Para que a API funcione, você precisa criar as tabelas necessárias.

1.  No pgAdmin, localize o servidor que você acabou de criar (ex: `Projeto Quiz`).
2.  Expanda **Databases** e clique no banco `postgres`.
3.  Clique com o botão direito no banco e selecione **Query Tool** (Ferramenta de Query).
4.  Cole o script SQL abaixo e execute-o (clicando no ícone "Play" ou pressionando F5):

    ```sql
    -- Tabela de Perguntas
    CREATE TABLE "perguntas" (
      id_pergunta SERIAL PRIMARY KEY,
      enunciado TEXT NOT NULL
    );

    -- Tabela de Respostas
    CREATE TABLE "respostas" (
      id_resposta SERIAL PRIMARY KEY,
      id_pergunta INTEGER NOT NULL,
      resposta_correta BOOLEAN NOT NULL,

      CONSTRAINT fk_pergunta
        FOREIGN KEY (id_pergunta)
        REFERENCES "perguntas" (id_pergunta)
        ON DELETE CASCADE
    );

    -- Inserindo dados de exemplo (Perguntas)
    INSERT INTO "perguntas" (enunciado) VALUES
      ('A Muralha da China é visível do espaço a olho nu.'),
      ('Os pinguins conseguem voar, mas apenas em altitudes baixas.'),
      ('O elemento químico mais abundante no universo é o Hidrogênio.'),
      ('O Brasil foi o único país das Américas a ter um imperador.'),
      ('O crânio é o osso mais forte do corpo humano.');

    -- Inserindo dados de exemplo (Respostas)
    INSERT INTO "respostas" (id_pergunta, resposta_correta) VALUES
      (1, FALSE),
      (2, FALSE),
      (3, TRUE),
      (4, TRUE),
      (5, FALSE);

    -- 
    -- NOVAS TABELAS (Usuário e Pontos)
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
    ```

### 8. Instalando as Dependências do Projeto

Dentro da pasta do projeto, siga os passos para configurar o ambiente de desenvolvimento.

1.  Abra o terminal na pasta raiz do projeto.
2.  Inicie o projeto Node.js e instale as dependências:

    ```bash
    # Inicia o projeto Node.js (cria o package.json)
    npm init -y

    # Instala as bibliotecas de produção
    # pg (PostgreSQL) e readline-sync (entrada de dados no terminal)
    npm install pg readline-sync
    
    # Instala o TypeScript e os tipos como dependências de desenvolvimento
    npm install -D typescript @types/node @types/pg @types/readline-sync

    # Instalar dependências
    npm install --save-dev @types/node

    # Cria o arquivo de configuração do TypeScript (tsconfig.json)
    npx tsc --init
    ```

### 9. Executando o Projeto

Após a configuração, você pode iniciar o projeto. Verifique o arquivo `package.json` para os scripts de execução definidos (ex: `npm start` ou `npm run dev`).
