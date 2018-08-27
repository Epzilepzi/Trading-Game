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

// Earn Moneyz
function earnMoneyz() {
    var gold = document.getElementById("gold");
    var random = Math.floor(Math.random() * 16);
    var randomNumber = random - 5;
    var array = ["pizza", "coffee", "tea", "burger"];
    
    if (parseInt(gold.innerHTML) >= 1000) {
        alert('You cannot earn any more moneyz from working!!! Start trading!!!');
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
    loseKarma();
}

// Change Item Prices
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
                var test = document.getElementById("testButton");
                if (test.innerHTML === "Open Test") {
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
                    $("#testFeatures").slideToggle();
                    test.innerHTML = "Open Test";
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
        )
    }
)

$(document).ready(
    function() {
        $("#borrow").click(
            function(){
                $("#borrowForm").slideToggle();
            }
        )
    }
) 

function borrowMoneyz() {
    var number = parseInt($('#borrowInput').val());
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debtValue");
    var karma = parseInt(document.getElementById("happyzValue").innerHTML);
    if (number <= karma + 100) {
        gold.innerHTML = parseInt(gold.innerHTML) + number;
        debt.innerHTML = parseInt(debt.innerHTML) + number;
        playSell();
    }
    else if (isNaN(karma)) {
        alert("ERROR");
        console.log(karma);  
    } 
    else {
        alert("You need more Karma!");
        console.log(karma);
    }
}

function borrowMoneyzMax() {
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debtValue");
    var karma = document.getElementById("happyzValue");
    gold.innerHTML = parseInt(gold.innerHTML) + parseInt(karma.innerHTML) + 100;
    debt.innerHTML = parseInt(debt.innerHTML) + parseInt(karma.innerHTML) + 100;
    playSell();
}

$(document).ready(
    function() {
        $("#repay").click(
            function(){
                $("#repayForm").slideToggle();
            }
        )
    }
) 

function repayMoneyz() {
    var number = parseInt( $('#repayInput').val() );
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debtValue");
    if (parseInt(gold.innerHTML) - number >= 0) {
        gold.innerHTML = parseInt(gold.innerHTML) - number;
        debt.innerHTML = parseInt(debt.innerHTML) - number;
        playSell();
    }
    else if (debt.innerHTML - number < 0) {
        alert("You don't have that much debt to pay!");
    }
    else {
        alert("You need more Moneyz!");
    }
}

function repayAll() {
    var gold = document.getElementById("gold");
    var debt = document.getElementById("debtValue");
    var karma = document.getElementById("happyzValue");
    gold.innerHTML = parseInt(gold.innerHTML) - parseInt(debt.innerHTML);
    debt.innerHTML = 0;
    playSell();
}

function addInterest(){
    var debt = document.getElementById("debtValue");
    var interest = 1.012;
    var increase = parseInt(debt.innerHTML);
    increase = Math.floor(increase * interest);
    debt.innerHTML = increase;
}

/* End Bank Functions */

/* Test Features */

$(document).ready(
    function() {
        $("#testButton").click(
            function() {
                var test = document.getElementById("testButton");
                var footer = document.getElementById("footer");
                var bank = document.getElementById("bank");
                if (bank.innerHTML === "Visit Bank") {
                    $("#testFeatures").slideToggle();
                    $("#content").slideToggle();
                    if (test.innerHTML === "Open Test") {
                        test.innerHTML = "Close Test";
                        /* footer.style.position = "fixed"; */
                        footer.style.bottom ="0"; 
                    }
                    else {
                        test.innerHTML = "Open Test";
                        /* footer.style.position = "initial"; */
                        footer.style.bottom ="auto";
                    }
                }
                else {
                    $("#testFeatures").slideToggle();
                    $("#bankPanel").slideToggle();
                    bank.innerHTML = "Visit Bank";
                    if (test.innerHTML === "Open Test") {
                        test.innerHTML = "Close Test";
                        /* footer.style.position = "fixed"; */
                        footer.style.bottom ="0"; 
                    }
                    else {
                        test.innerHTML = "Open Test";
                        /* footer.style.position = "initial"; */
                        footer.style.bottom ="auto";
                    }
                }
            }
        )
    }
)