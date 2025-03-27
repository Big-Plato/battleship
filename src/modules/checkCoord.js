import { collision } from "./collision.js";

export const checkCoord = (board, ship) => {
  let x = ship.x;
  let y = ship.y;
  const len = ship.length;
  const direction = ship.direction;
  let i = 0;
  const moves = [];

  const possibleMoves = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],

    [x - 1, y],
    [x + 1, y],

    [x - 1, y + len],
    [x, y + len],
    [x + 1, y + len],
  ];

  for (let i = 0; i < possibleMoves.length; i++) {
    const x = possibleMoves[i][0];
    const y = possibleMoves[i][1];

    if (board[x] == -1 || board[y] == -1) {
        break;
    }

    if (board[x][y] == 'S' || board[x][y] == 'A')  {
        throw new Error("There's a ship around. Invalid place!");
    } 
  }

  if (direction == "Horizontal") {
    if (y - len < 0) {
      while (i < len) {
        collision(board[x][y])
        board[x][y] = "S";
        moves.push([x, y]);
        y++;
        i++;
      }
    } else {
      while (i < len) {
        collision(board[x][y])
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
        collision(board[x][y])
        board[x][y] = "S";
        moves.push([x, y]);
        x++;
        i++;
      }
    } else {
      while (i < len) {
        collision(board[x][y])
        board[x][y] = "S";
        moves.push([x, y]);
        x--;
        i++;
      }
    }
  }
  console.log(moves);
  return moves;
};
