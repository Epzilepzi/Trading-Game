$(document).ready (
    function () {
        console.log("game.js loaded.");
    }
);

$(document).ready (
    function () {
        var alert = document.getElementById("alert");
        window.onclick = function(event) {
            if (event.target === alert) {
                closeAllAlerts();
            }
        }; 
    }
);

var townName = any;

/* Trading Functions */
// Change all prices
function changeAllPrices() {
    var array = ["pizza", "coffee", "tea", "burger", "spoderman", "pepe", "doge", "kazoo"];
    changePrices(array[0]);
    changePrices(array[1]);
    changePrices(array[2]);
    changePrices(array[3]);
    changePrices(array[4]);
    changePrices(array[5]);
    changePrices(array[6]);
    changePrices(array[7]);
}

// Buy Stuff
function buy(item){
    var gold = document.getElementById("gold");
    var itemCount = document.getElementById(item);
    var itemPrice = document.getElementById(item+"-cost");
    var happyz = document.getElementById("happyzValue");
    var itemHappyz = document.getElementById(item+"-happyz");
    var storage = document.getElementById(townName+"-storage");


    //alert(gold.innerHTML + " " + itemCount.innerHTML + " " + itemPrice.innerHTML);
    if(parseInt(gold.innerHTML) - parseInt(itemPrice.innerHTML) >= 0 && parseInt(storage.innerHTML) > 0) {
        itemCount.innerHTML = parseInt(itemCount.innerHTML) + 1;
        happyz.innerHTML = parseInt(happyz.innerHTML) + parseInt(itemHappyz.innerHTML);
        gold.innerHTML = parseInt(gold.innerHTML) - parseInt(itemPrice.innerHTML);
        storage.innerHTML = parseInt(storage.innerHTML) - 1;
        changeAllPrices();
        play(item);
    } else if (parseInt(storage.innerHTML) <= 0) {
        showMoreHouse();
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
    var storage = document.getElementById(townName+"-storage");

    //Test that the variables are working.
    //alert(gold.innerHTML + " " + itemCount.innerHTML + " " + itemPrice.innerHTML);

    if(parseInt(itemCount.innerHTML) > 0) {
        itemCount.innerHTML = parseInt(itemCount.innerHTML) - 1;
        happyz.innerHTML = parseInt(happyz.innerHTML) + parseInt(itemHappyz.innerHTML);
        gold.innerHTML = parseInt(gold.innerHTML) + parseInt(itemPrice.innerHTML);
        storage.innerHTML = parseInt(storage.innerHTML) - 1;
        changeAllPrices();
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
    changeAllPrices();
    play('moneyz');
    loseKarma();
}

// Change Item Prices
function changePrices(item) {
    var itemPrice = document.getElementById(item+"-cost");
    var itemHappyz = document.getElementById(item+"-happyz");
    var rand = Math.floor(Math.random() * 11) - 5;
    var randHappyz = Math.floor(Math.random() * 21) - 10;
    if (parseInt(itemPrice.innerHTML) + rand >= 2 && parseInt(itemPrice.innerHTML) + rand <= 100) {
        itemPrice.innerHTML = parseInt(itemPrice.innerHTML) + rand;
    }
    else if (parseInt(itemPrice.innerHTML) + rand < 2) {
        itemPrice.innerHTML = parseInt(itemPrice.innerHTML) + 10;
    }
    else if (parseInt(itemPrice.innerHTML) + rand <= 100) {
        itemPrice.innerHTML = parseInt(itemPrice.innerHTML) - 10;
    }
    if(parseInt(itemHappyz.innerHTML) + randHappyz >= 5 && parseInt(itemHappyz.innerHTML) + randHappyz <= 150) {
        itemHappyz.innerHTML = parseInt(itemHappyz.innerHTML) + randHappyz;
    }
    else if (parseInt(itemHappyz.innerHTML) + randHappyz < 5) {
        itemHappyz.innerHTML = parseInt(itemHappyz.innerHTML) + 3;
    }
    else if (parseInt(itemHappyz.innerHTML) + randHappyz > 150) {
        itemHappyz.innerHTML = parseInt(itemHappyz.innerHTML) - 20;
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


function openBank() {
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

function borrowForm(){
    $("#borrowForm").slideToggle();
}


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


function repayForm(){
    $("#repayForm").slideToggle();
}

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

function toggleMenuPanel() {
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

function backToMenu() {
    // var town = ["flavourtown", "meme"];
    // var menu = document.getElementById("menuButton");
    var music = document.getElementById("bgmusic");
    var gold = document.getElementById("gold");
    var menugold = document.getElementById("menu-gold");
    menugold.innerHTML = gold.innerHTML;
    toggleMenuPanel();
    setTimeout (
        function () {
            $("#content").fadeToggle(500);
            $("#body").fadeToggle(500);
            setTimeout(
                function () {
                    $("#mainMenu").fadeIn(500);
                }, 500
            ); 
        }, 500
    );
    /* document.getElementById(town[0]).fadeOut(1000);
    document.getElementById(town[1]).fadeOut(1000); */
    setTimeout(
        function () {
            /*
                document.getElementById(town[0]).style.display = "none";
                document.getElementById(town[1]).style.display = "none";
            */
           document.getElementById(townName).style.display = "none";
        }, 1000
    );
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

function showKarmaAlert(item) {
    var itemCost = parseInt(document.getElementById(item + "-unlock-karma").innerHTML);
    var happyz = parseInt(document.getElementById("happyzValue").innerHTML);
    var short = document.getElementById("moreKarma");
    short.innerHTML = itemCost - happyz;
    $("#karmaAlert").show();
    $("#alert").show();
    play("error");
}

function closeKarmaAlert() {
    $("#karmaAlert").hide();
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
    play("moneyz");
}

function showMoreHouse() {
    $("#moreHouse").show();
    $("#alert").show();
    play("error");
}

function closeMoreHouse() {
    $("#moreHouse").hide();
    $("#alert").hide();
    play('moneyz');
}

function showMaxHouse() {
    $("#maxHouse").show();
    $("#alert").show();
    play("error");
}

function closeMaxHouse() {
    $("#maxHouse").hide();
    $("#alert").hide();
    play('moneyz');
}

function showCongratulateHouse(town) {
    document.getElementById("townName").innerHTML = town;
    $("#congratulateHouse").show();
    $("#alert").show();
    play("xp");
}

function closeCongratulateHouse() {
    document.getElementById("congratulateHouse").style.display = "none";
    $("#congratulateHouse").hide();
    $("#alert").hide();
    play('moneyz');
}

function closeAllAlerts() {
    closeWorkAlert();
    closeItemAlert();
    closeRepayDebt();
    closeNilDebt();
    closeWorkAlert();
    closeDebtAlert();
    closeMoneyzAlert();
    closeCongratulateHouse();
    closeDevMode();
    closeMaxHouse();
    closeMoreHouse();
}

/* Unlock Functions */

function levelUp(product) {
    var item = document.getElementById(product+"-content");
    var unlock = document.getElementById("unlock-"+product);
    // var test = "'#" + product + "-content'";
    // console.log(test);
    console.log(item.id);
    item.style.display = "block";
    unlock.style.display = "none";
}

function unlock(item) {
    var karma = parseInt(document.getElementById(item+"-unlock-karma").innerHTML); // How karma needed to unlock
    var cost = parseInt(document.getElementById(item+"-unlock-cost").innerHTML); // How many updoots you need to unlock
    var happyz = parseInt(document.getElementById(item+"-unlock-happyz").innerHTML); // How much karma you will get from unlock
    var happyzValue = document.getElementById("happyzValue").innerHTML; // Current karma value
    var gold = document.getElementById("gold").innerHTML; // Current gold value
    var short = item + "-unlock";
 // Check if karma value - needed karma is >= 0 AND if gold - cost is >= 0
        if (parseInt(happyzValue) - karma >= 0 && parseInt(gold) - cost >= 0) {// Case if ^ is true
            levelUp(item); //Unlocks item
            document.getElementById("gold").innerHTML = parseInt(gold) - cost;
            document.getElementById("happyzValue").innerHTML = parseInt(happyzValue) + happyz;
            console.log(parseInt(happyzValue) - karma);
            console.log(parseInt(gold) - cost);
            console.log(gold);
            console.log(happyzValue);
            playSell();
        }
        else if (parseInt(happyzValue) - karma < 0) {
            showKarmaAlert(item);
        }
            

        else if (parseInt(gold) - cost < 0) {
            showMoneyzAlert(short);
        }
}



/* End Unlock Functions */

function maxUpdoots() {
    gold = document.getElementById("gold");
    gold.innerHTML = 99999999999;
}

function maxKarma() {
    karma = document.getElementById("happyzValue");
    karma.innerHTML = 9999999999;
}

/* Housing Functions */
function showRealEstate (name) {
    var town = name+"-housing";
    var button = document.getElementById(name+"-housingbutton");
    if (button.innerHTML === "Visit Real Estate Agency") {
        button.innerHTML = "Leave Real Estate Agency";
    }
    else {
        button.innerHTML = "Visit Real Estate Agency";
    }
    $("#"+town).slideToggle();
    console.log(town);
}

function upgradeHouse(town) {
    var townDiv = town + "-storage";
    var house = document.getElementById(townDiv);
    var cost = document.getElementById(townDiv + "-cost");
    var gain = document.getElementById(townDiv + "-gain");
    var level = document.getElementById(townDiv + "-level");
    var gold = document.getElementById("gold");
    var image = document.getElementById(townDiv + "-image");
    // console.log(house, house.innerHTML, cost, cost.innerHTML, gain, gain.innerHTML, level, level.innerHTML);
    if (parseInt(level.innerHTML) <= 99) {
        if (parseInt(gold.innerHTML) - parseInt(cost.innerHTML) >= 0) {
            house.innerHTML = parseInt(house.innerHTML) + parseInt(gain.innerHTML);
            gold.innerHTML = parseInt(gold.innerHTML) - parseInt(cost.innerHTML);
            level.innerHTML = parseInt(level.innerHTML) + 1;
            if (parseInt(gain.innerHTML * 1.25) <= 100) {
                gain.innerHTML = Math.floor(parseInt(gain.innerHTML) * 1.25);
            }
            else {
                gain.innerHTML = parseInt(gain.innerHTML) - (100 - parseInt(gain.innerHTML));
            }
            if (cost.innerHTML * 1.5 <= 100000) {
                cost.innerHTML = Math.floor(parseInt(cost.innerHTML) * 1.5);
            }
            else {
                cost.innerHTML = 100000;
            }
            if (parseInt(level.innerHTML) <= 5) {
                image.src = "images/" + townDiv + "/" + level.innerHTML + ".png";
            }
            if (parseInt(level.innerHTML) === 100) {
                showCongratulateHouse(town);
            }
        }
        else {
            showMoneyzAlert(townDiv);
            console.log(parseInt(gold) - parseInt(cost.innerHTML));
        }
    }
    else if (parseInt(level.innerHTML) >= 100) {
        showMaxHouse();
    }
}

/* End Housing Functions */