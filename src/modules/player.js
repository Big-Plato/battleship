import { Gameboard } from "./gameBoard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  getBoard() {
    return this.board;
  }
}

class Real extends Player {
  constructor(name = "Human") {
    super();
    this.name = name;
  }
}

class Computer extends Player {
  constructor() {
    super("Computer");
    this.attacks = new Set();
  }

  randomAttack() {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.attacks.has(key));

    this.attacks.add(key);
    return { x, y };
  }
}

export { Player, Real, Computer };
