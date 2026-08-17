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

const stopButton =
    document.getElementById("stopButton");

const playButton =
    document.getElementById("playButton");

const retryButton =
    document.getElementById("retryButton");


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
    stopButton &&
    playButton &&
    retryButton
) {

    recordButton.addEventListener(
        "click",
        startRecording
    );

    stopButton.addEventListener(
        "click",
        stopRecording
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


        recordButton.disabled = true;
        stopButton.disabled = false;
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


// ======================================================
// HELPERS
// ======================================================

function resetButtons() {

    if (recordButton) {
        recordButton.disabled = false;
    }

    if (stopButton) {
        stopButton.disabled = true;
    }

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