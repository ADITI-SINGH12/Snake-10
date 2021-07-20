
//game constants
let inputDir = {x: 0, y: 0};
const foodSound = new Audio("static/food-music.wav");
const gameOverSound = new Audio("static/game-Over.wav");
const musicSound = new Audio("static/background-music.wav");
let speed = 4;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{
  x: 13, y: 15
}]
let food = {x:6, y: 7};
//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

    return false;
}
function gameEngine(){
  //part1: Updating the snake array
if(isCollide(snakeArr)){
  var isPlaying = gameOverSound.currentTime > 0 && !gameOverSound.paused && !gameOverSound.ended
    && gameOverSound.readyState > gameOverSound.HAVE_CURRENT_DATA;

if (!isPlaying) {
  gameOverSound.play();
}
  musicSound.pause();
  inputDir = {x: 0, y: 0};
  alert("Game Over, Press any Key to restart the game.");
  snakeArr = [{x:13, y:15}];
  musicSound.play();
  score = 0;
}
//If you have eaten the food, increament the score and regenerate the food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
  foodSound.play();
  score += 1;
  if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
  scoreBox.innerHTML = "Score: " + score;
  snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
  let a = 2;
  let b = 16;
  food = {x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random())};
}
//Moving the snakeElement
for(let i = snakeArr.length-2;i>=0;i--) {
  snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

  //part2: Render the snake and food
  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }

    board.appendChild(snakeElement);
  });
//Display the food
foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food');
board.appendChild(foodElement);
}


//main logic starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
  inputDir = {x:0, Y: 1} // Start the game;
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

  case "ArrowDown":
  console.log("ArrowUp");
  inputDir.x = 0;
  inputDir.y = 1;
  break;

  case "ArrowLeft":
  console.log("ArrowLeft");
  inputDir.x = -1;
  inputDir.y = 0;
  break;

  case "ArrowRight":
  console.log("ArrowRight");
  inputDir.x = 1;
  inputDir.y = 0;
  break;

    default:
    break;
  }
});
