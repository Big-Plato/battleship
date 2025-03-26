export default class Ship {
  constructor(name, x, y) {
    this.name = name;
    this.numberOfHits = 0;
    this.sunk = false;
    this.type = this.shipType(name);
    this.x = x;
    this.y = y;
  }

  numberOfHits() {
    return this.numberOfHits;
  }

  shipType(name) {
    switch (name) {
      case "Carrier":
        return new Carrier();
      case "Battleship":
        return new Battleship();
      case "Destroyer":
        return new Destroyer();
      case "Submarine":
        return new Submarine();
    }
  }

  hit() {
    this.numberOfHits++;
  }

  isSunk() {
    if (this.numberOfHits == this.type.length) {
      this.sunk = true;
      return this.sunk;
    } else {
      return false;
    }
  }

  shipObj() {
    return {};
  }
}

class Carrier extends Ship {
  constructor(len = 5) {
    super();
    this.len = len;
  }
}

class Battleship extends Ship {
  constructor(len = 4) {
    super();
    this.len = len;
  }
}

class Destroyer extends Ship {
  constructor(len = 3) {
    super();
    this.len = len;
  }
}

class Submarine extends Ship {
  constructor(len = 2) {
    super();
    this.len = len;
  }
}
