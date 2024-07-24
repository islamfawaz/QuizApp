export class Finish {
    constructor(score) {
        document.querySelector("#score").innerHTML = score
        document.querySelector("#tryBtn").addEventListener("click", this.tryAgain.bind(this))
    }

    tryAgain() {
        $("#finish").fadeOut(500, function() {
            $("#settings").fadeIn(500)
        })
        document.querySelector("#numberOfQuestions").value = "";
        $("#category option:eq(0)").prop("selected", true);
        $("#easy").prop("checked", true);
    }
}