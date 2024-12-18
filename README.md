### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

Verificar se o Node.js está instalado:

```
node -v
```

Verificar se o Git está instalado:

```
git -v
```

### 1. Clonar o repositório

Clone este repositório em sua máquina local usando o comando abaixo:

```
git clone https://github.com/luizsp7m/goledger-challenge-web
```

### 2. Navegue até o diretório do projeto

```
cd goledger-challenge-web
```

### 3. Instale as dependências

```
npm install
```

### 4. Configure as variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto e configure as variáveis de ambiente abaixo: <br />

```js
VITE_API_BASE_URL="http://ec2-54-91-215-149.compute-1.amazonaws.com"
VITE_USER=""
VITE_PASSWORD=""
```

### 5. Execute o projeto

Para iniciar o servidor de desenvolvimento, execute:

``` 
npm run dev
```

O projeto estará disponível no endereço <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>
