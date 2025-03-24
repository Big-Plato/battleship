export default class Ship {
    constructor(length) {
        this.length = length;
        this.numberOfHits = 0;
        this.sunk = false;
    }

    getLength() {
        return this.length;
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