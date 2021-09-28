const time = document.querySelector(".game-screen__time");
const operation = document.querySelector(".game-screen__equation__operation");
const solutionInput = document.querySelector(".game-screen__equation__input");
const score = document.querySelector(".game-screen__score");
const lives = document.querySelectorAll(".game-screen__lives__live");
const overlay = document.querySelector(".overlay");
const levelScreen = document.querySelector(".level-screen");
const gameScreen = document.querySelector(".game-screen");
const levelsBtn = document.querySelectorAll(".level-screen__options__level");
const timesBtn = document.querySelectorAll(".level-screen__options__time");
const startBtn = document.querySelector(".level-screen__start-btn");
const progressBar = document.querySelector(".game-screen__progress__inner");
const overlayText = document.querySelector(".overlay__inner__text");
const resetBtn = document.querySelector(".overlay__inner__resetbtn");

let currentLevel;
let currentTime;
let isActive = false;

levelsBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentLevel = btn.innerText;
    })
})

timesBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentTime = btn.innerText;
    })
})


startBtn.addEventListener("click", () => {
    levelScreen.style.display = "none";
    gameScreen.style.display = "grid";
    const dojo = new Game(time, operation, solutionInput, score, lives, currentLevel, currentTime, overlayText, timesBtn);
    dojo.startGame();
})

resetBtn.addEventListener("click", () => {
    levelScreen.style.display = "grid";
    gameScreen.style.display = "none";
    overlay.classList.remove("isvisible");
    gameScreen.classList.remove("blur");
    lives.forEach((live) => {
        live.innerText = ""
    });
    progressBar.style.transform = `scaleX(0)`;
    score.innerText = "0"
})
class Game {
    constructor(time, operation, solutionInput, score, lives, currentLevel, currentTime, overlayText) {
        this.time = time;
        this.operation = operation;
        this.solutionInput = solutionInput;
        this.score = score;
        this.lives = lives;
        this.currentLevel = currentLevel;
        this.currentTime = currentTime;
        this.overlayText = overlayText;
        this.currentOperator;
        this.firstNum;
        this.secondNum;
        this.scoreTracker = 0;
        this.livesTracker = 0
        
    }
    timer () {
        const now = Date.now();
        const future = now + 1000 * parseInt(currentTime) * 60;
        this.displayTime((future - now) / 1000);

        const countdown = setInterval(() => {
            const secondsLeft = Math.round((future - Date.now()) / 1000);
            if(secondsLeft < 0 || this.livesTracker == 3) {
                this.displayOverlay();
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
        if (this.currentLevel == "Donkey") {
            return Math.ceil(Math.random() * 10);
        } else if (this.currentLevel == "Einstein") {
            return Math.ceil(Math.random() * 100);
        } else {
            return Math.ceil(Math.random() * 1000);
        }
    }
    generateOperator () {
        const operatorArray= ["+", "-", "x"]
        if(this.currentLevel == "Donkey") {
            return operatorArray[Math.floor(Math.random() * 2)];
        } else if (this.currentLevel == "Einstein") {
            if (this.firstNum > 13 && this.secondNum > 13) {
                return operatorArray[Math.floor(Math.random() * 2)];
            }
            else {
                return "x";
            }
        } else {
            if (this.firstNum > 100 && this.secondNum > 100) {
                return operatorArray[Math.floor(Math.random() * 2)];
            }
            else {
                return "x";
            }
        }
    }
    generateOperation () {
        this.firstNum = this.generateNumber();
        this.secondNum = this.generateNumber();
        this.currentOperator = this.generateOperator()
        this.operation.innerText = `${this.firstNum} ${this.currentOperator} ${this.secondNum} =`;
    }
    increaseScore () {
        this.score.innerText = this.scoreTracker
    }
    increaseProgressBar () {
        if(this.scoreTracker > 10) {
            return;
        }
        progressBar.style.transform = `scaleX(${this.scoreTracker / 10})`
    }
    checkInput () {
        console.log(this.firstNum);
        console.log(this.secondNum);

        let expected;
        if (this.currentOperator == "+") {
            expected = this.firstNum + this.secondNum
        } else if (this.currentOperator == "-") {
            expected = this.firstNum - this.secondNum
        } else {
            expected = this.firstNum * this.secondNum
        }
        if (this.solutionInput.value != expected) {
            this.operation.classList.add("animate-wrong")
            setTimeout(() => this.operation.classList.remove("animate-wrong"), 457);
            if(this.solutionInput.value == "") {
                return;
            }
            this.lives[this.livesTracker].innerText = "X";
            this.livesTracker += 1;
        } else {
            this.scoreTracker += 1;
            this.increaseScore();
            this.increaseProgressBar();
            this.generateOperation();
        }
        this.solutionInput.value = null;
    }
    displayOverlay () {
        this.overlayText.innerText = `Congratulations, Your score was: ${this.scoreTracker}`;
        overlay.classList.add("isvisible");
        gameScreen.classList.add("blur");

    }
    startGame() {
        this.generateOperation();
        this.timer();
        solutionInput.addEventListener("keyup", (e) => {
            if (e.code == "Enter") {
                this.checkInput();
            }
        })
    }
}

