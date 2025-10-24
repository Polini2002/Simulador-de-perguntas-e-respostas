<<<<<<< HEAD
# Projeto de Teste: Conexão TypeScript com PostgreSQL

Olá, alunos do professor Eduardo Popovici!

Você pode precisar montar um banco de dados para realizar a atividade. Para isso utilize a postagem pela URL https://www.eduardopopovici.com/2025/09/como-montar-um-conteiner-com-postgre.html 

Este é um projeto simples, criado como material de apoio para a aula, com o objetivo de demonstrar uma funcionalidade essencial no desenvolvimento de software: **conectar uma aplicação a um banco de dados e inserir informações**.

Importante, os passos de como executar de fim a fim, serão realizados em sala de aulas.

<img width="1240" height="677" alt="image" src="https://github.com/user-attachments/assets/74b13711-87cc-4b2f-9077-c5a6c5478079" />

Dica, programe escutando música, vai te ajudar durante o processo. Aqui vai minha recomendação https://www.youtube.com/watch?v=kWRScWjjLIY

---

### O Que Este Projeto Faz?

A funcionalidade do script é muito direta:

1.  **Conecta-se** a um banco de dados PostgreSQL (que deve estar rodando via Docker).
2.  **Pede ao usuário** para digitar um nome, uma idade e uma data de nascimento diretamente no terminal.
3.  **Executa um comando SQL `INSERT`** para salvar esses dados em uma tabela chamada `pessoas`.
4.  **Encerra a conexão** de forma segura.

<img width="1586" height="897" alt="image" src="https://github.com/user-attachments/assets/5aee0574-e544-4094-8765-80e5b86c0a87" />

### Quais ferramentas você vai precisar?

1. VSCode
2. Docker
3. PGAdmin
4. Typescript - NodeJS
5. GitBash

<img width="1916" height="1018" alt="image" src="https://github.com/user-attachments/assets/149ff003-802f-4ba5-8020-f6de3d902db4" />


---

### ⚠️ Aviso de Segurança Importante: Credenciais no Código

No arquivo `ExercicioBancoDeDados.ts`, o usuário e a senha do banco de dados estão escritos diretamente no código (uma prática conhecida como *hardcoding*).

```typescript
const dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030', // <--- PERIGO!
    port: 5432,
};
```

**Para um exercício em aula, isso é aceitável para simplificar o aprendizado.** No entanto, em um projeto real, **isso é uma falha de segurança gravíssima**. Se este código fosse enviado para um repositório público no GitHub, qualquer pessoa poderia ver suas credenciais e obter acesso total ao seu banco de dados.

A maneira correta de gerenciar informações sensíveis como essa é usar **Variáveis de Ambiente**, geralmente com o auxílio de arquivos `.env` e bibliotecas como `dotenv`.

---

### Estrutura do Projeto

Ao clonar ou criar o projeto, você encontrará os seguintes arquivos e diretórios principais:

```
/ESCREVER-NO-BANCO
|
|-- /dist/
|   |-- ExercicioBancoDeDados.js  <-- O código JavaScript compilado que será executado.
|
|-- /node_modules/
|   |-- ... (várias pastas)     <-- Dependências e bibliotecas do projeto.
|
|-- ExercicioBancoDeDados.ts      <-- Nosso código-fonte principal, escrito em TypeScript.
|
|-- package.json                  <-- O "RG" do projeto: lista as dependências e scripts.
|
|-- tsconfig.json                 <-- Arquivo de configuração com as regras para o compilador TypeScript.
|
|-- README.md                     <-- Este arquivo de documentação.
```

---

### Como Executar o Projeto

Siga os passos abaixo no terminal, dentro da pasta do projeto.

#### Pré-requisitos
1.  Ter o **Node.js** instalado na sua máquina.
2.  Garantir que o **container Docker do PostgreSQL** esteja em execução.

#### Passo a Passo

1.  **Instalar as Dependências**
    Este comando lê o `package.json` e baixa todas as bibliotecas necessárias (como `pg` e `readline-sync`) para a pasta `node_modules`.
    ```bash
    npm install
    ```

2.  **Compilar o Código TypeScript**
    Este comando invoca o compilador do TypeScript (`tsc`), que lê o arquivo `ExercicioBancoDeDados.ts`, segue as regras do `tsconfig.json`, e gera o arquivo JavaScript correspondente dentro da pasta `/dist`.
    ```bash
    npx tsc
    ```

3.  **Executar o Programa**
    Agora, executamos o arquivo JavaScript que foi gerado no passo anterior.
    ```bash
    node dist/ExercicioBancoDeDados.js
    ```
<img width="1913" height="1017" alt="image" src="https://github.com/user-attachments/assets/3cdfb7a7-cec9-4bac-b12e-a5d4fd5b7b5b" />

Ao executar o último comando, o terminal irá fazer as perguntas. Após respondê-las, verifique no pgAdmin se os novos dados apareceram na sua tabela `pessoas`!

Quando acessar o banco de dados, será possível validar se houve a escrita ou não.

<img width="1903" height="1018" alt="image" src="https://github.com/user-attachments/assets/48e94be0-8ee9-46c2-acbc-e5a2a87911fb" />


Bons estudos!
=======
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
>>>>>>> 65b43d3980fa496e1a7c25126b1ef7a0de990aef
