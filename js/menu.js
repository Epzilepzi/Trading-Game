$(document).ready (
    function () {
        console.log("menu.js loaded.");
    }
);

$(document).ready (
    function () {
            var gold = document.getElementById("gold");
            var menugold = document.getElementById("menu-gold");
            menugold.innerHTML = gold.innerHTML;
    }
);

function visitTown(name) {
    // var firsttime = true;
    var audio = document.getElementById("introMusic");
    var town = document.getElementById(name);
    var cost = document.getElementById(name+"-cost");
    var bgmusic = document.getElementById("bgmusic");
    var gold = document.getElementById("gold");
    var menugold = document.getElementById("menu-gold");
    var firstrun = true;
    if (parseInt(gold.innerHTML) - parseInt(cost.innerHTML) >= 0) {
        $("#mainMenu").fadeOut(500);
        setTimeout(
            function(){
                $("#body").fadeIn(500);
                if (firstrun === false) {
                    $("#content").fadeIn(500);
                }
                $(town).fadeIn(500);
            }, 500
        );
        bgmusic.src = "audio/" + name +".mp3";
        console.log(bgmusic.src);
        playBg("bgmusic");
        audio.pause();
        gold.innerHTML = parseInt(gold.innerHTML) - parseInt(cost.innerHTML);
        cost.innerHTML = 0;
        console.log(parseInt(gold.innerHTML) - parseInt(cost.innerHTML));
        menugold.innerHTML = gold.innerHTML;
        //if (firstrun === false) {
        //    $("#menuButton").click();
        //}
        firstrun = false;
        townName = name;
    }
    else {
        showMoneyzAlert(name);
        console.log(parseInt(gold.innerHTML) - parseInt(cost.innerHTML));
    }
}