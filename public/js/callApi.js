function SupprimerElement() {
    var request = new XMLHttpRequest();
    // requete serveur methode post
    request.open('DELETE', serverUrl + '/api/todolists/', true);
    request.setRequestHeader("Content-Type", "application/json");


    const todolist = todolists.find(c => c.id === parseInt(request.params.id));


    //delete

    // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau
    const index = todolists.indexOf(todolist);
    // splite permet de diviser une chaine à partir d'un séparateurs
    todolists.splice(index, 1);
    // return la list du tableau
    console.log("id :  " + request.params.id + " ========== element supprimer ");
    request.send(todolist)
}







