class MakeGrid {
  
  // let prevx = 0;
  // let prevy = 0;

  constructor(width, height, resolution, r=0, g=0, b=0) {
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.r = r;
    this.g = g;
    this.b = b;
    this.prevx = 0;
    this.prevy = 0;

    this.rows = this.width / this.resolution;
    this.col = this.height / this.resolution;

    this.grid = new Array(this.rows);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.col);
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.col; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  showGrid() {
    // fill(this.r, this.g, this.b);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.col; j++) {
        if (this.grid[i][j] == 0) fill(this.r, this.g, this.b);
        else fill("white");
        let x = i * this.resolution;
        let y = j * this.resolution;
        rect(x, y, this.resolution - 1, this.resolution - 1);
      }
    }
  }

  drawing(mouseX, mouseY, mouseButton) {
    this.mouseButton = mouseButton;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    if (this.mouseButton === LEFT) {
      for (let y = 0; y < this.col; y++) {
        for (let x = 0; x < this.rows; x++) {
          if (
            this.mouseX < x * this.resolution + this.resolution &&
            this.mouseX > x * this.resolution &&
            this.mouseY < y * this.resolution + this.resolution &&
            this.mouseY > y * this.resolution
          ) {
            // console.log(mouseX);
            this.grid[x][y] = 1;
            this.showGrid();
            return;
          }
        }
      }
    } else if (this.mouseButton === RIGHT) {
      for (let y = 0; y < this.col; y++) {
        for (let x = 0; x < this.rows; x++) {
          if (
            this.mouseX < x * this.resolution + this.resolution &&
            this.mouseX > x * this.resolution &&
            this.mouseY < y * this.resolution + this.resolution &&
            this.mouseY > y * this.resolution
          ) {
            // console.log(mouseX);
            this.grid[x][y] = 0;
            this.showGrid();
            return;
          }
        }
      }
    }
    
  }
}
