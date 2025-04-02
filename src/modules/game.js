import { Real, Computer } from "./player.js";
import {
  start,
  typeWriter,
  generateBoard,
  generateRandomShips,
  triggerGlitch,
} from "./domManipulation.js";

const ctrlDiv = document.querySelector(".ctrl-btn");
const info = document.querySelector("#info");

const p1Board = document.querySelector("#p1-board");
const p2Board = document.querySelector("#p2-board");

export const game = () => {
  start.innerHTML = "";

  const player1 = new Real();
  const player2 = new Computer();

  const player1Board = player1.board;
  const player2Board = player2.board;

  generateRandomShips(player1Board);
  generateRandomShips(player2Board);

  generateBoard(p1Board, player1Board);
  generateBoard(p2Board, player2Board);

  triggerGlitch("p1-board");
  triggerGlitch("p2-board");

  typeWriter(start, "Begin");
  playButtons();

  const randomBtn = document.querySelector("#random-btn");
  typeWriter(randomBtn, "Randomize");

  randomBtn.addEventListener("click", () => {
    player1.board.eraseBoard();
    p1Board.innerHTML = "";
    triggerGlitch("p1-board");
    generateRandomShips(player1Board);
    generateBoard(p1Board, player1Board);
  });

  start.removeEventListener("click", game);
  start.addEventListener("click", () => {
    randomBtn.remove();
    start.remove();
    gameFlow();
  });

  const playerOne = {
    name: player1.name,
    gameOver: player1.board.gameOver(),
    board: player1.board.board,
    ships: player1.board.ships,
}

const playerTwo = {
    name: player2.name,
    gameOver: player2.board.gameOver(),
    board: player2.board.board,
    ships: player2.board.ships,
}

const buttonsPlayer2 = handleBtns("p2-board");



// The game really starts here
  const gameFlow = () => {
    const switchTurns = (current) => {
        if (current === playerOne.name) {
            current = playerTwo.name;
        } else {
            current = playerOne.name;
        }
        console.log(current)
        return current;
    };
    
    let current = playerOne.name;

    buttonsPlayer2.forEach((e) => {
        e.addEventListener("click", () => {
            let play = playerBtns(e, player2Board);
            console.log(play)
            typeWriter(info, `${current}'s turn`);

            while (play === "Play again") {
                play = playerBtns(e, player2Board);
            }

            switchTurns(current);
            typeWriter(info, `${current}'s turn`);
            let compPlay = computerPlay(player1Board);

            while (compPlay === "Play Again") {
                compPlay = computerPlay(player1Board);
            }
        });
    });
        console.log(current);
    }     
};

const playButtons = () => {
  const randomizeBtn = document.createElement("button");
  randomizeBtn.setAttribute("id", "random-btn");
  ctrlDiv.insertBefore(randomizeBtn, start);
};


const handleBtns = (board) => {
    let buttons = [];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const button = document.querySelector(`#${board}-h${i}${j}`);
            buttons.push(button);
        }
    }
    return buttons;
}

const computerPlay = (player1Board) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    const play = document.querySelector(`#p1-board-${x}${y}`);
    console.log(play)

    if (play.classList.contains("ship")) {
        play.classList.add("revealed");
        play.classList.add("hit");
        player1Board.receiveAttack(x, y);
        return "Play Again";
    } else {
        player1Board.receiveAttack(x, y);
        play.classList.add("revealed");
        play.classList.add("miss");
    }
}

const playerBtns = (e, board) => {
    if (e.classList.contains("ship")) {
        e.classList.add("revealed");
        e.classList.add("hit");
        board.receiveAttack(e.dataset.x, e.dataset.y);
        return "Play Again";
    } else {
        board.receiveAttack(e.dataset.x, e.dataset.y);
        e.classList.add("revealed");
        e.classList.add("miss");
        return "Someone else's turn"
    }
}