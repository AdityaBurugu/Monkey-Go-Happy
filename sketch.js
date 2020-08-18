var player,player_img,banana,banana_img,stone_img;
var backImg,background1;
var ground;
var foodGroup;
var stoneGroup;
var score;
var lifecount;
var gamestate;
function preload() {
  /* preload your images here of the ball and the paddle */
  player_img=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  backImg = loadImage("jungle.png");
  stone_img=loadImage("stone.png");
}
function setup() {
  createCanvas(700, 450);
  //background1 = createSprite(330,210,90,410);
  //background1.addAnimation("background",backImg);
  //background1.scale = 1.6;
  ground = createSprite(10,430,1380,10);
  ground.visible = false;
  player = createSprite(50,340,20,50);
  player.addAnimation("ball", player_img);
  player.scale=0.2;
  ground.velocityX=-3;
  ground.x = ground.width /2;
  score=0;
  lifecount = 3;
  gamestate="play";
  foodGroup = new Group();
  stoneGroup = new Group();
}
function draw() {
  background(0,153,0);
   edges = createEdgeSprites();
  
  
  if(gamestate==="play"){
    if(keyDown(UP_ARROW)&&player.y>320&&player.y<450){
    player.velocityY=-30;
    }
    player.velocityY=player.velocityY+2;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(frameCount % 200 === 0) {
     stone = createSprite(700,410,1,50);
     stone.addAnimation("stone",stone_img);
     stone.scale = 0.2;
     stone.velocityX=-9;
     stoneGroup.add(stone);
    }
    if(frameCount%150===0){
     banana = createSprite(700,random(100,300),20,20);
     banana.addAnimation("paddle", banana_img);
     banana.velocityX = -3;
     banana.scale = 0.08;
     foodGroup.add(banana);
    }
    switch(score){
      case 10 : player.scale = 0.12;
        break;
      case 20 : player.scale = 0.14;
        break;
      case 30 : player.scale = 0.16;
        break;
      case 40 : player.scale = 0.16;
        break;
      default: break;
    }
    if(player.isTouching(foodGroup)){
      score=score+1;
      foodGroup.destroyEach();
    }
    if(player.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      player.scale=0.2;
      lifecount=lifecount-1;
    }
    if(lifecount===0){
      gamestate="End";
    }
  }
   if(gamestate==="End"){
      player.destroy();
      foodGroup.destroyEach();
      stroke("white");
      textSize(20);
      fill("white");
      text("Game Over",200,200);
    }
  
  player.collide(ground);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :"+score,50,50);
  text("No.of Lifes Remaining : "+lifecount,450,20); 
}