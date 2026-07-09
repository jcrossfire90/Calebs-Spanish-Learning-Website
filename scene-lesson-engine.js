let vocabIndex = 0;
let sceneCurrentAudio = null;

function showVocabCard() {
    const currentVocab = sceneVocabulary[vocabIndex];

    const image = document.getElementById("lesson-vocab-image");
    const progress = document.getElementById("lesson-vocab-progress");

    image.src = currentVocab.image;
    image.alt = currentVocab.word;

    progress.textContent = `Tarjeta ${vocabIndex + 1} de ${sceneVocabulary.length}`;
}

function playCurrentVocab() {
    const currentVocab = sceneVocabulary[vocabIndex];

    if (sceneCurrentAudio) {
        sceneCurrentAudio.pause();
        sceneCurrentAudio.currentTime = 0;
    }

    sceneCurrentAudio = new Audio(currentVocab.audio1);
    sceneCurrentAudio.play();
}

function nextVocab() {
    vocabIndex++;

    if (vocabIndex >= sceneVocabulary.length) {
        vocabIndex = 0;
    }

    showVocabCard();
    playCurrentVocab();
}

function previousVocab() {
    vocabIndex--;

    if (vocabIndex < 0) {
        vocabIndex = sceneVocabulary.length - 1;
    }

    showVocabCard();
    playCurrentVocab();
}

showVocabCard();