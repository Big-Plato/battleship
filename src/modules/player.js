import { Gameboard } from "./gameBoard.js"

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }
}

class Real extends Player {
    constructor() {
        super();
    }
}

class Computer extends Player {
    constructor(name = "Computer") {
        super();
        this.name = name;
    }
}

export { Player, Real, Computer }