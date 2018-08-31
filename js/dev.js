// if (devMode) {
//     var dev = true;
// }
// else {
    var dev = false;
// }

function showDevMode() {
    if (dev === false) {
        $("#secret").show();
        $("#passError").hide();
        $("#alert").show();
        play("secret");
    }
    else if (dev === true) {
        $("#devPanel").show();
        $("#alert").show();
    }
    else {
        console.log("something broke pretty badly");
    }
}

function closeDevMode() {
    $("#devPanel").hide();
    $("#alert").hide();
}

function closeSecret() {
    $("#secret").hide();
    $("#alert").hide();
}

function devMode() {
    var secret = $('#secretPhrase').val();
    if (secret === "@yeetmeistergu") {
        dev = true;
        $("#secret").hide();
        play("xp");
        showDevMode();
    }
    else if (secret != null) {
        $("#secret").hide();
        $("#passError").show();
        play("error");
    }
    else {
        $("#secret").hide();
    }
}

function closePassError() {
    $("#passError").hide();
    $("#alert").hide();
}
