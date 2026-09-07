// ======================================================
// LESSON 2 PRONUNCIATION CHALLENGE
// ======================================================

// ======================================================
// SOFIA FEEDBACK RESPONSES
// ======================================================

const sofiaCorrectResponses = [
    {
        title: "¡Excelente!",
        message: "You matched the sound correctly.",
        avatar: "../images/Sofia/sofia-proud.png"
    },
    {
        title: "¡Muy bien!",
        message: "Your listening skills are getting stronger.",
        avatar: "../images/Sofia/sofia-encouraging.png"
    },
    {
        title: "¡Perfecto!",
        message: "You heard that one exactly right.",
        avatar: "../images/Sofia/sofia-proud.png"
    },
    {
        title: "¡Eso es!",
        message: "You recognized the sound correctly.",
        avatar: "../images/Sofia/sofia-encouraging.png"
    },
    {
        title: "¡Buen trabajo!",
        message: "You're really starting to hear the difference.",
        avatar: "../images/Sofia/sofia-encouraging.png"
    },
    {
        title: "¡Así se hace!",
        message: "That's exactly the sound I wanted you to recognize.",
        avatar: "../images/Sofia/sofia-proud.png"
    },
    {
        title: "¡Fantástico!",
        message: "Your ear for Spanish is improving.",
        avatar: "../images/Sofia/sofia-proud.png"
    },
    {
        title: "¡Correcto!",
        message: "You identified that sound perfectly.",
        avatar: "../images/Sofia/sofia-encouraging.png"
    }
];

const sofiaIncorrectResponses = [
    {
        title: "¡Casi!",
        message: "Listen closely to the difference and remember it for next time.",
        avatar: "../images/Sofia/sofia-gentle.png"
    },
    {
        title: "Buen intento.",
        message: "That one can be tricky. Listen carefully for the sound next time.",
        avatar: "../images/Sofia/sofia-encouraging.png"
    },
    {
        title: "No pasa nada.",
        message: "Mistakes help train your ear. Keep going!",
        avatar: "../images/Sofia/sofia-gentle.png"
    },
    {
        title: "¡Sigue practicando!",
        message: "Pay attention to how the sounds differ.",
        avatar: "../images/Sofia/sofia-corrective.png"
    },
    {
        title: "Estuviste cerca.",
        message: "Keep that sound in mind—you may hear it again.",
        avatar: "../images/Sofia/sofia-thinking.png"
    }
];

let lastSofiaCorrectResponse = -1;
let lastSofiaIncorrectResponse = -1;

function getRandomSofiaResponse(
    responses,
    lastIndex
) {

    if (responses.length === 1) {
        return {
            response: responses[0],
            index: 0
        };
    }

    let newIndex;

    do {

        newIndex =
            Math.floor(
                Math.random() *
                responses.length
            );

    } while (
        newIndex === lastIndex
    );


    return {
        response: responses[newIndex],
        index: newIndex
    };

}


// ======================================================
// CHALLENGE QUESTIONS
// ======================================================

const challengeQuestions = [

    // QUESTION 1

    {
        type: "picture-listening",

        prompt:
            "Listen carefully. Which picture matches what you hear?",

        audio:
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
    },
// QUESTION 2
    {
    type: "picture-listening",

    prompt:
        "Listen carefully. Which picture matches what you hear?",

    audio:
        "../audio/llave.wav",

    correctAnswer: 1,

    choices: [

        {
            image: "../images/jalapeno.jpg",
            alt: "Jalapeño pepper"
        },

        {
            image: "../images/manuel-llave.png",
            alt: "Key"
        },

        {
            image: "../images/carro2.jpg",
            alt: "Car"
        },

        {
            image: "../images/perro2.jpg",
            alt: "Dog"
        }

    ]
},
// QUESTION 3
{
    type: "picture-listening",

    prompt:
        "Listen carefully. Which picture matches what you hear?",

    audio:
        "../audio/jalapeno.wav",

    correctAnswer: 3,

    choices: [

        {
            image: "../images/hospital.jpg",
            alt: "Hospital"
        },

        {
            image: "../images/pina.jpg",
            alt: "Pineapple"
        },

        {
            image: "../images/carro2.jpg",
            alt: "Car"
        },

        {
            image: "../images/jalapeno.jpg",
            alt: "Jalapeño pepper"
        }

    ]
},
// QUESTION 4
{
    type: "picture-listening",

    prompt:
        "Listen carefully. Which picture matches what you hear?",

    audio:
        "../audio/nino.wav",

    correctAnswer: 0,

    choices: [

        {
            image: "../images/nino.png",
            alt: "Boy"
        },

        {
            image: "../images/pina.jpg",
            alt: "Pineapple"
        },

        {
            image: "../images/hospital.jpg",
            alt: "Hospital"
        },

        {
            image: "../images/carro2.jpg",
            alt: "Car"
        }

    ]
},
// QUESTION 5
{
    type: "picture-listening",

    prompt:
        "Listen carefully. Which picture matches what you hear?",

    audio:
        "../audio/hielo.wav",

    correctAnswer: 2,

    choices: [

        {
            image: "../images/perro2.jpg",
            alt: "Dog"
        },

        {
            image: "../images/pina.jpg",
            alt: "Pineapple"
        },

        {
            image: "../images/hielo.jpg",
            alt: "Ice"
        },

        {
            image: "../images/hospital.jpg",
            alt: "Hospital"
        }

    ]
},

// QUESTION 6

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which special Spanish sound do you hear?",

    audio:
        "../audio/pina.wav",

    correctAnswer: 1,

    choices: [

        {
            label: "N sound",
            symbol: "N",
            description: "Like the N in no"
        },

        {
            label: "Ñ sound",
            symbol: "Ñ",
            description: "Like the NY sound in canyon"
        }

    ]

},

// QUESTION 7

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which sound do you hear at the beginning?",

    audio:
        "../audio/jose.wav",

    correctAnswer: 1,

    choices: [

    {
        label: "English H sound",
        symbol: "H",
        description: "A soft breath of air"
    },

    {
        label: "Spanish J sound",
        symbol: "J",
        description: "A stronger sound made farther back in the throat"
    }

]

},

// QUESTION 8

{
    type: "sound-choice",
    compact: true,
    prompt:
        "Listen carefully. Which word do you hear?",

    audio:
        "../audio/pero.wav",

    correctAnswer: 0,

    choices: [

        {
            label: "pero",
            description: "but"
        },

        {
            label: "perro",
            description: "dog"
        }

    ]

},
// QUESTION 9

{
    type: "sound-choice",

    prompt:
        "Listen carefully to the beginning of the word. What happens to the H?",

    audio:
        "../audio/hospital.wav",

    correctAnswer: 0,

    choices: [

        {
            label: "The H is silent",
            description: "The word begins directly with the vowel sound"
        },

        {
            label: "The H is pronounced",
            description: "You hear a breathy H sound before the vowel"
        }

    ]

},

// QUESTION 10

{
    type: "sound-choice",

    prompt:
        "Listen carefully. How would you describe the special sound you hear in the middle?",

    audio:
        "../audio/manana.wav",

    correctAnswer: 1,

    choices: [

        {
            label: "Regular N sound",
            description: "A normal N sound, like the N in no"
        },

        {
            label: "NY-like sound",
            description: "A blended sound produced as one consonant"
        },

        {
            label: "Two separate sounds",
            description: "An N sound followed by a separate Y sound"
        }

    ]

},
// QUESTION 11

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which consonant sound do you hear near the end of the word?",

    audio:
        "../audio/sueno.wav",

    correctAnswer: 0,

    choices: [

        {
            label: "NY-like sound",
            description: "A single blended consonant sound"
        },

        {
            label: "Regular N sound",
            description: "A normal N sound"
        },

        {
            label: "N followed by Y",
            description: "Two separate consonant sounds"
        }

    ]

},
// QUESTION 12

{
    type: "sound-choice",

    prompt:
    "Listen carefully. Which pronunciation feature do you hear?",

    audio:
        "../audio/teja.wav",

    correctAnswer: 2,

    choices: [

    {
        label: "Smooth palatal sound",
        description: "A smooth consonant sound formed toward the front of the mouth"
    },

    {
        label: "Quick tongue tap",
        description: "The tongue makes one brief contact"
    },

    {
        label: "Strong breathy sound",
        description: "A stronger consonant sound produced farther back in the throat"
    }

]

},
// QUESTION 13

{
    type: "sound-choice",

    prompt:
        "Listen carefully to the beginning of the word. What do you hear?",

    audio:
        "../audio/humo.wav",

    correctAnswer: 1,

    choices: [

        {
            label: "A breathy H sound",
            description: "Air is released before the first vowel sound"
        },

        {
            label: "No H sound",
            description: "The word begins directly with a vowel sound"
        },

        {
            label: "A strong throat sound",
            description: "A rough consonant sound comes before the vowel"
        }

    ]

},
// QUESTION 14

{
    type: "sound-choice",

    prompt:
        "Listen carefully to the consonant sound in the middle. How would you describe it?",

    audio:
        "../audio/cara.wav",

    correctAnswer: 0,

    choices: [

        {
            label: "Quick R tap",
            description: "The tongue makes one brief contact"
        },

        {
            label: "Rolled R",
            description: "The tongue produces a longer trill"
        },

        {
            label: "D-like sound",
            description: "The sound is formed like a clear D consonant"
        }

    ]

},
// QUESTION 15

{
    type: "sound-choice",

    prompt:
        "Listen carefully to the R sound in the middle. How would you describe it?",

    audio:
        "../audio/barrio.wav",

    correctAnswer: 2,

    choices: [

        {
            label: "Quick R tap",
            description: "The tongue makes one brief contact"
        },

        {
            label: "Soft breathy sound",
            description: "Air passes gently through without a trill"
        },

        {
            label: "Rolled R",
            description: "The tongue produces a stronger trilled sound"
        }

    ]

},
// QUESTION 16

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which pronunciation feature do you hear?",

    audio:
        "../audio/calle.wav",

    correctAnswer: 1,

    choices: [

    {
        label: "NY-like sound",
        description: "A single blended consonant sound"
    },

    {
        label: "Smooth palatal sound",
        description: "A smooth consonant sound formed toward the front of the mouth"
    },

    {
        label: "Strong breathy sound",
        description: "A stronger sound produced farther back in the throat"
    }

    ]

},
// QUESTION 17

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which pronunciation feature do you hear?",

    audio:
        "../audio/otono.wav",

    correctAnswer: 2,

    choices: [

        {
            label: "Quick tongue tap",
            description: "The tongue makes one brief contact"
        },

        {
            label: "Strong breathy sound",
            description: "A stronger sound produced farther back in the throat"
        },

        {
            label: "NY-like sound",
            description: "A single blended consonant sound"
        }

    ]

},
// QUESTION 18

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which pronunciation feature do you hear?",

    audio:
        "../audio/abeja.wav",

    correctAnswer: 0,

    choices: [

        {
            label: "Strong breathy sound",
            description: "A stronger consonant sound produced farther back in the throat"
        },

        {
            label: "Smooth palatal sound",
            description: "A smooth consonant sound formed toward the front of the mouth"
        },

        {
            label: "Rolled tongue sound",
            description: "The tongue produces a noticeable trill"
        }

    ]

},
// QUESTION 19

{
    type: "sound-choice",

    prompt:
        "Listen carefully. Which word matches the pronunciation you hear?",

    audio:
        "../audio/corro.wav",

    correctAnswer: 1,

    choices: [

        {
            label: "coro",
            description: "Single, quick R tap"
        },

        {
            label: "corro",
            description: "Strong rolled R"
        },

        {
            label: "cohro",
            description: "A silent H sound before the R"
        }

    ]

},
// QUESTION 20

{
    type: "sound-choice",

    prompt:
        "Final challenge! Listen carefully. Which written word best matches what you hear?",

    audio:
        "../audio/caballo.wav",

    correctAnswer: 2,

    choices: [

        {
            label: "cabano",
            description: "Uses a regular N sound"
        },

        {
            label: "cabaño",
            description: "Uses an NY-like blended sound"
        },

        {
            label: "caballo",
            description: "Uses the smooth palatal sound"
        }

    ]

},

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

        setTimeout(() => {

            challengeArea.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

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
           data-audio="${question.audio}"
        >
            ▶ Listen
        </button>

        <div class="challenge-question-content">

    ${question.type === "picture-listening" ? `

    <div class="challenge-picture-grid">

        ${question.choices.map((choice, index) => `

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

                <span class="challenge-answer-icon"></span>

            </button>

        `).join("")}

    </div>

` : (
    question.type === "sound-choice" ||
    question.type === "word-choice"
) ? `

    <div class="challenge-sound-grid">

        ${question.choices.map((choice, index) => `

            <button
                type="button"
                class="challenge-picture-choice challenge-sound-choice ${question.compact ? "challenge-word-choice" : ""}"
                data-index="${index}"
                aria-label="${choice.label}"
            >

                ${choice.symbol ? `

             <span class="challenge-sound-symbol">
                 ${choice.symbol}
             </span>

            ` : ""}

            <strong class="challenge-sound-label">
                ${choice.label}
            </strong>

                ${choice.description ? `

            <span class="challenge-sound-description">
                 ${choice.description}
            </span>

        ` : ""}

                <span class="challenge-answer-icon"></span>

            </button>

        `).join("")}

    </div>

` : ""}


    <div
        id="challenge-feedback"
        class="challenge-feedback"
        hidden
    ></div>

</div>


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

    const sofiaChoice =
        getRandomSofiaResponse(
            sofiaCorrectResponses,
            lastSofiaCorrectResponse
        );

    lastSofiaCorrectResponse =
        sofiaChoice.index;

    feedbackElement.innerHTML = `

        <img
            src="${sofiaChoice.response.avatar}"
            alt="Sofía"
            class="challenge-feedback-avatar"
        >

        <div>

            <span class="challenge-feedback-label">
                Sofía says...
            </span>

            <strong>
                ${sofiaChoice.response.title}
            </strong>

            <p>
                ${sofiaChoice.response.message}
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

    const sofiaChoice =
        getRandomSofiaResponse(
            sofiaIncorrectResponses,
            lastSofiaIncorrectResponse
        );

    lastSofiaIncorrectResponse =
        sofiaChoice.index;

    feedbackElement.innerHTML = `

        <img
            src="${sofiaChoice.response.avatar}"
            alt="Sofía"
            class="challenge-feedback-avatar"
        >

        <div>

            <span class="challenge-feedback-label">
                Sofía says...
            </span>

            <strong>
                ${sofiaChoice.response.title}
            </strong>

            <p>
                ${sofiaChoice.response.message}
            </p>

        </div>

    `;

}

feedbackElement.hidden = false;

continueButton.hidden = false;

updateChallengeProgress();

window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "instant"
});

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

        showChallengeResults();

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
 * The finished challenge will contain 20 questions.
 */

    const totalQuestions =
    challengeQuestions.length;

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
// CHALLENGE RESULTS
// ======================================================

function showChallengeResults() {

    const card =
        document.getElementById(
            "challenge-card"
        );

    const totalQuestions =
        challengeQuestions.length;

    const percentage =
        Math.round(
            (score / totalQuestions) * 100
        );

    const passed =
        percentage >= 80;


    // ==================================================
    // PASSED
    // ==================================================

    if (passed) {

    const lessonCompletion =
    ProgressEngine.completeLesson(
        "lesson-2-pronunciation"
    );

        card.innerHTML = `

            <div class="challenge-results challenge-results-pass">

                <img
                    src="../images/Sofia/sofia-proud.png"
                    alt="Sofía"
                    class="challenge-results-sofia"
                >

                <span class="challenge-results-label">
                    Sofía says...
                </span>

                <h2>
                    🎉 ¡Lo lograste!
                </h2>

                <p class="challenge-results-message">
                    You passed Sofía's Pronunciation Challenge!
                </p>

                <div class="challenge-final-score">

                    <strong>
                        ${score} / ${totalQuestions}
                    </strong>

                    <span>
                        ${percentage}%
                    </span>

                </div>

                <div class="challenge-reward">
                 ${lessonCompletion.newlyCompleted
                 ? "🏆 +" + lessonCompletion.xpAwarded + " XP"
                : "🏆 XP already awarded"}
                </div>

                <p class="challenge-unlocked">
                    🔓 Lesson 3: Greetings Unlocked
                </p>

                <a
                    href="greetings.html"
                    class="challenge-next-lesson"
                >
                    Continue to Lesson 3 →
                </a>

            </div>

        `;

    }


    // ==================================================
    // DID NOT PASS
    // ==================================================

    else {

        card.innerHTML = `

            <div class="challenge-results challenge-results-retry">

                <img
                    src="../images/Sofia/sofia-encouraging.png"
                    alt="Sofía"
                    class="challenge-results-sofia"
                >

                <span class="challenge-results-label">
                    Sofía says...
                </span>

                <h2>
                    ¡Buen intento!
                </h2>

                <p class="challenge-results-message">
                    You're getting there. Review the sounds
                    that gave you trouble and try again.
                </p>

                <div class="challenge-final-score">

                    <strong>
                        ${score} / ${totalQuestions}
                    </strong>

                    <span>
                        ${percentage}%
                    </span>

                </div>

                <p class="challenge-passing-requirement">
                    🎯 You need 80% to pass
                    (${Math.ceil(totalQuestions * 0.8)} correct).
                </p>

                <p class="challenge-locked-message">
                    🔒 Lesson 3 remains locked for now.
                </p>

                <button
                    id="retry-challenge-button"
                    class="start-challenge-button"
                    type="button"
                >
                    ↻ Try Challenge Again
                </button>

            </div>

        `;


        const retryButton =
            document.getElementById(
                "retry-challenge-button"
            );

        retryButton.addEventListener(
            "click",
            () => {

                currentQuestion = 0;
                score = 0;
                questionAnswered = false;

                renderQuestion();

                updateChallengeProgress();

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }
        );

    }


    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "instant"
    });

}