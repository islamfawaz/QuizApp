import { Finish } from "./finish.js";

export class Quiz {
    constructor(questions) {
        this.questions = questions
        this.questionsLength = this.questions.length;
        this.currentQuestion = 0;
        this.score = 0;
        this.showQuestions();
        document.querySelector("#next").addEventListener("click", this.nextQuestion.bind(this))
    }

    shuffle(array) {
        let currentIndex = array.length // 3
        let randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {


            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex); //0.9x3 = 2.7 ==> 3
            currentIndex--; // 2


            // And swap it with the current element.
            //   [1,2,3,4]  == [1,4,2,3]
            //         2                   3                        2                  3 
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    showQuestions() {
        document.querySelector("#question").innerHTML = this.questions[this.currentQuestion].question
        document.querySelector("#currentQuestion").innerHTML = this.currentQuestion + 1;
        document.querySelector("#totalNumberOfQuestions").innerHTML = this.questionsLength;
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let incorrectAnswers = this.questions[this.currentQuestion].incorrect_answers;
        let answers = [correctAnswer, ...incorrectAnswers];
        this.shuffle(answers)
        let cartona = "";
        for (let i = 0; i < answers.length; i++) {
            cartona += `                
            <label class="form-check-label mb-1">
            <input type="radio" class="form-check-input me-2" name="answers" value="${answers[i]}">
            ${answers[i]}
            </label> </br>`
        }
        document.querySelector("#rowAnswer").innerHTML = cartona;
    }

    nextQuestion() {
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let userAnswerElements = Array.from(document.getElementsByName("answers")).find(element => element.checked)
        if (userAnswerElements != undefined) {
            let userAnswer = userAnswerElements.value
            this.checkUserAnswer(userAnswer, correctAnswer);
            console.log(userAnswer);
            $("#alert").fadeOut(0)
            this.currentQuestion++
            if (this.currentQuestion < this.questionsLength) {
                this.showQuestions()
            } else {
                $("#quiz").fadeOut(1000, function () {
                    $("#finish").fadeIn(500);
                })
                let result = new Finish(this.score);
            }
        } else {
            $("#alert").fadeIn(500)
        }
    }

    checkUserAnswer(userAnswer, correctAnswer) {
        if (userAnswer == correctAnswer) {
            $("#Correct").fadeIn(500).fadeOut(300)
            this.score++
        } else {
            $("#inCorrect").fadeIn(500).fadeOut(300)
        }
    }
}