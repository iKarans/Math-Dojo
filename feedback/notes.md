# Feedback

## Goals

1. A working Game - done

   - 110% It is sick, so many challenging features you have added and have got them to work in the game.
   - Timers, random Calculations.

2. Practice using Git & Github-flow - done

   - 110% 4 Branches, 44 commits

3. Apply what you are learning - done

   - SCSS, BEM , Classes etc.... So much good stuff

## Specification

- PSEUDOCODE - not sure

  - I can see your thought process in your readme.md I am not sure if this is a spiel about the project or how you broke it down.
  - You class's methods a clearly labelled so think this would have been how you broke down the problem of the math dojo.

  - Github repo & README.MD - done

  - Repo has been set up perfect
  - Readme is great, I would suggest adding a couple of things.
    - How do you clone it and set it up?
    - the link to the live site?

- 25 Commits - done

- Use click or key press event in JS - done

- Mobile first/Responsive - done

- No tutorials - done

- Link to the project on your portfolio - not sure.

## Overall

This is a great game, lots of difficult things to check consider in breaking the game down. You have used a Class which is awesome and for the game it makes sense. You have a game object which has all of the functionality inside it.

You can see that you have taken everything we have learned so far and put it into this project. Well everything but testing :P.

## To work on

Where is the signature light and dark mode and boobies easter egg?

There isn't much more to do, in my opinion these should be things to focus on if you have the time.

### House keeping

- `getinputs()` should be `getInputs()`
- `isvisible` should be `is-visible`
- If a event listener is only calling one function / method you can pass it by reference
  ```js
  // 87 - 90
  resetBtn.addEventListener("click", () => {
    this.resetGame();
  });
  // COULD BE
  resetBtn.addEventListener("click", this.resetGame);
  ```

### The size of the Game class?

This is something to try if you have the time.

Try separating the logic into smaller classes that you bring into the game class.

This is known as composition. You have a larger class that brings smaller classes that are focused on one piece of functionality.

```js
class SteeringWheel {
  steerLeft() {}
  steerRight() {}
}

class Engine {
  start() {}
  go() {}
}

class Car {
  constructor() {
    this.steeringWheel = new SteeringWheel();
    this.engine = new Engine();
  }

  steer(direction) {
    if (direction == "left") {
      this.steeringWheel.steerLeft();
    } else {
      this.steeringWheel.steerRight();
    }
  }

  accelerate() {
    this.engine.start();
    this.engine.go();
  }
}
```

You could break the functionality into separate classes that solely focus on one piece.
They could be.

- Timer
- Operations
- Pop up
- etc...

```js
class Timer {
  constructor(){ // what it needs to function}
  timer(){
    // functionality in here
  }
  displayTime(){
    // functionality in here
  }
}

class Game {
  constructor(){ // what it needs to function
  this.timer = new Timer(// what it needs)
  }

  // You use the class when you need it in the game

}
```

It is hard to describe and would only be a bonus.

Let me know if you want me to explain any of the points from the file.

---
