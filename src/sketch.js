//Declaring the global variables.
let rows;
let col;
let grid;
let stop = false;
let squareResolution = 20; //Number of square within the canvas.
let play = false;  // Flag to check whether the player is in editing mode or play mode. Default editing mode.

//Function to make 2D array because javaScript
function make2DArray(rows, col) {
  let arr = new Array(rows);

  for (let i = 0; i < arr.length; i++) {
    //Making array of array manually
    arr[i] = new Array(col);
  }
  return arr;
}

//Function to count neighbour with wrap around
function countNeighbour(grid, x, y) {

  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let r = (x + i + rows) % rows;
      let c = (y + j + col) % col;

      sum += grid[r][c];

    }
  }

  //subtracting the value of self
  sum -= grid[x][y];

  return sum;
}


function mouseClicked() {
  //While the game run I can't change the state of a cell.
  if (!play) {
    for (y = 0; y < col; y++) {
      for (x = 0; x < rows; x++) {
        if (mouseX < x * squareResolution + squareResolution && mouseX > x * squareResolution && mouseY < y * squareResolution
          + squareResolution && mouseY > y * squareResolution) {
          // console.log(mouseX);
          grid[x][y] = 1;
        }
      }
    }
  }
}

function setup() {
  let canvas = createCanvas(400, 400);

  //Reducing the frame rate
  frameRate(15);

  //Dynamically setting rows and col based on canvas width and height
  rows = width / squareResolution;
  col = height / squareResolution;

  //Making the 2D grid
  grid = make2DArray(rows, col);

  background(0);
  fill(80, 80, 80);
  strokeWeight(0);

  //Setting the state of the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      grid[i][j] = 0;
      let x = i * squareResolution;
      let y = j * squareResolution;

      rect(x, y, squareResolution - 1, squareResolution - 1);
    }
  }


  playButton = createButton("Play");
  playButton.mousePressed(function() {
    play = true;
    loop();
  });

  stopButton = createButton("Stop");
  stopButton.mousePressed(function() {

    noLoop();

  });


  randomButton = createButton("Random");
  randomButton.mousePressed(function() {

    if (!play) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
          grid[i][j] = floor(random(2));
          let x = i * squareResolution;
          let y = j * squareResolution;
          rect(x, y, squareResolution - 1, squareResolution - 1);
        }
      }
    }

  })


  resetButton = createButton("Reset");
  resetButton.mousePressed(function() {
    play = false;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = 0;
      }
    }
    loop();
  })

}

function draw() {

  //While play is false, that is when the player is editing the canvas
  if (!play) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < col; j++) {
        if (grid[i][j] == 1) fill('white');
        else fill(80, 80, 80);

        let x = i * squareResolution;
        let y = j * squareResolution;

        rect(x, y, squareResolution - 1, squareResolution - 1);
      }
    }
  }


  //While play is true, that is the game is running
  else {

    for (let i = 0; i < rows; i++) {

      for (let j = 0; j < col; j++) {
        //Moving through the coordinate based on squareResolution
        let x = i * squareResolution;
        let y = j * squareResolution;

        if (grid[i][j] == 1) {
          fill('white');
        }
        else fill(80, 80, 80);

        rect(x, y, squareResolution - 1, squareResolution - 1);

      }
    }
    //Array for the next generation
    let next = make2DArray(rows, col);


    //computing the value of next generation here
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < col; j++) {

        let neighbour = countNeighbour(grid, i, j);

        let state = grid[i][j];

        if (state == 0 && neighbour == 3) {
          next[i][j] = 1;
        }
        else if (state == 1 && (neighbour < 2 || neighbour > 3)) {
          next[i][j] = 0;
        }
        else next[i][j] = state;
      }
    }
    grid = next;
  }

}
