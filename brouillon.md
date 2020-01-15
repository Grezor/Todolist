```js
var tasks = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' }
];
/**
 * Call api
 */
// Récupère une seule tâche,
function getTasks () {
  // call api
  return tasks
}
function setTask (id, label) {
  tasks.push({
    id: id,
    label: label
  })
  return true
}
function updateTask (id) {
  // call api
  return true
}
function deleteTask (id) {
  // call api
  return true
}
/**
 * Front
 */
function render () {
  var tasks = getTasks()
  // doc.element.*****
}
function listenerOnClickAdd (e) {
  setTask({
    id: '',
    label: ***
  })
  render()
  // Call des fonctions API
}
function listenerOnDelete () {
  // Call des fonctions API
}
```
