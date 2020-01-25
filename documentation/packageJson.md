##  Fichier package.json

## documentation :
[documentation Package.json](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/)


```Javascript
{
  // nom donné a npm
  "name": "todolists",
  // version actuelle
  "version": "1.0.0",
  "description": "",
  // fichier de démarrage
  "main": "server.js",
  // les commandes pour lancer le serveur
  "scripts": {
    "test": "echo \"Test\" ",
    "start": "nodemon server.js"
  },
  // projet sur github
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Grezor/TodoLists.git"
  },
  "author": "Grezor",
  "license": "ISC",
  // le liens des bugs
  "bugs": {
    "url": "https://github.com/Grezor/TodoLists/issues"
  },
  "homepage": "https://github.com/Grezor/TodoLists#readme",
  // propriété d'un module de ma todolist
  "dependencies": {
    "express": "^4.17.1",
    "markdown": "^0.5.0",
    "socket.io": "^2.3.0",
    "supervisor": "^0.12.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}

```

