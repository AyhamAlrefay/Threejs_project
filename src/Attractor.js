import * as THREE from 'three'
 export class Attractor{
    constructor(
       
        position ,
        position1,
        mp,
        ms,
       
  
        velocity=new THREE.Vector2(50,0),
        acc=new THREE.Vector2(0,1),
    
       

    ){
        this.position=position;
        this.velocity=velocity;
        this.acc=acc;
        this.mp=mp;
        this.ms=ms;
        this.position1=position1;
    }
    update(elapsedTime){
  

       
        let G =0.0000667428 ;
        let distance=Math.sqrt(((this.position.x-this.position1.x)*(this.position.x-this.position1.x))+((this.position.y-this.position1.y)*(this.position.y-this.position1.y)));
        let force= G* ((this.mp*this.ms)/(distance*distance));
        let theta=Math.atan((this.position.y-this.position1.y)/(this.position.x-this.position1.x));
       
        let fx=force*Math.cos(theta);
        let fy=force*Math.sin(theta);
        
this.acc.x=fx/this.mp;
this.acc.y=fy/this.mp;

    
this.velocity.x =this.acc.x *elapsedTime;
this.velocity.y =this.acc.y *elapsedTime;
        
this.position1.x =this.velocity.x *elapsedTime;
this.position1.y =this.velocity.y *elapsedTime;

    }


}
