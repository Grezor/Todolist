/*  header-comment
/*  file   : api
/*  author : Geoffrey
/*  date   : 2020-1-5 11:13:24
/*  last   : 2020-1-5 14:6:9
*/

var InputTache = document.getElementById("new-task");
var AjouterTache = document.querySelector("button");
var incompleteTache = document.getElementById("incomplete-tasks");
var completeTache = document.getElementById("completed-tasks");


// export {ajout} from 'functions.js';
/**
 * Afficher une tache
 */
function getTasks(){

}
/**
 * Afficher les taches
 */
function setTasks(){
    
}
/**
 * Ajouter une tache
 */
function addTasks(){
    console.log("===================== Ajout ===================== ");
	var taskValue = document.getElementById("new-task").value;
	ajout(taskValue);
	console.log("===================== / Ajout ===================== ");
	
	// console.log(obj);
    // console.log(jsonObjet);
}
AjouterTache.addEventListener("click", addTasks);



/**
 * Editer une tache tache
 */
function editTasks(){
    
    
}
/**
 * Supprimer une tache
 */
function deleteTasks(){
    var request = new XMLHttpRequest();
    request.open('DELETE' , serverUrl + '/api/todolist/:id');
}
/**
 * Update une  tache
 */
function updateTasks(){
    
}


function finishTasks(){
    var request = new XMLHttpRequest();
    const todolist = todolists.find( c => c.id === parseInt(req.params.id));
  
    // si il na pas d'id, erreur 404
    if(!todolist){
      res.status(404).send('manque id');
    } 
  
    //delete
    
    // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau
    const index = todolists.indexOf(todolist);
    // splite permet de diviser une chaine à partir d'un séparateurs
    todolists.splice(index, 1);
    // return la list du tableau
    console.log("id :  " +  req.params.id + " ========== element supprimer ");
    res.send(todolist)
}










function ajout(taskValue) {
    var request = new XMLHttpRequest();
    // requete serveur methode post
    request.open('POST', serverUrl + '/api/todolists/', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
        if (request.status >= 200 && request.status < 400)  {
            render();
        }
    };

    // si la requete a le status 200 tu affiche
    request.send(JSON.stringify({ name: taskValue }));
}