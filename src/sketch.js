//Declaring the global variables.
let rows;
let col;
let res = 20; //use this to calculate the number of square in the canvas. #square = width / res
let grid;
let play = false;  // Flag to check whether the player is in editing mode or play mode. Default editing mode.



//Function to count neighbour with wrap around
function countNeighbour(grid, x, y) {

  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let r = (x + i + rows) % rows;
      let c = (y + j + col) % col;

      sum += grid.grid[r][c];

    }
  }

  //subtracting the value of self
  sum -= grid.grid[x][y];

  return sum;
}


function setup() {
  
  let canvas = createCanvas(500, 500);
  canvas.parent(select("main"));
  background(0,0,0,100);

  //Reducing the frame rate
  frameRate(12);
  
  rows = width / res;
  col = height / res;

  grid = new MakeGrid(width,height,res,80,80,80);
  grid.showGrid();

  //Rendering the buttons.(play,stop,random,reset)
  button();


  //Block Context menu, right click context within the canvas
  let cnv = document.querySelector("#defaultCanvas0");
  cnv.addEventListener('contextmenu',(evt) =>{
    evt.preventDefault();
  });


  //Loding data
  loadJSON("data.json",gotData);


}

function gotData(data)
{
  //Getting the data and rendering the button in interesting example section
  let a = document.querySelector("#article");

  for(let i = 0; i < data.list.length; i++)
  {
    let btn = document.querySelector("#bt"+(i+1));

    btn.innerText = data.list[i].name;

    btn.addEventListener("click",()=>{
      if(!play){

        for(let j = 0; j < rows; j++ ){
          grid.grid[j] = data.list[i].grid[j].slice();
        }
        // grid.grid = [data.list[i].grid];
        a.innerHTML = data.list[i].description;
        grid.showGrid();
      }

    });

  }
  // console.log(data.list[0].grid);
}


// Use built in mousePressed() method to make sure a MouseClick Event isn't missed

function mousePressed() {
  //While play is false, that is when the player is editing the canvas

  if (!play) {
    grid.drawing(mouseX,mouseY,mouseButton);
  }

}


function draw() {
 //While play is false, that is when the player is editing the canvas
 //Useful for Drag-Selecting Cells
  if (!play) {
     if(mouseIsPressed)
     {
       grid.drawing(mouseX,mouseY,mouseButton);
     }
   }

   
  //While play is true, that is the game is running
  else {

    for (let i = 0; i < rows; i++) {

      for (let j = 0; j < col; j++) {
        //Moving through the coordinate based on squareResolution
        let x = i * res;
        let y = j * res;

        if (grid.grid[i][j] == 1) {
          fill('white');
        }
        else fill(80, 80, 80);

        rect(x, y, res - 1, res - 1);

      }
    }
    //Array for the next generation
    let next = new MakeGrid(width,height,20,80,80,80);


    //computing the value of next generation here
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < col; j++) {

        let neighbour = countNeighbour(grid, i, j);

        let state = grid.grid[i][j];

        if (state == 0 && neighbour == 3) {
          next.grid[i][j] = 1;
        }
        else if (state == 1 && (neighbour < 2 || neighbour > 3)) {
          next.grid[i][j] = 0;
        }
        else next.grid[i][j] = state;
      }
    }
    grid = next;
  }

}


//Function to render the buttons
function button()
{
  let sp = select(".button");

  // Play button
  let playButton = createButton("Play");
  playButton.parent(sp);
  playButton.attribute('class','button-6');
  playButton.mousePressed(function() {

      for(let i = 0; i < rows; i++)
      {
        for(let j = 0; j < col; j++)
        {
          if(grid.grid[i][j]!=0)
          {
            play = true;
            loop();
          }
        }
      }
      
    });

  // Stop button
  let stopButton = createButton("Stop");
  stopButton.parent(sp);
  stopButton.attribute('class','button-6');
  stopButton.mousePressed(function() {
    play = false;
    noLoop();

  });

  //Random button
  let randomButton = createButton("Random");
  randomButton.parent(sp);
  randomButton.attribute('class','button-6');
  randomButton.mousePressed(function() {

    if (!play) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
          grid.grid[i][j] = floor(random(2));
          let x = i * res;
          let y = j * res;
          rect(x, y, res - 1, res - 1);
        }
      }
      grid.showGrid();
    }

  })


  //Reset button
  let resetButton = createButton("Reset");
  resetButton.parent(sp);
  resetButton.attribute('class','button-6');
  resetButton.mousePressed(function() {
    play = false;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < col; j++) {
        grid.grid[i][j] = 0;
      }
    }
    grid.showGrid();
    loop();
  })


}
