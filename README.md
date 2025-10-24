## Integrantes
## Caio Polini - 2510157 
## Gabriela Alves - 2412383
## Jhonatas Diniz - 2509018 
## Ryan Alves - 2511236

## 📁 Documentação do Projeto

-----

### 1\. 🚀 O Que Este Projeto Faz?

Este projeto consiste em uma **API em TypeScript** desenvolvida para realizar o **cadastro de alunos e suas respectivas médias** em um banco de dados relacional. Ele serve como o *backend* para gerenciar informações acadêmicas, utilizando o banco de dados **PostgreSQL**.

### 2\. 🛠️ Pré-requisitos e Ferramentas Necessárias

Para rodar este projeto localmente, você precisará ter as seguintes ferramentas instaladas:

  * **Docker:** Para subir o banco de dados PostgreSQL em um contêiner.
  * **pgAdmin:** Uma ferramenta gráfica para gerenciar o banco de dados PostgreSQL.
  * **VSCode (Visual Studio Code):** O editor de código recomendado para o desenvolvimento.
  * **Node.js (com NPM):** O ambiente de execução e o gerenciador de pacotes necessários para o projeto TypeScript.

-----

### 3\. 📥 Instalação das Ferramentas

Para instalar todas as ferramentas listadas, siga as instruções oficiais nos respectivos sites:

| Ferramenta | Link de Instalação |
| :--- | :--- |
| **Docker** | [Documentação Oficial do Docker](https://docs.docker.com/get-docker/) |
| **pgAdmin** | [Página de Download do pgAdmin](https://www.pgadmin.org/download/) |
| **VSCode** | [Página de Download do Visual Studio Code](https://code.visualstudio.com/download) |
| **Node.js e NPM** | [Página Oficial do Node.js](https://nodejs.org/en/download/) |

-----
4. ⬇️ Clonando o Repositório
Para começar, clone o projeto para sua máquina local usando o terminal:

Abra seu terminal (ou Powershell).

Navegue até o diretório onde deseja salvar o projeto.

Execute o comando de clone, substituindo [URL_DO_SEU_REPOSITORIO] pela URL real do seu projeto no GitHub:

Bash

git clone [https://github.com/Polini2002/conexao_alunos.git]
Acesse a pasta do projeto após o clone:

Bash

cd [NOME_DA_PASTA_CLONADA]


-----

### 5\. 🐳 Subindo o Banco de Dados via Docker

O banco de dados PostgreSQL será inicializado através de um contêiner Docker.

> ⚠️ **Atenção:** Os comandos a seguir devem ser executados no **PowerShell** (ou Terminal/Bash, adaptando o caracter de continuação de linha se necessário).

1.  **Verifique o seu nome de hostname(sera usado posteriormente)** (opcional, mas recomendado):
    ```powershell
    hostname
    ```


2.  **Verifique a instalação do Docker** (opcional, mas recomendado):
    ```powershell
    docker --version
    ```
3.  **Execute o contêiner PostgreSQL:**
    ```powershell
    docker run -d `
    --name meu-postgres `
    -e POSTGRES_USER=aluno `
    -e POSTGRES_PASSWORD=102030 `
    -e POSTGRES_DB=db_profedu `
    -p 5432:5432 `
    postgres:latest
    ```
      * Este comando inicia um contêiner em segundo plano (`-d`).
      * Ele mapeia a porta **5432** da sua máquina para a porta **5432** do contêiner.
      * Ele configura as credenciais do banco:
          * **Nome do Contêiner:** `meu-postgres`
          * **Usuário (POSTGRES\_USER):** `aluno`
          * **Senha (POSTGRES\_PASSWORD):** `102030`
          * **Nome do Banco (POSTGRES\_DB):** `db_profedu`

-----

### 6\. 🔌 Conexão Docker e pgAdmin

Após o contêiner estar em execução, você deve conectar o pgAdmin a este banco de dados:

1.  **Abra o aplicativo pgAdmin.**
2.  Na interface do pgAdmin, clique em **Add New Server** (Adicionar Novo Servidor).
3.  Na aba **General** (Geral), defina um **Name** (Nome) para o servidor (ex: `Projeto ProfEdu`).
4.  Na aba **Connection** (Conexão):
      * **Host name/address:** `(Nome do seu hostname)`
      * **Port:** `5432`
      * **Maintenance database:** `db_profedu`
      * **Username:** `aluno`
      * **Password:** `102030`
5.  Clique em **Save** (Salvar). A conexão será estabelecida, e você verá o banco de dados `db_profedu` listado.

-----

### 7\. 📝 Configuração do Esquema do Banco de Dados

Para que a API funcione, você precisa criar as tabelas necessárias no banco de dados `db_profedu`:

1.  No pgAdmin, clique no servidor que você acabou de criar (`Projeto ProfEdu`).
2.  Expanda **Databases** e clique no banco `db_profedu`.
3.  Clique com o botão direito no banco e selecione **Query Tool** (Ferramenta de Query).
4.  **"create table public.alunos (
	nome VARCHAR(100),
	serie CHAR(2),
	idade int,
	mat_media float,
	geo_media float,
	his_media float
); " 
NAO COLE COM AS ""
5.  Clique no botão **Execute/Play** (Executar) para aplicar o código SQL e criar as tabelas.

-----

### 8\. 💻 Dando Início ao Projeto Node.js/TypeScript

Dentro da pasta do projeto, siga os passos para configurar o ambiente de desenvolvimento.

1.  **Abra o terminal** na pasta raiz do projeto.
2.  **Inicie o projeto Node.js** e instale as dependências:
    ```bash
    # Inicia o projeto Node.js (cria o package.json)
    npm init -y

    # Instala as bibliotecas de produção (pg para PostgreSQL, readline-sync para entrada de dados)
    npm install pg readline-sync

    # Instala o TypeScript e os tipos como dependências de desenvolvimento
    npm install -D typescript @types/pg @types/readline-sync

    # Cria o arquivo de configuração do TypeScript (tsconfig.json)
    npx tsc --init
    ```

-----

### 9\. ▶️ Mão na Massa\!

Com o banco de dados configurado no Docker (e as tabelas criadas) e todas as dependências do Node.js instaladas, você está pronto para iniciar o desenvolvimento/uso do projeto\!

  * Dê início ao projeto usando o comando adequado (ex: `npm start` se configurado, ou o comando para executar o arquivo principal).

-----

Gostaria que eu adicionasse ou modificasse algum ponto específico, ou já quer que eu comece a montar o `README.md` final?
