/*
Här lägger du din JavaScript-kod
*/

//Variabler

let addNewToDoEl = document.getElementById("newtodo");
let addToDoButtonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message");
let toDoListEl = document.getElementById("todolist");
let clearButtonEl = document.getElementById("clearbutton");
let i;

//Händelsehanterare

addNewToDoEl.addEventListener("keyup", checkInput, false);
addToDoButtonEl.addEventListener("click", newToDo, false);
clearButtonEl.addEventListener("click", clearAll, false);
window.onload = init;

//Start-funktion
function init() {

    //Avaktiverar lägg till-knappen
    addToDoButtonEl.disabled = true;

    //läs in lista
    loadList();


}

//kontrollera input
function checkInput() {

    let input = addNewToDoEl.value;

    //kontroll av längd
    if (input.length > 4) {
        addToDoButtonEl.disabled = false;
        messageEl.innerHTML = "";
    } else {
        messageEl.innerHTML = "Måste innehålla minst 5 tecken";
        addToDoButtonEl.disabled = true;
    }
}

//Lägg till kurs
function newToDo() {

    //Skapar ny "att göra"- text
    let input = addNewToDoEl.value;
    let newEl = document.createElement("article");
    let newTextNodeEl = document.createTextNode(input);
    newEl.appendChild(newTextNodeEl);
    newEl.className = "todo";

    newEl.addEventListener("click", function (e) {
        e.target.remove();
        saveToDo();     //Sparar listan i local storage efter en punkt är raderad.
    });

    //Lägger till texten i att göra listan
    toDoListEl.appendChild(newEl);

    //Tar bort vår text i input- rutan
    addNewToDoEl.value = "";
    addToDoButtonEl.disabled = true;

    //anropar lagring och sparar til local storage
    saveToDo();
}

//rensa listan med rensa-knapp
function clearAll() {
    let element = document.getElementsByClassName("todo");
    while (element.length > 0) {
        element[0].parentNode.removeChild(element[0]);
    }

    saveToDo();
}

//Sparar listan
function saveToDo() {

    //Läser in "att göra"-listan
    let toDoList = document.getElementsByClassName("todo");

    //skapar en temporär array för vår lista
    let tempArr = [];

    //Loopar igenom listan och lagrar innehålet till en array
    for (i = 0; i < toDoList.length; i++) {
        tempArr.push(toDoList[i].innerHTML);
    }

    //lagrar vår array i en JSON string
    let jsonStr = JSON.stringify(tempArr);

    //Lagrar vår string på local storage
    localStorage.setItem("list", jsonStr)
}

//Läs in kurser
function loadList() {

    //Hämtar vår json string och konverterar den tillbaka till en array
    let toDoList = JSON.parse(localStorage.getItem("list"));

    //Loop som går igenom vår sparade array
    for (i = 0; i < toDoList.length; i++) {

        //Återskapar "att göra"- text
        let newEl = document.createElement("article");
        let newTextNodeEl = document.createTextNode(toDoList[i]);
        newEl.appendChild(newTextNodeEl);
        newEl.className = "todo";

        //Lägger till texten i att göra listan
        toDoListEl.appendChild(newEl);

        //tar bort item vid klick
        newEl.addEventListener("click", function (e) {
            e.target.remove();

            saveToDo();
        });

    }
}