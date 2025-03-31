import { collision } from "./collision.js";

export const checkCoord = (board, ship) => {
  const { x, y, length, direction } = ship;
  const moves = [];
  const occupiedCells = [];

  // Generate all cells of the ship
  const shipCells = [];
  for (let i = 0; i < length; i++) {
    shipCells.push(direction == "Horizontal" ? [x, y + i] : [x + i, y]);
  }

  // Check cells and his adjacents
  for (const [cellX, cellY] of shipCells) {
    // Check limits of the board
    if (cellX < 0 || cellX >= 10 || cellY < 0 || cellY >= 10) {
      throw new Error("Ship is outside the board");
    }

    // Check main cell and adjacents
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const adjX = cellX + dx;
        const adjY = cellY + dy;
        if (adjX >= 0 && adjX < 10 && adjY >= 0 && adjY < 10) {
          collision(board[adjX][adjY]);
        }
      }
    }
    occupiedCells.push([cellX, cellY]);
  }

  // Mark occupied cells
  for (const [cellX, cellY] of occupiedCells) {
    board[cellX][cellY] = "S";
    moves.push([cellX, cellY]);
  }
  return moves;
};
