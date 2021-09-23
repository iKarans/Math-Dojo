const time = document.querySelector(".game-screen__time");
const operation = document.querySelector(".game-screen__operation");
const solutionInput = document.querySelector(".game-screen__input");
const lives = document.querySelector(".game-screen__lives__live")
const score = document.querySelector(".game-screen__score")


class Game {
    constructor(time) {
        this.time = time

    }
    timer () {
        console.log(7)
        const now = Date.now();
        const future = now + 1000 * 120;
        this.displayTime((future - now) / 1000);

        const countdown = setInterval(() => {
            const secondsLeft = Math.round((future - Date.now()) / 1000);
            this.displayTime(secondsLeft)
        }, 1000);
    };
    displayTime (seconds) {
        const minutesLeft = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        this.time.innerText = `${minutesLeft} : ${secondsLeft}`
    }
    startGame() {

    }
}

const dojo = new Game(time);
