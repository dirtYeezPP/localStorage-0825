
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
    // om du har () i funktionen så kommer den försöka köra den samtidigt som vi kör webbsidan typ type shir 
    // skickar du in deleteTODO(todo.id) så kommer den inte köras vid clicks utan körs direkt då vi tillägger lyssnaren. 
    // vi behöver bara göra en referens till en funktion, så gör en ny yttre, anynym funktion 
    // en ny funktion som sen körs som sen talar om vad som ska köras så då körs det gg 
    // den tas bort ur lokal storage men uhh vi ger ju inga instructions till webbläsaren LOL 
    // vi måste modifiera vår delete funktion för att den ska ta bort elementet som är utskrivet LOL 

    // viktigt --> deletetodo är en callback function
    // lyssna efter ett klick event, om nå clicks så ska nå hända
    // vi ger en referens till en funktion som finns, här finns den funktionen som du använder vid clicks 
    // vi vill alltid ha en funktionsinstruktion, vi vill inte köra en, de webbläsaren som kör den vid clicks 
    // onclick kan vi köra bara vi vet vad vi gör, eftersom då KÖR vi en funktion! 

    // Regler inom webb!! 
    // Vi måste se efter för folk med svårigheter, Accessibility! Sidan ska passa ALLA! 
    // I webbläsare kan man läsa upp innehållet, eller att de använder tab tangenten, det är viktigt att veta var de befinner sig
    // huvudregel --> ska vi skapa element som ska utföra något (klicka), bör vi välja knappar eller länkar! 
    // länkar --> bra om vi ska skicka iväg nå till en server! vi vill gå nåstans och låta servern göra nå & omdirigera oss 

    // när vi skapar elementet har vi tillgång till nå specifikt, då kan vi koppla händelsen vid skapelsen direkt! 
    // lägga till en eventlistener direkt vid skapandet av elementet. 

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

//update 

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

    // en av de största viktigaste grejerna inom ett nytt språk 
    // todos.find kodraden! 
    // filter och find letar nå och skapar nå nytt, iden är att de inte ska mutera
    // vi får alltså en helt ny variabel, från gamla listan, sen ändrar vi och sen sparas det men hur? 
    // vi har ju ändrat i en tillfällig todo? hur är den kopplad till den arrayen? 

    // liten genomgång av freddie
    // skapar vi en variabel x exempelvis, let x = 3
    // då har vi skapat den och allokerat minne och sagt åt vad som skall ligga där 
    // om vi skriver sen let y = x --> då får y värdet av 3! 
    // sen ändrar vi på y och säger y = 4, vad händer då med x? --> x får då värdet 3 (vi ändrade bara på y)
    // olika programmeringsspråk hanterar detta på olika sätt! så kolla när du byter språk always!! 
    // vid en array let arr = ['hej','balls']
    // sen skapar vi en ny som är newArr = Arr 
    // newArr blir då samma sak som Arr 
    // nu ändrar vi i newArr (newArr[0]='big') då ändras newArr
    // hur ser Arr ut? den är också ändrad!!! (javascript)
    // det är alltså ingen kopia i sig utan det ändras globalt. 
    // det har alltså med hur variabler sparas (enkla variabler, x och y), array & object --> referensvariabler i think 
    // de pekar till samma minne !!! alla språk fungerar inte så! php exempelvis. 

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
    todos.push(todo); //läggs till i slutet av arrayen 
    saveToStorage(todos); 
    printTodos([todo]); 
}

function deleteTODO(id){
    //vi skapar en ny lista, vi muterar inte den första
    //functional programming --> här vill man undvika mutation (ändra befintlig variabel), were cooked we have push 
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


// const, let, (var), 
// från början fanns bara var
// let --> variabel som kan ändras, den lever bara i den scope den är i, t.ex. en funktion eller ett block (blockscopevariabel)
// därför kan vi ha två loopar med samma variabelnamn 
// med var lever variabeln efter loopen, den är global och kan inte ha samma namn i en annan loop, basically global variabel. 
// vill vi stänga in variabler i ett visst scope, använder vi let eller const 
// vi behöver typ aldrig använda var, men det finns kvar för att inte bryta gamla sidor som använder var. 
// använder du var i en funktion kommer den leva bara i funktionen, function scope, men annars är den global. 
// vi bör undvika globala variabler. 
// det förbjudna sättet är att inte skriva var, let eller const, då blir det en global variabel också
// men skriver vi så, kommer de läcka utanför funktionen, och det är inte bra. 

// exempel av freddie 
//function scheisse (){
    //x = 5; // global variabel, den lever utanför funktionen också, vi bör undvika detta LOL
//}



// ARR VS OBJECT 
// ändra en kopia utan att ändra i orig 
// let newArr = [...arr]; (loopar oss igenom den gamla och trycker in de i en ny array, spread operator)
// arrayer har index, platser, men ibland kan det vara en fördel att inte ha index utan ha platser med namn (keys typ ig)
// tips: ni kan kanske behöva detta i scorekortet lol
// spelare 1, 2, 3 de finns på olika platser, de har dock olika namn
// const players = {'Ben':[], 'Ell':[]} på platsen ben har vi en array med alla resultat 
// då behlver vi inte leta upp utan vi kan bara gå in påå den specifika platsen. 
// players.Ben[0] = 4 
// då får ju personen en array med ett slag i (exempelvis)
// det kan då vara ett objekt istället för en array, du kan ha objekt i objekt i objekt 
// objekt kan ibland vara bättre datastruktur än array om de handlar om avancerade datastrukturer. 
// dock vi visste ju att vi skylle gå in på npn, men om vi inte vet vilken plats? den är skickad till oss
// från programmet kommer det en siffra exempelvis och vilken spelare det är, då finns ju en variabel
// let result = 4
// let player = 'Ben'
// nu vill vi anvä'nda de, vi vet inte (vår kod) vet ej vem
// hur jobbar vi med objekt dynamiskt
// players[player][5]=result
// vi går in i playern och sedan en plats i deras array. 
 