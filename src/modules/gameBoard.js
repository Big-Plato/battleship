import Ship from "./ship.js";

export class Gameboard {
  constructor() {
    this.game = new Board();
    this.board = this.game.board();
    this.ships = [];
  }

  setShip(name, x, y) {
    checkError(x, y);
    const ship = new Ship(name, x, y);
    this.ships.push(ship);
    this.putShip(ship)
  }

  putShip(ship) {
    let x = ship.x;
    let y = ship.y;
    const len = ship.length;
    for (let i = 0; i < len; i++) {
      this.board[x][y] = 'S';
      y++;
    }
  }

  receiveAttack(x, y) {
    checkError(x, y);
    this.board[x][y] === 0 ? "X" : "A";
  }

  getBoard() {
    return this.board;
  }
}

class Board {
  constructor() {}

  board() {
    const table = [];
    for (let i = 0; i < 10; i++) {
      table[i] = [];
      for (let j = 0; j < 10; j++) {
        table[i].push(0);
      }
    }
    return table;
  }
}

const checkError = (x, y) => {
  if (x > 9 || x < 0 || y > 9 || y < 0) {
    throw new Error("Invalid move!");
  }
};

const randomizer = () => {
    const random = Math.floor(Math.random() * 2);
    return random;
}

const createCoord = (x, y, len) => {
  
}