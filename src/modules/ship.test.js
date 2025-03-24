import Ship from "./ship.js";

const ship1 = new Ship(4);

test('expect isSunk to equal true with ship been hit 4 times', () => {
    for (let i = 0; i < 4; i++) {
        ship1.hit();
    }
    expect(ship1.isSunk()).toBeTruthy();
});

