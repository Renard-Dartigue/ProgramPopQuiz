// ======================= QUESTIONS==========================================================//
const questions = [
    //index 0 quest 1
    {
        question: "What is the second planet in the solar system?",
        answers: [
            { text: "Sedna", correct: false},
            { text: "Venus", correct: true},
            { text: "Earth", correct: false},
            { text: "Pluto", correct: false},
        ]
    },
    //index 1 quest 2
    {
        question: "What is the second planet in the solar system again?",
        answers: [
            { text: "Venus", correct: true},
            { text: "Sedna", correct: false},
            { text: "Earth", correct: false},
            { text: "Pluto", correct: false},
        ]
    },
    //index 2 quest 3
    {
        question: "Sorry, I missed that. What is the second planet in the solar system",
        answers: [
            { text: "Sedna", correct: false},
            { text: "Earth", correct: false},
            { text: "Venus", correct: true},
            { text: "Pluto", correct: false},
        ]
    },
    //index 3 quest 4
    {
        question: "One more time. What is the second planet in the solar system",
        answers: [
            { text: "Sedna", correct: false},
            { text: "Pluto", correct: false},
            { text: "Earth", correct: false},
            { text: "Venus", correct: true},
        ]
    }
];

// ===================================BUTTONS================================================================================//

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");

//question start at 1
let currentQuestionIndex = 0;
let score = 0;

//when quiz starts, question will be reset to 0
//score will be set to 0
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//displays the next question
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

//displays the answers
        //create a button tag and will save it as a variable "button"
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

    //adds the true or false in the dataset.
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//dataset will be checked if user has selected a true or false answer.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
//button will be disabled once the user selects an answer button then
//display the next button.
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


//displays exact score to user before asking if they want to play again.
// (``) allows functions in strings to exicute. 
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?"
    nextButton.style.display = "block"
}

//loop shows score if no more questions are left.
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//loop to restart the quiz
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
