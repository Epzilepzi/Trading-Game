// Buy Stuff
function buy(item){
    var gold = document.getElementById("gold");
    var itemCount = document.getElementById(item);
    var itemPrice = document.getElementById(item+"-cost");
    var happyz = document.getElementById("happyzValue");
    var itemHappyz = document.getElementById(item+"-happyz");


    //alert(gold.innerHTML + " " + itemCount.innerHTML + " " + itemPrice.innerHTML);
    if(parseInt(gold.innerHTML) - parseInt(itemPrice.innerHTML) >= 0) {
        itemCount.innerHTML = parseInt(itemCount.innerHTML) + 1;
        happyz.innerHTML = parseInt(happyz.innerHTML) + parseInt(itemHappyz.innerHTML);
        gold.innerHTML = parseInt(gold.innerHTML) - parseInt(itemPrice.innerHTML);
        play(item);
    } else {
        alert("You need more Moneyz!");
    }
}

// Sell Stuff
 function sell(item){
    var gold = document.getElementById("gold");
    var itemCount = document.getElementById(item);
    var itemPrice = document.getElementById(item+"-cost");
    var happyz = document.getElementById("happyzValue");
    var itemHappyz = document.getElementById(item+"-happyz");

    //Test that the variables are working.
    //alert(gold.innerHTML + " " + itemCount.innerHTML + " " + itemPrice.innerHTML);

    if(parseInt(itemCount.innerHTML) > 0) {
        itemCount.innerHTML = parseInt(itemCount.innerHTML) - 1;
        happyz.innerHTML = parseInt(happyz.innerHTML) + parseInt(itemHappyz.innerHTML);
        gold.innerHTML = parseInt(gold.innerHTML) + parseInt(itemPrice.innerHTML);
        playSell();
    } else {
        alert("You need more " + item + "!");
    }
}

function earnMoneyz() {
    var gold = document.getElementById("gold");
    var random = Math.floor(Math.random() * 16);
    var randomNumber = random - 5;
    var array = ["pizza", "coffee", "tea", "burger"];
    
    if (parseInt(gold.innerHTML) === 500) {
        alert('You cannot earn any more moneyz from working!!! Start trading!!!');
    } else if (parseInt(gold.innerHTML) + parseInt(randomNumber) <= 500) {
        if (parseInt(gold.innerHTML) + parseInt(randomNumber) >= 0) {
        gold.innerHTML = parseInt(gold.innerHTML) + parseInt(randomNumber);
        }
    } else {
        gold.innerHTML = parseInt(gold.innerHTML) + (500 - parseInt(gold.innerHTML));
    }

    changePrices(array[0]);
    changePrices(array[1]);
    changePrices(array[2]);
    changePrices(array[3]);

    loseKarma();
}


function play(item){
    var item = document.getElementById(item+"-sound");
    item.play();
    item.currentTime = 0;
}

function playSell(){
    var sound = document.getElementById(sellSound);
    sound.play();
    sound.currentTime = 0;
}

function toggleMute() {
    var music = document.getElementById('backgroundMusic');

    if (music.muted === false) {
        music.muted = true
    } else {
        music.muted = false;
        music.currentTime = 0;
    }
}

function changePrices(item) {
    var itemPrice = document.getElementById(item+"-cost");
    var itemHappyz = document.getElementById(item+"-happyz");
    var rand = Math.floor(Math.random() * 11) - 5;
    var randHappyz = Math.floor(Math.random() * 21) - 10;

    if(parseInt(itemPrice.innerHTML) + rand >= 2 && parseInt(itemPrice.innerHTML) + rand <= 51) {
    itemPrice.innerHTML = parseInt(itemPrice.innerHTML) + rand;
    }

    if(parseInt(itemHappyz.innerHTML) + randHappyz >= 5 && parseInt(itemHappyz.innerHTML) + randHappyz <= 150) {
    itemHappyz.innerHTML = parseInt(itemHappyz.innerHTML) + randHappyz;
    }
}

function loseKarma() {
    var karmaValue = document.getElementById("happyzValue");
    var rand = Math.floor(Math.random() * 6);
    karmaValue.innerHTML = parseInt(karmaValue.innerHTML) - parseInt(rand);
}

//Borrow Functions

function borrow() {
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debt");
    var money = prompt("Enter amount to borrow", "1000");

    if (isNaN(parseInt(money))) {
        alert("Please input a valid amount.")
    }
    else if (parseInt(money) != null) {
        gold.innerHTML = parseInt(gold.innerHTML) + parseInt(money);
        debt.innerHTML = parseInt(loan.innerHTML) + 1000;
    }

}

function addInterest() {
    var loan = document.getElementById("loan");
    var interest = 1.012;
    var debt = parseInt(loan.innerHTML);
    
    debt = Math.floor(debt * interest);
    loan.innerHTML = debt;
}