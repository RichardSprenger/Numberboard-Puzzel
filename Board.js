class Board {

    board = new Array(13)

    constructor() {

        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(16)
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = new _Square()
            }
        }

        this.updateBoard()
    }

    checkIfSquareIsOccupied(x, y, value) {
        console.log(x + " | " + y)
        if (this.board[y][x] == 0) return false;

        for (let i = 0; i < this.board[x][y].values.length; i++) {
            if (_Square.checkIfTriangleIsOccupied(this.board[y][x].values[i], value))
                return true;
        }

        return false;
    }

    updateValue(x, y, value, number) {
        this.board[y][x].insert(value, number)
    }

    updateBoard() {

        let grid = document.getElementById("grid")
        if (grid) {
            document.body.removeChild(grid);
        }
        grid = document.createElement("div");
        grid.id = "grid"
    
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let square = document.createElement("div")
                square.className = "container grid-container"
                square.addEventListener("click", function() {insertNumberToGrid(j, i)}, false)

                if (this.board[i][j].combinedValue == 15) {
                    square.className += " full-background"
                    square.style.backgroundColor = COLORS[this.board[i][j].numbers[0]]
                } else {
                    let triangle1 = document.createElement("div")
                    triangle1.className = "triangle triangle-top"
                    
                    let triangle2 = document.createElement("div")
                    triangle2.className = "triangle triangle-left"
                    
                    let triangle3 = document.createElement("div")
                    triangle3.className = "triangle triangle-right"
                    
                    let triangle4 = document.createElement("div")
                    triangle4.className = "triangle triangle-bottom"

                    let usedSquares = [false, false, false, false]
                    
                    for (let k = 0; k < this.board[i][j].values.length; k++) {
                        
                        if ((this.board[i][j].values[k] & 1) === 1) {
                            triangle4.style.borderBottomColor = COLORS[this.board[i][j].numbers[k]]
                            usedSquares[0] = true
                        }

                        if ((this.board[i][j].values[k] & 2) === 2) {
                            triangle2.style.borderLeftColor = COLORS[this.board[i][j].numbers[k]]
                            usedSquares[1] = true
                        }
                        
                        if ((this.board[i][j].values[k] & 4) === 4) {
                            triangle1.style.borderTopColor = COLORS[this.board[i][j].numbers[k]]
                            usedSquares[2] = true
                        }
                        
                        if ((this.board[i][j].values[k] & 8) === 8) {
                            triangle3.style.borderRightColor = COLORS[this.board[i][j].numbers[k]]
                            usedSquares[3] = true
                        }
                        
                    }

                    if (!usedSquares[0]) triangle4.className += " hidden"
                    if (!usedSquares[1]) triangle2.className += " hidden"
                    if (!usedSquares[2]) triangle1.className += " hidden"
                    if (!usedSquares[3]) triangle3.className += " hidden"
                    square.appendChild(triangle1)
                    square.appendChild(triangle2)
                    square.appendChild(triangle3)
                    square.appendChild(triangle4)
                }
                
                grid.appendChild(square)

            }
        }
        
        document.body.appendChild(grid)
    }

}