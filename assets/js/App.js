var letter  = document.getElementById('letter');
var dLife   = document.getElementById('life');
var ship    = document.getElementById('ship');
var fail    = document.getElementById('fail');
var success = document.getElementById('success');
var result  = document.getElementById('result');
var gmDiv   = document.getElementById('gameDiv');
var scDiv   = document.getElementById('scoreDiv');
var alert   = document.getElementsByClassName('alert');
var turn    = 0;
var life    = 3;
var guest   = [];
var game    = 1;
var found   = 0;
var count   = 0;
var score   = 0;
var maxGm   = 5;

var terms  = [
    "Actions speak louder than words",
    "Last straw",
    "Sit on the fence",
    "See eye to eye",
    "Taste of your own medicine",
    "Your guess is as good as mine",
    "A penny for your thoughts",
    "Add insult to injury",
    "At the drop of a hat",
    "Ball is in your court",
    "Best of both worlds",
    "Best thing since sliced bread",
];

terms = shuffle(terms);

generate(terms[turn].toUpperCase(), guest);
countLife(life);

function submit(curr, val){

    curr.style.background = '#444';
    if(guest.indexOf(val) == -1){
        guest.push(val);
    }

    var checkLife = terms[turn].split(" ").join("").toUpperCase().split("");

    if(checkLife.indexOf(val) == -1){
        life--;
        countLife(life);
    }

    generate(terms[turn].toUpperCase(), guest)
}

function generate(terms, guest){

    letter.innerHTML = "";
    letterLength = terms.split(" ").join("").length;
    terms = terms.split("");
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

        score += 20;
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

    countLife(life);
    generate(terms[turn], guest);
}

function checkWin(){

    if(game == maxGm){
        result.removeAttribute('style');
        result.innerHTML = "Congratulations, You Got "+score+" Score !";
    }
}
