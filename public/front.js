/*  header-comment
/*  file   : front
/*  author : Grezor
/*  date   : 2020-1-5 11:16:21
/*  last   : 2020-1-5 13:58:34
*/
const app = document.getElementById('root')

const container = document.createElement('ul')
container.setAttribute('id', 'incomplete-tasks')
app.appendChild(container);

var serverUrl = 'http://localhost:1472';
// var request = new XMLHttpRequest();
render();


/**
 * Afficher au chargement de la page
 */
function render(){
    var request = new XMLHttpRequest();
    request.open('GET', serverUrl + '/api/todolists', true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 400)  {
            var data = JSON.parse(this.response);
            refreshTodoList(data);
        }else{
            statusError();
        }
    }
    request.send();
}
/**
 * 
 */
function listenerClicAdd(){
    
}
/**
 * 
 */
function listenerClicEdit(event){
    const input = event.target.parentNode.querySelector('input[type="text"]');
    input.style.display = "block";
}

function listenerClicEditSubmit(event) {
    if (event.keyCode === 13) {
        const id = parseInt(event.target.parentNode.dataset.id)
        var request = new XMLHttpRequest();

        // requete serveur methode post
        request.open('PUT', serverUrl + '/api/todolists/' + id, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function(){
            if (request.status >= 200 && request.status < 400)  {
                render();
            }
        }

        request.send(JSON.stringify({name: event.target.value}));
    }
}
/**
 * 
 */
function listenerClicDelete(event) {
    const id = parseInt(event.target.parentNode.dataset.id)
    var request = new XMLHttpRequest();

    // requete serveur methode post
    request.open('DELETE', serverUrl + '/api/todolists/' + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
        if (request.status >= 200 && request.status < 400)  {
            render();
        }
    }

    request.send()
}
/**
 * 
 */
function listenerClicUpdate(){
    
}
































function refreshTodoList(data) {
    container.innerHTML = '';

    data.forEach(afaire => {
        const li = document.createElement('li');
        li.setAttribute('class', 'afaire')
        li.dataset.id = afaire.id

        const input = document.createElement('INPUT')
        input.setAttribute("type", "checkbox");

        const label = document.createElement("LABEL");
        label.textContent = afaire.name
        label.setAttribute('class', 'label');

        const inputText = document.createElement('INPUT')
        inputText.setAttribute("type", "text");
        inputText.setAttribute('value', afaire.name);
        inputText.setAttribute('class', 'label');
        inputText.addEventListener('keyup', listenerClicEditSubmit);


        const BtnEdit = document.createElement('INPUT')
        BtnEdit.setAttribute("type", "button");
        BtnEdit.setAttribute("class", "edit");
        BtnEdit.setAttribute("value", "EDIT");
        BtnEdit.setAttribute("id", "edit");
        BtnEdit.addEventListener('click', listenerClicEdit)

        const BtnDelete = document.createElement('INPUT')
        BtnDelete.setAttribute("type", "button");
        BtnDelete.setAttribute("class", "delete");
        BtnDelete.setAttribute("value", "DELETE");
        BtnDelete.addEventListener('click', listenerClicDelete)


        container.appendChild(li);
        li.appendChild(input);
        li.appendChild(label);
        li.appendChild(inputText);
        li.appendChild(BtnEdit);
        li.appendChild(BtnDelete);
    });
}

function statusError() {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `ERREUR !`;
    app.appendChild(errorMessage);
}