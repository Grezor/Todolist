const InputTache = document.getElementById("new-task");
const AjouterTache = document.querySelector("button");
// const incompleteTache = document.getElementById("incomplete-tasks");
// const completeTache = document.getElementById("completed-tasks");
const serverUrl = 'http://localhost:3000';
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
// Si on appuie sur la touche entrée dans l'input pour ajouter une tache
InputTache.addEventListener("keypress", addlistAfterKey);

render();

/**
 * Function pour ajouter une tache
 * @param {*} taskValue 
 */
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
    // envoie les donnees en json
    request.send(JSON.stringify({
        name: taskValue
    }));
}

/**
 * Function pour éditer une tache q
 * @param {*} event 
 */
function APIedit(event) {
    if (event.keyCode === 13) {
        const id = parseInt(event.target.parentNode.dataset.id)
        const request = new XMLHttpRequest();

        request.open('PUT', serverUrl + '/api/todolists/' + id, true);
        request.setRequestHeader("Content-Type", "application/json");
        console.log('edit')
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

/**
 * @param {*} event 
 */
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

/**
 * @param {*} data 
 */
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
            // on lui donne la classe finish
            li.className = 'ClassFinish'
            // creation du bouton delete
            const BtnDelete = document.createElement('INPUT')
            BtnDelete.setAttribute("type", "button");
            BtnDelete.setAttribute("value", "DELETE");
            BtnDelete.setAttribute('class', 'btn');
            BtnDelete.addEventListener('click', APIClickDeleteTasks)
            BtnDelete.className = 'buttonDeleteleft';
            li.appendChild(BtnDelete);
        } else {
            // sinon elle reste a faire
            container.appendChild(li);
        }

        // si c'est pas terminer je l'ajoute
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
/**
 * DELETE
 * @param {*} event 
 */
function APIClickDeleteTasks(event) {
    const id = parseInt(event.target.parentNode.dataset.id)
    var request = new XMLHttpRequest();

    request.open('DELETE', serverUrl + '/api/todolists/' + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    console.log('%c delete ', 'background: #222; color: #e74c3c; font-size:30px;');
    request.onload = function () {
        // si l'erreur est supérieur a 200 et inférieur a 400
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
            // statusError();
        }
    }
    request.send();
}


function addTasks() {
    var taskValue = document.getElementById("new-task").value;
    APIadd(taskValue);
}

function deleteTaskFinished() {
    var taskFinish = document.getElementById("done").done
}

/**
 * quand on click sur edit, ca rajoute un input de type block
 * 
 * @param {*} event 
 */
function listenerClicEdit(event) {
    const input = event.target.parentNode.querySelector('input[type="text"]');
    input.style.display = "block";
}


/**
 * Tache en cours
 */
// var taskIncomplete = function () {
//    
//     var listeItem = this.parentNode;
//     incompleteTache.appendChild(listeItem);
//     bindTaskEvents(listeItem, TerminerTache);
// }

// var bindTaskEvents = function (tasklisteItem, checkBoxEventHandler) {
//     console.log("bind list item events");

//     var checkBox = tasklisteItem.querySelector("input[type=checkbox]");
//     var ButtonEdit = tasklisteItem.querySelector("button.edit");
//     var ButtonSupprimer = tasklisteItem.querySelector("button.delete");

//     ButtonEdit.onclick = editerTache;
//     ButtonSupprimer.onclick = supprimerTache;
//     checkBox.onchange = checkBoxEventHandler;
// }

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