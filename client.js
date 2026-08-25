function saveToStorage(data){
    const json = JSON.stringify(data); 
    localStorage.setItem('List', json); 
}

function getList(){
    let list = localStorage.getItem('List'); 

    list = JSON.parse(list); //omvandla string till array (javascript behandlar de som objekt) igen 
    return list; //de fof en string tho LOL 
}

function createTODO(title, completed = false, author = "guest", note = "..."){
    const todo = {title, completed, author, note}; 
    const todos = getList() //|| []; //om det inte finns något i localStorage, skapa en tom array (AI lol)
    todos.push(todo); //läggs till i slutet av arrayen 
    saveToStorage(todos); 
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
