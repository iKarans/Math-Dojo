const time = document.querySelector(".game-screen__time");
const operation = document.querySelector(".game-screen__operation");
const solutionInput = document.querySelector(".game-screen__input");
const lives = document.querySelector(".game-screen__lives__live")
const score = document.querySelector(".game-screen__score")


class Game {
    constructor(time, operation, solutionInput, score) {
        this.time = time;
        this.operation = operation;
        this.solutionInput = solutionInput;
        this.score = score;
        this.currentOperator = "+";
        this.firstNum = 9;
        this.secondNum = 10;
        this.scoreTracker = 0
    }
    timer () {
        const now = Date.now();
        const future = now + 1000 * 30;
        this.displayTime((future - now) / 1000);

        const countdown = setInterval(() => {
            const secondsLeft = Math.round((future - Date.now()) / 1000);
            if(secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }
            this.displayTime(secondsLeft)
        }, 1000);
    };
    displayTime (seconds) {
        const minutesLeft = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        if (secondsLeft < 10) {
            this.time.innerText = `${minutesLeft} : 0${secondsLeft}`;
        } else {
            this.time.innerText = `${minutesLeft} : ${secondsLeft}`;
        }
        
    }
    generateNumber () {
        return Math.ceil(Math.random() * 10);
    }
    generateOperation () {
        this.firstNum = this.generateNumber();
        this.secondNum = this.generateNumber();
        this.operation.innerText = `${this.firstNum} + ${this.secondNum}`;
    }
    checkInput () {
        if (this.solutionInput.value != this.firstNum + this.secondNum) {
            alert("donkey");
        } else {
            this.scoreTracker += 1;
            this.increaseScore();
            this.generateOperation();
        }
        this.solutionInput.value = null;
    }
    increaseScore () {
        this.score.innerText = this.scoreTracker
    }
    startGame() {
        this.timer();
        solutionInput.addEventListener("keydown", (e) => {
            if (e.code == "Enter") {
                this.checkInput();
            }
        })

    }
}

const dojo = new Game(time, operation, solutionInput, score);
// dojo.timer();
// dojo.generateOperation();
// dojo.checkInput();
dojo.startGame();