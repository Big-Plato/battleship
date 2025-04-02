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
  constructor(name = "Computer") {
    super();
    this.name = name;
  }
}

export { Player, Real, Computer };
