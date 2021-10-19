const time = document.querySelector(".game-screen__time");
const operation = document.querySelector(".game-screen__operation");
const solutionInput = document.querySelector(".game-screen__input");
const currentScore = document.querySelector(".game-screen__current-score");
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
const timerstart = document.querySelector(".game-screen__timestart");
const prevScore = document.querySelector(".game-screen__prev-score");
const boxesContainer = document.querySelector(".game-screen__progress__boxes");
const challengeScore = document.querySelector(".game-screen__challenge-score");

let myScores = {
            "Donkey1:00": 51,
            "Donkey2:00": 94,
            "Donkey3:00": 142,
            "Einstein1:00": 34,
            "Einstein2:00": 54,
            "Einstein3:00": 69,
            "Me1:00": 12,
            "Me2:00": 20,
            "Me3:00": 29,
}

class Game {
    constructor(time, operation, solutionInput, currentScore, prevScore, overlayText, challengeScore) {
        this.time = time;
        this.operation = operation;
        this.solutionInput = solutionInput;
        this.currentScore = currentScore;
        this.prevScore = prevScore;
        this.overlayText = overlayText;
        this.currentOperator;
        this.firstNum;
        this.secondNum;
        this.scoreTracker = 0;
        this.livesTracker = 0;
        this.currentLevel = "";
        this.currentTime = "";
        this.isTimerActive = false;
        this.isGameActive = false;
        this.challengeScore = challengeScore;
        this.secondsLeft = 0;
        this.easterEgg = false;
    }
    getinputs () {
        console.log(this.secondsLeft);
        levelsBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.currentLevel = btn.innerText;
                this.styleLevelsBtn();
            })
        });
        timesBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.currentTime = btn.innerText;
                this.styleTimesBtn();
            })
        });
        startBtn.addEventListener("click", () => {
            if(this.currentTime && this.currentLevel) {
                levelScreen.style.display = "none";
                gameScreen.style.display = "grid";
                if(this.isGameActive) {
                    this.generateOperation();
                    this.makeProgressBar();
                } else {
                    this.startGame();
                    this.isGameActive = true;
                }
                this.displayTime(parseInt(this.currentTime) * 60);
                this.challengeScore.innerText = myScores[`${this.currentLevel}${this.currentTime}`].toString();
                if(sessionStorage.getItem(`${this.currentLevel}${this.currentTime}`)) {
                    this.prevScore.innerText = sessionStorage.getItem(`${this.currentLevel}${this.currentTime}`);
                } else {
                    this.prevScore.innerText = "0"
                }
            } else {
                return;
            }
        });
        resetBtn.addEventListener("click", () => {
            this.resetGame();
        })
    }
    makeProgressBar () {
        let numberOfBoxes = myScores[`${this.currentLevel}${this.currentTime}`];
        let divArray = [];
        for(let i = 0; i < numberOfBoxes; i++){
            divArray.push(`<div class=\"game-screen__progress__boxes__box\"></div>`)
        }
        boxesContainer.innerHTML = divArray.join("");
    }

    styleLevelsBtn() {
        levelsBtn.forEach((btn) => {
            if (btn.innerText == this.currentLevel) {
                btn.classList.add("level-screen__options__btn__clicked");
            } else {
                btn.classList.remove("level-screen__options__btn__clicked");
            }
        });
    }

    styleTimesBtn () {
        timesBtn.forEach((btn) => {
            if (btn.innerText == this.currentTime) {
                btn.classList.add("level-screen__options__btn__clicked");
            } else {
                btn.classList.remove("level-screen__options__btn__clicked");
            }
        });
    }

    timer () {
        const now = Date.now();
        const future = now + 1000 * parseInt(this.currentTime) * 60;
        this.displayTime((future - now) / 1000);

        const countdown = setInterval(() => {
            this.secondsLeft = Math.round((future - Date.now()) / 1000);
            if(this.secondsLeft < 0 || this.livesTracker == 3) {
                this.livesTracker = 0;
                this.displayOverlay();
                clearInterval(countdown);
                this.isTimerActive = false;
                return;
            } else {
                this.displayTime(this.secondsLeft);
            }     
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
        // 😉 
        if(this.secondsLeft < 10 && !this.easterEgg && this.secondsLeft) {
            this.firstNum = 5;
            this.secondNum = 1601627;
            this.currentOperator = "x"
            this.easterEgg = true;

        } else {
            this.firstNum = this.generateNumber();
            this.secondNum = this.generateNumber();
            this.currentOperator = this.generateOperator();
        } 
        this.operation.innerText = `${this.firstNum} ${this.currentOperator} ${this.secondNum} =`;
    }
    updateScore () {
        this.currentScore.innerText = this.scoreTracker
    }
    updateProgressBar () {
        if(this.scoreTracker > myScores[`${this.currentLevel}${this.currentTime}`]) {
            return;
        }
        progressBar.style.transform = `scaleX(${this.scoreTracker / myScores[`${this.currentLevel}${this.currentTime}`]})`
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
            this.operation.classList.add("animate-wrong")
            setTimeout(() => this.operation.classList.remove("animate-wrong"), 457);
            if(this.solutionInput.value == "") {
                return;
            }
            lives[this.livesTracker].innerText = "X";
            this.livesTracker += 1;
        } else {
            this.scoreTracker += 1;
            this.updateScore();
            this.updateProgressBar();
            this.generateOperation();
        }
        this.solutionInput.value = null;
    }
    displayOverlay () {
        overlayText.innerText = `Congratulations, Your score was: ${this.scoreTracker}`;
        overlay.classList.add("isvisible");
        gameScreen.classList.add("blur");

    }
    resetGame() {
        levelScreen.style.display = "grid";
        gameScreen.style.display = "none";
        overlay.classList.remove("isvisible");
        gameScreen.classList.remove("blur");
        lives.forEach((live) => {
            live.innerText = ""
        });
        if(sessionStorage.getItem(`${this.currentLevel}${this.currentTime}`) && parseInt(sessionStorage.getItem(`${this.currentLevel}${this.currentTime}`)) < this.scoreTracker ) {
            sessionStorage.removeItem(`${this.currentLevel}${this.currentTime}`);
            sessionStorage.setItem(`${this.currentLevel}${this.currentTime}`, this.scoreTracker);
        } else if (!sessionStorage.getItem(`${this.currentLevel}${this.currentTime}`)) {
            sessionStorage.setItem(`${this.currentLevel}${this.currentTime}`, this.scoreTracker);
        }
        progressBar.style.transform = `scaleX(0)`;
        this.currentScore.innerText = "0";
        this.scoreTracker = 0;
        this.secondsLeft = 0;
        this.easterEgg = false;
        this.solutionInput.value = null;
        this.firstNum;
        this.secondNum;
        this.currentOperator;
    }
    startGame() {
        this.makeProgressBar();
        this.generateOperation();
        solutionInput.addEventListener("keyup", (e) => {
            if(!this.isTimerActive) {
                this.timer();
                this.isTimerActive = true;
            }
            if (e.code == "Enter") {
                this.checkInput();
            }
        })
    }
}

const dojo = new Game(time, operation, solutionInput, currentScore, prevScore, overlayText, challengeScore);
dojo.getinputs();