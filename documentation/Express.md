# Routes : 
## methode Get : 
- affiche **id** de la taches
```javascript
app.get('/api/todolists/:id', (req, res) => {
  const todolist = todolists.find(c => c.id === parseInt(req.params.id));
  if (!todolist) res.status(404).send('manque id');
  res.send(todolist);
});
```


- affiche toute les taches a faire, ainsi que les taches terminé
![carbon (1)](https://user-images.githubusercontent.com/38507456/73122567-d6cabd80-3f86-11ea-8b40-18b3b96fa199.png)

## methode POST : 
- l'envoie d'une tache a faire
![carbon (2)](https://user-images.githubusercontent.com/38507456/73122573-e21de900-3f86-11ea-9a45-ba904c84aa04.png)
## Methode PUT: 
- Cette methode permet de modifier la tache
![carbon (3)](https://user-images.githubusercontent.com/38507456/73122575-eba75100-3f86-11ea-917e-b98c553c75c5.png)

## Methode DELETE : 
- supprime une taches que l'on souhaite
![carbon (4)](https://user-images.githubusercontent.com/38507456/73122581-f9f56d00-3f86-11ea-8062-49fb48805401.png)

