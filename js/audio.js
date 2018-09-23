$(document).ready(
    function () {
        console.log("audio.js loaded.");
    }
);

volume = 0.5;

function play(item) {
    var itemSound = document.getElementById(item + "-sound");
    itemSound.pause();
    itemSound.play();
    itemSound.volume = volume;
    item.currentTime = 0;
}

function playBg() {
    var music = document.getElementById("bgmusic");
    music.volume = volume;
    music.play();
    music.currentTime = 0;
}

function playSell() {
    var sound = document.getElementById("sellSound");
    sound.volume = volume;
    sound.play();
    sound.currentTime = 0;
}

function stopMusic(audio) {
    var sound = document.getElementById(audio + "-sound");
    sound.volume = volume;
    sound.pause();
    sound.currentTime = 0;
}

// Background Music
function toggleMute() {
    var music = document.getElementById("bgmusic");
    var title = document.getElementById("introMusic");
    if (music.muted === false) {
        music.muted = true;
        title.muted = true;
        console.log("Music Muted");
    } else {
        music.muted = false;
        title.muted = false;
        music.currentTime = 0;
        title.currentTime = 0;
        console.log("Music Unmuted");
    }
}