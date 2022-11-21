
/* Square
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

    // 0 == upright
    // 1 == turned 90°
    // 2 == turned 180°
    // 3 == turned 270°
    orientation = 0
    insertedX = -1
    insertedY = -1
    insertedOrientation = -1

    constructor(value) {
        this.value = value
        // Orientation: 0 = Up, 1 = 90° turned, 2 = 180° turned, 3 = 270° turned
        this.createNumber(value)
    }

    // Assign corresponding triangle to the corresponding position in a 4 by 7 grid
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

    displayNumber() {
        var header = document.getElementById("header")
        var number = document.getElementById("header-number-" + this.value)
        
        if (number != null) header.removeChild(number)
        number = document.createElement("div")
        
        number.className = "number"
        number.style.gridTemplateColumns = "repeat(" + this.squares[0].length + ", 20px)"
        number.style.gridTemplateRows = "repeat(" + this.squares.length + ", 20px)"
        number.id = "header-number-" + this.value

        // Add event listener for menue on number
        var self = this;
        number.addEventListener("click", function() {showMenu.call(self)}, false);
        
        var nodeAfter = document.getElementById("header-number-" + (this.value + 1))
        if (nodeAfter != null) header.insertBefore(number, nodeAfter)
        else header.appendChild(number)

        this.insertSquares(number)
    }

    insertSquares(number) {
        for (let i = 0; i < this.squares.length; i ++) {
            for (let j = 0; j < this.squares[i].length; j++) {
                let square = document.createElement("div");
                square.className = "container"
            
                if (this.squares[i][j] == 15) {
                    square.className += " full-background"
                } else {
                    let triangle1 = document.createElement("div")
                    triangle1.className = "triangle triangle-top"
                    if (!((this.squares[i][j] & 4) === 4)) triangle1.className += " hidden"
                    square.appendChild(triangle1)
                    
                    let triangle2 = document.createElement("div")
                    triangle2.className = "triangle triangle-left"
                    if (!((this.squares[i][j] & 2) === 2)) triangle2.className += " hidden"
                    square.appendChild(triangle2)
                    
                    let triangle3 = document.createElement("div")
                    triangle3.className = "triangle triangle-right"
                    if (!((this.squares[i][j] & 8) === 8)) triangle3.className += " hidden"
                    square.appendChild(triangle3)
                    
                    let triangle4 = document.createElement("div")
                    triangle4.className = "triangle triangle-bottom"
                    if (!((this.squares[i][j] & 1) === 1)) triangle4.className += " hidden"
                    square.appendChild(triangle4)
                }
                number.appendChild(square)       
            }
        }
    }

    // Rotates a number 90 degrees clock or anti clockwise
    // if rotate90DegRight == true => rotate clockwise
    // if rotate90DegRight == false => rotate clockwise
    rotate(rotate90DegRight) {
        // https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
        if (!rotate90DegRight) {
            this.reverseRow() 
            this.orientation--;
            if (this.orientation < 0) this.orientation = 3;
        }
        this.transpose()
        if (rotate90DegRight) {
            this.reverseRow() 
            this.orientation++;
            if (this.orientation > 3) this.orientation = 0;
        }
        this.rotateTriangle(rotate90DegRight)
        this.displayNumber()
        showMenu.call(this)
    }

    reverseRow() {
        for (let i = 0; i < this.squares.length; i ++) {
            this.squares[i].reverse()
        }
    }

    rotateTriangle(clockwise) {
        for (let i = 0; i < this.squares.length; i ++) {
            for (let j = 0; j < this.squares[i].length; j++) {
                // 0 and 15 don't need to be rotated
                if (!(this.squares[i][j] == 0 && this.squares[i][j] == 15)) {
                    let sum = 0;
                    // bottom -> left || bottom -> right
                    if ((this.squares[i][j] & 1) === 1) sum += clockwise === true ? 2 : 8
                    // left -> top || left -> bottom
                    if ((this.squares[i][j] & 2) === 2) sum += clockwise === true ? 4 : 1
                    // top -> right || top -> left
                    if ((this.squares[i][j] & 4) === 4) sum += clockwise === true ? 8 : 2
                    // right -> bottom || right -> top
                    if ((this.squares[i][j] & 8) === 8) sum += clockwise === true ? 1 : 4
                    this.squares[i][j] = sum
                }
            }
        }
    }

    transpose() {
        // https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
        this.squares = this.squares[0].map((col, i) => this.squares.map(row => row[i]));
    }

}

class Board {

    board = new Array(13).fill(new Array(16))

    constructor() {
        this.createBoard()
    }

    createBoard() {
        let grid = document.getElementById("grid")
        if (grid) {
            document.body.removeChild(grid);
        }
        grid = document.createElement("div");
        grid.id = "grid"
    
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 16; j++) {
                let square = document.createElement("div");
                square.id = i + "-" + j
                square.className = "container"
                grid.appendChild(square)
            }
        }
        document.body.appendChild(grid)
    }

}

var number = []

for (let i = 0; i < 10; i++) {
    number.push(new _Number(i))
    number[i].displayNumber()
}


function showMenu() {

    var value = this.value

    var menu = document.getElementById("menu")
    var container = document.getElementById("menu-container")
    if (container != null) menu.removeChild(container)
    container = document.createElement("div")
    container.id = "menu-container"
    
    menu.appendChild(container)

    var title = document.createElement("span")
    title.innerHTML = "Ausgewählte Zahl: " + (value === undefined ? "Bitte Zahl Auswählen" : value)
    container.appendChild(title)


    if (value != undefined) {

        for (let i = 0; i < 10; i ++) {
            var numberDiv = document.getElementById("header-number-" + i)
            numberDiv.className = "number"
            if (i == value) numberDiv.className += " active"
        }

        var rotateRight = document.createElement("button")
        rotateRight.className = "turn-Right"
        rotateRight.innerHTML = "Nach Rechts drehen"
        rotateRight.addEventListener("click", function() {number[value].rotate(true)}, false)
        
        var rotateLeft = document.createElement("button")
        rotateLeft.className = "turn-Left"
        rotateLeft.innerHTML = "Nach Links drehen"
        rotateLeft.addEventListener("click", function() {number[value].rotate(false)}, false)
        
        container.appendChild(rotateLeft)
        container.appendChild(rotateRight)
        
        if (this.insertedX == -1) {
            var insertNumber = document.createElement("button")
            insertNumber.className = "insertNumber"
            insertNumber.innerHTML = "Nummer im Grid einfügen"
            insertNumber.addEventListener("click", function() {insertNumberToGrid()}, false)
            container.appendChild(insertNumber)
        }
        
        if (this.insertedX != -1) {
            var removeNumber = document.createElement("button")
            removeNumber.className = "removeNumber"
            removeNumber.innerHTML = "Nummer aus Grid entfernen"
            removeNumber.addEventListener("click", function() {removeNumberFromGrid()}, false)
            container.appendChild(removeNumber)
        }
    }
}

function insertNumberToGrid() {

}

function removeNumberFromGrid() {

}

this.showMenu()


var board = new Board()
