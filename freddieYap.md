## VARIABLES, OBJECTS, STORAGE...


### VARIABLES 

Vi har tre alternativ (med ett förbjudet fjärde alternativ), bestående av const, let eller var. 
Från början fanns bara 'var', den definierar en variabel som kan ändras. 
**LET & CONST**
'let' definierar en blockscopevariable, dvs att variabeln lever bara i den scope den är i (exempelvis funktion eller block),
därför kan vi ha två loopar med samma variabelnamn. Vill vi stänga in variabler i ett visst scope behöver vi använda 'let' eller 'const'.
'const' definierar en konstant variabel. 
**VAR**
Med 'var' lever variabeln efter loopen, den är global och kan inte ha samma namn i en annan loop, det blir en global variabel. 
Vill vi stänga in variabler i ett visst scope behöver vi använda 'let' eller 'const'. 
'Var' används inte ofta längre men finns kvar för att inte brya gamla sidor som använder 'var'. 
Använder du 'var' kommer variabeln att leva bara i funktionen, function scope, men annars är den global. 
Globala variabler är något vi bör undvika. 
**THE FORBIDDEN**
Det förbjudna sättet är att inte skriva någon av ovanstående. Den skapade variabeln blir då också global, 
men skriver vi så kommer det att läcka utanför funktionen och det är inte bra. 

**Exempel av freddie**
``` js
function scheisse(){
    x = 5
}
```
x blir i detta fall en global variabel som lever utanför vår funktion också. 



### OBJECTS AND ARRAYS 
**ONE OF THE MOST IMPORTANT THING FOR YOU SUCKERS!**
Alla språk funkar inte på samma sätt, därför bör du alltid kolla upp saker inom ett nytt språk innan du börjar med det. 

###### FILTER & FIND 
'Filter' och 'Find' är båda funktioner som har i uppgift att leta upp något och sedan skapa något nytt med det. Idén är att de inte ska mutera något. 
Vi får alltså en helt ny variabel från en gammal lista som vi sedan ändrar och sedan sparar vi hela nya listan, men hur funkar det? 
Vi har ju bara ändrat i en tillfällig variabel, hur kommer det sig att det ändras i listan också? 

**Exempel av Freddie** 
``` js
  let x = 3 
  let y = x 
  let y = 4 
```
I detta fall har vi ändrat på variabeln y, och värdet av x är då oförändrat. 
Vi har allokerat ett minne åt båda variablerna och pekat ut vad de ska ha för värde. De är inte beroende av varandra. 

**OLIKA PROGRAMMERINGSSPRÅK HANTERAR DETTA PÅ OLIKA SÄTT**

``` js
let arr = ['hej', 'bollar']; 
let newArr = arr; 
newArr[0]='big'; 
``` 
Vi skulle kunna tänka oss att newArr är det enda som bör ändras, däremot är det inte så. 
När vi ändrar i newArr kommer vi ändra i arr aswell. 
Detta beror på att newArr blir ingen kopia utan allt vi ändrar kommer att ändras globalt. 
Detta har att göra med hur variabler sparas. 
Exempelvis enkla variabler som x och y och referensvariabler som objekt och arrayer. 
Grejen med de är att de kommer att peka åt samma minne, newArr har allokerat samma minne som arr, figuratively speaking. 
**Alla språk fungerar dock inte så, ett exempel är PHP**

##### ÄNDRA KOPIAN OCH INTE ORIGINALET 

Vill vi ändra själva kopian utan att ändra i original arrayen kan vi skriva följande: 
``` js
let newArr = [...arr];
```
De tre punkterna är en spread operator, det innebär att vi loopar igenom den gamla arrayen och trycker in innehåller i den nya arrayen. 

##### OBJECT SUPREMACY 
Arrayer har platser, dvs index, men ibland kan det vara en fördel att inte ha index utan att ha platser med namn. 
Exempelvis 
``` js
const players = ['Yab':{}, 'Noor':{}]; 
``` 
Detta gör att varenda spelare kan ha en array med sina resultat. På så sätt behöver vi inte leta upp något utan kan gå in i en specifik plats. 
``` js
players.Yab[0] = 4 
```
Här ändrar vi alltså inom Yabs array och ger honom ett slay på 4. 
Här kan vi ju också ha ett objekt istället för en array, du kan ha 2d objekt och 3d objekt (object in object in object). 
Objekt kan alltså ibland vara en bättre datastruktur än arrays. 
Men om vi inte vet vem vi skall till? Säg att vi får det inskickat till oss, koden vet alltså inte vem som är vem. 
``` js
let result = 4 
let player = 'Yab'
```
Vi vill alltså använda dessa men de är inskickade, vi känner inte till dem med vår kod. 

**ATT JOBBA MED OBJEKT PÅ ETT DYNAMISKT SÄTT**
``` js
players[player][5] = result; 
```
YUHHH!!! 

#### LITTLE BIT ABOUT CALLBACK FUNCTIONS 
 
Om du skriver 
``` js 
    delButton.addEventListener('click', deleteTODO(todo.id));
```
Paranteserna i sig gör att vi kör funktionen samtidigt som vi lägger till eventListener. 
Då körs inte funktionen vid ett click utan den körs direkt och tar bort att vår bullshieit. 
Vi bör alltså lägga till en anonym funktion som referar till den menade funktionen. 
Vi gör en referens till en annan funktion genom en annan, anonym, yttre funktion. 

``` js
    delButton.addEventListener('click', ()=>{deleteTODO(todo.id)});
```
'deleteTODO' är en callback function, den lyssnar efter ett event (click) och utförs vid dess uppkommelse. 
Det blir en referens till en funktion som finns. 
Vi vill alltid ha en funktionsinstruktion, vi vill inte köra en funktion direkt vid eventListener, det är webbläsaren som skall köra den vid eventet.  

##### REGLER INOM WEBB SOM ÄR KOPPLAT TILL DETTTA 
Vi måste se efter med folk med svårigheter, our web page needs to have great accessibility. 
Det är viktigt för folk med svårigheter att veta var de befinner sig på webbsidan och vad de kan göra i den positionen.  
Vid click kan vi alltså använda antingen länkar eller knappar. 
**LÄNKAR** --> Vid fall att vi vill skicka iväg nå till en server, vi vill gå någonstans, låta servern göra sin grej och sedan omdirigera oss. 
När vi skapar ett element har vi tillgång till något specifikt, vi kan koppla händelsen vid skapelsen direkt. Dvs där kunde vi tillägga eventLister vidrekt vid skapandet av button. 

###### EXEMPEL 
``` js
    const checkButton = document.createElement('input');
    checkButton.type = "checkbox";
    checkButton.checked = todo.completed; // nu tar vi värdet som finns i den
    checkButton.addEventListener('change', ()=>{setCompleted(todo.id)});
```
Detta har då med accessibility att göra, det är viktigt med rätt event. 
Det hade funkat med 'click' men det gör inte vår accessibility vår nytta i detta fallet. 
    

#### LITE GALNA BEGREPP AV FREDDIE 
**FUNCTIONAL PROGRAMMING** --> En princip som innebär att vi vill undvika mutation, dvs ändringar av befintliga variabler. 



    //functional programming --> här vill man undvika mutation (ändra befintlig variabel), were cooked we have push 
    //istället för in i for loop ha of (annars får vi indexet av de inte innehållet)

    //kompakt 
    //const newTos = getList().filter(t=>t.id!=id); --> ts is very piped version yes




## DE OLIKA FUNKTIONERNA
### UPDATE ISH 
``` js
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
```
Med primitiva databaser (såsom localStorage eller textfiler) har vi följande workflow: 
1. Hämta all data.
2. Hitta rätt data.
3. Ändra inom datan.
4. Skriv över all data. 


``` js

```
