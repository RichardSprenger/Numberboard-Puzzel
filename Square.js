class _Square {

    combinedValue = 0
    values = []
    numbers = []

    constructor() {

    }

    static checkIfTriangleIsOccupied(squareValue, toBeInsertedValue) {
        return (((squareValue & 1) === 1 && (toBeInsertedValue & 1) === 1) ||       // If bit 1 is already occupied
                ((squareValue & 2) === 2 && (toBeInsertedValue & 2) === 2) ||       // If bit 2 is already occupied
                ((squareValue & 4) === 4 && (toBeInsertedValue & 4) === 4) ||       // If bit 3 is already occupied
                ((squareValue & 8) === 8 && (toBeInsertedValue & 8) === 8))         // If bit 4 is already occupied
    }

    insert(value, number) {
        // check if value is allowed to be inserted
        if (this.combinedValue > 0 && _Square.checkIfTriangleIsOccupied(this.combinedValue, value))  // If 0 than any value can be inserted and triangle is not occupied
            return false;

        // insert the value
        this.values.push(value);
        this.combinedValue += value;
        this.numbers.push(number)
        return true
    }

    remove(number) {
        let i = this.numbers.findIndex(num => num == number)
        this.combinedValue -= this.values[i];
        this.values.splice(i, 1)
        this.numbers.splice(i, 1)
    }

}