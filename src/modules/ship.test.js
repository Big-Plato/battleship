import Ship from "./ship.js";

const ship1 = new Ship("Battleship", 0, 0);

test("expect isSunk to equal true with battleship been hit 4 times", () => {
  for (let i = 0; i < ship1.length; i++) {
    ship1.hit();
  }
  expect(ship1.isSunk()).toBeTruthy();
});

// test("expect isSunk to equal true with destroyer ")
