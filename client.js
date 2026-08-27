
printTodos(getList()); //we want ts on the page all the time!!! 
//nu kommer inte en ny när vi skapar en ny dock... GAYYYY SKILL ISSUSEEEE


//css selector yus, we go into a div and we pick the form only from there
document.querySelector(".createTodo form")
    .addEventListener("submit", e=>{
        e.preventDefault(); // stoppar serverfunktionalitet rawr (sidan laddas inte om och vi får saken i console)
        // target --> our form! our inputs!! 

        //console.log(e.target.title.value); //då får vi input rutan i konsollen men vi vill ha innehållet (value)

        //const title = e.target.title.value.trim().replace(" ", "_").replaceAll(" ", ""); //trims only in beginning and end

        //HEMLÄXA AV NOOR (exempel på lösning med RegEx)
        const title = e.target.title.value.trim().replaceAll(/\s+/g, "_"); 
        //regular expression --> / = define a regex literal, then /s is space, + is at least once, g = global search (regex cheat sheet)
        //global search ensures that the regular expression finds all matches in the input string rather than stopping after 1st one. (w3schools)

        if(!title) return alert("title is required"); 
        const author = e.target.author.value;
        const note = e.target.note.value;  
        //const completed = false // otherwise gets the same as the author variable 
        createTODO(title, false, author, note); 
    })

// fixa en funktion som tar bort mellanslag även i mitten... myballs noor ill strangle u 
// skapa en lista eller nå bullshit idr 
// make an input type checkbox 


/**
 * 
 * @param {object} todo - todo   
 */

//skapa en todo som html 
function makeTodoEl(todo){ 
    const div = document.createElement('div');
    div.classList.add("todo"); // for CSS purposes 
    div.id = todo.id; 
    //vi får inte använda siffror som id i HTML, de måste ha nå med början av en bokstav! it works but uhm nono
    // se till att idet är av sträng format.. thats modified in createtodo !

    const title = document.createElement('h3'); 
    title.innerText = todo.title; 
    const author = document.createElement('i');
    author.innerText = todo.author;
    const note = document.createElement('p'); 
    note.innerText = todo.note; 

    const delButton = document.createElement('button');
    delButton.innerText = "delete note"; 
    delButton.addEventListener('click', ()=>{deleteTODO(todo.id)});

    const checkButton = document.createElement('input');
    checkButton.type = "checkbox"; //freddie kallade den toggleComplete och frågade vilket event vi ska ha
    // men toggle är ingen event eller? det finns onchange rawr 
    // we click on checkboxes but are there other ways to change them? 
    // accessibility again! de viktigt med rätt event, click funkar bra men de inge accessibility godo 
    checkButton.checked = todo.completed; // nu tar vi värdet som finns i den

    checkButton.addEventListener('change', ()=>{setCompleted(todo.id)});

    div.appendChild(title); 
    div.appendChild(author);
    div.appendChild(note); 
    div.appendChild(delButton); 
    div.appendChild(checkButton); 
    return div; 
}

// UPDATE

function setCompleted(id){
    // we have to find right element 
    // then change it and then save it to db 
    // primitiv databas, localstorage, textfil, först hämta, hitta, ändra, skriva över all data. 

    // i wonder if ts is js possible with toggle ngllllllllllllllll 
    // hela localstorage är en ölång str i json

    const todos = getList();
    const todo = todos.find(t=>t.id==id); //find returnerar ett objekt, inte en array typ idrk lowk, den hamnar i en var
    // de okej att ha samma namn, todo i find är en funktionsvariabel 
    // om du är lite lost kan du byta namnet, de bara en tillfällig variabel som får olika värden, but it might help u. 

    todo.completed = !todo.completed; //whatever it is from the beginning we want the checkbox to change it. 
    saveToStorage(todos); //men om vi refreshar så har inte checkboxen nå värde ju 
    // det finns ett extra attribut inom html "checked", vi måste hämta aktuell status vid skapande.  

}

function printTodos(todos){
    const todosBox = document.querySelector(".todos");
    for(let todo of todos){
        todosBox.appendChild(makeTodoEl(todo)); 
    }
}


function saveToStorage(data){
    const json = JSON.stringify(data); 
    localStorage.setItem('List', json); 
}

function getList(){
    let list = localStorage.getItem('List'); 
    if(!localStorage.length) return [];

    list = JSON.parse(list); //omvandla string till array (javascript behandlar de som objekt) igen 
    return list; //de fof en string tho LOL 
}


//js docs 
/**
 * @param {string} title - title
 * @param {boolean} completed - completed 
 * @param {string} author - author
 * @param {string} note - note 
 */

function createTODO(title, completed = false, author = "guest", note = "..."){ //variabler (vissa med standardvärden, behöver ej fyllas i)

    if(!title) return console.log("title is required");  //guard clause 

    //const todo = {title, completed, author, note, id:Date.now()}; 
    const todo = {title, completed, author, note, id:"id_"+Date.now()};  //sträng plus int is sträng 


    const todos = getList() || []; //om det inte finns något i localStorage, skapa en tom array (AI lol)
    todos.push(todo);  
    saveToStorage(todos); 
    printTodos([todo]); 
}

function deleteTODO(id){ 
    //istället för in i for loop ha of (annars får vi indexet av de inte innehållet)

    //kompakt 
    //const newTos = getList().filter(t=>t.id!=id); --> ts is very piped version yes

    const todos = getList();
    const newTos = todos.filter(t=>t.id!=id); 
    if(todos.length == newTos.length) console.log("nun is deleted"); 

    saveToStorage(newTos);

    //document.querySelector('#'+id).style.background= "red"; --> js testing if we have access to the delete tag 
    // document.querySelector('#'+id).remove(); fördelen med qs is we can always use it, and its the same yes 
    document.getElementById(id).remove();

}

 async function getCard(){
    const jsonCard = await fetch('info.json');
    const card = await jsonCard.json(); // här sker en automatiskt json parse, json är kopplad till fetch. 
    //console.log(card);
    return(card); // här får vi en promise, alla andra funktioner som använder denna bör ha async eller uhh ja idr. 
    //tvingar nästa rader att vänta, men vi låser inte programmet, den är asynkron 
 }