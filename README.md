# Rusbé

![GitHub package.json version](https://img.shields.io/github/package-json/v/erick2280/rusbe-web-client)

O Rusbé é uma plataforma para acompanhamento do Restaurante Universitário da Universidade Federal de Pernambuco.

## Setup

### Configurando

Clone o repositório para um diretório da sua preferência.

O Rusbé requer o [Node.js](https://nodejs.org) v10 ou posterior.

Instale o Ionic:

    npm install -g ionic

Instale as dependências do projeto:

    npm install

Crie um arquivo `environment.json` no diretório `/src/app/`, com as seguintes informações:

    {
        "virtusApiUrl": VIRTUS-API-URL 
        "firebaseConfig": {
            FIREBASE-CONFIG
        }
    }

- `VIRTUS-API-URL`: URL da API do Virtus pela qual o Rusbé irá se conectar. A API da UFPE pode ser encontrada em `https://virtus.ufpe.br/api/v1.0/cardapio/dia`, mas esta não funciona a não ser que o CORS esteja desabilitado no navegador.
- `FIREBASE-CONFIG`: Objeto de configuração do Firebase a ser utilizado, disponível nas configurações do projeto do Firebase. 

### Executando no navegador

Dentro da pasta raiz do repositório, execute:

    ionic serve

Uma página abrirá no navegador padrão com o app.

### Preparando para produção

Dentro da pasta raiz do repositório, execute:

    ionic build --prod --service-worker

O projeto preparado para produção estará disponível no diretório `/www/`.

## Recursos planejados

- Analytics
- Notificações
- Esta semana no RU
- neighborRUd
- Rusbadges
- Rusbike
