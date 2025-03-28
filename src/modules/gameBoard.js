import Ship from "./ship.js";
import { checkCoord } from "./checkCoord.js";

export class Gameboard {
  constructor() {
    this.game = new Board();
    this.board = this.game.board();
    this.ships = [];
  }

  setShip(name, x, y, direction) {
    checkError(x, y);
    const ship = new Ship(name, x, y, direction);
    const moves = checkCoord(this.board, ship);
    ship.moves = moves;
    this.ships.push(ship);
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

export const checkError = (x, y) => {
  if (x > 9 || x < 0 || y > 9 || y < 0) {
    throw new Error("Invalid move!");
  }
};
