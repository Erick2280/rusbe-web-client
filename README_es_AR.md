# Rusbé

![GitHub package.json version](https://img.shields.io/github/package-json/v/erick2280/rusbe-web-client)

El Rusbé es una plataforma para acompañar al Restaurante Universitario de la Universidad Federal de Pernambuco.

### Configuración

Primero hay que clonar el repositorio en un directorio de su elección.

El Rusbé necesita el [Node.js](https://nodejs.org) v10 o una versión más nueva.

Instales el Ionic:

    npm install -g ionic

Después instales las dependencias del proyecto:

    npm install

Por fin cries un archivo `environment.json` en el directorio `/src/app/`, con estas informaciones:

    {
        "virtusApiUrl": VIRTUS-API-URL 
        "firebaseConfig": {
            FIREBASE-CONFIG
        }
    }

- `VIRTUS-API-URL`: URL de la API del Virtus por donde el Rusbé va a conectarse. La API de la UFPE API puede ser encontrada en `https://virtus.ufpe.br/api/v1.0/cardapio/dia`, sin embargo, esta solo funciona en navegadores donde el CORS está deshabilitado.
- `FIREBASE-CONFIG`: objecto de configuración Firebase para usar, disponible en las configuraciones del proyecto Firebase.

El proyecto envia datos automáticamente para la cuenta de @Erick2280 en Google Analytics. Para deshabilitar este comportamiento, hay que borrar las lineas relacionadas con Google Analytics en `/app/index.html`.

### Ejecutando en navegador

Dentro del archivo raiz del repositorio, ejecute:

    ionic serve

Una página se abrirá en el navegador predeterminado con la aplicación.

### Aprontando para produción

Dentro del archivo raiz del repositorio, ejecute:

    ionic build --prod --service-worker

El proyecto pronto para produción estará disponible en el directorio `/www/`.

## Recursos planeados

- Análisis
- Notificaciones
- Esta semana en RU
- neighborRUd
- Rusbadges
- Rusbike
