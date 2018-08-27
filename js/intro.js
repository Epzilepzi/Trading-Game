$(document).ready (
    function () {
        var devMode = false;
        if (devMode) {
            closeIntro();
        }
        else {
            introMusic();
        }
    }
)

function closeIntro() {
    var audio = document.getElementById("introMusic");
    document.getElementById("intro").style.display = "none";
    audio.pause();
    // stopMusic(intro);
}

function introMusic() {
    var audio = document.getElementById("introMusic");
    audio.play();
    audio.currentTime = 0;
}