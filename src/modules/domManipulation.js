import { game } from "./game.js";

const start = document.querySelector("#start-btn");

const shipColor = (ship, cell) => {
  switch (ship) {
    case "Destroyer":
      cell.classList.add("ship");
      break;
    case "Carrier":
      cell.classList.add("ship");
      break;
    case "Battleship":
      cell.classList.add("ship");
      break;
    case "Submarine":
      cell.classList.add("ship");
      break;
  }
};

const generateOccupiedCells = (player, ships) => {
  const moves = ships.moves;
  const joinedMoves = moves.map((x) => {
    return x.join("");
  });

  for (let move of joinedMoves) {
    const cell = document.getElementById(`${player.id}-${move}`);
    shipColor(ships.name, cell);
  }
};

const generateBoard = (player, board) => {
  const table = board.board;
  const ships = board.ships;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.setAttribute("id", `${player.id}-${[i] + [j]}`);
      player.append(cell);
    }
  }

  for (let i = 0; i < ships.length; i++) {
    generateOccupiedCells(player, ships[i]);
  }
};

const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.innerHTML = "";
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

const triggerGlitch = (pBoard) => {
  const board = document.querySelector(`#${pBoard}`);
  board.style.textShadow = "0 0 5px #00ff41";
  board.style.opacity = "0.8";
  setTimeout(() => {
    board.style.textShadow = "none";
    board.style.opacity = "1";
  }, 100);
};

const hideBoard = () => {
  const board = document.querySelector("#p2-board").childNodes;

  for (let i = 0; i < board.length; i++) {
    board[i].style.display = "none";
  }  
};

const randomizer = (num) => {
  const random = Math.floor(Math.random() * num);
  return random;
};

const generateRandomShips = (playerBoard) => {
  const ships = ["Destroyer", "Battleship", "Submarine", "Carrier"];

  for (let i = 0; i < ships.length; i++) {
    const shipName = ships[i];
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    const direction = i % 2 === 0 ? "Horizontal" : "Vertical";

    while (!placed && attempts < maxAttempts) {
      try {
        playerBoard.setShip(
          shipName,
          randomizer(10),
          randomizer(10),
          direction,
        );
        placed = true;
      } catch (err) {
        attempts++;
        if (attempts >= maxAttempts) {
          console.error(
            `Failed to place ${shipName} after ${maxAttempts} attempts.`,
          );
        }
      }
    }
  }
};

typeWriter(start, 'Start');

start.addEventListener("click", game);

export { start, typeWriter, generateRandomShips, triggerGlitch, generateBoard, hideBoard }