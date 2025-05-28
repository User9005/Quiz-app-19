const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            { text: "shark", correct: false },
            { text: "Blue Wale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Buthan", correct: false },
            { text: "Shri Lanka", correct: false },
            { text: "Nepal", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    // Before displaying the questions we'll add one more function 
    //  To hide previous questions and answers we will and one more resetState() func.

    resetState()

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // Here we also need to add click function to buttons but before we add the anser correc to button.tadaset
        // if(answer.correct) -> if it has some value then it will add -> button.dataset.correct = answer.correct; -> so it will add true or false in this dadaset.correct 

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}

// To hide previous questions and answers

function resetState() {
    nextButton.style.display = "none";
    // I don't understand how works the while here 
    // Suppose answerButttons has child element we will remove it
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    // When we click the button it will add the selected button element in this variable
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        // If the answer is correct we should increase the score
    } else {
        selectedBtn.classList.add("incorrect");
        score++;
    }

    // When we select the wrong answer it should automaticly select the right answer and aslo disable other buttons and show the next button, so

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        nextButton.style.display = "block";
    });
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        // We have to define showScore() function now
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
       startQuiz();
    }
})

startQuiz();