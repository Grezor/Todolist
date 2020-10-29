<!-- # Routes 

```js
const express = require('express')
const app = express()
```
## methode GET  
- affiche tout les taches a faire
```javascript 
// affiche toute les taches
  app.get('/', (req, res) => {
    res.sendfile('public/index.html');
  });
```

- affiche **id** de la taches
```javascript
app.get('/api/todolists/:id', (req, res) => {
  const todolist = todolists.find(c => c.id === parseInt(req.params.id));
  if (!todolist) res.status(404).send('manque id');
  res.send(todolist);
});
```


## methode POST : 
- ajout d'une taches a faire
```javascript 
  app.post('/api/todolists', (req, res) => {
  const {
    error
  } = validateTodolist(req.body);

  if (error) {
    res.status(400).send(error.details[0].message)
    return;
  }

  const todolist = {
    id: todolists.length + 1,
    name: req.body.name,
    done: false,
    created: Date(Date.now())
  };

  todolists.push(todolist)
  console.log(todolists.length, 'valeur dans le tableau todoLists')
  console.log('=== ', todolists)
  res.send(todolist)
});
```

## Methode PUT: 
- Cette methode permet de editer la tache
```javascript 
app.put('/api/todolists/:id', (req, res) => {
  const todolist = todolists.find(c => c.id === parseInt(req.params.id));

  if (!todolist) {
    res.status(404).send('manque id');
    return;
  }

  const {
    error
  } = validateTodolist(req.body);

  if (error) {
    res.status(400).send(error.details[0].message)
    return;
  }

  todolist.name = req.body.name || todolist.name;
  todolist.done = req.body.done;
  console.log("id :  " + req.params.id + " mis a jour ")
  res.send(todolist)
});
``` 

## Methode DELETE : 
- supprime une taches que l'on souhaite
```javascript
app.delete('/api/todolists/:id', (req, res) => {

  const todolist = todolists.find(c => c.id === parseInt(req.params.id));
  // si il na pas d'id, erreur 404
  if (!todolist) {
    res.status(404).send('manque id');
  }
  // La méthode indexOf() renvoie le premier indice 
  // pour lequel on trouve un élément donné dans un tableau
  const index = todolists.indexOf(todolist);
  // splite permet de diviser une chaine à partir d'un séparateurs
  todolists.splice(index, 1);
  // return la list du tableau
  console.log("id :  " + req.params.id + " ========== element supprimer ");
  res.send(todolist)
});
```
 -->
