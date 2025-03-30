import { beforeEach } from "jest-circus";
import { Gameboard } from "./gameBoard.js";

describe("Gameboard", () => {
  const gameboard = new Gameboard();

  test("Horizontal ship", () => {
    gameboard.setShip("Destroyer", 0, 0, "Horizontal");
    expect(gameboard.board[0][0]).toBe("S");
  });

  test("Vertical ship", () => {
    const gameboard = new Gameboard();
    gameboard.setShip("Battleship", 0, 0, "Vertical");
    expect(gameboard.board[1][0]).toBe("S");
  });

  test("Check error", () => {
    expect(() => {
      gameboard.setShip("Destroyer", -1, 0, "Horizontal");
    }).toThrow("Invalid move!");
  });
});

describe("Collision", () => {
  test("Can't put new ship in occupied place (Horizontal)", () => {
    const gameboard = new Gameboard();

    gameboard.setShip("Battleship", 0, 0, "Horizontal");
    expect(() => {
      gameboard.setShip("Battleship", 0, 0, "Horizontal");
    }).toThrow("Place occupied");
  });

  test("Can't put new ship in occupied place (Vertical)", () => {
    const gameboard = new Gameboard();

    gameboard.setShip("Destroyer", 0, 0, "Vertical");
    expect(() => {
      gameboard.setShip("Destroyer", 0, 0, "Vertical");
    }).toThrow("Place occupied");
  });
});

describe("Empty places", () => {
  const gameboard = new Gameboard();

  gameboard.setShip("Destroyer", 2, 1, "Horizontal");
  test("All of coordenates around the boat has to be '0' or '-1'", () => {
    expect(() => {
      gameboard.setShip("Battleship", 1, 1, "Horizontal");
    }).toThrow("Place occupied");
  });
});
