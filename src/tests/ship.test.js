import Ship from "../modules/ship.js";

const ship1 = new Ship();

test('expect isSunk to equal true with ship been hit 4 times', () => {
    expect(ship1.isSunk()).toBe(true);
});

