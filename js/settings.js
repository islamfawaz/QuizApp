import { Quiz } from "./quiz.js";

export class Settings {
    constructor() {
        this.chooseCategory = document.querySelector("#category");
        this.chooseDifficulty = document.getElementsByName("difficulty");
        this.chooseNoOfQuestions = document.querySelector("#numberOfQuestions")
        document.querySelector("#startBtn").addEventListener("click", this.startQuiz.bind(this))
    }

    async startQuiz() {
        let category = this.chooseCategory.value;
        let difficulty = Array.from(this.chooseDifficulty).find(element => element.checked).value;
        let noOfQuestions = this.chooseNoOfQuestions.value;
        if (noOfQuestions == "") {
            $("#questionsAlert").fadeIn(500)
        } else {
            $("#questionsAlert").fadeOut(100)
            let quizAPI = `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${difficulty}`
            let questions = await this.fetchAPI(quizAPI);
            console.log(questions);
            $("#settings").fadeOut(500, function () {
                $("#quiz").fadeIn(500);
            })
            let quiz = new Quiz(questions)
        }
    }

    async fetchAPI(quizApi) {
        let apiResponse = await fetch(quizApi)
        let finalResponse = await apiResponse.json()
        return finalResponse.results
    }
}