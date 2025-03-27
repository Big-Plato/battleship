import { Gameboard } from "./gameBoard.js";

const gameboard = new Gameboard();

describe("Gameboard", () => {
  const expected = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  test("The board is generated with zeros", () => {
    expect(gameboard.board).toEqual(expected);
  });

  test("Horizontal ship", () => {
    gameboard.setShip("Destroyer", 0, 0, "Horizontal");
    expect(gameboard.board[0][0]).toBe("S");
  });

  test("Vertical ship", () => {
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
    expect(() => {
      gameboard.setShip("Battleship", 0, 0, "Horizontal");
    }).toThrow("Place occupied");
  });

  test("Can't put new ship in occupied place (Vertical)", () => {
    expect(() => {
      gameboard.setShip("Battleship", 0, 0, "Vertical");
    }).toThrow("Place occupied");
  });
});

describe("Empty places", () => {
  gameboard.setShip("Destroyer", 2, 1, "Horizontal");
  test("All of coordenates around the boat has to be '0' or '-1'", () => {
    expect(() => {
      gameboard.setShip("Battleship", 1, 1, "Horizontal");
    }).toThrow("There's a ship around. Invalid place!");
  });
});