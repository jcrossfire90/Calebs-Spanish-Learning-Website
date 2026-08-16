/* ================================================================ */
/* GENERIC LEVEL-BASED LISTENING ACTIVITY                           */
/* ================================================================ */

const ListeningActivity = (() => {

    let activityData = null;

    let audioMode =
    localStorage.getItem("listeningAudioMode") ||
    "beginner";

    let currentLevelIndex = 0;
    let currentQuestionNumber = 0;

    let questionDeck = [];
    let currentQuestion = null;

    let correctCount = 0;
    let missCount = 0;

    let answered = false;


    /* ============================================================ */
    /* HELPERS                                                      */
    /* ============================================================ */

    function getElement(id) {

        const element =
            document.getElementById(id);

        if (!element) {

            console.error(
                `Listening Activity element not found: ${id}`
            );

        }

        return element;

    }


    function normalizeAnswer(answer) {

        return answer
            .toLowerCase()
            .trim();

    }


    function shuffleArray(array) {

        const shuffled = [...array];

        for (
            let i = shuffled.length - 1;
            i > 0;
            i--
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                shuffled[i],
                shuffled[randomIndex]
            ] = [
                shuffled[randomIndex],
                shuffled[i]
            ];

        }

        return shuffled;

    }


    function getCurrentLevel() {

        return activityData.levels[
            currentLevelIndex
        ];

    }


    function getQuestionLimit() {

        const level =
            getCurrentLevel();

        return Math.min(
            level.questionCount ||
            level.questions.length,

            level.questions.length
        );

    }


    /* ============================================================ */
    /* QUESTION DECK                                                */
    /* ============================================================ */

    function buildQuestionDeck() {

        const level =
            getCurrentLevel();

        questionDeck =
            shuffleArray(level.questions);

    }


    function getNextQuestion() {

        if (questionDeck.length === 0) {

            buildQuestionDeck();

        }

        return questionDeck.pop();

    }


    /* ============================================================ */
    /* DISPLAY                                                      */
    /* ============================================================ */

    function loadQuestion() {

        currentQuestion =
            getNextQuestion();

        answered = false;

        const level =
            getCurrentLevel();

        const title =
            getElement("listening-activity-title");

        const levelDescription =
            getElement(
                "listening-activity-level-description"
            );

        const instructions =
            getElement(
                "listening-activity-instructions"
            );

        const prompt =
            getElement("listening-activity-prompt");

        const answerInput =
            getElement("listening-activity-answer");

        const response =
            getElement("listening-activity-response");

        const questionProgress =
            getElement(
                "listening-activity-question-progress"
            );

        if (
            !title ||
            !levelDescription ||
            !instructions ||
            !prompt ||
            !answerInput ||
            !response ||
            !questionProgress
        ) {
            return;
        }

        title.textContent =
            `${activityData.title} — Level ${
                currentLevelIndex + 1
            }`;

        levelDescription.textContent =
            level.title;

        instructions.textContent =
            activityData.instructions || "";

        prompt.textContent =
            currentQuestion.prompt;

        questionProgress.textContent =
            `Question ${
                currentQuestionNumber + 1
            } of ${getQuestionLimit()}`;

        answerInput.value = "";
        answerInput.disabled = false;

        response.innerHTML = "";

    }


    /* ============================================================ */
    /* AUDIO                                                        */
    /* ============================================================ */

  function getQuestionAudio() {

    if (
        audioMode === "beginner" &&
        currentQuestion.audioBeginner
    ) {
        return currentQuestion.audioBeginner;
    }

    if (
        audioMode === "natural" &&
        currentQuestion.audioNatural
    ) {
        return currentQuestion.audioNatural;
    }

    return (
        currentQuestion.audioNatural ||
        currentQuestion.audioBeginner ||
        currentQuestion.audio
    );

}


function playAudio() {

    if (!currentQuestion) {
        return;
    }

    const audioPath =
        getQuestionAudio();

    if (!audioPath) {

        console.error(
            "No audio file was provided for this question."
        );

        return;
    }

    const audio =
        new Audio(audioPath);

    audio.play().catch(error => {

        console.error(
            "Listening Activity audio could not play:",
            audioPath,
            error
        );

        const response =
            getElement(
                "listening-activity-response"
            );

        if (response) {

            response.innerHTML = `
                <span class="listening-error">
                    The audio file could not be found.
                </span>
            `;

        }

    });

}

function setAudioMode(mode) {

    if (
        mode !== "beginner" &&
        mode !== "natural"
    ) {
        return;
    }

    audioMode = mode;

    localStorage.setItem(
        "listeningAudioMode",
        mode
    );

    updateAudioModeDisplay();

}


function updateAudioModeDisplay() {

    const beginnerButton =
        document.getElementById(
            "audio-mode-beginner"
        );

    const naturalButton =
        document.getElementById(
            "audio-mode-natural"
        );

    const status =
        document.getElementById(
            "audio-mode-status"
        );

    if (beginnerButton) {

        beginnerButton.classList.toggle(
            "active-audio-mode",
            audioMode === "beginner"
        );

    }

    if (naturalButton) {

        naturalButton.classList.toggle(
            "active-audio-mode",
            audioMode === "natural"
        );

    }

    if (status) {

        status.textContent =
            audioMode === "beginner"
                ? "Beginner Audio"
                : "Natural Speed";

    }

}


    /* ============================================================ */
    /* ANSWER CHECKING                                              */
    /* ============================================================ */

    function submitAnswer() {

        if (
            answered ||
            !currentQuestion
        ) {
            return;
        }

        const answerInput =
            getElement(
                "listening-activity-answer"
            );

        const response =
            getElement(
                "listening-activity-response"
            );

        if (
            !answerInput ||
            !response
        ) {
            return;
        }

        const studentAnswer =
            normalizeAnswer(
                answerInput.value
            );

        if (studentAnswer === "") {

            response.innerHTML = `
                <span class="listening-error">
                    Type an answer before submitting.
                </span>
            `;

            answerInput.focus();

            return;
        }

        const acceptedAnswers =
            currentQuestion.acceptedAnswers.map(
                normalizeAnswer
            );

        answered = true;
        answerInput.disabled = true;

        if (
            acceptedAnswers.includes(
                studentAnswer
            )
        ) {

            correctCount++;

            response.innerHTML = `
                <span class="listening-correct">
                    ✅ Correct!
                </span>
            `;

            if (
                currentQuestion.correctFeedback
            ) {

                response.innerHTML += `
                    <br>
                    <span class="listening-feedback">
                        ${currentQuestion.correctFeedback}
                    </span>
                `;

            }

        }
        else {

            missCount++;

            response.innerHTML = `
                <span class="listening-incorrect">
                    ❌ Not correct.
                </span>
            `;

            if (
                currentQuestion.incorrectFeedback
            ) {

                response.innerHTML += `
                    <br>
                    <span class="listening-feedback">
                        ${currentQuestion.incorrectFeedback}
                    </span>
                `;

            }

        }

        updateCounters();

    }


    /* ============================================================ */
    /* NEXT QUESTION                                                */
    /* ============================================================ */

    function nextQuestion() {

        const response =
            getElement(
                "listening-activity-response"
            );

        if (!answered) {

            if (response) {

                response.innerHTML = `
                    <span class="listening-error">
                        Submit your answer before moving on.
                    </span>
                `;

            }

            return;

        }

        currentQuestionNumber++;

        if (
            currentQuestionNumber <
            getQuestionLimit()
        ) {

            loadQuestion();

        }
        else {

            finishLevel();

        }

    }


    /* ============================================================ */
    /* COUNTERS                                                     */
    /* ============================================================ */

    function updateCounters() {

        const correctElement =
            getElement(
                "listening-activity-correct-count"
            );

        const missElement =
            getElement(
                "listening-activity-miss-count"
            );

        if (correctElement) {

            correctElement.textContent =
                correctCount;

        }

        if (missElement) {

            missElement.textContent =
                missCount;

        }

    }


    /* ============================================================ */
    /* LEVEL COMPLETION                                             */
    /* ============================================================ */

    function finishLevel() {

        const level =
            getCurrentLevel();

        const response =
            getElement(
                "listening-activity-response"
            );

        const answerInput =
            getElement(
                "listening-activity-answer"
            );

        if (
            !response ||
            !answerInput
        ) {
            return;
        }

        answerInput.disabled = true;

        const passingScore =
            level.passingScore ??
            getQuestionLimit();

        if (
            correctCount >= passingScore
        ) {

            const isFinalLevel =
                currentLevelIndex ===
                activityData.levels.length - 1;

            if (!isFinalLevel) {

                response.innerHTML = `
                    <span class="listening-correct">
                        🎉 Level ${
                            currentLevelIndex + 1
                        } Passed!
                    </span>

                    <br><br>

                    <button
                        class="next-button"
                        type="button"
                        onclick="ListeningActivity.startNextLevel()">

                        Start Level ${
                            currentLevelIndex + 2
                        }

                    </button>
                `;

            }
           else {

    response.innerHTML = `
        <span class="listening-correct">
            🎉 ${
                activityData.completionMessage ||
                "Activity Complete!"
            }
        </span>
    `;

    if (
        activityData.completionActivityId &&
        typeof LessonCompletionEngine !== "undefined"
    ) {
        LessonCompletionEngine.completeActivity(
            activityData.completionActivityId
        );
    }

}

        }
        else {

            response.innerHTML = `
                <span class="listening-incorrect">
                    Level ${
                        currentLevelIndex + 1
                    } not passed.

                    You answered
                    ${correctCount} of
                    ${getQuestionLimit()}
                    correctly.
                </span>
            `;

        }

    }


    /* ============================================================ */
    /* START AND RESTART                                            */
    /* ============================================================ */

    function startLevel() {

        questionDeck = [];

        currentQuestionNumber = 0;

        correctCount = 0;
        missCount = 0;

        answered = false;
        currentQuestion = null;

        updateCounters();
        loadQuestion();

    }


    function startNextLevel() {

        if (
            currentLevelIndex <
            activityData.levels.length - 1
        ) {

            currentLevelIndex++;

        }

        startLevel();

    }


    function restartCurrentLevel() {

        startLevel();

    }


    function restartEntireActivity() {

        currentLevelIndex = 0;

        startLevel();

    }


    /* ============================================================ */
    /* ENTER KEY                                                    */
    /* ============================================================ */

    function enableEnterKey() {

        const answerInput =
            getElement(
                "listening-activity-answer"
            );

        if (!answerInput) {
            return;
        }

        answerInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Enter"
                ) {
                    return;
                }

                event.preventDefault();

                if (!answered) {

                    submitAnswer();

                }
                else {

                    nextQuestion();

                }

            }
        );

    }


    /* ============================================================ */
    /* INITIALIZE                                                   */
    /* ============================================================ */

    function initialize(data) {

        if (
            !data ||
            !Array.isArray(data.levels) ||
            data.levels.length === 0
        ) {

            console.error(
                "Listening Activity requires valid activity data."
            );

            return;

        }

        activityData = data;

        currentLevelIndex = 0;

       enableEnterKey();
       updateAudioModeDisplay();
       startLevel();

    }


    return {

    initialize,
    playAudio,
    setAudioMode,
    submitAnswer,
    nextQuestion,
    startNextLevel,
    restartCurrentLevel,
    restartEntireActivity

};

})();