import { generateBoard } from "./domManipulation.js";
import { Real, Computer } from "./player.js";

export const game = () => {
    const divBoard = document.querySelector(".board-div");
    const pBoard = document.querySelector(".board");

    const p1Board = document.querySelector("#p1-board");
    const p2Board = document.querySelector("#p2-board");

    const player1 = new Real();
    const player2 = new Computer();

    const player1Board = player1.board;
    const player2Board = player2.board;

    generateBoard(p1Board, player1Board);
    generateBoard(p2Board, player2Board);

    
}

const randomizer = (num) => {
    const random = Math.floor(Math.random() * num);
    return random;
}

const generateRandomShips = () => {
    
}