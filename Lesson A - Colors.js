/* ================================================= */
/* VOCABULARY DATABASE */
/* ================================================= */

const vocabulary = [
    {
    word: "rojo",
    article: "el",
    image: "../images/rojo.jpg",
    audio1: "../audio/rojo.wav",
    audio2: "../audio/elrojo.wav",
    levels: [1,4]
   },
    {
        word: "amarillo",
        article: "el",
        image: "../images/amarillo.jpg",
        audio1: "../audio/amarillo.wav",
        audio2: "../audio/elamarillo.wav",
    levels: [1,3,4]
    },
    {
        word: "azul",
        article: "el",
        image: "../images/azul.jpg",
        audio1: "../audio/azul.wav",
        audio2: "../audio/elazul.wav",
    levels: [1,4]
    },
    {
        word: "naranja",
        article: "el",
        image: "../images/colornaranja.jpg",
        audio1: "../audio/colornaranja.wav",
        audio2: "../audio/elcolornaranja.wav",
    levels: [1,4]
    },
    {
        word: "verde",
        article: "el",
        image: "../images/verde.jpg",
        audio1: "../audio/verde.wav",
        audio2: "../audio/elverde.wav",
    levels: [1,4]
    },
    {
        word: "violeta",
        article: "el",
         image: "../images/violeta.jpg",
        audio1: "../audio/violeta.wav",
        audio2: "../audio/elvioleta.wav",
    levels: [1,3,4]
    },
    {
        word: "rojoanaranjado",
        article: "el",
        image: "../images/rojoanaranjado.jpg",
        audio1: "../audio/rojoanaranjado.wav",
        audio2: "../audio/elrojoanaranjado.wav",
    levels: [2,4]
    },
    {
        word: "rojoviolaceo",
        article: "el",
        image: "../images/rojoviolaceo.jpg",
        audio1: "../audio/rojoviolaceo.wav",
        audio2: "../audio/elrojoviolaceo.wav",
    levels: [2,4]
    },
    {
        word: "amarilloanaranjado",
        article: "la",
        image: "../images/amarilloanaranjado.jpg",
        audio1: "../audio/amarilloanaranjado.wav",
        audio2: "../audio/elamarilloanaranjado.wav",
    levels: [2,4]
    },
    {
        word: "amarilloverdoso",
        article: "el",
        image: "../images/amarilloverdoso.jpg",
        audio1: "../audio/amarilloverdoso.wav",
        audio2: "../audio/elamarilloverdoso.wav",
    levels: [2,4]
    },
    {
        word: "azulverdoso",
        article: "el",
        image: "../images/azulverdoso.jpg",
        audio1: "../audio/azulverdoso.wav",
        audio2: "../audio/elazulverdoso.wav",
    levels: [2,4]
    },
    {
        word: "azulviolaceo",
        article: "el",
        image: "../images/azulviolaceo.jpg",
        audio1: "../audio/azulviolaceo.wav",
        audio2: "../audio/elazulviolaceo.wav",
    levels: [2,4]
    },
    {
        word: "negro",
        article: "el",
        image: "../images/negro.jpg",
        audio1: "../audio/negro.wav",
        audio2: "../audio/elnegro.wav",
    levels: [1,4]
    },
    {
        word: "gris",
        article: "el",
        image: "../images/gris.jpg",
        audio1: "../audio/gris.wav",
        audio2: "../audio/elgris.wav",
    levels: [2,4]
    },
    {
        word: "blanco",
        article: "el",
        image: "../images/blanco.jpg",
        audio1: "../audio/blanco.wav",
        audio2: "../audio/elblanco.wav",
    levels: [1,4]
    },
    {
        word: "cafe",
        article: "el",
        image: "../images/cafe.jpg",
        audio1: "../audio/cafe.wav",
        audio2: "../audio/elcafe.wav",
    levels: [2,3,4]
    },
    {
        word: "khaki",
        article: "el",
        image: "../images/khaki.jpg",
        audio1: "../audio/khaki.wav",
        audio2: "../audio/elkhaki.wav",
    levels: [3,4]
    },
    {
        word: "beige",
        article: "el",
        image: "../images/beige.jpg",
        audio1: "../audio/beige.wav",
        audio2: "../audio/elbeige.wav",
    levels: [3,4]
    },
    {
        word: "rosa",
        article: "el",
        image: "../images/rosa.jpg",
        audio1: "../audio/rosa.wav",
        audio2: "../audio/elrosa.wav",
    levels: [2,4]
    },
    {
        word: "dorado",
        article: "el",
        image: "../images/dorado.jpg",
        audio1: "../audio/dorado.wav",
        audio2: "../audio/eldorado.wav",
    levels: [3,4]
    },
    {
        word: "plateado",
        article: "el",
        image: "../images/plateado.jpg",
        audio1: "../audio/plateado.wav",
        audio2: "../audio/elplateado.wav",
    levels: [3,4]
    },
    {
        word: "bronce",
        article: "el",
        image: "../images/bronce.jpg",
        audio1: "../audio/bronce.wav",
        audio2: "../audio/elbronce.wav",
    levels: [3,4]
    },
    {
        word: "morado",
        article: "el",
        image: "../images/morado.jpg",
        audio1: "../audio/morado.wav",
        audio2: "../audio/elmorado.wav",
    levels: [3,4]
    }
];

/*================================================================================*/
/*-----------------------------------------------LEVEL SETTINGS----------------------------------------------------*/
/*================================================================================*/

const levelSettings = {
    1: {
        questions: 10,
        choices: 4,
        attempts: "unlimited",
        audioType: "audio1"
    },
    2: {
        questions: 20,
        choices: 4,
        attempts: 3,
        audioType: "audio1"
    },
    3: {
        questions: 30,
        choices: 6,
        attempts: 2,
        audioType: "audio1"
    },
    4: {
        questions: 35,
        choices: 5,
        attempts: 1,
        audioType: "audio1"
    },
    5: {
        questions: 25,
        choices: 6,
        attempts: 1,
        audioType: "audio1"
    }
};


/*================================================================================*/
/*-----------------------------------------------QUIZ VARIABLES----------------------------------------------------*/
/*================================================================================*/

let currentLevel = 1;
let currentQuestionNumber = 0;

let questionDeck = [];

let correctCount = 0;
let missCount = 0;

let answered = false;
let missedThisQuestion = false;

let currentQuestion = null;
let selectedChoice = null;
let selectedImage = null;

/*================================================================================*/
/*---------------------------------RANDOMIZED QUESTIONS SETTINGS------------------------------------------*/
/*-------helper functions--------------------------------------------------------------------------------------------------*/
/*================================================================================*/

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

/*============================================*/
/*---------------Different Image Depending on Level--------------*/
/*============================================*/

function getImageForLevel(item) {

    if (!item.images) {
        return item.image;
    }

    const availableImages = item.images.filter(image =>
        image.levels.includes(currentLevel)
    );

    if (availableImages.length > 0) {
        const randomImage = shuffleArray([...availableImages])[0];
        return randomImage.src;
    }

    return item.image;
}

/*============================================*/
/*---------------Random Question Function-----------------------*/
/*============================================*/

function getRandomQuestion() {
    const settings = levelSettings[currentLevel];

    const levelVocabulary = vocabulary.filter(item =>
        item.levels.includes(currentLevel)
    );

    if (questionDeck.length === 0) {
        questionDeck = shuffleArray([...levelVocabulary]);
    }

    const correct = questionDeck.pop();

    const wrongOptions = shuffleArray(
        levelVocabulary.filter(item => item.word !== correct.word)
    ).slice(0, settings.choices - 1);

    const options = shuffleArray([
        correct,
        ...wrongOptions
    ]);

/*=================================*/
/*------Different Image (Wrong Options)----------*/
/*=================================*/

const displayOptions = options.map(item => {
    return {
        ...item,
        displayImage: getImageForLevel(item)
    };
});

    return {
        answer: correct.word,
        audio: correct[settings.audioType],
        options: displayOptions
    };
}

/*================================================================================*/
/*-----------------------------------------------LOAD QUESTION----------------------------------------------------*/
/*================================================================================*/

function loadQuestion() {
    currentQuestion = getRandomQuestion();

    const optionsDiv = document.getElementById("quiz-options");
    const response = document.getElementById("quiz-response");
    const title = document.getElementById("test-title");

    title.textContent = `Test - Level ${currentLevel}: Listen and Choose`;

    optionsDiv.innerHTML = "";
    response.innerHTML = "";
    answered = false;
    missedThisQuestion = false;
    selectedChoice = null;
    selectedImage = null;

    currentQuestion.options.forEach(option => {
        optionsDiv.innerHTML += `
            <div class="vocab-card">
                <img
                    src="${option.displayImage}"
                    class="lesson-image clickable-image"
                    alt="${option.word}"
                    onclick="selectQuizAnswer('${option.word}', this)">
            </div>
        `;
    });
}

function playCurrentQuestion() {
    const tempAudio = new Audio(currentQuestion.audio);
    tempAudio.play();
}

function selectQuizAnswer(choice, imageElement) {
    if (answered) return;

    if (selectedImage) {
        selectedImage.classList.remove("selected-choice");
    }

    selectedChoice = choice;
    selectedImage = imageElement;

    selectedImage.classList.add("selected-choice");

    document.getElementById("quiz-response").innerHTML =
    "<span style='color:#0066cc;font-weight:bold;'>Selected. Click Next to submit.</span>";
}

function nextQuestion() {
    if (!selectedChoice) {
        document.getElementById("quiz-response").innerHTML =
        "<span style='color:red;font-weight:bold;'>Choose a picture before moving on.</span>";
        return;
    }

    if (selectedChoice === currentQuestion.answer) {
        correctCount++;
        document.getElementById("correct-count").textContent = correctCount;
    } else {
        missCount++;
        document.getElementById("miss-count").textContent = missCount;
    }

    answered = true;
    currentQuestionNumber++;

    if (currentQuestionNumber < levelSettings[currentLevel].questions) {
        loadQuestion();
    } else {
        finishLevel();
    }
}

/*================================================================================*/
/*------------------------------------------FINISH LEVEL FUNCTION-----------------------------------------------*/
/*================================================================================*/


function finishLevel() {
    const response = document.getElementById("quiz-response");

    if (correctCount >= levelSettings[currentLevel].questions) {

        if (currentLevel < 4) {

            response.innerHTML =
            `<span style='color:green;font-weight:bold;'>🎉 Level ${currentLevel} Passed! Starting Level ${currentLevel + 1}.</span>`;

            currentLevel++;
            setTimeout(startLevel, 1500);

        } else {

            response.innerHTML =
            "<span style='color:green;font-weight:bold;'>🎉 Test Complete!</span>";

        }

    } else {

        response.innerHTML =
        `<span style='color:red;font-weight:bold;'>Level ${currentLevel} failed. Restart this level.</span>`;

    }
}

/*================================================================================*/
/*------------------------------------------START LEVEL FUNCTION------------------------------------------------*/
/*================================================================================*/


function startLevel() {
    questionDeck = [];
    currentQuestionNumber = 0;
    correctCount = 0;
    missCount = 0;
    answered = false;
    missedThisQuestion = false;
    selectedChoice = null;
    selectedImage = null;

    document.getElementById("correct-count").textContent = "0";
    document.getElementById("miss-count").textContent = "0";

    loadQuestion();
}

function restartEntireTest() {
    currentLevel = 1;
    startLevel();
}

/*================================================================================*/
/*----------------------------------RESTART CURRENT LEVEL FUNCTION----------------------------------------*/
/*================================================================================*/

function restartCurrentLevel() {
    startLevel();
}

/*================================================================================*/
/*-------------------------------------------------LOAD QUESTION--------------------------------------------------*/
/*================================================================================*/

loadQuestion();