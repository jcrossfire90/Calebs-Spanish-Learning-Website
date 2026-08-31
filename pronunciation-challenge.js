// ======================================================
// LESSON 2 CHALLENGE
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
// START CHALLENGE
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

startButton.addEventListener(
    "click",
    () => {

        introduction.hidden = true;

        challengeArea.hidden = false;

        renderQuestion();

    }
);

let currentQuestion = 0;

function renderQuestion() {

    const card =
        document.getElementById(
            "challenge-card"
        );

    const question =
        challengeQuestions[currentQuestion];

    card.innerHTML = `

        <h2>

            ${question.prompt}

        </h2>

        <button
            class="pronunciation-audio-button"
            data-audio-beginner="${question.audioBeginner}"
            data-audio-natural="${question.audioNatural}"
        >

            ▶ Listen

        </button>

        <div class="challenge-picture-grid">

            ${question.choices.map((choice, index) => `

                <button
                    class="challenge-picture-choice"
                    data-index="${index}"
                >

                    <img
                        src="${choice.image}"
                        alt="${choice.alt}"
                    >

                </button>

            `).join("")}

        </div>

    `;

    SharedAudio.initialize();

    const choices =
    document.querySelectorAll(
        ".challenge-picture-choice"
    );

choices.forEach(choice => {

    choice.addEventListener(
        "click",
        () => {

            const selected =
                Number(
                    choice.dataset.index
                );

            if (
                selected ===
                question.correctAnswer
            ) {

                choice.classList.add(
                    "challenge-correct"
                );

                alert("Correct!");

            } else {

                choice.classList.add(
                    "challenge-incorrect"
                );

                choices[
                    question.correctAnswer
                ].classList.add(
                    "challenge-correct"
                );

                alert("Not quite!");

            }

        }
    );

});

}