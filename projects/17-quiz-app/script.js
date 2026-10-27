// data for the questions, options and answers
const arrayOfQsObjects = [
    {
        question: "What is the full form of HTML?",
        options: [
            "Hyper Text Markup Language",
            "Human Text Markup Language",
            "High Technical Mechanical Language",
            "Hyper Text Makeup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the full form of CSS?",
        options: [
            "Cascading Sheet Style",
            "Cascading Style Sheet",
            "Color Style Sheet",
            "Coloring Sheet Style"
        ],
        correctAnswer: 1
    },
    {
        question: "Which language is used to add interactivity to a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correctAnswer: 1
    },
    {
        question: "Which CSS property changes the text color of an element?",
        options: [
            "font-color",
            "text-style",
            "color",
            "background-color"
        ],
        correctAnswer: 2
    },
    {
        question: "Which keyword declares a variable that cannot be reassigned in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        correctAnswer: 2
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Method",
            "Document Order Mapping"
        ],
        correctAnswer: 0
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "#",
            "/* */"
        ],
        correctAnswer: 1
    },
    {
        question: "Which HTML tag is used to display an image?",
        options: [
            "<image>",
            "<pic>",
            "<img>",
            "<src>"
        ],
        correctAnswer: 2
    },
    {
        question: "What will `typeof 42` return in JavaScript?",
        options: [
            "\"string\"",
            "\"number\"",
            "\"integer\"",
            "\"object\""
        ],
        correctAnswer: 1
    }
];


// selecting elements (qerying)
let question = document.querySelector(".question");
let options = document.querySelectorAll(".option-text");
let questionForm = document.querySelector(".question-form");
let totalQuestion = document.querySelector("[data-total]");
let currentquestionNo = document.querySelector("[data-current]");
let form = document.querySelector(".question-form");
let quizScreen = document.querySelector(".quiz-screen");
let resultScreen = document.querySelector(".result-screen");
let answers = document.querySelectorAll('input[type="radio"]');
let progressBar = document.querySelector(".progress-bar");
let correctStat = document.querySelector('[data-stat="correct"]');
let missedStat = document.querySelector('[data-stat="missed"]');
let timeStat = document.querySelector('[data-stat="time"]');
let avgStat = document.querySelector('[data-stat="avg"]');
let resultTitle = document.querySelector(".result-title");
let scorePercent = document.querySelector("[data-percent]");
let correctCount = document.querySelector("[data-correct-count]");
let scoreRing = document.querySelector(".score-ring");
let timeTaken = document.querySelector('[data-stat="time"]');
let avgTime = document.querySelector(`[data-stat="avg"]`);
let button = document.querySelector(".btn-primary");


// function code to render the question and options
function renderQuestion(index) {

    question.textContent = arrayOfQsObjects[index].question;
    currentquestionNo.textContent = index + 1;
    totalQuestion.textContent = arrayOfQsObjects.length;


    for (let i = 0; i < options.length; i++) {
        options[i].textContent = arrayOfQsObjects[index].options[i];
    }

    answers.forEach(element => {
        element.checked = false;
    });

}



// function code to render the question as it moves through by submitting the form
let currentQuestionIndex = 0;

let score = 0;

renderQuestion(currentQuestionIndex);

let startTime = Date.now();
let endTime;

form.addEventListener("submit", function (evt) {

    evt.preventDefault();

    let selectedAnswerIndex = -1;

    answers.forEach((element, index) => {

        if (element.checked === true) {
            selectedAnswerIndex = index;
        }

    });

    let currentQuestion = arrayOfQsObjects[currentQuestionIndex];

    if (selectedAnswerIndex === -1) {
        alert("please select an answer");
        return;
    }

    if (selectedAnswerIndex === currentQuestion.correctAnswer) {
        score++;
    } else {
        console.log("incorrect");
    }

    currentQuestionIndex++;

    progressBar.value++;

    if (currentQuestionIndex === arrayOfQsObjects.length) {
        endTime = Date.now();
        renderResults();
    } else {
        renderQuestion(currentQuestionIndex);
    }


});


// function code to render the result screen
function renderResults() {

    quizScreen.hidden = true;
    resultScreen.hidden = false;

    correctStat.textContent = score;
    correctCount.textContent = score;
    missedStat.textContent = arrayOfQsObjects.length - score;
    scorePercent.textContent = Math.round(
        (score / arrayOfQsObjects.length) * 100
    );

    // for result title
    if (scorePercent.textContent >= 80) {
        resultTitle.textContent = "Excellent work!";
    } else if (scorePercent.textContent >= 50) {
        resultTitle.textContent = "Good effort!";
    } else {
        resultTitle.textContent = "Keep practicing!";
    }

    // for score ring
    scoreRing.style.setProperty('--score', `${scorePercent.textContent}`);
    scoreRing.setAttribute(
        "aria-label",
        `Score: ${scorePercent.textContent} percent, ${score} of ${arrayOfQsObjects.length} correct`
    );

    // for Time Taken
    let elapsedTime = endTime - startTime;

    elapsedTime = Math.floor(elapsedTime / 1000);

    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;

    timeTaken.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    timeTaken.setAttribute(
        "datetime",
        `PT${minutes}M${seconds}S`
    );

    // for average time
    let avg = Math.round(elapsedTime / arrayOfQsObjects.length);

    let avgMinutes = Math.floor(avg / 60);
    let avgSeconds = avg % 60;

    avgTime.textContent = `${String(avgMinutes).padStart(2, "0")}:${String(avgSeconds).padStart(2, "0")}`;

    avgTime.setAttribute(
        "datetime",
        `PT${avgMinutes}M${avgSeconds}S`
    );


}