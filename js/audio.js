function play(item) {
    var item = document.getElementById(item+"-sound");
    item.play();
    item.currentTime = 0;
}

function playSell() {
    var sound = document.getElementById("sellSound");
    sound.play();
    sound.currentTime = 0;
}

function stopMusic(audio) {
    var audio = document.getElementById(audio+"-sound");
    audio.pause()
    sound.currentTime = 0;
}

// Background Music
function toggleMute() {
    var music = document.getElementById('backgroundMusic');

    if (music.muted === false) {
        music.muted = true
    } else {
        music.muted = false;
        music.currentTime = 0;
    }
}