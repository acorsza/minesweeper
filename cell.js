function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.isBomb = false;
    this.isRevealed = false;
    
    // if (random(1) < 0.5) {
    //     this.isBomb = true;
    // }
    
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.isRevealed) {
        if (this.isBomb) {
            fill(0);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
            }
        }
    }
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function () {
    this.isRevealed = true;
    if (this.neighborCount == 0) {
        this.floodFill();
    }
}

Cell.prototype.floodFill = function() {
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.isBomb && !neighbor.isRevealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}

Cell.prototype.countBombs = function() {
    if (this.isBomb) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;

    // It guarantee the loop will never go offset
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (neighbor.isBomb) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}