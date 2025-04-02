import { Computer } from "./player.js";
import pubSub from "./utils/pubSub.js";

let gameInstance = null;

export function setGameInstance(game) {
    gameInstance = game;
}

function getGameInstance() {
    if (!gameInstance) {
        throw new Error("Game instance not set!");
    }
    return gameInstance;
}

class GameState {
    constructor() {
        this.currentPlayer = 'human';
        this.computer = new Computer();
        this.setupEventListeners();
    }

    setupEventListeners() {
        pubSub.subscribe('humanMove', this.playHumanMove.bind(this));
        pubSub.subscribe('computerMove', this.playComputerMove.bind(this));
    }

    playHumanMove(move) {
        if (this.currentPlayer !== 'human') return;

        try {
            const result = this.processMove(move, 'human');

            if (result.hit) {
                pubSub.publish('hit', { player: 'human', ...move});
                return;
            }

            pubSub.publish('miss', { player: 'human', ...move});
            this.switchToComputer();
        } catch (error) {
            pubSub.publish('gameError', error);
        }
    }

    playComputerMove() {
        if (this.currentPlayer !== 'computer') return;

        setTimeout(() => {
            const move = this.computer.randomAttack();

            try {
                const result = this.processMove(move, 'computer');

                if (result.hit) {
                    pubSub.publish('hit', { player: 'computer', ...move});
                    this.playComputerMove();
                    return;
                }

                pubSub.publish('miss', { player: 'computer', ...move});
                this.switchToHuman();
            } catch (error) {
                pubSub.publish('gameError', error);
            }
        }, 800);
    }

    processMove(move, player) {
            const opponent = player === 'human' ? 'computer' : 'human';
            const game = getGameInstance();

            return game.receiveAttack(move.x, move.y, opponent);
    }

    switchToComputer() {
        this.currentPlayer = 'computer';
        pubSub.publish('turnChanged', 'computer');
        this.playComputerMove();
    }

    switchToHuman() {
        this.currentPlayer = 'human';
        pubSub.publish('turnChanged', 'human');
    }
}

export const gameState = new GameState();