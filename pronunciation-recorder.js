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

    pronunciation: "ho-SEH",

    meaning: "A common Spanish name",

    soundTips: [
        "The Spanish J sounds similar to the English H.",
        "Stress the final syllable because José has an accent mark."
    ],

    image:
        "../images/jose-fixed.png",

    imageAlt:
        "Mateo introducing José",

    audioBeginner:
        "../audio/s-jose.wav",

    audioNatural:
        "../audio/jose.wav"
},

   {
    word: "Jaguar",

    pronunciation: "hah-GWAHR",

    meaning: "Jaguar",

    soundTips: [
        "The opening J uses the same breathy sound heard in José.",
        "Pronounce the U as part of the combined 'gua' sound."
    ],

    image:
        "../images/jaguar.png",

    imageAlt:
        "A jaguar",

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

    image:
        "../images/hola.png",

    imageAlt:
        "Someone greeting with Hola",
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
    image:
        "../images/hospital.jpg",

    imageAlt:
        "A hospital building",

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
    image:
        "../images/huevos.jpg",

    imageAlt:
        "Eggs",

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
    image:
        "../images/hielo.jpg",

    imageAlt:
        "Ice",
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
    image:
        "../images/nino.png",

    imageAlt:
        "A boy",
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

    image:
        "../images/ano.jpg",

    imageAlt:
        "A calendar showing a year",   
    audioBeginner: "../audio/s-ano.wav",

    audioNatural: "../audio/ano.wav"
},
{
    word: "Español",

    pronunciation: "ehs-pah-NYOL",

    meaning: "Spanish",

    soundTips: [
        "Ñ sounds like 'ny' in canyon.",
        "Stress the last syllable."
    ],

    image: "../images/espanol.png",

    imageAlt: "The Spanish language",

    audioBeginner: "../audio/s-espanol.wav",

    audioNatural: "../audio/espanol.wav"
},

{
    word: "Piña",

    pronunciation: "PEE-nyah",

    meaning: "Pineapple",

    soundTips: [
        "Ñ sounds like 'ny'.",
        "The accent is on the first syllable."
    ],

    image: "../images/pina.jpg",

    imageAlt: "A pineapple",

    audioBeginner: "../audio/s-pina.wav",

    audioNatural: "../audio/pina.wav"
},

{
    word: "Llave",

    pronunciation: "YAH-veh",

    meaning: "Key",

    soundTips: [
        "LL is pronounced like the English Y in most of Latin America.",
        "Stress the first syllable."
    ],

    image: "../images/manuel-llave.png",

    imageAlt: "A key",

    audioBeginner: "../audio/s-llave.wav",

    audioNatural: "../audio/llave.wav"
},

{
    word: "Perro",

    pronunciation: "PEH-rroh",

    meaning: "Dog",

    soundTips: [
        "RR is rolled.",
        "Hold the tongue briefly to trill the R."
    ],

    image: "../images/perro2.jpg",

    imageAlt: "A dog",

    audioBeginner: "../audio/s-perro.wav",

    audioNatural: "../audio/perro.wav"
},

{
    word: "Jalapeño",

    pronunciation: "hah-lah-PEH-nyoh",

    meaning: "Jalapeño pepper",

    soundTips: [
        "J sounds like the English H.",
        "Ñ sounds like 'ny'."
    ],

    image: "../images/jalapeno.jpg",

    imageAlt: "A jalapeño pepper",

    audioBeginner: "../audio/s-jalapeno.wav",

    audioNatural: "../audio/jalapeno.wav"
},

{
    word: "Carro",

    pronunciation: "KAH-rroh",

    meaning: "Car",

    soundTips: [
        "RR is rolled.",
        "Stress the first syllable."
    ],

    image: "../images/carro2.jpg",

    imageAlt: "A car",

    audioBeginner: "../audio/s-carro.wav",

    audioNatural: "../audio/carro.wav"
},

{
    word: "Llorando",

    pronunciation: "yoh-RAHN-doh",

    meaning: "Crying",

    soundTips: [
        "LL is pronounced like the English Y in most of Latin America.",
        "Stress the middle syllable."
    ],

    image: "../images/jose-llorando2.png",

    imageAlt: "A boy crying",

    audioBeginner: "../audio/s-llorando.wav",

    audioNatural: "../audio/llorando.wav"
},

{
    word: "Piñata",

    pronunciation: "pee-NYAH-tah",

    meaning: "Piñata",

    soundTips: [
        "Ñ sounds like 'ny'.",
        "Stress the middle syllable."
    ],

    image: "../images/manuel-pinata.png",

    imageAlt: "A colorful piñata",

    audioBeginner: "../audio/s-pinata.wav",

    audioNatural: "../audio/pinata.wav"
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

                <img
                src="../images/sofia-avatar.png"
                alt="Sofía"
                >

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

        <span>Sofía's Assessment</span>

        <strong class="mastery-rating">
        ${feedback.title}
        </strong>

        <small class="mastery-score">
        Pronunciation score: ${overall}%
        </small>

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

    const feedbackLevels = {

        nativeLike: [
            {
                title: "🌟 Native-like",
                message:
                    "That sounded exceptionally natural. Outstanding work!"
            },
            {
                title: "🌟 Native-like",
                message:
                    "Beautifully spoken! Your pronunciation was smooth and confident."
            },
            {
                title: "🌟 Native-like",
                message:
                    "Fantastic! Every sound came through clearly and naturally."
            },
            {
                title: "🌟 Native-like",
                message:
                    "That was remarkably polished. You made it sound effortless!"
            },
            {
                title: "🌟 Native-like",
                message:
                    "Wonderful pronunciation! That sounded ready for a real conversation."
            }
        ],

        excellent: [
            {
                title: "⭐ Excellent",
                message:
                    "Your pronunciation sounded clear and natural. Beautiful work!"
            },
            {
                title: "⭐ Excellent",
                message:
                    "Excellent pronunciation! I understood every sound clearly."
            },
            {
                title: "⭐ Excellent",
                message:
                    "You nailed it! That was confident and very natural."
            },
            {
                title: "⭐ Excellent",
                message:
                    "Outstanding work! Your pronunciation was strong and smooth."
            },
            {
                title: "⭐ Excellent",
                message:
                    "Wonderful job! Every syllable came through clearly."
            },
            {
                title: "⭐ Excellent",
                message:
                    "That sounded great! Keep speaking with that same confidence."
            },
            {
                title: "⭐ Excellent",
                message:
                    "Beautifully spoken! Your practice is really paying off."
            },
            {
                title: "⭐ Excellent",
                message:
                    "Very impressive! That pronunciation sounded natural and clear."
            },
            {
                title: "⭐ Excellent",
                message:
                    "Fantastic work! You are building excellent pronunciation habits."
            },
            {
                title: "⭐ Excellent",
                message:
                    "That made me smile. Excellent pronunciation!"
            }
        ],

        veryGood: [
            {
                title: "👍 Very Good",
                message:
                    "Very nice! Just a small adjustment could make it sound even more natural."
            },
            {
                title: "👍 Very Good",
                message:
                    "Great pronunciation! You are getting closer with every attempt."
            },
            {
                title: "👍 Very Good",
                message:
                    "Nicely done! Listen once more for the smaller sound details."
            },
            {
                title: "👍 Very Good",
                message:
                    "You are doing really well. One more try could make it excellent."
            },
            {
                title: "👍 Very Good",
                message:
                    "Strong work! Your pronunciation was clear and easy to understand."
            }
        ],

        good: [
            {
                title: "🙂 Good",
                message:
                    "Nice effort! You are definitely moving in the right direction."
            },
            {
                title: "🙂 Good",
                message:
                    "Good work! Try smoothing out the sounds with one more attempt."
            },
            {
                title: "🙂 Good",
                message:
                    "I understood you. Listen again and try matching the rhythm."
            },
            {
                title: "🙂 Good",
                message:
                    "You are making progress! Try saying the word a little more slowly."
            },
            {
                title: "🙂 Good",
                message:
                    "That was a solid attempt. Keep practicing and it will feel more natural."
            }
        ],

        needsPractice: [
            {
                title: "📚 Needs Practice",
                message:
                    "You are getting there! Listen carefully and try matching the example."
            },
            {
                title: "📚 Needs Practice",
                message:
                    "Let’s slow it down and focus on each syllable."
            },
            {
                title: "📚 Needs Practice",
                message:
                    "Keep going! Another careful attempt can make a big difference."
            },
            {
                title: "📚 Needs Practice",
                message:
                    "Listen once more, take your time, and try the word again."
            }
        ],

        keepPracticing: [
            {
                title: "💪 Keep Practicing",
                message:
                    "Good effort! Focus on each sound and do not rush."
            },
            {
                title: "💪 Keep Practicing",
                message:
                    "You are building the sound step by step. Give it another try."
            },
            {
                title: "💪 Keep Practicing",
                message:
                    "Take your time and repeat the word one syllable at a time."
            },
            {
                title: "💪 Keep Practicing",
                message:
                    "Every attempt helps. Listen carefully and try again when you are ready."
            }
        ],

        practiceTogether: [
            {
                title: "🎯 Let’s Practice Together",
                message:
                    "You are off to a good start. Listen again and repeat the word slowly."
            },
            {
                title: "🎯 Let’s Practice Together",
                message:
                    "Do not worry. Let’s listen closely and try it one more time."
            },
            {
                title: "🎯 Let’s Practice Together",
                message:
                    "Take your time. Every attempt helps your pronunciation improve."
            },
            {
                title: "🎯 Let’s Practice Together",
                message:
                    "Mistakes are part of learning. Listen, repeat, and keep going."
            }
        ]

    };


    let feedbackPool;


    if (score >= 98) {
        feedbackPool =
            feedbackLevels.nativeLike;
    }
    else if (score >= 94) {
        feedbackPool =
            feedbackLevels.excellent;
    }
    else if (score >= 88) {
        feedbackPool =
            feedbackLevels.veryGood;
    }
    else if (score >= 80) {
        feedbackPool =
            feedbackLevels.good;
    }
    else if (score >= 70) {
        feedbackPool =
            feedbackLevels.needsPractice;
    }
    else if (score >= 60) {
        feedbackPool =
            feedbackLevels.keepPracticing;
    }
    else {
        feedbackPool =
            feedbackLevels.practiceTogether;
    }


    const randomIndex =
        Math.floor(
            Math.random() *
            feedbackPool.length
        );


    return feedbackPool[randomIndex];

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

    if (
        typeof SharedAudio !== "undefined" &&
        typeof SharedAudio.stopCurrentAudio === "function"
    ) {
        SharedAudio.stopCurrentAudio();
    }

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
    document.getElementById(
        "practice-word-audio-button"
    );

    const previousButton =
        document.getElementById(
            "previous-practice-word"
        );

    const nextButton =
        document.getElementById(
            "next-practice-word"
        );

        const imageElement =
    document.getElementById(
        "practice-word-image"
    );


    wordElement.textContent =
        wordData.word;

    pronunciationElement.textContent =
        wordData.pronunciation;

    meaningElement.textContent =
        wordData.meaning;

    if (imageElement) {

    if (wordData.image) {

        imageElement.src =
            wordData.image;

        imageElement.alt =
            wordData.imageAlt || wordData.word;

        imageElement.hidden = false;

    } else {

        imageElement.removeAttribute("src");
        imageElement.alt = "";
        imageElement.hidden = true;

    }

}


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

        [
    wordData.audioBeginner,
    wordData.audioNatural
]
.filter(Boolean)
.forEach(audioSource => {

    const preloadAudio =
        new Audio(audioSource);

    preloadAudio.preload = "auto";
    preloadAudio.load();

});


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

updatePronunciationWord();
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