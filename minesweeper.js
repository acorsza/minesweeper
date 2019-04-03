// Minesweeper implementation using Javascripts
// CodeChallenge from the Coding Train

var grid;
var cols;
var rows;
var w = 20;
const totalBombs = 10;

function setup() {
    createCanvas(201, 201);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = makeMineGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    var options = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }
    for (let i = 0; i < totalBombs; i++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var x = choice[0];
        var y = choice[1];
        options.splice(index, 1);
        grid[x][y].isBomb = true;
    }

    // for (let i = 0; i < totalBombs; i++) {
    //     var x = floor(random(cols));
    //     var y = floor(random(rows));
    //     grid[x][y].isBomb = true;
    // }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countBombs();
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].isBomb) {
                    gameOver();
                }
            }
        }
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].isRevealed = true;
        }
    }
}

function makeMineGrid(cols, rows) {
    var array = new Array(cols);
    for (let index = 0; index < array.length; index++) {
        array[index] = new Array(rows);
    }
    return array;
}