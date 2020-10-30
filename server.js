const express = require('express')
const app = express()
/**
 * Todolist est un tableau d'objet :
 *   - id, name, done, created_at
 */
const todolists = [
  {
    id: 1,
    name: 'tache 1',
    done: true,
    created: Date(Date.now())
  },
  {
    id: 2,
    name: 'tache 2',
    done: false,
    created: Date(Date.now())
  },
  {
    id: 3,
    name: 'tache 3',
    done: true,
    created: Date(Date.now())
  },
  {
    id: 4,
    name: 'tache 4',
    done: false,
    created: Date(Date.now())
  },
  {
    id: 5,
    name: 'tache 5',
    done: false,
    created: Date(Date.now())
  },
  {
    id: 6,
    name: 'tache 6',
    done: true,
    created: Date(Date.now())
  }
]

app.use(express.static('./public'))
app.use(express.json())

/** GET */
// affiche toute les taches
app.get('/', (req, res) => {
  res.sendfile('public/index.html')
})

/* affiche toute les todolists */
app.get('/api/todolists', (req, res) => {
  res.send(todolists)
})

/*  affiche la todo avec l'id en paramètre  */
app.get('/api/todolists/:id', (req, res) => {
  const todolist = todolists.find(c => c.id === parseInt(req.params.id))
  if (!todolist) res.status(404).send('manque id')
  res.send(todolist)
})

/**
  post
 */
app.post('/api/todolists', (req, res) => {
  const {
    error
  } = validateTodolist(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const todolist = {
    id: todolists.length + 1,
    name: req.body.name,
    done: false,
    created: Date(Date.now())

  }

  todolists.push(todolist)
  console.log(todolists.length, 'valeur dans le tableau todoLists')
  console.log('=== ', todolists)
  res.send(todolist)
})

/**
* put
*/
app.put('/api/todolists/:id', (req, res) => {
  const todolist = todolists.find(c => c.id === parseInt(req.params.id))

  if (!todolist) {
    res.status(404).send('manque id')
    return
  }

  const {
    error
  } = validateTodolist(req.body)

  if (error) {
    // !req.body.name || req.body.name.length < 3
    res.status(400).send(error.details[0].message)
    return
  }
  // si il existe pas ou tu enleve todolist name
  todolist.name = req.body.name || todolist.name
  todolist.done = req.body.done
  console.log('id :  ' + req.params.id + 'update')
  res.send(todolist)
})

/**
 * API DELETE - Supprime une tache
 * @param {id}
*/
app.delete('/api/todolists/:id', (req, res) => {
  const todolist = todolists.find(c => c.id === parseInt(req.params.id))
  // si il na pas d'id, erreur 404
  if (!todolist) {
    res.status(404).send('manque id')
  }

  // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau
  const index = todolists.indexOf(todolist)
  // splite permet de diviser une chaine à partir d'un séparateurs
  todolists.splice(index, 1)
  // return la list du tableau
  console.log('id :  ' + req.params.id + ' ========== element supprimer ')
  res.send(todolist)
})

/**
 * Function qui vérifie la todo
 * la méthode HasOwnProperty retourne un booléen indiquant si l'objet possède la propriété spécifique
 * L'opérateur instanceof permet de tester si un objet possede, la propriété du constructeur
 * @param {*} todolist
 */
function validateTodolist (todolist) {
  // retourne un booleen indiquant si l'object possède une propriété 'name et done'
  // eslint-disable-next-line no-prototype-builtins
  const nameValid = !todolist.hasOwnProperty('name') || todolist.name instanceof String && todolist.name.length >= 3
  // eslint-disable-next-line no-prototype-builtins
  const doneValid = !todolist.hasOwnProperty('done') || todolist.done instanceof Boolean
  return nameValid && doneValid
}

/**
 * Connexion serveur
 */
const port = 3000
const hostname = 'localhost'
const server = app.listen(port, hostname, function () {
  console.log('Mon serveur fonctionne sur http://' + hostname + ':' + port + '\n')
})

module.exports = server


