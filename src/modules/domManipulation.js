// player1Board.setShip("Destroyer", 0, 0, "Horizontal");
// player1Board.setShip("Battleship", 2, 7, "Vertical");
// player1Board.setShip("Submarine", 4, 3, "Vertical");
// player1Board.setShip("Carrier", 0, 9, "Vertical");


// player2Board.setShip("Submarine", 7, 0, "Vertical");
// player2Board.setShip("Destroyer", 8, 2, "Horizontal")
// player2Board.setShip("Battleship", 2, 4, "Vertical");
// player2Board.setShip("Carrier", 0, 4, "Horizontal");

const shipColor = (ship, cell) => {
    switch (ship) {
        case "Destroyer":
            cell.classList.add("destroyer");
            break;
        case "Carrier":
            cell.classList.add("carrier");
            break;
        case "Battleship": 
            cell.classList.add("battleship");
            break;
        case "Submarine":
            cell.classList.add("submarine");
            break;
    }
}

const generateOccupiedCells = (player, ships) => {
    const moves = ships.moves;
    console.log(moves);
    const joinedMoves = moves.map((x) => {
        return x.join("");
    })

    for (let move of joinedMoves) {
        console.log(move);
        const cell = document.getElementById(`${player.id}-${move}`);
        shipColor(ships.name, cell);
    }
}

export const generateBoard = (player, board) => {
    const table = board.board;
    const ships = board.ships;
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            cell.setAttribute("id", `${player.id}-${[i]+ [j]}`);
            player.append(cell);
        }   
    }

    for (let i = 0; i < ships.length; i++) {
        generateOccupiedCells(player, ships[i]);
    }
}






