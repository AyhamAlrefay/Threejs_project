import * as dat from 'dat.gui'
import gsap from 'gsap'
import * as THREE from 'three'
import { WireframeGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import { Attractor } from './Attractor'
import { Satellite } from './pysical/satellite'
import {Vectors} from './pysical/vectors'

const gui =new dat.GUI()




//texture
const loadinManager=new THREE.LoadingManager()
const textureloader=new THREE.TextureLoader(loadinManager)
const matcapTexture=textureloader.load('/textures/matcaps/3.png')
const earthTexture=textureloader.load('/textures/door/earth.jpg')
const statTexture=textureloader.load('/textures/door/stare.png')
const moonTexture=textureloader.load('/textures/door/moon.jpg')

//scene
const scene=new THREE.Scene()

//background
var starGeometry = new THREE.SphereGeometry(100, 50, 50);
var starMaterial = new THREE.MeshBasicMaterial({
  map:statTexture ,
  side: THREE.DoubleSide,
  shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

//moon
var moonGeometry = new THREE.SphereGeometry(0.3, 50,50);
var moonMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture
});
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(2,1,0);

scene.add(moon);



//earth
const earthGeometry = new THREE.SphereGeometry( 1, 30, 50 );
const earthMaterial = new THREE.MeshBasicMaterial({
  map:earthTexture
});
 const earth = new THREE.Mesh(earthGeometry, earthMaterial);
 scene.add(earth);
 earth.position.set(-1,0,0);
    
 
 
 //Sizes of window
    const sizes={
        width:800,
        height:600
    }


//Camera
const camera=new THREE.PerspectiveCamera(40,sizes.width / sizes.height,1,1000)
const aspectRatio=sizes.width/sizes.height
camera.position.z=10
camera.position.y=2
scene.add(camera)



//Renderer
const canvas =document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ 
canvas: canvas

})



//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping = false
controls.update()
renderer.setSize(sizes.width,sizes.height)


//let sa=new Attractor(earth.position,moon.position)
let time=Date.now()
const clock=new THREE.Clock
let velocity=new THREE.Vector2(2,0)



//let Vectors= new THREE.Vector3;

//fanction draw in second
const tick=()=>
 {

//why you use to way to calculate the time



  earth.rotation.x+=Math.sin(0.5);

  let fx=0;
  let fy=0;
  //gravity
  let G =0.1 ;
//distance between earth and moon 
  let distance=Math.sqrt(((earth.position.x-moon.position.x)*(earth.position.x-moon.position.x))+((earth.position.y-moon.position.y)*(earth.position.y-moon.position.y)));
 //force Gravity low
  let force= G* ((5*1)/(distance*distance));
 //الزاوية بين القملر والارض

 let theta = ((Math.atan((moon.position.y - earth.position.y)/(moon.position.x-earth.position.x))) );

 
 //اسقاط قوة الجاذبية

 fx=force*Math.cos(theta);
  fy=force*Math.sin(theta);

//التسارع 
let acc=new THREE.Vector2(fx,fy);

//cluclat time  

  const currenttime=Date.now()
  const delltatime=currenttime-time
  time=currenttime
  const elapsedTime=clock.getElapsedTime()
   velocity.x=fx;
   velocity.y=fy;
  
  
  //position of moon with velocity 
   moon.position.x=velocity.x*delltatime;
  moon.position.y+=velocity.y*delltatime;
  

       //sa.update(1)
    //  sa.update(elapsedTime)
renderer.render(scene,camera)
window.requestAnimationFrame(tick)

}
tick();