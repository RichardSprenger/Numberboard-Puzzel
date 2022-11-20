
/* Subquare
* Bitwise:
* 1 = bottom triangle filled
* 2 = left triangle filled
* 4 = top triangle filled
* 8 = right triangle filled
*/

/* Square
* 1 Suare = 4 subsquares
*/

// 4 Squared = 1 segment

/* 7 segments = 1 number
  0
1   2
  3
4   5
  6
*/

class _Number {
    /*
     * Size: Width: 4
             Height: 7 Squares
    */
    // Initialized with an 8
    squares = [[9, 15, 15, 3], [15, 0, 0 , 15], [15, 0, 0, 15], [13, 15, 15, 7], [15, 0, 0, 15], [15, 0, 0, 15], [12, 15, 15, 6]]
    constructor(value) {
        this.createNumber(value)
    }


    createNumber(value) {
        switch (value) {
            case 0: this.squares = [[9, 15, 15, 3], [15, 0, 0, 15], [15, 0, 0, 15], [1, 0, 0, 13], [15, 0, 0, 15], [15, 0, 0, 15], [12, 15, 15, 6]]; break;
            case 1: this.squares = [[1, 0, 0, 0], [15, 0, 0, 0], [15, 0, 0, 0], [7, 0, 0, 0], [15, 0, 0, 0], [15, 0, 0, 0], [4, 0, 0, 0]]; break;
            case 2: this.squares = [[8, 15, 15, 3], [0, 0, 0, 15], [0, 0, 0, 15], [9, 15, 15, 6], [15, 0, 0, 0], [15, 0, 0, 0], [12, 15, 15, 2]]; break;
            case 3: this.squares = [[8, 15, 15, 3], [0, 0, 0, 15], [0, 0, 0, 15], [8, 15, 15, 7], [0, 0, 0, 15], [0, 0, 0, 15], [8, 15, 15, 6]]; break;
            case 4: this.squares = [[1, 0, 0, 1], [15, 0, 0, 15], [15, 0, 0, 15], [12, 15, 15, 7], [0, 0, 0, 15], [0, 0, 0, 15], [0, 0, 0, 4]]; break;
            case 5: this.squares = [[9, 15, 15, 2], [15, 0, 0, 0], [15, 0, 0, 0], [12, 15, 15, 3], [0, 0, 0, 15], [0, 0, 0, 15], [8, 15, 15, 6]]; break;
            case 6: this.squares = [[9, 15, 15, 2], [15, 0, 0, 0], [15, 0, 0, 0], [13, 15, 15, 3], [15, 0, 0, 15], [15, 0, 0, 15], [12, 15, 15, 6]]; break;
            case 7: this.squares = [[8, 15, 15, 3], [0, 0, 0, 15], [0, 0, 0, 15], [0, 0, 0, 13], [0, 0, 0, 15], [0, 0, 0, 15], [0, 0, 0, 4]]; break;
            case 8: this.squares = [[9, 15, 15, 3], [15, 0, 0, 15], [15, 0, 0, 15], [13, 15, 15, 7], [15, 0, 0, 15], [15, 0, 0, 15], [12, 15, 15, 6]]; break;
            case 9: this.squares = [[9, 15, 15, 3], [15, 0, 0, 15], [15, 0, 0, 15], [12, 15, 15, 7], [0, 0, 0, 15], [0, 0, 0, 15], [8, 15, 15, 6]]; break;
        }
    }
}

function displayNumber(squares) {
    console.log(squares)
    var header = document.getElementById("header")
    var main = document.createElement("div")
    main.className = "number"
    header.appendChild(main)
    for (let i = 0; i < 7; i ++) {
        for (let j = 0; j < 4; j++) {
            let square = document.createElement("div");
            square.className = "container"
            main.appendChild(square)
            /* Square
            * Bitwise:
            * 1 = bottom triangle filled
            * 2 = left triangle filled
            * 4 = top triangle filled
            * 8 = right triangle filled
            */
            let triangle1 = document.createElement("div")
            triangle1.className = "triangle triangle-top"
            if (!((squares[i][j] & 4) === 4)) triangle1.className += " hidden"
            let triangle2 = document.createElement("div")
            triangle2.className = "triangle triangle-left"
            if (!((squares[i][j] & 2) === 2)) triangle2.className += " hidden"
            let triangle3 = document.createElement("div")
            triangle3.className = "triangle triangle-right"
            if (!((squares[i][j] & 8) === 8)) triangle3.className += " hidden"
            let triangle4 = document.createElement("div")
            triangle4.className = "triangle triangle-bottom"
            if (!((squares[i][j] & 1) === 1)) triangle4.className += " hidden"
            square.appendChild(triangle1)
            square.appendChild(triangle2)
            square.appendChild(triangle3)
            square.appendChild(triangle4)
        }
    }
}
var number = []

for (let i = 0; i < 10; i++) {
    number.push(new _Number(i))
    displayNumber(number[i].squares)
}

// Width: 16 squares; Height: 13 squares
var bord = new Array(13).fill(new Array(16))

function createBoard() {
    let grid = document.getElementById("grid")
    if (grid) {
        document.body.removeChild(grid);
    }
    grid = document.createElement("div");

    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 16; j++) {
            
        }
    }
}

function updateBoard() {

}


// turn 90 deg
// turn -90 deg
// flip horizontally

// console.table(bord)

// console.table(numbers)