<div id="top" align="center">

# Social Network Backend

</div>

<p align="center">
 <a href="#sobre">About</a> •
 <a href="#time">Team</a> •
 <a href="#pre-requisitos">Pre Requirements</a> •
 <a href="#bibliotecas">Libraries</a> •
 <a href="#tecnologiasstack">Technologies/Stacks</a> •
 <a href="#variaveis-de-ambiente">Environment Variables</a> •
 <a href="#como-executar">Execution</a> •
 <a href="#features">Features</a> •
 <a href="#rotas">Router</a> •
</p>

---

## Sobre

Social Network

---

## Time

- Developer(s): <a href="https://www.linkedin.com/in/mateus-dos-santos/">Mateus dos Santos Loiola</a>

<p align="right">(<a href="#top">Go to the top</a>)</p>

## Pre Requisitos

Antes de continuar, certifique-se que você atende aos seguintes requisitos:

- `IDE` instalada para execução e desenvolvimento do projeto
- `Node.js` instalado

<p align="right">(<a href="#top">Go to the top</a>)</p>

## Libraries

Bibliotecas utilizadas e as respectivas versões.

- "bcryptjs": "^2.4.3",
- "dotenv": "^16.0.1",
- "express": "^4.18.1",
- "jsonwebtoken": "^8.5.1",
- "mongoose": "^6.4.4",
- "mongoose-paginate-ts": "^1.2.6"

<p align="right">(<a href="#top">Go to the top</a>)</p>

## Tecnologias/Stack

Tecnologias utilizadas.

- Node.js
- Express
- MongoDB

<p align="right">(<a href="#top">Go to the top</a>)</p>

## Variáveis de Ambiente

- `NODE_ENV`: Variável de produção ou desenvolvimento
- `DB_PRODUCTION`: Url do banco de dados do mongoose utilizada para conexão com o banco de dados
- `JWT_SECRET`: Chave de decodificação de senha

<p align="right">(<a href="#top">Go to the top</a>)</p>

## Instalação e Execução

- Instalar bibliotecas:
  Execute `npm run install` ou `yarn` no terminal para instalar as bibliotecas

- Executar a aplicação:
  - `yarn dev` ou `npm run dev` - Para executar aplicação em desenvolvimento
  - `yarn tsc` ou `npm run tsc` - Fazer a build da aplicação
  - `yarn start` ou `npm run start`- Para executar aplicação em produção

<p align="right">(<a href="#top">Go to the top</a>)</p>

## Features

- Authenticate
  - [x] 1.1 Middleware de autenticação
  - [x] 1.2 Login do usuário com email e password
- Usuário
  - [x] 1.1 Cadastrar usuário com email e password
  - [x] 1.2 Listar usuários
  - [x] 1.3 Listar usuário pelo ID
  - [x] 1.4 Seguir um usuário
  - [x] 1.5 Parar de seguir usuário
  - [x] 1.6 Atualizar informaç~eos do usuário
- Post
  - [x] 1.1 Criar post
  - [x] 1.2 Listar posts
  - [x] 1.3 Listar post pelo ID
  - [x] 1.4 Deletar post
  - [x] 1.5 Adicionar comentário em um post
  - [x] 1.5 Deletar comentário de um post
  - [x] 1.6 Listar comentários de um post
  - [x] 1.4 Curtir um post
  - [x] 1.4 Deixar de curtir um post

<p align="right">(<a href="#top">Go to the top</a>)</p>

---

## Rotas

- Usuário

  - `/users/:id`
  - `user/authentication`
  - `/users/register`
  - `/users`
  - `/user/follow/:currentUserId/following/:userId`
    - Exemplificando: `/user/follow/${IdUserAdmin}/:${normalUser}

- Post

  - `/post/register/:userId`
  - `/post/:postId`
  - `/posts`

- Comentário
  - `/comments`
  - `/comment/register/:userId/:postId`

---

## Padrões de Código

### Padrão 1

- Indentação: utilizar dois (2) espaços
- Convenção de Nomes: PascalCase
- Clean Architecture

<p align="right">(<a href="#top">Go to the top</a>)</p>
