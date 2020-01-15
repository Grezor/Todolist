const app = document.getElementById('root')

const container = document.createElement('ul')
container.setAttribute('id', 'incomplete-tasks')
app.appendChild(container);

const serverUrl = 'http://localhost:1472';
// var request = new XMLHttpRequest();
render();


/**
 * Afficher au chargement de la page
 */
function render(){
    const request = new XMLHttpRequest();
    request.open('GET', serverUrl + '/api/todolists', true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 400)  {
            const data = JSON.parse(this.response);
            refreshTodoList(data);
        }else{
            statusError();
        }
    }
    request.send();
}

function listenerClicEdit(event){
    const input = event.target.parentNode.querySelector('input[type="text"]');
    input.style.display = "block";
}

function listenerClicEditSubmit(event) {
    if (event.keyCode === 13) {
        const id = parseInt(event.target.parentNode.dataset.id)
        const request = new XMLHttpRequest();

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

function refreshTodoList(data) {
    container.innerHTML = '';

    data.forEach(afaire => {
        // creation du li
        const li = document.createElement('li');
        li.setAttribute('class', 'afaire')
        li.dataset.id = afaire.id

        const input = document.createElement('INPUT')
        input.setAttribute("type", "checkbox");
        input.setAttribute('class', 'checkbox');
        input.className = 'checkbox'

        const label = document.createElement("LABEL");
        label.textContent = afaire.name
        label.setAttribute('class', 'classLabel');
        // class css
        label.className = 'labelColor'

        // Champs input 
        const inputText = document.createElement('INPUT')
        inputText.setAttribute("type", "text");
        inputText.setAttribute('value', afaire.name);
        inputText.setAttribute('class', 'label');
        // touche entree du clavier
        inputText.addEventListener('keyup', listenerClicEditSubmit);

        const BtnEdit = document.createElement('INPUT')
        BtnEdit.setAttribute("type", "button");
        BtnEdit.setAttribute("value", "EDIT");
        BtnEdit.setAttribute("id", "edit");
        // touche entree du clavier
        BtnEdit.addEventListener('click', listenerClicEdit)
        // class css
        BtnEdit.className = 'buttonEdit'

        const BtnDelete = document.createElement('INPUT')
        BtnDelete.setAttribute("type", "button");
        BtnDelete.setAttribute("value", "DELETE");
        BtnDelete.addEventListener('click', listenerClicDelete)
        // class css
        BtnDelete.className = 'buttonDelete';

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




var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    
    
    var todolists=this.parentNode;
    
    var editInput=todolists.querySelector('input[type=text]');
    var label=todolists.querySelector("label");
    var containsClass=todolists.classList.contains("editMode");
            //If class of the parent is .editmode
            if(containsClass){
    
            //switch to .editmode
            //label becomes the inputs value.
                label.innerText=editInput.value;
            }else{
                editInput.value=label.innerText;
            }
    
            //toggle .editmode on the parent.
            todolists.classList.toggle("editMode");
    }
    
    
    
    
    //Delete task.
    var deleteTask=function(){
            console.log("Delete Task...");
    
            var todolists=this.parentNode;
            var ul=todolists.parentNode;
            //Remove the parent list item from the ul.
            ul.removeChild(todolists);
    
    }
    
    
    //Mark task completed
    var taskCompleted=function(){
            console.log("Complete Task...");
        
        //Append the task list item to the #completed-tasks
        var todolists=this.parentNode;
        completedTasksHolder.appendChild(todolists);
                    bindTaskEvents(todolists, taskIncomplete);
    
    }
    
    
    var taskIncomplete=function(){
            console.log("Incomplete Task...");
    //Mark task as incomplete.
        //When the checkbox is unchecked
            //Append the task list item to the #incomplete-tasks.
            var todolists=this.parentNode;
        incompleteTaskHolder.appendChild(todolists);
                bindTaskEvents(todolists,taskCompleted);
    }
    
    
    
    var ajaxRequest=function(){
        console.log("AJAX Request");
    }
    
    //The glue to hold it all together.
    
    
    //Set the click handler to the addTask function.
    addButton.onclick=addTask;
    addButton.addEventListener("click",addTask);
    addButton.addEventListener("click",ajaxRequest);
    
    
    var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
        console.log("bind list item events");
    //select ListItems children
        var checkBox=taskListItem.querySelector("input[type=checkbox]");
        var editButton=taskListItem.querySelector("button.edit");
        var deleteButton=taskListItem.querySelector("button.delete");
    
    
                //Bind editTask to edit button.
                editButton.onclick=editTask;
                //Bind deleteTask to delete button.
                deleteButton.onclick=deleteTask;
                //Bind taskCompleted to checkBoxEventHandler.
                checkBox.onchange=checkBoxEventHandler;
    }
    
    //cycle over incompleteTaskHolder ul list items
        //for each list item
        for (var i=0; i<incompleteTaskHolder.children.length;i++){
    
            //bind events to list items chldren(tasksCompleted)
            bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
        }
    
    
    
    
    //cycle over completedTasksHolder ul list items
        for (var i=0; i<completedTasksHolder.children.length;i++){
        //bind events to list items chldren(tasksIncompleted)
            bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
        }
    
    
    
    
    // Issues with usabiliy don't get seen until they are in front of a human tester.
    
    //prevent creation of empty tasks.
    
    //Shange edit to save when you are in edit mode.

