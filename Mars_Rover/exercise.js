var myRover = {
  position: [5,5],
  direction: 'N',
  rotation: 0
};


var forwardButton = document.getElementById("forward");
var backwardButton = document.getElementById("backward");
var leftButton = document.getElementById("left");
var rightButton = document.getElementById("right");
var positionText = document.getElementById("position");
var directionText = document.getElementById("direction");
var warningText = document.getElementById("warning");


forwardButton.addEventListener("click",moveRover);
backwardButton.addEventListener("click",moveRover);
leftButton.addEventListener("click",moveRover);
rightButton.addEventListener("click",moveRover);
document.addEventListener("keyup",moveRover);

function updateText(rover){
  positionText.innerHTML = "Position : [" + rover.position + "]";
  directionText.innerHTML = "Direction : " + rover.direction;

}
function warning(str){
  warningText.innerHTML = str;
}

    function moveRover(e){
  warningText.innerHTML = "";
  var keyCode = e.keyCode;
  if(keyCode){ 
    switch (keyCode) {
      case 37: turnLeft(myRover); break; 
      case 38: goForward(myRover); break; 
      case 39: turnRight(myRover); break; 
      case 40: goBackward(myRover); break; 
    }
    
  }else{

    if (this.attributes.id.value === "forward"){
      goForward(myRover)
    }

    if (this.attributes.id.value === "backward") {
      goBackward(myRover)
    }

    if (this.attributes.id.value === "left") {
      turnLeft(myRover)
    }

    if (this.attributes.id.value === "right") {
      turnRight(myRover)
    }
  };  
}
  
  updateText(myRover);


function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      if(!checkForObstacles(rover.position)) rover.position[0]++ 
      break;
    case 'E':
       if (!checkForObstacles(rover.position)) rover.position[1]++ 
      break;
    case 'S':
      if (!checkForObstacles(rover.position)) rover.position[0]--
      break;
    case 'W':
      if (!checkForObstacles(rover.position)) rover.position[1]--
      break;
  };

  rover = borderControl(rover);
  
  var x,y;
  x = (10-myRover.position[0]) *50; y = myRover.position[1]*50;
  document.getElementById("rover").style.top=x;
  document.getElementById("rover").style.left=y;
  console.log("(Forward)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}
function goBackward(rover) {
   switch(rover.direction) {
    case 'N':
      if(!checkForObstacles(rover.position)) rover.position[0]--
      break;
    case 'E':
       if (!checkForObstacles(rover.position)) rover.position[1]-- 
      break;
    case 'S':
      if (!checkForObstacles(rover.position)) rover.position[0]++
      break;
    case 'W':
      if (!checkForObstacles(rover.position)) rover.position[1]++
      break;
  
  };

  rover = borderControl(rover);
  var x,y;
  x = (10-myRover.position[0]) *50; y = myRover.position[1]*50;
  document.getElementById("rover").style.top=x;//Move image
  document.getElementById("rover").style.left=y;//Move image
  console.log("(Backward)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}

function turnLeft(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = "W"
      break;
    case 'E':
      rover.direction = "N"
      break;
    case 'S':
      rover.direction = "E"
      break;
    case 'W':
      rover.direction = "S"
      break;

  };
  rover.rotation-=90;
  document.getElementById("rover").style.transform="rotate("+rover.rotation+"deg)";
  console.log("(Left Turn)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}
function turnRight(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = "E"
      break;
    case 'E':
      rover.direction = "S"
      break;
    case 'S':
      rover.direction = "W"
      break;
    case 'W':
      rover.direction = "N"
      break;
  };
  rover.rotation+=90;
  document.getElementById("rover").style.transform="rotate("+rover.rotation+"deg)";//rotate image
  console.log("(Right Turn)New Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}
function borderControl(rover){
  if(rover.position[0]>10){rover.position[0] = 0;warning("Out of border");}
  if(rover.position[1]>10){rover.position[1] = 0;warning("Out of border");}
  if(rover.position[0]<0){rover.position[0] = 10;warning("Out of border");}
  if(rover.position[1]<0){rover.position[1] = 10;warning("Out of border");}
  return rover;
}



var obstacles = [];
createObstacles(3);

function createObstacles(numberOfObstacles){
  var x,y
  for(var i = 0 ; i < numberOfObstacles; i++){
      x = Math.floor((Math.random() * 10) + 1);
      y = Math.floor((Math.random() * 10) + 1);
    obstacles[i] = {
      position: [x,y]
    }
    var obs = document.createElement('div');
    document.getElementById("playable-area").appendChild(obs);
    obs.style.top = (10 - x)*50;
    obs.style.left = y *50;
    obs.className+= "obstacle";
  }
}
function checkForObstacles([x,y]){
  for(var i = 0 ; i < obstacles.length; i ++){
    if(obstacles[i].position[0] == x && obstacles[i].position[1] == y){
      warning("Obstacle!");
      return true;
    }
  }
  return false;
}