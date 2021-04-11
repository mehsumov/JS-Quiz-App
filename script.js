function Questions(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}


Questions.prototype.checkAnswer = function (answer) {
    return answer === this.answer
}

function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
    this.score = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex]
}

Quiz.prototype.guess = function (answer) {
    if (!quiz.isFinish()) {
        var question = this.getQuestion();
        if (question.checkAnswer(answer)) {
            this.score++
        }
        this.questionIndex++

    }




}

Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}

var q1 = new Questions('5 x 5', ['20', '25', '26'], '25')
var q2 = new Questions('3 x 8', ['21', '28', '24'], '24')
var q3 = new Questions('7 x 6', ['42', '40', '56'], '42')
var q4 = new Questions('9 x 7', ['62', '63', '72'], '63')

var questions = [q1, q2, q3, q4]


var quiz = new Quiz(questions);

var questionText = document.getElementById('question');

var buttons = document.getElementById('buttons')
var currentNumber = document.getElementById('currentNumber');
var totalNumber = document.getElementById('totalNumber')
var cardBody = document.querySelector('.card-body')

function loadQuiz() {
    if (quiz.isFinish()) {
        var score = quiz.score
        document.querySelectorAll('.none').forEach(item=>{
            item.classList.add('d-none')
        })
        document.getElementById('score').classList.remove('d-none')
        document.getElementById('tryBtn').classList.remove('d-none')
        document.getElementById('score').innerHTML = `<h1>Your Score: ${score}</h1>`
        document.getElementById('tryBtn').innerHTML = `<button id="tryAgain" class="btn btn-primary mx-1 mb-3">Try Again</button>`
    } else {
        document.querySelectorAll('.none').forEach(item=>{
            item.classList.remove('d-none')
        })
        document.getElementById('score').classList.add('d-none')
        document.getElementById('tryBtn').classList.add('d-none')
        buttons.innerHTML = ''
        var choices = quiz.getQuestion().choices
        questionText.innerText = quiz.getQuestion().question;
        choices.forEach(e => {
            var html = `<button id="btn-c" class="btn btn-primary mx-1 mb-3">${e}</button>`
            buttons.innerHTML += html
        });
        currentNumber.innerText = quiz.questionIndex + 1
        totalNumber.innerText = quiz.questions.length
    }

}



loadQuiz();

buttons.addEventListener('click', function (e) {
    if (e.target.id == 'btn-c') {

        buttons.childNodes.forEach(e => {
            if (e.innerText == quiz.getQuestion().answer) {
                e.style.background = 'green'
            }
        })
        if (e.target.innerText != quiz.getQuestion().answer){
            e.target.style.background = '#e32524'
        }
            quiz.guess(e.target.innerText);

        setTimeout(() => {
            loadQuiz()
        }, 800);


    }
    e.preventDefault();
})

document.querySelector('.card-footer').addEventListener('click',function(e){
        if(e.target.id =='tryAgain'){
            quiz.questionIndex = 0;
            quiz.score = 0;
            loadQuiz();
            
        }


    e.preventDefault()
})







