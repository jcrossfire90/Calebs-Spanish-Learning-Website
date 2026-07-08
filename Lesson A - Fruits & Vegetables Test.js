/* ================================================= */
/* VOCABULARY DATABASE */
/* ================================================= */

const vocabulary = [
    {
    word: "manzana",
    article: "la",
    image: "../images/manzana.jpg",
    audio1: "../audio/manzana.wav",
    audio2: "../audio/lamanzana.wav",
    levels: [1, 2]
   },
    {
        word: "pera",
        article: "la",
        image: "../images/pera.jpg",
        audio1: "../audio/pera.wav",
        audio2: "../audio/lapera.wav",
    levels: [1, 2]
    },
    {
        word: "platano",
        article: "el",
        image: "../images/platano.jpg",
        audio1: "../audio/platano.wav",
        audio2: "../audio/elplatano.wav",
    levels: [1, 2]
    },
    {
        word: "naranja",
        article: "la",
        images: [ {
       	src: "../images/naranja.jpg",
       	levels: [1,2]
     	     },
     	     {
      	 src: "../images/naranja-2.jpg",
       	levels: [3,4,5]
     	     },
     	     {
      	 src: "../images/naranja-3.jpg",
       	levels: [3,4,5]
     	     },
     	     {
      	 src: "../images/naranja-4.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/naranja-5.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/naranja-6.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/naranja-7.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/naranja-8.jpg",
       	levels: [4]
     	     }
	  ],
        audio1: "../audio/naranja.wav",
        audio2: "../audio/lanaranja.wav",
    levels: [1, 2, 3,4]
    },
    {
        word: "mango",
        article: "el",
        image: "../images/mango.jpg",
        audio1: "../audio/mango.wav",
        audio2: "../audio/elmango.wav",
    levels: [1, 2]
    },
    {
        word: "ciruela",
        article: "la",
         images: [ {
       	src: "../images/ciruela.jpg",
       	levels: [1,2]
     	     },
     	     {
      	 src: "../images/ciruela-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/ciruela-3.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/ciruela-4.jpg",
       	levels: [3]
	     }
	  ],
        audio1: "../audio/ciruela.wav",
        audio2: "../audio/laciruela.wav",
    levels: [1,2, 3]
    },
    {
        word: "uva",
        article: "la",
        images: [ {
       	src: "../images/uva.jpg",
       	levels: [1,2]
     	     },
     	     {
      	 src: "../images/uva-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/uva-3.jpg",
       	levels: [3]
	     }
	  ],
        audio1: "../audio/uva.wav",
        audio2: "../audio/lauva.wav",
    levels: [1, 2, 3]
    },
    {
        word: "limon",
        article: "el",
        images: [ {
       	src: "../images/limon.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/limon-2.jpg",
       	levels: [3,4]
     	     },
     	     {
      	 src: "../images/limon-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/limon-4.jpg",
       	levels: [4]
	     }
	  ],
        audio1: "../audio/limon.wav",
        audio2: "../audio/ellimon.wav",
    levels: [3, 4]
    },
    {
        word: "lima",
        article: "la",
        images: [ {
       	src: "../images/lima.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/lima-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/lima-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/lima-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/lima-5.jpg",
       	levels: [4]
	     }
	  ],
        audio1: "../audio/lima.wav",
        audio2: "../audio/lalima.wav",
    levels: [3, 4]
    },
    {
        word: "fresa",
        article: "la",
        images: [ {
       	src: "../images/fresa.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/fresa-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/fresa-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/fresa-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/fresa-5.jpg",
       	levels: [4]
	     }
	  ],
        audio1: "../audio/fresa.wav",
        audio2: "../audio/lafresa.wav",
    levels: [3, 4]
    },
    {
        word: "sandia",
        article: "la",
        image: "../images/sandia.jpg",
        audio1: "../audio/sandia.wav",
        audio2: "../audio/lasandia.wav",
    levels: [3, 4]
    },
    {
        word: "melon",
        article: "el",
        image: "../images/melon.jpg",
        audio1: "../audio/melon.wav",
        audio2: "../audio/elmelon.wav",
    levels: [3, 4]
    },
    {
        word: "pina",
        article: "la",
        images: [ {
       	src: "../images/pina.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/pina-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/pina-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/pina-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/pina-5.jpg",
       	levels: [3,4]
	     }
	  ],
        audio1: "../audio/pina.wav",
        audio2: "../audio/lapina.wav",
    levels: [3, 4]
    },
    {
        word: "durazno",
        article: "el",
        image: "../images/durazno.jpg",
        audio1: "../audio/durazno.wav",
        audio2: "../audio/eldurazno.wav",
    levels: [3, 4]
    },
    {
        word: "cereza",
        article: "la",
        images: [ {
       	src: "../images/cereza.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/cereza-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/cereza-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/cereza-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/cereza-5.jpg",
       	levels: [3,4]
	     }
	  ],
        audio1: "../audio/cereza.wav",
        audio2: "../audio/lacereza.wav",
    levels: [3, 4]
    },
    {
        word: "kiwi",
        article: "el",
        images: [ {
       	src: "../images/kiwi.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/kiwi-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/kiwi-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/kiwi-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/kiwi-5.jpg",
       	levels: [4]
	     }
        audio1: "../audio/kiwi.wav",
        audio2: "../audio/elkiwi.wav",
    levels: [3, 4]
    },
    {
        word: "papaya",
        article: "la",
        images: [ {
       	src: "../images/papaya.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/papaya-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/papaya-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/papaya-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/papaya-5.jpg",
       	levels: [4]
	     }
        audio1: "../audio/papaya.wav",
        audio2: "../audio/lapapaya.wav",
    levels: [3, 4]
    },
    {
        word: "coco",
        article: "el",
        images: [ {
       	src: "../images/coco.jpg",
       	levels: [1,2]
     	     },
     	     {
      	 src: "../images/coco-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/coco-3.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/coco-4.jpg",
       	levels: [3,4]
	     },
     	     {
      	 src: "../images/coco-5.jpg",
       	levels: [3,4]
	     }
        audio1: "../audio/coco.wav",
        audio2: "../audio/elcoco.wav",
    levels: [3, 4]
    },
    {
        word: "guayaba",
        article: "la",
        images: [ {
       	src: "../images/guayaba.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/guayaba-2.jpg",
       	levels: [3]
     	     },
     	     {
      	 src: "../images/guayaba-3.jpg",
       	levels: [4]
     	     },
     	     {
      	 src: "../images/guayaba-4.jpg",
       	levels: [4]
	     },
     	     {
      	 src: "../images/guayaba-5.jpg",
       	levels: [4]
	     }
        audio1: "../audio/guayaba.wav",
        audio2: "../audio/laguayaba.wav",
    levels: [3, 4]
    },
    {
        word: "frambuesa",
        article: "la",
        image: "../images/frambuesa.jpg",
        audio1: "../audio/frambuesa.wav",
        audio2: "../audio/laframbuesa.wav",
    levels: [4,5]
    },
    {
        word: "mora",
        article: "la",
        image: "../images/mora.jpg",
        audio1: "../audio/mora.wav",
        audio2: "../audio/lamora.wav",
    levels: [4,5]
    },
    {
        word: "arandano",
        article: "el",
        image: "../images/arandano.jpg",
        audio1: "../audio/arandano.wav",
        audio2: "../audio/elarandano.wav",
    levels: [4,5]
    },
    {
        word: "higo",
        article: "el",
        image: "../images/higo.jpg",
        audio1: "../audio/higo.wav",
        audio2: "../audio/elhigo.wav",
    levels: [4,5]
    },
    {
        word: "granada",
        article: "la",
        image: "../images/granada.jpg",
        audio1: "../audio/granada.wav",
        audio2: "../audio/lagranada.wav",
    levels: [4,5]
    },
    {
        word: "aguacate",
        article: "el",
        images: [ {
       	src: "../images/aguacate.jpg",
       	levels: [4,5]
     	     },
     	     {
      	 src: "../images/aguacate-2.jpg",
       	levels: [4,5]
     	     },
     	     {
      	 src: "../images/aguacate-3.jpg",
       	levels: [4,5]
     	     },
     	     {
      	 src: "../images/aguacate-4.jpg",
       	levels: [4,5]
	     }
	  ],
        audio1: "../audio/aguacate.wav",
        audio2: "../audio/elaguacate.wav",
    levels: [4,5]
    },
    {
        word: "tomate",
        article: "el",
        image: "../images/tomate.jpg",
        audio1: "../audio/tomate.wav",
        audio2: "../audio/eltomate.wav",
    levels: [4,5]
    }
];

/*================================================================================*/
/*-----------------------------------------------LEVEL SETTINGS----------------------------------------------------*/
/*================================================================================*/

const levelSettings = {
    1: {
        questions: 5,
        choices: 3,
        attempts: "unlimited",
        audioType: "audio1"
    },
    2: {
        questions: 10,
        choices: 3,
        attempts: 2,
        audioType: "audio2"
    },
    3: {
        questions: 15,
        choices: 4,
        attempts: 1,
        audioType: "audio2"
    },
    4: {
        questions: 20,
        choices: 5,
        attempts: 1,
        audioType: "audio2"
    },
    5: {
        questions: 25,
        choices: 6,
        attempts: 1,
        audioType: "audio2"
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

        if (currentLevel < 6) {

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