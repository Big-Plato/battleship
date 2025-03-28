import Ship from "./ship.js";

describe("isSunk return true if ship has received hits equal to his length", () => {
  const ship1 = new Ship("Battleship", 0, 0);
  const ship2 = new Ship("Destroyer", 0, 0);
  test("expect isSunk to equal true with battleship been hit 4 times", () => {
    for (let i = 0; i < ship1.length; i++) {
      ship1.hit();
    }
    expect(ship1.isSunk()).toBeTruthy();
  });

  test("expect isSunk to equal true with destroyer been hit 3 times", () => {
    for (let i = 0; i < ship2.length; i++) {
      ship2.hit();
    }
    expect(ship2.isSunk()).toBeTruthy();
  });
});
