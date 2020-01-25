## Serveur nodeJS
- Démarrage du serveur via la commande **npm start** 
```javascript
/**==================================================
 * >>>>>> CONNEXION AU SERVEUR 
==================================================*/
const port = 1472;
hostname = 'localhost';

app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port + "\n");
})
```
## liens de documentation  :
- [documentation officiel express](https://expressjs.com/fr/)
- [documentation express MDN](https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs)

## Exemples : 
- [Exemple hello world](https://expressjs.com/fr/starter/hello-world.html)

## installation :
- [Librairie NPM gestionnaire de paquets officiel de Node.js ](https://www.npmjs.com/package/express)
