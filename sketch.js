const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground;

var backgroundImg;

var player, enemy, greenEnemy;

var playerBodyImg, playerBody;

var gameState = "onSling";

var killed = false;

var score = 0;

function preload(){

    playerBodyImg = loadImage("images/shooter2.png");

    backgroundImg = loadImage("images/background.jpg");
}

function setup(){
    var canvas = createCanvas(600,800);
    engine = Engine.create();
    world = engine.world;

    var ground_options ={
        isStatic: true
    }


    ground = Bodies.rectangle(width/2,height-20,width,20,ground_options);
    World.add(world,ground);

    //console.log(ground);

    var playerBody = createSprite(width/2,height-100);
    playerBody.addImage(playerBodyImg);
    playerBody.scale = 0.75;

    player = new Player(width/2,height-150);
    enemy = new Enemy(random(10,width/2 -10),0);
    greenEnemy = new GreenEnemy(random(width/2 + 10, width-10),0);

    slingshot = new SlingShot(player.body,{x:playerBody.x+30, y:playerBody.y-50});
    

}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    fill("brown");
    rectMode(CENTER);
    //rect(ground.position.x,ground.position.y,400,20);

    textSize(32);
    
    //console.log(score);
    text("Score: " + score, 400,100);

    player.display();

    //console.log("enemy");
    enemy.display();
    greenEnemy.display();
    spawnEnemy();

    if(detectCollision(player, enemy)){
        enemy.killed = true;
    }

    if(enemy.killed){
        enemy.kill(player.body);

    }

    if(detectCollision(player, greenEnemy)){
        console.log("detect collision");
        greenEnemy.killed = true;
    }

    if(greenEnemy.killed){
        greenEnemy.kill(player.body);

    }

    drawSprites();
}

function spawnEnemy(){
  
    if(frameCount%201 ===0){

        resetArrow();
        //kill = false;
        enemy = new Enemy(random(20,width-20),0);
        enemy.display();
    }

    if(frameCount%301 ===0){
        console.log("green enemy");
        resetArrow();
        //kill = false;
        greenEnemy = new GreenEnemy(random(20,width-20),0);
        greenEnemy.display();
}
}
function resetArrow(){
    player.body.velocity.x = 0;
        
       Matter.Body.setPosition(player.body, {x:width/2, y:height-150});
       Matter.Body.setStatic(player.body,true)

       slingshot.attach(player.body);

       gameState = "onSling";
}

function mouseDragged(){
    if(gameState!== "launched"){

        Matter.Body.setStatic(player.body,false)
        Matter.Body.setPosition(player.body, {x:mouseX, y:mouseY});
        Matter.Body.setVelocity(player.body, {x: 0, y: -5});
    }

    
}

function mouseReleased(){

    slingshot.fly();

    Matter.Body.applyForce(player.body , player.body.position, {x: 0 , y: -100})
    Matter.Body.setVelocity(player.body, {x: 0 , y: -10})

    gameState = "launched";
}

function keyPressed(){
    console.log("keyCode" + keyCode);
    if(keyCode === 32){//&& (player.body.speed<1 || player.body.position.x> 1200 || player.body.position.y<0)){
        player.body.velocity.x = 0;
        //player.trajectory=[]
       
       Matter.Body.setPosition(player.body, {x:width/2, y:height-150});
       
       gameState = "onSling";

    }
}

function detectCollision(body1, body2){
    body1Position = body1.body.position;
    body2Position = body2.body.position;

    var distance = dist(body1Position.x, body1Position.y, body2Position.x, body2Position.y);

   
    if(distance<=(body1.y + body2.y)/4){

        score = score+1;

       // console.log("game");
        return true;
        


    }

    else{
        return false;
    }
}