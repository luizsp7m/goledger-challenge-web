<<<<<<< HEAD
# GoLedger Challenge

In this challenge you will create a web interface to a blockchain application. In this application you must implement a streming service-like interface, with artist, album, song and playlist registration.

# Requirements

- Your application should be able to add/remove/edit and show all artists, albums, songs and playlists;
- Use **React** or **Next.js** (all UI libraries are allowed);

## Instructions

- Fork the repository [https://github.com/goledgerdev/goledger-challenge-web](https://github.com/goledgerdev/goledger-challenge-web)
    - Fork it, do **NOT** clone it, since you will need to send us your forked repository
    - If you **cannot** fork it, create a private repository and give access to `samuelvenzi` and `jefo3`.
- Create an web application using React. You will implement the basic operations provided by the API, which are `Create`, `Update`, `Delete` and `Search`.
- Improve your application with a beautiful UI.

## Server

The data are obtained using a rest server at this address: `http://ec2-54-91-215-149.compute-1.amazonaws.com`

Also, a Swagger with the endpoints specifications for the operations is provided at this address: `http://ec2-54-91-215-149.compute-1.amazonaws.com/api-docs/index.html`.

Note: The API is protected with Basic Auth. The credentials were sent to you by email.

Tip: execute each operation in the Swagger for information on payload format and endpoint addresses. See examples below.

### Get Schema
Execute a `getSchema` operation to get information on which asset types are available. Don't forget to authenticate with the credentials provided.

```bash
curl -X GET "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/getSchema" -H "accept: */*"
```

Execute a getSchema with a payload to get more details on a particula asset.

```bash
curl -X POST "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/getSchema" -H "accept: */*" -H "Content-Type: application/json" -d "{\"assetType\":\"artist\"}"
```
Tip: the same can be done with transactions, using the `getTx` endpoint.

### Search
Perform a search query on a particular asset type.
```bash
curl -X POST "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search" -H "accept: */*" -H "Content-Type: application/json" -d "{\"query\":{\"selector\":{\"@assetType\":\"artist\"}}}"
```
Tip: to read a specific asset, you can use the `readAsset` endpoint.

## Complete the challenge

To complete the challenge, you must send us the link to your forked repository with the code of your application. Please, provide instructions to execute the code.
=======
### GoLedger Challenge Web

#### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

Verificar se o Node.js está instalado:
`node -v`

Verificar se o Git está instalado:
`git -v`

#### 1. Clonar o repositório

Clone este repositório em sua máquina local usando o comando abaixo:
`git clone https://github.com/luizsp7m/goledger-challenge-web`

#### 2. Navegue até o diretório do projeto

`cd goledger-challenge-web`

#### 3. Instale as dependências

`npm install`

#### 4. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e configure as variáveis de ambiente necessárias. Consulte o arquivo `.env.example` para ver as variáveis disponíveis e preencha conforme necessário

#### 5. Execute o projeto

Para iniciar o servidor de desenvolvimento, execute:

`npm run dev`

O projeto estará disponível no endereço http://localhost:5174/

#### Projeto Online

Ou se preferir, você pode visualizar este projeto em funcionamento diretamente na Vercel. Acesse o link abaixo para conferir:
➡️ **[Acesse o projeto aqui](https://luizoliveira.vercel.app/)**
>>>>>>> development
