import Ship from "./ship.js"

export class Gameboard {
    constructor() {
        this.game = new Board();
        this.board = this.game.board();
    }

    receiveAttack(x, y) {
        const board = this.board;
        if (x > 9 || x < 0 || y > 9 || y < 0) {
            throw new Error("Invalid coordenate!");
        }
        board[x][y] = "X";
    }

    getBoard() {
        return this.board;
    }
}

class Board {
    constructor() {
    }

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