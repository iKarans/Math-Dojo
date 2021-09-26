const time = document.querySelector(".game-screen__time");
const operation = document.querySelector(".game-screen__operation");
const solutionInput = document.querySelector(".game-screen__input");
const score = document.querySelector(".game-screen__score");
const lives = document.querySelectorAll(".game-screen__lives__live");
const overlay = document.querySelector(".overlay");
const levelScreen = document.querySelector(".level-screen");
const gameScreen = document.querySelector(".game-screen");
const levelsBtn = document.querySelectorAll(".level-screen__options__level");
const timesBtn = document.querySelectorAll(".level-screen__options__time");
const startBtn = document.querySelector(".level-screen__start-btn");
const progressBar = document.querySelector(".game-screen__progress__inner");
const resetBtn = document.querySelector(".overlay__iner__resetbtn");

let currentLevel;
let currentTime;

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
    const dojo = new Game(time, operation, solutionInput, score, lives, currentLevel, currentTime);
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
    progressBar.style.transform = `scaleX(0)`
})
class Game {
    constructor(time, operation, solutionInput, score, lives, currentLevel, currentTime) {
        this.time = time;
        this.operation = operation;
        this.solutionInput = solutionInput;
        this.score = score;
        this.lives = lives;
        this.currentLevel = currentLevel;
        this.currentTime = currentTime;
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
                clearInterval(countdown);
                overlay.classList.add("isvisible");
                gameScreen.classList.add("blur");
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
        const operatorArray= ["+", "-", "*"]
        if(this.currentLevel == "Donkey") {
            return operatorArray[Math.floor(Math.random() * 2)];
        } else if (this.currentLevel == "Einstein") {
            if (this.firstNum > 13 && this.secondNum > 13) {
                return operatorArray[Math.floor(Math.random() * 2)];
            }
            else {
                return "*";
            }
        } else {
            if (this.firstNum > 100 && this.secondNum > 100) {
                return operatorArray[Math.floor(Math.random() * 2)];
            }
            else {
                return "*";
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
        let expected;
        if (this.currentOperator == "+") {
            expected = this.firstNum + this.secondNum
        } else if (this.currentOperator == "-") {
            expected = this.firstNum - this.secondNum
        } else {
            expected = this.firstNum * this.secondNum
        }
        if (this.solutionInput.value != expected) {
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
    startGame() {
        console.log(this.currentTime);
        console.log(this.currentLevel);
        this.generateOperation();
        this.timer();
        solutionInput.addEventListener("keydown", (e) => {
            if (e.code == "Enter") {
                this.checkInput();
            }
        })

    }
}
