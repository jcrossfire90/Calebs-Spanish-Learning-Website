// ======================================================
// PRONUNCIATION RECORDER
// Version 1.0
// ======================================================

let mediaRecorder;
let audioChunks = [];
let recordedAudio;


// Buttons

const recordButton =
    document.getElementById("recordButton");

const stopButton =
    document.getElementById("stopButton");

const playButton =
    document.getElementById("playButton");

const retryButton =
    document.getElementById("retryButton");


// If recorder isn't on this page, do nothing.

if (recordButton) {

    recordButton.addEventListener("click", startRecording);

    stopButton.addEventListener("click", stopRecording);

    playButton.addEventListener("click", playRecording);

    retryButton.addEventListener("click", resetRecording);

}


// ======================================================
// START RECORDING
// ======================================================

async function startRecording() {

    const stream =
        await navigator.mediaDevices.getUserMedia({
            audio: true
        });

    mediaRecorder =
        new MediaRecorder(stream);

    audioChunks = [];

    mediaRecorder.ondataavailable = event => {

        audioChunks.push(event.data);

    };

    mediaRecorder.onstop = () => {

        recordedAudio =
            new Blob(audioChunks, {
                type: "audio/webm"
            });

        playButton.disabled = false;

        retryButton.disabled = false;

    };

    mediaRecorder.start();

    recordButton.disabled = true;

    stopButton.disabled = false;

}


// ======================================================
// STOP RECORDING
// ======================================================

function stopRecording() {

    mediaRecorder.stop();

    recordButton.disabled = false;

    stopButton.disabled = true;

}


// ======================================================
// PLAY RECORDING
// ======================================================

function playRecording() {

    const audio =
        new Audio(
            URL.createObjectURL(recordedAudio)
        );

    audio.play();

}


// ======================================================
// RESET
// ======================================================

function resetRecording() {

    recordedAudio = null;

    playButton.disabled = true;

    retryButton.disabled = true;

}