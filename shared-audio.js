let currentAudio = null;

function playAudio(audioId) {
    const audio = document.getElementById(audioId);

    if (currentAudio === audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        currentAudio = null;
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    audio.play();
    currentAudio = audio;
}