
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
const COLORS = ["#ff0000", "#ff8700", "#ffd300", "#deff0a", "#a1ff0a", "#0aff99", "#0aefff", "#147df5", "#580aff", "#be0aff"]

function infoBanner(text, error) {
    var infoBanner = document.createElement("div")
    infoBanner.innerHTML = text
    if (error) infoBanner.classList = "infoBanner error"
    else infoBanner.classList = "infoBanner info"
    document.body.appendChild(infoBanner);
    setTimeout( function() { removeInfoBanner(infoBanner); }, 3000);
}

function removeInfoBanner(infoBanner) {
    document.body.removeChild(infoBanner)
}

function showMenu() {

    var value = this.value
    numberToBeInserted = -1;

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

        var self = this;

        for (let i = 0; i < 10; i ++) {
            var numberDiv = document.getElementById("header-number-" + i)
            numberDiv.className = "number"
            if (i == value) numberDiv.className += " active"
        }

        var rotateRight = document.createElement("button")
        rotateRight.className = "turn-Right"
        rotateRight.innerHTML = "Nach Rechts drehen"
        rotateRight.addEventListener("click", function() {numberArray[value].rotate(true)}, false)
        
        var rotateLeft = document.createElement("button")
        rotateLeft.className = "turn-Left"
        rotateLeft.innerHTML = "Nach Links drehen"
        rotateLeft.addEventListener("click", function() {numberArray[value].rotate(false)}, false)
        
        container.appendChild(rotateLeft)
        container.appendChild(rotateRight)
        
        if (this.insertedX == -1) {
            var insertNumber = document.createElement("button")
            insertNumber.className = "insertNumber"
            insertNumber.innerHTML = "Nummer im Grid einfügen"
            insertNumber.addEventListener("click", function() {prepareInsertNumberToGrid.call(self)}, false)
            container.appendChild(insertNumber)
        }
        
        if (this.insertedX != -1) {
            var removeNumber = document.createElement("button")
            removeNumber.className = "removeNumber"
            removeNumber.innerHTML = "Nummer aus Grid entfernen"
            removeNumber.addEventListener("click", function() {removeNumberFromGrid.call(self)}, false)
            container.appendChild(removeNumber)
        }
    }
}

function prepareInsertNumberToGrid() {
    numberToBeInserted = this.value
    infoBanner("Bitte Nummer im Grid auswählen!", false)
}

function removeNumberFromGrid() {
    var number = numberArray[numberToBeInserted]


    // ToDo: Remove from Board


    number.insertedX = -1;
    number.insertedY = -1;
    number.insertedOrientation = -1;
    insertedNumbers.splice(insertedNumbers.findIndex(number.value), 1);
}

function insertNumberToGrid(x, y) {    
    // Check that a number is selected to be inserted
    if (numberToBeInserted == -1 || numberToBeInserted > 10) {
        numberToBeInserted = -1
        return;
    }

    var number = numberArray[numberToBeInserted]

    // Check that number was not inserted previously
    if (insertedNumbers.filter(n => n == number.value).length > 0) {
        infoBanner("Diese Nummer ist schon im Grid vorhanden! Entferne die Nummer aus dem Grid oder wähle eine andere Nummer aus", true)
        return;
    }

    // Check if enough space is for the number
    if (x + number.squares[0].length > 16 || y + number.squares.length > 13) {
        infoBanner("Kein Platz für die Nummer! Bitte neues Feld wählen", true)
        return;
    }



    for (let i = 0; i < number.squares.length; i ++) {
        for (let j = 0; j < number.squares[i].length; j++) {
            if (board.checkIfSquareIsOccupied(x + j, y + i, number.squares[i][j])) {
                infoBanner("Kollision mit einer anderen Zahl! Bitte neues Feld wählen", true)
                return
            }
        }
    }

    for (let i = 0; i < number.squares.length; i ++) {
        for (let j = 0; j < number.squares[i].length; j++) {
            board.updateValue(x + j, y + i, number.squares[i][j], number.value)
        }
    }

    number.insertedX = x;
    number.insertedY = y;
    number.insertedOrientation = number.orientation;
    // Insert Number
    insertedNumbers.push(number.value)
    numberToBeInserted = -1
    
    
    board.updateBoard()
    this.showMenu()
}

// ------ //

var numberArray = []
var numberToBeInserted = -1
var insertedNumbers = []


for (let i = 0; i < 10; i++) {
    numberArray.push(new _Number(i))
    numberArray[i].displayNumber()
}

this.showMenu()

var board = new Board()
