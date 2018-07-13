var letter  = document.getElementById('letter');
var dLife   = document.getElementById('life');
var ship    = document.getElementById('ship');
var fail    = document.getElementById('fail');
var success = document.getElementById('success');
var result  = document.getElementById('result');
var gmDiv   = document.getElementById('gameDiv');
var scDiv   = document.getElementById('scoreDiv');
var alert   = document.getElementsByClassName('alert');
var title   = document.getElementById('titles');
var list    = document.getElementById('list-title');
var clue    = document.getElementById('clue');
var turn    = 0;
var life    = 3;
var guest   = [];
var game    = 1;
var found   = 0;
var count   = 0;
var score   = 0;
var maxGm   = 1;
var terms   = [
    [
        "Rain Check", 
        "Idiom", 
        [
           
        ]
    ]
];

terms = shuffle(terms);

generate(terms, guest);
countLife(life);

function submit(curr, val){

    curr.style.background = '#444';

    if(guest.indexOf(val) == -1){
        guest.push(val);
    }

    var checkLife = terms[turn][0].split(" ").join("").toUpperCase().split("");

    generate(terms, guest);

    if(checkLife.indexOf(val) == -1){
        life--;
        countLife(life);
    }
}

function clues(){

    if(life != 1){

        list.innerHTML = "";

        life--;
            countLife(life);

        for(var i = 0; i<terms[turn][2].length; i++){

            list.innerHTML += '<li> - '+terms[turn][2][i]+'</li>';
        }

    }else{
        alert("You just have one more life");
    }
}

function generate(terms, guest){

    letter.innerHTML = "";
    
    title.innerHTML = terms[turn][1];

    letterLength = terms[turn][0].toUpperCase().split(" ").join("").length;
    terms = terms[turn][0].toUpperCase().split("");
    found = 0;
    count = 0;
    
    for(var i = 0; i<terms.length; i++){
        if(guest.indexOf(terms[i]) != -1){
            count++;
            letter.innerHTML += '<div class="words">'+terms[i]+'</div>';
        }else{

            if(terms[i] == " "){
                letter.innerHTML += '<div class="space"></div>';
            }else{
                letter.innerHTML += '<div class="words"></div>';
            }
        }
    }
    
    if(letterLength == count){

        score += 1000;
        checkWin()
        success.removeAttribute('style');
    }
}

function countLife(currentLife){

    dLife.innerHTML = "";
    for(var i = 1; i<=currentLife; i++){
        dLife.innerHTML += '<div class="life"><img src="assets/img/ship.png" alt="ship"></div>';
    }

    if(currentLife == 0){
        checkWin();
        wrong();
        ship.style.animation = '3s linear forwards Sinking';
        fail.removeAttribute('style');
    }
}

function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function wrong(){

    setTimeout(() => {
        letter.innerHTML = "";
        terms = terms[turn][0];
    
        for(var i = 0; i<terms.length; i++){
                
            if(terms[i] == " "){
                letter.innerHTML += '<div class="space"></div>';
            }else{
                letter.innerHTML += '<div class="words redAnim">'+terms[i].toUpperCase()+'</div>';
            }
        }
    }, 1000);
    
}

function next(){
    
    turn++;
    game++;

    life = 3;

    gmDiv.innerHTML = game;
    scDiv.innerHTML = score;

    ship.removeAttribute('style');

    for(var i =0; i<alert.length; i++){
        alert[i].setAttribute("style", "display:none;");
    }

    guest = [];

    var a = document.getElementsByClassName('letter-small');

    for(var i =0; i<a.length; i++){
        a[i].removeAttribute('style');
    }

    countLife(life);
    generate(terms, guest);
}

function checkWin(){

    if(game == maxGm){
        
        if(score == 0){

            setTimeout(function(){
                
                result.removeAttribute('style');
                result.setAttribute('style', 'background:#911f19;')
                result.innerHTML = "The correct answer is <br>" + terms.toUpperCase();
            
            }, 6000)
        }else{

            setTimeout(function(){
                
                result.removeAttribute('style');
                result.innerHTML = "Congratulations, You Got "+score+" Score !";
            
            }, 4000)
        }
    }
}
