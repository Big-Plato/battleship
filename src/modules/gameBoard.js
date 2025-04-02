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
    console.log(`Placing ${name} at ${x},${y} (${direction})`);
    const ship = new Ship(name, x, y, direction);
    const moves = checkCoord(this.board, ship);
    ship.moves = moves;
    this.ships.push(ship);
  }

  printShips() {
    this.ships.forEach((ship) => {
      console.log(`${ship.name} positions:`, ship.moves);
    });
  }

  receiveAttack(x, y) {
    checkError(x, y);

    if (this.board[x][y] === "X" || this.board[x][y] === "A") {
      throw new Error(`Cell ${x},${y} already attacked!`);
    }

    if (this.board[x][y] === "S") {
      this.board[x][y] = "A";
      const hitShip = this.ships.find((ship) =>
        ship.moves.some(([cx, cy]) => cx === x && cy === y),
      );

      if (!hitShip) {
        console.error("Ship not found at attacked position!");
        return { hit: false, sunk: false };
      }

      hitShip.hit();
      return {
        hit: true,
        sunk: hitShip.isSunk(),
        ship: hitShip,
      };
    } else {
      this.board[x][y] = "X";
      return { hit: false, sunk: false };
    }
  }

  gameOver() {
    return this.ships.every((ship) => ship.isSunk());
  }

  eraseBoard() {
    const newBoard = new Board();
    this.game = newBoard;
    this.ships = [];
    this.board = newBoard.board();
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
