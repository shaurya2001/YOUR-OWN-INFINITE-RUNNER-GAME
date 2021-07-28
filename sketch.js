var gamestate = "serve";
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage, ghostImage2;
var invisibleblock, invisibleBlockGroup;
var block;



function preload() {
towerImage = loadImage("tower.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
ghostImage = loadImage ("ghost-standing.png");
ghostImage2 = loadImage ("ghost-jumping.png");
  
  
  
}


function setup() {
  
  
  createCanvas (600,600);
  
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleBlockGroup = createGroup();
  
  
  
  tower = createSprite(300, 300, 10, 10);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
 
  ghost = createSprite (200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImage);
  ghost.addImage("jumping",ghostImage2);
  
  
  block = createSprite (300, 10, 600, 50);
  block.shapeColor = "white";
 

  
 
  
}


function draw() {
  background("white");
 
  
  if(gamestate === "serve") {
    
  stroke("black");
    fill("black");
      textSize(20);
  
  text("click on s to start the game", 210, 300);
    
    
    if(keyDown("s")) {
      gamestate = "play";
    }
  }
  
if(gamestate === "play") {
  
  
  if(tower.y > 400 ) {
    tower.y = 300;
  }
  
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  if(keyDown("right_arrow")) {
   ghost.x = ghost.x +3; 
  }
  if(keyDown("space")) {
    ghost.velocityY  = -5;
   
  }
  
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(climberGroup.isTouching (ghost)) {
    ghost.velocityY = 0;
  }
  
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 || ghost.y < 50 || ghost.x > 530 || ghost.x < 80) {
   ghost.destroy();
    gamestate = "end";
  }
  doors();
  drawSprites();
}
  
  if(gamestate === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Gameover", 230, 250);
    
    
  }
}


function doors() {
  //door
  if(frameCount % 240 === 0 ) {
    door = createSprite(200, 50, 10, 10);
    door.x = random(120,400);
    door.velocityY = 1;
    door.addImage(doorImage);
    door.lifetime = 800;
    door.visible = false;
    
    
    climber = createSprite (200, 10, 10, 10);
  climber.addImage(climberImage);
    door.x = climber.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    
    invisibleblock = createSprite(200, 15);
    invisibleblock.width= climber.width;
  invisibleblock.height = 2;
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 1;
    invisibleblock.visible = false;
    
    
    
    invisibleBlockGroup.add(invisibleblock);
    doorGroup.add(door);
    climberGroup.add(climber);
    
  }


  
  }
