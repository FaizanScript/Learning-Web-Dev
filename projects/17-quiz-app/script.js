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


// function code to render the question and options
function renderQuestion(index) {

    question.textContent = arrayOfQsObjects[index].question;
    currentquestionNo.textContent = index+1;
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

    if (currentQuestionIndex === arrayOfQsObjects.length) {
        renderResults();
    } else {
        renderQuestion(currentQuestionIndex);
    }


});


// function code to render the result screen
function renderResults() {

    quizScreen.hidden = true;
    resultScreen.hidden = false;

}



