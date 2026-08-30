// ======================================================
// PRONUNCIATION RECORDER + AZURE ASSESSMENT
// Version 2.0
// ======================================================

let mediaRecorder;
let audioChunks = [];
let recordedAudio;
let microphoneStream;
let speechRecognizer;


// ======================================================
// BUTTONS
// ======================================================

const recordButton =
    document.getElementById("recordButton");

const playButton =
    document.getElementById("playButton");

const retryButton =
    document.getElementById("retryButton");


const pronunciationWords = [
    {
    word: "José",

    pronunciation:
        "ho-SEH",

    meaning:
        "A common Spanish name",

    soundTips: [
        "The Spanish J sounds similar to the English H.",
        "Stress the final syllable because José has an accent mark."
    ],

    audioBeginner:
        "../audio/jose.wav",

    audioNatural:
        "../audio/jose.wav"
},

   {
    word: "Jaguar",

    pronunciation:
        "hah-GWAHR",

    meaning:
        "Jaguar",

    soundTips: [
        "The opening J uses the same breathy sound heard in José.",
        "Pronounce the U as part of the combined 'gua' sound."
    ],

    audioBeginner:
        "../audio/s-jaguar.wav",

    audioNatural:
        "../audio/jaguar.wav"
},

{
    word: "Hola",

    pronunciation: "OH-lah",

    meaning: "Hello",

    soundTips: [
        "The H is completely silent.",
        "Stress the first syllable."
    ],

    audioBeginner: "../audio/s-hola.wav",

    audioNatural: "../audio/hola.wav"
},

{
    word: "Hospital",

    pronunciation: "ohs-pee-TAHL",

    meaning: "Hospital",

    soundTips: [
        "The H is silent.",
        "Stress the last syllable."
    ],

    audioBeginner: "../audio/s-hospital.wav",

    audioNatural: "../audio/hospital.wav"
},

{
    word: "Huevos",

    pronunciation: "WEH-vohs",

    meaning: "Eggs",

    soundTips: [
        "The H is silent.",
        "Pronounce 'Hue' as 'weh'."
    ],

    audioBeginner: "../audio/s-huevos.wav",

    audioNatural: "../audio/huevos.wav"
},

{
    word: "Hielo",

    pronunciation: "EE-eh-loh",

    meaning: "Ice",

    soundTips: [
        "The H is completely silent.",
        "Pronounce IE as a smooth 'ee-eh' vowel combination. Do not add a separate Y or LL consonant sound."
    ],

    audioBeginner: "../audio/s-hielo.wav",

    audioNatural: "../audio/hielo.wav"
},

{
    word: "Niño",

    pronunciation: "NEE-nyoh",

    meaning: "Boy",

    soundTips: [
        "Ñ sounds like 'ny' in canyon.",
        "Stress the first syllable."
    ],

    audioBeginner: "../audio/s-nino.wav",

    audioNatural: "../audio/nino.wav"
},

{
    word: "Año",

    pronunciation: "AH-nyoh",

    meaning: "Year",

    soundTips: [
        "Ñ sounds like 'ny'.",
        "Do not pronounce it like 'ano'."
    ],

    audioBeginner: "../audio/s-ano.wav",

    audioNatural: "../audio/ano.wav"
}
];

let currentPronunciationWordIndex = 0;

// ======================================================
// RESULTS PANEL
// ======================================================

let pronunciationResults =
    document.getElementById("pronunciation-results");


if (!pronunciationResults && retryButton) {

    pronunciationResults =
        document.createElement("div");

    pronunciationResults.id =
        "pronunciation-results";

    pronunciationResults.className =
        "pronunciation-results";

    pronunciationResults.innerHTML = `
        <p id="pronunciation-status">
            Record yourself to receive pronunciation feedback.
        </p>

        <div
            id="pronunciation-scores"
            hidden
        ></div>
    `;

    retryButton.parentElement.insertAdjacentElement(
        "afterend",
        pronunciationResults
    );

}


const pronunciationStatus =
    document.getElementById("pronunciation-status");

const pronunciationScores =
    document.getElementById("pronunciation-scores");


// ======================================================
// BUTTON EVENTS
// ======================================================

if (
    recordButton &&
    playButton &&
    retryButton
) {

    recordButton.addEventListener(
        "click",
        startRecording
    );

    playButton.addEventListener(
        "click",
        playRecording
    );

    retryButton.addEventListener(
        "click",
        resetRecording
    );

}


// ======================================================
// START RECORDING
// ======================================================

async function startRecording() {

    try {

        if (!window.SpeechSDK) {

            throw new Error(
                "Microsoft Speech SDK did not load."
            );

        }


        const practiceWord =
    document.getElementById("practice-word");

const referenceText =
    practiceWord?.textContent.trim();


        if (!referenceText) {

            throw new Error(
                "The practice word could not be found."
            );

        }


        updateStatus(
            `Preparing to assess “${referenceText}”…`
        );


        // Request a temporary Azure Speech token.

        const tokenResponse =
            await fetch(
                "/api/speech-token",
                {
                    cache: "no-store"
                }
            );


        if (!tokenResponse.ok) {

            throw new Error(
                "The Speech token could not be retrieved."
            );

        }


        const tokenData =
            await tokenResponse.json();


        if (
            !tokenData.token ||
            !tokenData.region
        ) {

            throw new Error(
                "The Speech token response was incomplete."
            );

        }


        // Request microphone access.

        microphoneStream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });


        // Record audio for playback.

        mediaRecorder =
            new MediaRecorder(
                microphoneStream
            );

        audioChunks = [];
        recordedAudio = null;


        mediaRecorder.ondataavailable = event => {

            if (event.data.size > 0) {

                audioChunks.push(
                    event.data
                );

            }

        };


        mediaRecorder.onstop = () => {

            recordedAudio =
                new Blob(
                    audioChunks,
                    {
                        type:
                            mediaRecorder.mimeType ||
                            "audio/webm"
                    }
                );

            playButton.disabled = false;
            retryButton.disabled = false;

        };


        // Configure Azure Speech.

        const speechConfig =
            SpeechSDK.SpeechConfig
                .fromAuthorizationToken(
                    tokenData.token,
                    tokenData.region
                );


        speechConfig.speechRecognitionLanguage =
            "es-MX";


        const audioConfig =
            SpeechSDK.AudioConfig
                .fromStreamInput(
                    microphoneStream
                );


        const assessmentConfig =
            new SpeechSDK
                .PronunciationAssessmentConfig(
                    referenceText,

                    SpeechSDK
                        .PronunciationAssessmentGradingSystem
                        .HundredMark,

                    SpeechSDK
                        .PronunciationAssessmentGranularity
                        .Phoneme,

                    true
                );


        speechRecognizer =
            new SpeechSDK.SpeechRecognizer(
                speechConfig,
                audioConfig
            );


        assessmentConfig.applyTo(
            speechRecognizer
        );


        // Start playback recording.

        mediaRecorder.start();

        setRecordButtonState(true);

        recordButton.disabled = true;
        playButton.disabled = true;
        retryButton.disabled = true;


        if (pronunciationScores) {

            pronunciationScores.hidden = true;
            pronunciationScores.innerHTML = "";

        }


        updateStatus(
            `Recording… Say “${referenceText},” then pause.`
        );


        // Azure listens until the student pauses.

        speechRecognizer.recognizeOnceAsync(

            result => {

                handleAssessmentResult(
                    result,
                    referenceText
                );

            },

            error => {

                console.error(
                    "Pronunciation assessment error:",
                    error
                );

                updateStatus(
                    "Azure could not evaluate that attempt. Please try again."
                );

                finishAssessment();

            }

        );

    } catch (error) {

        console.error(
            "Recorder error:",
            error
        );

        updateStatus(
            error.message ||
            "The recorder could not start."
        );

        resetButtons();

    }

}


// ======================================================
// HANDLE AZURE RESULT
// ======================================================

function handleAssessmentResult(
    result,
    referenceText
) {

    if (
        result.reason ===
        SpeechSDK.ResultReason.RecognizedSpeech
    ) {

        const assessment =
            SpeechSDK
                .PronunciationAssessmentResult
                .fromResult(result);


        const recognizedText =
            result.text || "Not detected";


        showScores({
            referenceText,
            recognizedText,

            pronunciation:
                assessment.pronunciationScore,

            accuracy:
                assessment.accuracyScore,

            fluency:
                assessment.fluencyScore,

            completeness:
                assessment.completenessScore
        });


        updateStatus(
    "Sofía has finished reviewing your pronunciation."
);

    } else if (
        result.reason ===
        SpeechSDK.ResultReason.NoMatch
    ) {

        updateStatus(
            "Azure could not clearly hear the word. Please try again."
        );

    } else {

        updateStatus(
            "The pronunciation attempt could not be evaluated."
        );

    }


    finishAssessment();

}


// ======================================================
// DISPLAY SCORES
// ======================================================

function showScores(scores) {

    if (!pronunciationScores) {
        return;
    }

    const overall =
        formatScore(scores.pronunciation);

    const accuracy =
        formatScore(scores.accuracy);

    const fluency =
        formatScore(scores.fluency);

    const completeness =
        formatScore(scores.completeness);

    const feedback =
        getSofiaFeedback(
            Number(scores.pronunciation)
        );

    pronunciationScores.hidden = false;

    pronunciationScores.innerHTML = `
        <div class="sofia-feedback-card">

            <div class="sofia-feedback-header">

                <div class="sofia-avatar">
                    S
                </div>

                <div>
                    <p class="sofia-label">
                        Sofía says...
                    </p>

                    <h3>
                        ${feedback.title}
                    </h3>
                </div>

            </div>

            <p class="sofia-message">
                ${feedback.message}
            </p>

            <div class="pronunciation-word-review">

                <p>
                    <span>Practice word</span>
                    <strong>
                        ${escapeHtml(scores.referenceText)}
                    </strong>
                </p>

                <p>
                    <span>Sofía heard</span>
                    <strong>
                        ${escapeHtml(scores.recognizedText)}
                    </strong>
                </p>

            </div>

            <div class="overall-score">

                <span>Overall Pronunciation</span>

                <strong>
                    ${overall}%
                </strong>

                <div class="score-bar">

                    <div
                        class="score-bar-fill"
                        style="width: ${overall}%"
                    ></div>

                </div>

            </div>

            <div class="pronunciation-score-grid">

                ${createScoreCard(
                    "Accuracy",
                    accuracy
                )}

                ${createScoreCard(
                    "Fluency",
                    fluency
                )}

                ${createScoreCard(
                    "Completeness",
                    completeness
                )}

            </div>

        </div>
    `;

}

function getSofiaFeedback(score) {

    if (score >= 95) {

        return {
            title: "¡Excelente!",
            message:
                "Your pronunciation sounded clear and natural. Beautiful work!"
        };

    }

    if (score >= 85) {

        return {
            title: "Great job!",
            message:
                "Your pronunciation was very strong. Listen once more and see whether you can make it even smoother."
        };

    }

    if (score >= 70) {

        return {
            title: "Nice progress!",
            message:
                "I understood you. Try listening to the example again, then repeat the word slowly."
        };

    }

    return {
        title: "Let’s try again!",
        message:
            "Mistakes are part of learning. Listen carefully, take your time, and give the word another try."
    };

}


function createScoreCard(label, score) {

    return `
        <div class="pronunciation-score-card">

            <strong>
                ${score}%
            </strong>

            <span>
                ${label}
            </span>

            <div class="mini-score-bar">

                <div
                    class="mini-score-fill"
                    style="width: ${score}%"
                ></div>

            </div>

        </div>
    `;

}

// ======================================================
// STOP RECORDING
// ======================================================

function stopRecording() {

    if (
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {

        mediaRecorder.stop();

    }


    recordButton.disabled = false;
    stopButton.disabled = true;


    updateStatus(
        "Recording stopped. Waiting for Azure feedback…"
    );

}


// ======================================================
// FINISH ASSESSMENT
// ======================================================

function finishAssessment() {

    if (
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {

        mediaRecorder.stop();

    }


    if (speechRecognizer) {

        speechRecognizer.close();
        speechRecognizer = null;

    }


    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(track => track.stop());

        microphoneStream = null;

    }


    resetButtons();

}


// ======================================================
// PLAY RECORDING
// ======================================================

function playRecording() {

    if (!recordedAudio) {

        updateStatus(
            "There is no recording to play yet."
        );

        return;

    }


    const audio =
        new Audio(
            URL.createObjectURL(
                recordedAudio
            )
        );


    audio.play();

}


// ======================================================
// RESET
// ======================================================

function resetRecording() {

    recordedAudio = null;
    audioChunks = [];


    if (speechRecognizer) {

        speechRecognizer.close();
        speechRecognizer = null;

    }


    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(track => track.stop());

        microphoneStream = null;

    }


    playButton.disabled = true;
    retryButton.disabled = true;


    if (pronunciationScores) {

        pronunciationScores.hidden = true;
        pronunciationScores.innerHTML = "";

    }


    updateStatus(
        "Record yourself to receive pronunciation feedback."
    );


    resetButtons();

}

function setRecordButtonState(isRecording) {

    if (!recordButton) {
        return;
    }

    const icon =
        recordButton.querySelector(".button-icon");

    const title =
        recordButton.querySelector("strong");

    const subtitle =
        recordButton.querySelector("small");


    recordButton.classList.toggle(
        "is-recording",
        isRecording
    );


    if (isRecording) {

        if (icon) {
            icon.textContent = "●";
        }

        if (title) {
            title.textContent = "Recording…";
        }

        if (subtitle) {
            subtitle.textContent =
                "Speak, then pause";
        }

        return;
    }


    if (icon) {
        icon.textContent = "🎙️";
    }

    if (title) {
        title.textContent = "Record";
    }

    if (subtitle) {
        subtitle.textContent =
            "Start speaking";
    }

}

function updatePronunciationWord() {

    const wordData =
        pronunciationWords[
            currentPronunciationWordIndex
        ];

    const wordElement =
        document.getElementById("practice-word");

    const pronunciationElement =
        document.getElementById(
            "practice-pronunciation"
        );

    const meaningElement =
        document.getElementById(
            "practice-meaning"
        );

    const tipElement =
        document.getElementById(
            "practice-sound-tip"
        );

    const countElement =
        document.getElementById(
            "practice-word-count"
        );

    const audioButton =
        document.querySelector(
            ".pronunciation-audio-button"
        );

    const previousButton =
        document.getElementById(
            "previous-practice-word"
        );

    const nextButton =
        document.getElementById(
            "next-practice-word"
        );


    wordElement.textContent =
        wordData.word;

    pronunciationElement.textContent =
        wordData.pronunciation;

    meaningElement.textContent =
        wordData.meaning;


    /*
     * Completely replace the previous word's tips.
     */
    tipElement.innerHTML = "";

    const soundTips =
        Array.isArray(wordData.soundTips)
            ? wordData.soundTips
            : [];

    soundTips.forEach(tip => {

        const tipLine =
            document.createElement("div");

        tipLine.className =
            "practice-sound-tip-line";

        tipLine.textContent =
            `• ${tip}`;

        tipElement.appendChild(tipLine);

    });


    countElement.textContent =
        `${currentPronunciationWordIndex + 1} of ${pronunciationWords.length}`;


    audioButton.dataset.audioBeginner =
        wordData.audioBeginner;

    audioButton.dataset.audioNatural =
        wordData.audioNatural;


    /*
     * Recalculate navigation after every word change.
     */
    previousButton.disabled =
        currentPronunciationWordIndex <= 0;

    nextButton.disabled =
        currentPronunciationWordIndex >=
        pronunciationWords.length - 1;


    resetRecording();

}

const previousPracticeWordButton =
    document.getElementById(
        "previous-practice-word"
    );

const nextPracticeWordButton =
    document.getElementById(
        "next-practice-word"
    );


previousPracticeWordButton?.addEventListener(
    "click",
    () => {

        if (
            currentPronunciationWordIndex > 0
        ) {
            currentPronunciationWordIndex--;

            updatePronunciationWord();
        }

    }
);


nextPracticeWordButton?.addEventListener(
    "click",
    () => {

        if (
            currentPronunciationWordIndex <
            pronunciationWords.length - 1
        ) {
            currentPronunciationWordIndex++;

            updatePronunciationWord();
        }

    }
);

// ======================================================
// HELPERS
// ======================================================

function resetButtons() {

    if (recordButton) {
        recordButton.disabled = false;
    }

    setRecordButtonState(false);

}


function updateStatus(message) {

    if (pronunciationStatus) {

        pronunciationStatus.textContent =
            message;

    }

}


function formatScore(score) {

    const numericScore =
        Number(score);


    if (!Number.isFinite(numericScore)) {

        return "—";

    }


    return Math.round(
        numericScore
    );

}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}