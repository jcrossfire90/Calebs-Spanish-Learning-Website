// ======================================================
// LESSON 2 PRONUNCIATION CHALLENGE
// ======================================================


// ======================================================
// CHALLENGE QUESTIONS
// ======================================================

const challengeQuestions = [

    // QUESTION 1

    {
        type: "picture-listening",

        prompt:
            "Listen carefully. Which picture matches what you hear?",

        audioBeginner:
            "../audio/s-perro.wav",

        audioNatural:
            "../audio/perro.wav",

        correctAnswer: 2,

        choices: [

            {
                image: "../images/carro2.jpg",
                alt: "Car"
            },

            {
                image: "../images/pina.jpg",
                alt: "Pineapple"
            },

            {
                image: "../images/perro2.jpg",
                alt: "Dog"
            },

            {
                image: "../images/hospital.jpg",
                alt: "Hospital"
            }

        ]
    }

];


// ======================================================
// CHALLENGE STATE
// ======================================================

let currentQuestion = 0;
let score = 0;
let questionAnswered = false;


// ======================================================
// PAGE ELEMENTS
// ======================================================

const startButton =
    document.getElementById(
        "start-challenge-button"
    );

const introduction =
    document.querySelector(
        ".challenge-introduction"
    );

const challengeArea =
    document.getElementById(
        "challenge-area"
    );


// ======================================================
// START CHALLENGE
// ======================================================

startButton.addEventListener(
    "click",
    () => {

        introduction.hidden = true;

        challengeArea.hidden = false;

        renderQuestion();

    }
);


// ======================================================
// RENDER QUESTION
// ======================================================

function renderQuestion() {

    questionAnswered = false;

    const card =
        document.getElementById(
            "challenge-card"
        );

    const question =
        challengeQuestions[
            currentQuestion
        ];


    card.innerHTML = `

        <div class="challenge-question-heading">

            <span class="challenge-question-type">
                🎧 Listening Challenge
            </span>

            <h2>
                ${question.prompt}
            </h2>

        </div>


        <button
            type="button"
            class="pronunciation-audio-button challenge-listen-button"
            data-audio-beginner="${question.audioBeginner}"
            data-audio-natural="${question.audioNatural}"
        >
            ▶ Listen
        </button>


        <div class="challenge-picture-grid">

            ${question.choices.map(
                (choice, index) => `

                    <button
                        type="button"
                        class="challenge-picture-choice"
                        data-index="${index}"
                        aria-label="${choice.alt}"
                    >

                        <img
                            src="${choice.image}"
                            alt="${choice.alt}"
                        >

                        <span
                            class="challenge-answer-icon"
                        ></span>

                    </button>

                `
            ).join("")}

        </div>


        <div
            id="challenge-feedback"
            class="challenge-feedback"
            hidden
        ></div>


        <button
            id="continue-challenge-button"
            class="continue-challenge-button"
            type="button"
            hidden
        >
            Continue →
        </button>

    `;


    // Connect newly created Listen button.

    SharedAudio.initialize();


    const choices =
        document.querySelectorAll(
            ".challenge-picture-choice"
        );

    const feedbackElement =
        document.getElementById(
            "challenge-feedback"
        );

    const continueButton =
        document.getElementById(
            "continue-challenge-button"
        );


    // Update progress when the question loads.

    updateChallengeProgress();


    // ==================================================
    // ANSWER CHOICES
    // ==================================================

    choices.forEach(choice => {

        choice.addEventListener(
            "click",
            () => {

                if (questionAnswered) {
                    return;
                }


                questionAnswered = true;


                const selected =
                    Number(
                        choice.dataset.index
                    );


                const correctChoice =
                    choices[
                        question.correctAnswer
                    ];


                choices.forEach(button => {

                    button.disabled = true;

                });


                // ======================================
                // CORRECT ANSWER
                // ======================================

                if (
                    selected ===
                    question.correctAnswer
                ) {

                    score++;


                    choice.classList.add(
                        "challenge-correct"
                    );


                    choice
                        .querySelector(
                            ".challenge-answer-icon"
                        )
                        .textContent = "✓";


                    feedbackElement.className =
                        "challenge-feedback challenge-feedback-correct";


                    feedbackElement.innerHTML = `

                        <img
                            src="../images/sofia-avatar.png"
                            alt="Sofía"
                            class="challenge-feedback-avatar"
                        >

                        <div>

                            <span class="challenge-feedback-label">
                                Sofía says...
                            </span>

                            <strong>
                                ¡Excelente!
                            </strong>

                            <p>
                                You matched the sound correctly.
                            </p>

                        </div>

                    `;

                }


                // ======================================
                // INCORRECT ANSWER
                // ======================================

                else {

                    choice.classList.add(
                        "challenge-incorrect"
                    );


                    choice
                        .querySelector(
                            ".challenge-answer-icon"
                        )
                        .textContent = "✕";


                    correctChoice.classList.add(
                        "challenge-correct"
                    );


                    correctChoice
                        .querySelector(
                            ".challenge-answer-icon"
                        )
                        .textContent = "✓";


                    feedbackElement.className =
                        "challenge-feedback challenge-feedback-incorrect";


                    feedbackElement.innerHTML = `

                        <img
                            src="../images/sofia-avatar.png"
                            alt="Sofía"
                            class="challenge-feedback-avatar"
                        >

                        <div>

                            <span class="challenge-feedback-label">
                                Sofía says...
                            </span>

                            <strong>
                                Almost!
                            </strong>

                            <p>
                                Listen carefully and remember this sound for next time.
                            </p>

                        </div>

                    `;

                }


                feedbackElement.hidden = false;

                continueButton.hidden = false;

                updateChallengeProgress();

            }
        );

    });


    // ==================================================
    // CONTINUE BUTTON
    // ==================================================

    continueButton.addEventListener(
        "click",
        () => {

            currentQuestion++;


            if (
                currentQuestion <
                challengeQuestions.length
            ) {

                renderQuestion();

                return;

            }


            showTemporaryCompletion();

        }
    );

}


// ======================================================
// UPDATE CHALLENGE PROGRESS
// ======================================================

function updateChallengeProgress() {

    const numberElement =
        document.getElementById(
            "challenge-number"
        );

    const scoreElement =
        document.getElementById(
            "challenge-score"
        );

    const progressFill =
        document.getElementById(
            "challenge-progress-fill"
        );


    /*
     * The finished challenge will contain 10 questions.
     * We currently have only Question 1 built.
     */

    const totalQuestions = 10;

    const displayedQuestion =
        Math.min(
            currentQuestion + 1,
            totalQuestions
        );

    const progressPercent =
        (
            displayedQuestion /
            totalQuestions
        ) * 100;


    if (numberElement) {

        numberElement.textContent =
            `Question ${displayedQuestion} of ${totalQuestions}`;

    }


    if (scoreElement) {

        scoreElement.textContent =
            `Score: ${score}`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${progressPercent}%`;

    }

}


// ======================================================
// TEMPORARY END OF CURRENT BUILD
// ======================================================

function showTemporaryCompletion() {

    const card =
        document.getElementById(
            "challenge-card"
        );


    card.innerHTML = `

        <div class="challenge-question-heading">

            <span class="challenge-question-type">
                ✓ Question 1 Complete
            </span>

            <h2>
                Great work!
            </h2>

            <p>
                The next challenge question will appear here
                as we continue building the assessment.
            </p>

        </div>

    `;

}