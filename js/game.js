$(document).ready (
    function () {
        console.log("game.js loaded.");
    }
);

/* Trading Functions */

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
        showMoneyzAlert(item);
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
        showItemAlert(item);
    }
}

// Earn Moneyz
function earnMoneyz() {
    var gold = document.getElementById("gold");
    var random = Math.floor(Math.random() * 16);
    var randomNumber = random - 5;
    var array = ["pizza", "coffee", "tea", "burger", "spoderman", "pepe", "doge", "kazoo"];
    
    if (parseInt(gold.innerHTML) >= 1000) {
        showWorkAlert();
    } else if (parseInt(gold.innerHTML) + parseInt(randomNumber) <= 1000) {
        if (parseInt(gold.innerHTML) + parseInt(randomNumber) >= 0) {
        gold.innerHTML = parseInt(gold.innerHTML) + parseInt(randomNumber);
        addInterest();
        }
    } else {
        gold.innerHTML = parseInt(gold.innerHTML) + (1000 - parseInt(gold.innerHTML));
        addInterest();
    }
    changePrices(array[0]);
    changePrices(array[1]);
    changePrices(array[2]);
    changePrices(array[3]);
    changePrices(array[4]);
    changePrices(array[5]);
    changePrices(array[6]);
    changePrices(array[7]);
    
    /* changePricesTest(); */
    play('moneyz');
    loseKarma();
}

// Change Item Prices
function changePrices(item) {
    var itemPrice = document.getElementById(item+"-cost");
    var itemHappyz = document.getElementById(item+"-happyz");
    var rand = Math.floor(Math.random() * 11) - 5;
    var randHappyz = Math.floor(Math.random() * 21) - 10;

    if(parseInt(itemPrice.innerHTML) + rand >= 2 && parseInt(itemPrice.innerHTML) + rand <= 100) {
    itemPrice.innerHTML = parseInt(itemPrice.innerHTML) + rand;
    }

    if(parseInt(itemHappyz.innerHTML) + randHappyz >= 5 && parseInt(itemHappyz.innerHTML) + randHappyz <= 150) {
    itemHappyz.innerHTML = parseInt(itemHappyz.innerHTML) + randHappyz;
    }
}

// Lose Karma
function loseKarma() {
    var karmaValue = document.getElementById("happyzValue");
    var rand = Math.floor(Math.random() * 6);
    karmaValue.innerHTML = parseInt(karmaValue.innerHTML) - parseInt(rand);
}

/* End Trading Functions */

/* Bank Functions */

// Slide Bank in and Out

$(document).ready(
    function() {
        $("#bank").click(
            function() {
                var bank = document.getElementById("bank");
                var footer = document.getElementById("footer");
                var menu = document.getElementById("menuButton");
                if (menu.innerHTML === "Open Menu") {
                    $("#bankPanel").slideToggle();
                    $("#content").slideToggle();
                    if (bank.innerHTML === "Visit Bank") {
                        bank.innerHTML = "Leave Bank";
                        /* footer.style.position = "fixed"; */
                        footer.style.bottom ="0"; 
                    }
                    else {
                        bank.innerHTML = "Visit Bank";
                        /* footer.style.position = "initial"; */
                        footer.style.bottom ="auto";
                    }
                }
                else {
                    $("#bankPanel").slideToggle();
                    $("#menuFeatures").slideToggle();
                    menu.innerHTML = "Open Menu";
                    if (bank.innerHTML === "Visit Bank") {
                        bank.innerHTML = "Leave Bank";
                        /* footer.style.position = "fixed"; */
                        footer.style.bottom ="0"; 
                    }
                    else {
                        bank.innerHTML = "Visit Bank";
                        /* footer.style.position = "initial"; */
                        footer.style.bottom ="auto";
                    }
                }
            }
        );
    }
);

$(document).ready(
    function() {
        $("#borrow").click(
            function(){
                $("#borrowForm").slideToggle();
            }
        );
    }
); 

function borrowMoneyz() {
    var number = parseInt($('#borrowInput').val());
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debt-cost");
    var karma = parseInt(document.getElementById("happyzValue").innerHTML);
    if (parseInt(debt.innerHTML) >= parseInt(karma) + 100) {
        showRepayAlert();
    }
    else {
        if (number <= karma + 100 && karma > 0) {
            gold.innerHTML = parseInt(gold.innerHTML) + number;
            debt.innerHTML = parseInt(debt.innerHTML) + number;
            playSell();
        }
        else if (isNaN(karma)) {
            alert("ERROR: something broke");
            console.log(karma);  
        } 
        else {
            showItemAlert("karma");
            console.log(karma);
        }
    }
}

function borrowMoneyzMax() {
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debt-cost");
    var karma = document.getElementById("happyzValue");
    if (parseInt(debt.innerHTML) >= parseInt(karma.innerHTML) + 100) {
        showRepayAlert();
    }
    else {
        gold.innerHTML = parseInt(gold.innerHTML) + parseInt(karma.innerHTML) + 100;
        debt.innerHTML = parseInt(debt.innerHTML) + parseInt(karma.innerHTML) + 100;
        playSell();
    }
}

$(document).ready(
    function() {
        $("#repay").click(
            function(){
                $("#repayForm").slideToggle();
            }
        );
    }
); 

function repayMoneyz() {
    var number = parseInt( $('#repayInput').val() );
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debt-cost");
    var karma = document.getElementById("happyzValue");
    if (parseInt(gold.innerHTML) - number >= 0 && parseInt(debt.innerHTML) > 0) {
        gold.innerHTML = parseInt(gold.innerHTML) - number;
        debt.innerHTML = parseInt(debt.innerHTML) - number;
        karma.innerHTML = parseInt(karma.innerHTML) + number;
        playSell();
    }
    else if (parseInt(debt.innerHTML) === 0) {
        nilDebtAlert();
    }
    else if (parseInt(debt.innerHTML) - number < 0) {
        showDebtAlert();
    }
    else {
        showMoneyzAlert("debt");
    }
}

function repayAll() {
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debt-cost");
    var karma = document.getElementById("happyzValue");
    if (parseInt(debt.innerHTML) === 0) {
        nilDebtAlert();
    }
    else if (parseInt(gold.innerHTML) - parseInt(debt.innerHTML) >= 0) {
        gold.innerHTML = parseInt(gold.innerHTML) - parseInt(debt.innerHTML);
        karma.innerHTML = parseInt(karma.innerHTML) + parseInt(debt.innerHTML);
        debt.innerHTML = 0;
        playSell();
    }
    else if (parseInt(gold.innerHTML) - parseInt(debt.innerHTML) < 0) {
        showMoneyzAlert('debt');
    }
}

function addInterest(){
    var debt = document.getElementById("debt-cost");
    var interest = 1.012;
    var increase = parseInt(debt.innerHTML);
    increase = Math.floor(increase * interest);
    debt.innerHTML = increase;
}

/* End Bank Functions */

/* Test Features */

$(document).ready(
    function() {
        $("#menuButton").click(
            function() {
                var menu = document.getElementById("menuButton");
                var footer = document.getElementById("footer");
                var bank = document.getElementById("bank");
                if (bank.innerHTML === "Visit Bank") {
                    $("#menuFeatures").slideToggle();
                    $("#content").slideToggle();
                    if (menu.innerHTML === "Open Menu") {
                        menu.innerHTML = "Close Menu";
                        /* footer.style.position = "fixed"; */
                        footer.style.bottom ="0"; 
                    }
                    else {
                        menu.innerHTML = "Open Menu";
                        /* footer.style.position = "initial"; */
                        footer.style.bottom ="auto";
                    }
                }
                else {
                    $("#menuFeatures").slideToggle();
                    $("#bankPanel").slideToggle();
                    bank.innerHTML = "Visit Bank";
                    if (menu.innerHTML === "Open Menu") {
                        menu.innerHTML = "Close Menu";
                        /* footer.style.position = "fixed"; */
                        footer.style.bottom ="0"; 
                    }
                    else {
                        menu.innerHTML = "Open Menu";
                        /* footer.style.position = "initial"; */
                        footer.style.bottom ="auto";
                    }
                }
            }
        );
    }
);

function backToMenu() {
    var town = ["flavourtown", "meme"];
    var menu = document.getElementById("menuButton");
    var music = document.getElementById("bgmusic");
    menu.innerHTML = "Open Menu";
    $("#menuFeatures").fadeToggle(1000);
    $("#content").fadeToggle(1000);
    $("#body").fadeToggle(1000);
    $("#mainMenu").fadeIn(1000);
    /* document.getElementById(town[0]).fadeOut(1000);
    document.getElementById(town[1]).fadeOut(1000); */
    document.getElementById(town[0]).style.display = "none";
    document.getElementById(town[1]).style.display = "none";
    music.src = "audio/intromusic.mp3";
    playBg("bgmusic");
}

/* Alerts */
function showMoneyzAlert(item) {
    var itemCost = parseInt(document.getElementById(item + "-cost").innerHTML);
    var gold = parseInt(document.getElementById("gold").innerHTML);
    var short = document.getElementById("moreUpdoot");
    short.innerHTML = itemCost - gold;
    $("#moneyzAlert").show();
    $("#alert").show();
    play("error");
}

function closeMoneyzAlert() {
    $("#moneyzAlert").hide();
    $("#alert").hide();
    play('moneyz');
}

function showDebtAlert() {
    debt = parseInt(document.getElementById("debt-cost").innerHTML);
    var short = document.getElementById("debtAlertValue");
    short.innerHTML = debt;
    $("#noDebtAlert").show();
    $("#alert").show();
    play("error");
}

function closeDebtAlert() {
    $("#noDebtAlert").hide();
    $("#alert").hide();
    play('moneyz');
}

function payRemainingDebt() {
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debt-cost");
    var karma = document.getElementById("happyzValue");
    var short = document.getElementById("moreUpdoot");
    if (parseInt(gold.innerHTML) - parseInt(debt.innerHTML) >= 0) {
        gold.innerHTML = parseInt(gold.innerHTML) - parseInt(debt.innerHTML);
        debt.innerHTML = parseInt(debt.innerHTML) - parseInt(debt.innerHTML);
        karma.innerHTML = parseInt(karma.innerHTML) + parseInt(debt.innerHTML);
        playSell();
        closeDebtAlert();
    }
    else if (parseInt(gold.innerHTML) - parseInt(debt.innerHTML) < 0) {
        $("#noDebtAlert").hide();
        $("#alert").hide();
        showMoneyzAlert("debt");
    }
}

function showWorkAlert() {
    $("#startWork").show();
    $("#alert").show();
    play("error");
}

function closeWorkAlert() {
    $("#startWork").hide();
    $("#alert").hide();
    play('moneyz');
}

function nilDebtAlert() {
    $("#nilDebtAlert").show();
    $("#alert").show();
    play("error");
}

function closeNilDebt() {
    $("#nilDebtAlert").hide();
    $("#alert").hide();
    play('moneyz');
}

function showRepayAlert() {
    $("#repayDebtAlert").show();
    $("#alert").show();
    play("error");
}

function closeRepayDebt() {
    $("#repayDebtAlert").hide();
    $("#alert").hide();
    play('moneyz');
}

function showItemAlert(item) {
    document.getElementById("sellItem").innerHTML = item;
    $("#moreItem").show();
    $("#alert").show();
    play("error");
}

function closeItemAlert() {
    $("#moreItem").hide();
    $("#alert").hide();
    play('moneyz');
}

/*
function changePricesTest() {
    var price = document.getElementsByClassName("prices");
    var happyz = document.getElementsByClassName("happyz");
    var rand = Math.floor(Math.random() * 11) - 5;
    var randHappyz = Math.floor(Math.random() * 21) - 10;

    if(parseInt(price.innerHTML) + rand >= 2 && parseInt(itemPrice.innerHTML) + rand <= 51) {
        price.innerHTML = parseInt(price.innerHTML) + rand;
    }

    if(parseInt(happyz.innerHTML) + randHappyz >= 5 && parseInt(happyz.innerHTML) + randHappyz <= 150) {
        happyz.innerHTML = parseInt(happyz.innerHTML) + randHappyz;
    }
}
*/