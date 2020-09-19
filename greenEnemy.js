class GreenEnemy {
    constructor(x,y){
        var options = {
            restitution: 0.8,
            friction: 0.3,
            density: 1.0,
            velocity: { x: 0, y: 0 },
            frictionAir: 0.05
        }

        this.visibility = 255;
        this.body = Bodies.rectangle(x,y,50,50,options);
        this.width = 50;
        this.height = 50;
        World.add(world,this.body);

        this.x = x;
        this.y= y;

        this.killed = false;
        this.image = loadImage("images/greenEnemy.png");
    }

    display(){
        console.log("display green enemy");
        if(!this.killed){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0,0, 80,80)
      
        pop();
        }
    }

    kill(a){
        //console.log("kill");
        World.remove(world, this.body);
        Matter.Body.setPosition(a,{x:width/2,y:height-150})
        push();
        this.visibility = this.visibility-5;
        //console.log("kill "+this.visibility);
        tint(255,this.visibility);
        image(this.image,this.body.position.x,this.body.position.y,80,80)
        pop();
    }
}