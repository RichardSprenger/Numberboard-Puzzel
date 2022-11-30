// Colors for each number
const COLORS = ["#ff0000", "#ff8700", "#ffd300", "#deff0a", "#a1ff0a", "#0aff99", "#0aefff", "#147df5", "#580aff", "#be0aff"];

/**
 * 
 * Creates a popup for three secons containering the text
 * 
 * @param {String}  text    Infotext shown in the popup
 * @param {boolean} error   wether the popup is an error
 */
function infoBanner(text, error) {
    var infoBanner = document.createElement("div");
    infoBanner.innerHTML = text;
    infoBanner.className = "infoBanner";
    if (error) infoBanner.classList += " error";
    document.body.appendChild(infoBanner);
    setTimeout( function() { document.body.removeChild(infoBanner); }, 3000);
}

function showMenu() {

    var value = this.value;
    numberToBeInserted = -1;

    // Check if all numbers are added
    if (insertedNumbers.length == 10) {
        let win = document.createElement("div");
        win.className = "winBanner";
        win.innerHTML = "<h1>Herzlichen Glückwunsch!</h1> <br> <h2>Du hast gewonnen. Alle Zahlen sind im Grid</h2>";
        document.body.appendChild(win);
    }

    var menu = document.getElementById("menu");
    var container = document.getElementById("menu-container");
    if (container != null) menu.removeChild(container);
    container = document.createElement("div");
    container.id = "menu-container";
    
    menu.appendChild(container);

    var title = document.createElement("span");
    title.className = "menu-title";
    title.innerHTML = "Ausgewählte Zahl: " + (value === undefined ? "Bitte Zahl Auswählen" : value);
    container.appendChild(title);


    if (value != undefined) {

        var self = this;

        for (let i = 0; i < 10; i ++) {
            var numberDiv = document.getElementById("header-number-" + i);
            numberDiv.className = "number";
            if (i == value) numberDiv.className += " active";
        }

        var rotateRight = document.createElement("button");
        rotateRight.className = "turn-Right";
        rotateRight.innerHTML = "Nach Rechts drehen";
        rotateRight.addEventListener("click", function() {numberArray[value].rotate(true);}, false);
        
        var rotateLeft = document.createElement("button");
        rotateLeft.className = "turn-Left";
        rotateLeft.innerHTML = "Nach Links drehen";
        rotateLeft.addEventListener("click", function() {numberArray[value].rotate(false);}, false);
        
        var flip = document.createElement("button");
        flip.className = "flip";
        flip.innerHTML = "Vertikal spiegeln";
        flip.addEventListener("click", function() {numberArray[value].flipVertical();}, false);

        var flipH = document.createElement("button");
        flipH.className = "flip";
        flipH.innerHTML = "Horizontal spiegeln";
        flipH.addEventListener("click", function() {numberArray[value].flipHorizontal();}, false);

        container.appendChild(flip);
        container.appendChild(flipH);
        container.appendChild(rotateLeft);
        container.appendChild(rotateRight);
        
        if (this.insertedX == -1) {
            var insertNumber = document.createElement("button");
            insertNumber.className = "insertNumber";
            insertNumber.innerHTML = "Nummer im Grid einfügen";
            insertNumber.addEventListener("click", function(event) {
                event.stopPropagation();
                prepareInsertNumberToGrid.call(self);
            }, false);
            container.appendChild(insertNumber);
        }
        
        if (this.insertedX != -1) {
            var removeNumber = document.createElement("button");
            removeNumber.className = "removeNumber";
            removeNumber.innerHTML = "Nummer aus Grid entfernen";
            removeNumber.addEventListener("click", function() {removeNumberFromGrid.call(self);}, false);
            container.appendChild(removeNumber);
        }
    }
}

function prepareInsertNumberToGrid() {
    numberToBeInserted = this.value;
    infoBanner("Bitte Pinkt im Grid auswählen!", false);


    // Let Element hover at mouse position

    var numberClone = document.getElementById("header-number-clone")

    if (numberClone != null) document.body.removeChild(numberClone)

    // Clone number 
    const number = document.getElementById("header-number-" + this.value)
    numberClone = number.cloneNode(true)

    numberClone.className = "number number-clone"
    numberClone.id = "header-number-clone"

    numberClone.style.gridTemplateColumns = "repeat(" 
        + this.squares[0].length + ", " 
        + getComputedStyle(document.documentElement).getPropertyValue("--grid-grid-cell-size") + ")";
    numberClone.style.gridTemplateRows = "repeat(" 
        + this.squares.length + ", " 
        + getComputedStyle(document.documentElement).getPropertyValue("--grid-grid-cell-size") + ")";

    document.body.appendChild(numberClone)
    
    document.body.addEventListener('mousemove', function(event) {
        numberClone.style.top = event.pageY  + 'px'
        numberClone.style.left = event.pageX + 'px'
    })
    

}

function removeNumberFromGrid() {
    // Check that number was not inserted previously
    if (insertedNumbers.filter(n => n == this.value).length == 0) {
        infoBanner("Diese Nummer ist nicht mehr im Grid vorhanden!", true);
        return;
    }

    for (let i = 0; i < this.insertedState.length; i ++) {
        for (let j = 0; j < this.insertedState[i].length; j++) {
            board.board[this.insertedY + i][this.insertedX + j].remove(this.value);
        }
    }
    
    this.insertedX = -1;
    this.insertedY = -1;
    this.insertedState = [];
    insertedNumbers.splice(insertedNumbers.findIndex(val => val == this.value), 1);
    numberToBeInserted = -1;

    board.updateBoard();
    showMenu.call();
}

function insertNumberToGrid(x, y) {    
    // Check that a number is selected to be inserted
    if (numberToBeInserted == -1 || numberToBeInserted > 10) {
        numberToBeInserted = -1;
        return;
    }

    var number = numberArray[numberToBeInserted];

    // Check that number was not inserted previously
    if (insertedNumbers.filter(n => n == number.value).length > 0) {
        infoBanner("Diese Nummer ist schon im Grid vorhanden! Entferne die Nummer aus dem Grid oder wähle eine andere Nummer aus.", true);
        return;
    }

    // Check if enough space is for the number
    if (x + number.squares[0].length > 16 || y + number.squares.length > 13) {
        infoBanner("Kein Platz für die Nummer! Bitte neues Feld wählen", true);
        return;
    }

    for (let i = 0; i < number.squares.length; i ++) {
        for (let j = 0; j < number.squares[i].length; j++) {
            if (board.checkIfSquareIsOccupied(x + j, y + i, number.squares[i][j])) {
                infoBanner("Kollision mit einer anderen Zahl! Bitte neues Feld wählen", true);
                return;
            }
        }
    }

    // Remove clone from body
    var numberClone = document.getElementById("header-number-clone")
    if (numberClone != null) document.body.removeChild(numberClone)

    for (let i = 0; i < number.squares.length; i ++) {
        for (let j = 0; j < number.squares[i].length; j++) {
            board.board[y + i][x + j].insert(number.squares[i][j], number.value);
        }
    }

    number.insertedX = x;
    number.insertedY = y;
    number.insertedState = number.squares;
    // Insert Number
    insertedNumbers.push(number.value);
    numberToBeInserted = -1;
    
    
    board.updateBoard();
    this.showMenu();
}

// ------ //

// Remove number clone if document other than grid is clicked
document.getElementById("grid").onclick = function(event) {
    event.stopPropagation();
}

document.body.onclick = function() {
    var numberClone = document.getElementById("header-number-clone")
    if (numberClone != null) document.body.removeChild(numberClone)
}

var numberArray = [];
var numberToBeInserted = -1;
var insertedNumbers = [];


for (let i = 0; i < 10; i++) {
    numberArray.push(new _Number(i));
    numberArray[i].displayNumber();
}

this.showMenu();

var board = new Board();
