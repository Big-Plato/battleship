export default class Ship {
  #shipType(name) {
    switch (name) {
      case "Carrier":
        return (this.length = 5);
      case "Battleship":
        return (this.length = 4);
      case "Destroyer":
        return (this.length = 3);
      case "Submarine":
        return (this.length = 3);
      case "Patrol":
        return (this.length = 2);
    }
  }

  constructor(name, x, y, direction) {
    this.name = name;
    this.numberOfHits = 0;
    this.sunk = false;
    this.x = x;
    this.y = y;
    this.length = this.#shipType(name);
    this.direction = direction;
  }

  numberOfHits() {
    return this.numberOfHits;
  }

  hit() {
    this.numberOfHits++;
  }

  isSunk() {
    if (this.numberOfHits == this.length) {
      this.sunk = true;
      return this.sunk;
    } else {
      return false;
    }
  }
}
