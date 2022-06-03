import * as dat from 'dat.gui'
import gsap from 'gsap'
import * as THREE from 'three'
import { WireframeGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import { Attractor } from './Attractor'

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

var starGeometry = new THREE.SphereGeometry(100, 50, 50);
var starMaterial = new THREE.MeshBasicMaterial({
  map:statTexture ,
  side: THREE.DoubleSide,
  shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);


var moonGeometry = new THREE.SphereGeometry(0.3, 50,50);
var moonMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture
});
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
//moon.position.set(1,1,0);

scene.add(moon);

const earthGeometry = new THREE.SphereGeometry( 1, 30, 50 );
const earthMaterial = new THREE.MeshBasicMaterial({
  map:earthTexture
});
 const earth = new THREE.Mesh(earthGeometry, earthMaterial);
 scene.add(earth);

    //Sizes
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


const  sa=new Attractor(moon.position,earth.position,50000000,4000)
let time=Date.now()
const clock=new THREE.Clock

const tick=()=>
 {
//why you use to way to calculate the time
  const currenttime=Date.now()
  const delltatime=currenttime-time
  time=currenttime
  const elapsedTime=clock.getElapsedTime()
      // sa.update(elapsedTime)
      sa.update(elapsedTime)
renderer.render(scene,camera)
window.requestAnimationFrame(tick)

}
tick()