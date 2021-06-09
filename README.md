<h1 align="center">
    <img alt="GoFinances-logo" src="https://github.com/ecrozatti/GoFinances_NodeJS/blob/master/.github/logo.png" width="250px" />
</h1>

<p align="center">
  <a href="#page_with_curl-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#books-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-começando">Começando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<h1 align="center">
    <img alt="GoBarber" src="https://github.com/ecrozatti/GoFinances_NodeJS/blob/master/.github/GoFinances.gif" />
</h1>

## :page_with_curl: Sobre
![GitHub language count](https://img.shields.io/github/languages/count/ecrozatti/GoFinances_NodeJS)
![GitHub top language](https://img.shields.io/github/languages/top/ecrozatti/GoFinances_NodeJS)
![GitHub repo size](https://img.shields.io/github/repo-size/ecrozatti/GoFinances_NodeJS)
![GitHub](https://img.shields.io/github/license/ecrozatti/GoFinances_NodeJS)
![GitHub last commit](https://img.shields.io/github/last-commit/ecrozatti/GoFinances_NodeJS)

Este repositório contém uma API REST em Node.js com TypeScript, como back-end da aplicação GoFinances.

GoFinances é uma aplicação para gestão de transações financeiras, onde o usuário consegue informar todas suas entradas e saídas, assim como seu o saldo disponível.

Além da maneira convencional de gravar transação por transação, a API também disponibiliza uma opção para importação de arquivo CSV com os lançamentos do usuário.

## :computer: Iniciando front-end
Esse projeto foi desenvolvido no Bootcamp GoStack da Rocketseat com as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Cors](https://github.com/expressjs/cors)
- [CSV-parse](https://www.npmjs.com/package/csv-parse)
- [Date-fns](https://date-fns.org/)
- [Multer](https://github.com/expressjs/multer)

## :books: Requisitos
- Ter [**Git**](https://git-scm.com/) para clonar o projeto.
- Ter [**Node.js**](https://nodejs.org/en/) instalado.
- Ter [**Docker**](https://www.docker.com/) rodando um container PostgreSQL.

## :rocket: Começando
``` bash
  # Clonar o projeto:
  $ git clone https://github.com/ecrozatti/GoFinances_NodeJS.git

  # Entrar no diretório:
  $ cd GoFinances_NodeJS
  
  # Instalar as dependências:
  $ yarn install

  # Rodar as migrations:
  $ yarn typeorm migration:run

  # Rodar a aplicação:
  $ yarn dev:server
```

Made with 💚 by [Eric Crozatti Ferreira](https://www.linkedin.com/in/eric-crozatti-1447688a/)
