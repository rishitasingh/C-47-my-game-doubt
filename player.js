class Player {
    constructor(x,y){
    var options={
   restitution: 0.4,
   density: 1.0,
   friction: 0.5
    }
 
    this.body = Bodies.rectangle(x,y,50,50,options);
    World.add(world, this.body);

    this.x = x;
    this.y= y;

    this.image = loadImage("images/arrow.png");

    }

    display(){
        var position = this.body.position;
        var angle = this.body.angle;
        push();
        translate(position.x, position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0,0,50,50);
        pop();
        

        
    }
}