var InputTache = document.getElementById("new-task");
var AjouterTache = document.querySelector("button");
var incompleteTache = document.getElementById("incomplete-tasks");
var completeTache = document.getElementById("completed-tasks");
var serverUrl = 'http://localhost:1472';

// container a faire
const app = document.getElementById('todo')
const container = document.createElement('ul')
container.setAttribute('id', 'incomplete-tasks')
app.appendChild(container);
// container Terminer
const appdone = document.getElementById('done')
const containerDone = document.createElement('ul')
containerDone.setAttribute('id', 'complete-tasks')
appdone.appendChild(containerDone)

// evenement
AjouterTache.addEventListener("click", addTasks);
InputTache.addEventListener("keypress", addlistAfterKey);

render();

function APIdelete() {
    var request = new XMLHttpRequest();
    request.open('DELETE', serverUrl + '/api/todolists/', true);
    request.setRequestHeader("Content-Type", "application/json");

    const todolist = todolists.find(c => c.id === parseInt(request.params.id));
    const index = todolists.indexOf(todolist);

    todolists.splice(index, 1);

    console.log("id :  " + request.params.id + " ========== element supprimer ");

    request.send(todolist)
}
/**
 * Call fonction post 
 * > tache terminer
 */
function APIPostCompleted() {
    const id = parseInt(event.target.parentNode.dataset.id)
    const request = new XMLHttpRequest();

    request.open('POST', serverUrl + '/api/todolists/' + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            render();
        }
    }
    // request.send(JSON.stringify({ name: event.target.value }));
}

function APIadd(taskValue) {
    var request = new XMLHttpRequest();

    request.open('POST', serverUrl + '/api/todolists/', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        // si le status de la requetes = 200, cela affiche le chargement de la todolist
        if (request.status >= 200 && request.status < 400) {
            render();
        }
    };

    request.send(JSON.stringify({
        name: taskValue
    }));
}

function APIedit(event) {
    if (event.keyCode === 13) {
        const id = parseInt(event.target.parentNode.dataset.id)
        const request = new XMLHttpRequest();

        request.open('PUT', serverUrl + '/api/todolists/' + id, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                render();
            }
        }

        request.send(JSON.stringify({
            name: event.target.value
        }));
    }
}

function APIDoneTask(event) {

    const id = parseInt(event.target.parentNode.dataset.id)
    const request = new XMLHttpRequest();

    request.open('PUT', serverUrl + '/api/todolists/' + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            render();
        }
    }

    request.send(JSON.stringify({
        done: true
    }));

}

function refreshTodoList(data) {

    container.innerHTML = '';
    containerDone.innerHTML = '';

    data.forEach(afaire => {
        // creation du li
        const li = document.createElement('li');
        li.dataset.id = afaire.id
        //creation du label
        const label = document.createElement("LABEL");
        label.textContent = afaire.name
        label.setAttribute('class', 'classLabel');
        label.className = 'labelColor'
        // creation input
        const inputText = document.createElement('INPUT')
        inputText.setAttribute("type", "text");
        inputText.setAttribute('value', afaire.name);
        inputText.setAttribute('class', 'label');
        // touche entree du clavier
        inputText.addEventListener('keyup', APIedit);
        // vide l'input, après le entrer
        InputTache.value = "";

        // si la tache a faire et fini
        if (afaire.done) {
            // la tache est en terminer
            containerDone.appendChild(li);
            li.className = 'ClassFinish'
        } else {
            // sinon elle reste a faire
            container.appendChild(li);
        }

        // si c'est pas terminer j'ajoute
        if (!afaire.done) {

            const input = document.createElement('INPUT')
            input.setAttribute("type", "checkbox")
            input.setAttribute('class', 'checkbox')
            input.className = 'checkbox'
            input.addEventListener("change", APIDoneTask)

            li.appendChild(input);

        }

        li.appendChild(label);
        li.appendChild(inputText);

        // si on check la tache en done 
        // ca cache le bouton edit et delete
        if (!afaire.done) {
            // bouton edit
            const BtnEdit = document.createElement('INPUT')
            BtnEdit.setAttribute("type", "button");
            BtnEdit.setAttribute("value", "EDIT");
            BtnEdit.setAttribute("id", "edit");
            BtnEdit.addEventListener('click', listenerClicEdit)
            BtnEdit.className = 'buttonEdit'
            // bouton delete
            const BtnDelete = document.createElement('INPUT')
            BtnDelete.setAttribute("type", "button");
            BtnDelete.setAttribute("value", "DELETE");
            BtnDelete.addEventListener('click', APIClickDeleteTasks)
            BtnDelete.className = 'buttonDelete';

       

            li.appendChild(BtnEdit);
            li.appendChild(BtnDelete);
        }
    });



}

function APIClickDeleteTasks(event) {
    const id = parseInt(event.target.parentNode.dataset.id)
    var request = new XMLHttpRequest();
    request.open('DELETE', serverUrl + '/api/todolists/' + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            render();
        }
    }
    request.send()
}

/**
 * Afficher au chargement de la page
 */
function render() {
    const request = new XMLHttpRequest();
    request.open('GET', serverUrl + '/api/todolists', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(this.response);
            refreshTodoList(data);
        } else {
            statusError();
        }
    }
    request.send();
}


function addTasks() {
    var taskValue = document.getElementById("new-task").value;
    APIadd(taskValue);
    console.log('%c Ajout ', 'background: #222; color: #bada55; font-size:30px;');
    // console.log(obj);
    // console.log(jsonObjet);
}


function listenerClicEdit(event) {
    const input = event.target.parentNode.querySelector('input[type="text"]');
    input.style.display = "block";
}


/**
 * Tache en cours
 */
var taskIncomplete = function () {
    console.log("===================== Tache INCOMPLETE ===================== ");
    var listeItem = this.parentNode;
    incompleteTache.appendChild(listeItem);
    bindTaskEvents(listeItem, TerminerTache);
}

var bindTaskEvents = function (tasklisteItem, checkBoxEventHandler) {
    console.log("bind list item events");

    var checkBox = tasklisteItem.querySelector("input[type=checkbox]");
    var ButtonEdit = tasklisteItem.querySelector("button.edit");
    var ButtonSupprimer = tasklisteItem.querySelector("button.delete");

    ButtonEdit.onclick = editerTache;
    ButtonSupprimer.onclick = supprimerTache;
    checkBox.onchange = checkBoxEventHandler;
}

function validateTodolist(todolist) {
    const schema = {
        // il faut que le name, a minimum 3 caractère
        name: Joi.string().min(3).required()
    }
    return Joi.validate(todolist, schema);
}


var sendDate = function () {
    var Inputext = document.getElementById('new-task');
    todolist.push(Inputext);
    var pval = "";
    for (i = 0; i < todolist.length; i++) {
        pval = pval + todolist[i];
    }

    document.getElementById('incomplete-tasks').innerHTML = pval;
    console.log(todolist);
}

/**======================= Function de fonctionnalité ========================*/


// Si on appuie sur entrer dans l'input
function addlistAfterKey(event) {
    if (inputlength() > 0 && event.which === 13) {
        addTasks();

    }
}

function inputlength() {
    return InputTache.value.length;
}

function addToucheEnter() {
    if (inputlength() > 0) {
        createListElement();
    }
}




//   //Cycle over CompleteTassHolder ul list items
//   for(var i = 0; i < completedTasksHolder.todolists.length; i++){
//     bindTaskEvents(completedTasksHolder.todolists[i], tasksIncomplete)
//   }

// function finishTasks(){
//     var request = new XMLHttpRequest();
//     const todolist = todolists.find( c => c.id === parseInt(req.params.id));
//     // si il na pas d'id, erreur 404
//     if(!todolist){
//         res.status(404).send('manque id');
//     } 
//     // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau
//     const index = todolists.indexOf(todolist);
//     // splite permet de diviser une chaine à partir d'un séparateurs
//     todolists.splice(index, 1);
//     // return la list du tableau
//     console.log("id :  " +  req.params.id + " ========== element supprimer ");
//     res.send(todolist)
// }