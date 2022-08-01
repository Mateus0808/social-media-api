<div id="top" align="center">

# Social Media

</div>

<p align="center">
 <a href="#sobre">Sobre</a> •
 <a href="#time">Time</a> •
 <a href="#pre-requisitos">Pré Requisitos</a> •
 <a href="#bibliotecas">Bibliotecas</a> •
 <a href="#tecnologiasstack">Tecnologias/Stack</a> •
 <a href="#variaveis-de-ambiente">Variaveis de Ambiente</a> •
 <a href="#como-executar">Como Executar</a> •
 <a href="#features">Features</a> •
 <a href="#rotas">Rotas</a> •
 <a href="#padrões-de-código">Padrões de Código</a>
</p>


------------

## Sobre

Mini rede social

------------

## Time

- Desenvolvedores(as): <a href="https://www.linkedin.com/in/mateus-dos-santos/">Mateus dos Santos Loiola</a>

<p align="right">(<a href="#top">ir para o topo</a>)</p>

## Pre Requisitos

Antes de continuar, certifique-se que você atende aos seguintes requisitos:

- `IDE` instalada para execução e desenvolvimento do projeto
- `Node.js` instalado

<p align="right">(<a href="#top">ir para o topo</a>)</p>

## Bibliotecas

Bibliotecas utilizadas e as respectivas versões.
  *  "bcryptjs": "^2.4.3",
  *  "dotenv": "^16.0.1",
  *  "express": "^4.18.1",
  *  "jsonwebtoken": "^8.5.1",
  *  "mongoose": "^6.4.4",
  *  "mongoose-paginate-ts": "^1.2.6"

<p align="right">(<a href="#top">ir para o topo</a>)</p>

## Tecnologias/Stack

Tecnologias utilizadas.

- Node.js
- Express
- MongoDB

<p align="right">(<a href="#top">ir para o topo</a>)</p>

## Variáveis de Ambiente

- `NODE_ENV`: Variável de produção ou desenvolvimento
- `DB_PRODUCTION`: Url do banco de dados do mongoose utilizada para conexão com o banco de dados
- `JWT_SECRET`: Chave de decodificação de senha

<p align="right">(<a href="#top">ir para o topo</a>)</p>

## Instalação e Execução

* Instalar bibliotecas:
  Execute `npm run install` ou `yarn` no terminal para instalar as bibliotecas

* Executar a aplicação:
  - `yarn dev` ou `npm run dev` - Para executar aplicação em desenvolvimento
  - `yarn tsc` ou `npm run tsc` - Fazer a build da aplicação
  - `yarn start` ou `npm run start`- Para executar aplicação em produção

<p align="right">(<a href="#top">ir para o topo</a>)</p>

## Features

- Authenticate
    - [X] 1.1 Middleware de autenticação
    - [X] 1.2 Login do usuário com email e password
- Usuário
    - [X] 1.1 Cadastrar usuário com email e password
    - [X] 1.2 Listar usuários
    - [X] 1.3 Listar usuário pelo ID
    - [X] 1.4 Seguir um usuário
    - [X] 1.5 Parar de seguir usuário
    - [X] 1.6 Atualizar informaç~eos do usuário
- Post
    - [X] 1.1 Criar post
    - [X] 1.2 Listar posts
    - [X] 1.3 Listar post pelo ID
    - [X] 1.4 Deletar post
    - [X] 1.5 Adicionar comentário em um post
    - [X] 1.5 Deletar comentário de um post
    - [X] 1.6 Listar comentários de um post
    - [X] 1.4 Curtir um post
    - [X] 1.4 Deixar de curtir um post


<p align="right">(<a href="#top">ir para o topo</a>)</p>

----------------------------------------------------------------
## Rotas

* Usuário
    - `/users/:id`
    - `user/authentication`
    - `/users/register`
    - `/users`
    - `/user/follow/:currentUserId/following/:userId`
      * Exemplificando: `/user/follow/${IdUserAdmin}/:${normalUser}

* Post
    - `/post/register/:userId`
    - `/post/:postId`
    - `/posts`

* Comentário
    - `/comments`
    - `/comment/register/:userId/:postId`

----------------------------------------------------------------

## Padrões de Código

### Padrão 1
  * Indentação: utilizar dois (2) espaços
  * Convenção de Nomes: PascalCase
  * Clean Architecture

<p align="right">(<a href="#top">ir para o topo</a>)</p>

