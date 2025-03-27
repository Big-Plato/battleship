import Ship from "./ship.js";

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

const checkError = (x, y) => {
  if (x > 9 || x < 0 || y > 9 || y < 0) {
    throw new Error("Invalid move!");
  }
};

const checkCoord = (board, ship) => {
  // Coisas que precisam ser feitas:
  // Checar se os espaços ao redor são vazios
  let x = ship.x;
  let y = ship.y;
  const len = ship.length;
  const direction = ship.direction;
  let i = 0;
  const moves = [];

  const checkEmpty = (moves) => {
    const possibleMoves = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
  
      [x - 1, y],
      [x + 1, y],
  
      [x - 1, y + len],
      [x, y + len],
      [x + 1, y + len]
    ]
  }

  if (direction == "Horizontal") {
    if (y - len < 0) {
      while (i < len) {
        board[x][y] = "S";
        moves.push([x, y]);
        y++;
        i++;
      }
    } else {
      while (i < len) {
        board[x][y] = "S";
        moves.push([x, y]);
        y--;
        i++;
      }
    }
  }

  if (direction == "Vertical") {
    if (x - len < 0) {
      while (i < len) {
        board[x][y] = "S";
        moves.push([x, y]);
        x++;
        i++;
      }
    } else {
      while (i < len) {
        board[x][y] = "S";
        moves.push([x, y]);
        x--;
        i++;
      }
    }
  }
  console.log(moves)
  return moves;
};

