/**====================================================================================================
 * Function de validation de la tache
====================================================================================================*/
function validateTodolist(todolist) {

    const schema = {
        // il faut que le name, a minimum 3 caractère
        name: Joi.string().min(3).required()
    }

    return Joi.validate(todolist, schema);
}

function loadScripts(){

    var directory = 'script/';
    var extension = '.js';
    var files = ['model', 'view', 'controller'];  
    for (var file of files){ 
        var path = directory + file + extension; 
        var script = document.createElement("script");
        script.src = path;
        document.body.appendChild(script);
    } 
    
  }