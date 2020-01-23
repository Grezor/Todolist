## la fondation HTTP : 

Les API REST sont basées sur le HTTP, ce qui signifie **Hypertext Transfer Protocol**. C'est ce qui est au coeur du web !  Plus précicement c'est un protocole qui définit la communication entre les différentes parties du web. 

- L'échange est basé sur des requêtes client et serveur. Exemple : Un client lance une requête HTTP, et le serveur renvoie une reponse. 

- Ce sont des méthodes qui définissent les requêtes que le client peut effectuer dont (GET, PUT, POST, DELETE), et encore plus. 

## les methodes : 

- GET : GET est la méthode la plus utilisée pour les requêtes HTTP
- POST : On utilise POST pour envoyer des données dans une requête et souvent pour l’ajouter à la ressource précisée dans la partie URI de la première ligne de la requête
- PUT : 
- DELETE : vous dites que vous voulez supprimer la ressource donnée dans l’URI

## Les codes : 

- 2xx indique le succès.
   - 200 : Votre requête a bien été comprise avec une bonne réponse du serveur. Pas de soucis ! 
- 3xx redirige le client ailleurs.
- 4xx indique une faute de la part du client.
    - 400 : La requête n’était pas correcte d’une manière ou d’une autre, souvent à cause des données mal structurées dans les corps des requêtes POST et PUT (des requêtes qui ont souvent des informations dans leurs corps).  
- 5xx indique une erreur de la part du serveur.   
