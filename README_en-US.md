# Rusbé

![GitHub package.json version](https://img.shields.io/github/package-json/v/erick2280/rusbe-web-client)

Rusbé is a follow up platform of the University Restaurant of UFPE.

## Setup

### Configurando

Clone the repository for a directory of your preference.

The Rusbé requires the [Node.js](https://nodejs.org) v10 or later.

Install the Ionic:

    npm install -g ionic

Install the project dependencies:

    npm install

Create a file `environment.json` on `/src/app/` directory, with the follow information:

    {
        "virtusApiUrl": VIRTUS-API-URL 
        "firebaseConfig": {
            FIREBASE-CONFIG
        }
    }

- `VIRTUS-API-URL`: API URL from Virtus wich the Rusbé connects for. The UFPE API can be found on `https://virtus.ufpe.br/api/v1.0/cardapio/dia`, but only works with in browsers which CORS is disabled.
- `FIREBASE-CONFIG`: Firebase configuration object to use, available on the Firebase project configurations.

The project send data automatically for the Google Analytics account of @Erick2280. For disable this behavior, erase the lines related to Google Analytics on `/app/index.html`.

### Running on browser

Within the repository root folder, run:

    ionic serve

A page will open on default browser with the app.

### Preparing for production

Within the repository root folder, run:

    ionic build --prod --service-worker

The project prepared for production will be available in the `/www/` directory.

## Planned Resources

- Analytics
- Notifications
- This week on RU
- neighborRUd
- Rusbadges
- Rusbike
