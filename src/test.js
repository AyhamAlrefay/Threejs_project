import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WireframeGeometry } from 'three'
import imageSoource from './door.jpg'
import * as dat from 'dat.gui'

const gui =new dat.GUI()

//cursor
const cursor={
    x:0,
    y:0
}
window.addEventListener('mousemove',(event1)=>{
cursor.x=event1.clientX/sizes.width-0.5
cursor.y=-(event1.clientY/sizes.height-0.5)
   
})




// //Fonts
// const fontLoader=new THREE.FontLoader()
// fontLoader.load(
// '/fonts/helvetiker_regular.typeface.json',
// (font)=>
// {
//   const textGeometry =new THREE.TextBufferGeometry(
//     'Hello World',
//     {
//       font:font,
//       size:0.5,
//       height:0.2,
//       curveSegments:12,
//       bevelEnabled:true,
//       bevelThickness:0.03,
//       bevelSize:0.02,
//       bevelOffset:0,
//       bevelSegments:5
//     }
//   )
//   textGeometry.center()
//   const textMaterial=new THREE.MeshMatcapMaterial({matcap:matcapTexture})
//   const text =new THREE.Mesh(textGeometry,textMaterial)
//   scene.add(text)
//   const dountGeometry=new THREE.TorusBufferGeometry(0.3,0.2,20,45)
// const dountMaterial=new THREE.MeshMatcapMaterial({matcap:matcapTexture})


// for(let i=0;i<300;i++)
// {
// const dount =new THREE.Mesh(dountGeometry,dountMaterial)

// dount.position.x=(Math.random() -0.5)*10
// dount.position.y=(Math.random() -0.5)*10
// dount.position.z=(Math.random() -0.5)*10

// dount.rotation.x=Math.random()*Math.PI
// dount.rotation.y=Math.random()*Math.PI

// const scale =Math.random()
// dount.scale.set(scale,scale,scale)

// scene.add(dount)
// }
// }
// )



//texture
const loadinManager=new THREE.LoadingManager()

const textureloader=new THREE.TextureLoader(loadinManager)
const matcapTexture=textureloader.load('/textures/matcaps/3.png')
const colorTexture=textureloader.load('/textures/door/color.jpg')
const earthTexture=textureloader.load('/textures/door/earth.jpg')
const statTexture=textureloader.load('/textures/door/stare.png')
const moonTexture=textureloader.load('/textures/door/moon.jpg')
const towCubitBWTexture=textureloader.load('/textures/door/twoCubitBW.png')


// const image =new Image()
// const texture=new THREE.Texture(image)
// image.onload=()=>
// {
//     texture.needsUpdate=true
// }
// image.src='/textures/door/color.jpg'


//scene
const scene=new THREE.Scene()

//Red cube 
const geometryBox =new THREE.BoxBufferGeometry(1,1,1)
// const geometry =new THREE.SphereBufferGeometry(1,32,32)
// const tourous=new THREE.TorusBufferGeometry(2,0.005,32,100)

const materialBox =new THREE.MeshBasicMaterial({
 // map:towCubitBWTexture,
//color:0xff0000
})



//Lighting



// const amibiantLight=new THREE.AmbientLight(0xffffff,0.5)
//  scene.add (amibiantLight)

//  gui.add(amibiantLight,'intensity').min(0).max(1).step(0.01)


// const directionLight=new THREE.DirectionalLight(0x00fffc,0.3)
// directionLight.position.set(1,0.25,0)
// scene.add(directionLight)

// const hemisphereLight=new THREE.HemisphereLight(0xff0000,0x0000ff,1)
// scene.add(hemisphereLight)

// const pointLight=new THREE.PointLight(0x00ffff,5)
// pointLight.position.set(1,- 0.5,1)
// scene.add(pointLight)

// const rectAreaLight=new THREE.RectAreaLight(0x4e00ff,2,1,1)
// rectAreaLight.position.set(-1.5,1,1.5)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

// const spotLight=new THREE.SpotLight(0x78ff00,0.5,6,Math.PI*0.1,0.25,1 )
// spotLight.position.set(0,2,3)
// scene.add(spotLight)
// spotLight.target.position.x=-0.75
// scene.add(spotLight.target)

// //Helpers
// const directionLightHelper=new THREE.DirectionalLightHelper(directionLight,0.2)
// scene.add(directionLightHelper)
// const hemisphereLightHelper=new THREE.HemisphereLightHelper(hemisphereLight,0.2)
// scene.add(hemisphereLightHelper)
// const pointLightHelper=new THREE.PointLightHelper(pointLight,0.2)
// scene.add(pointLightHelper)
// const spotLightHelper=new THREE.SpotLightHelper(spotLight,0.2)
// scene.add(spotLightHelper)


//drow three club
// const geometry01=new THREE.BoxBufferGeometry(1,1,1)
// const material01 =new THREE.MeshStandardMaterial()
// const mesh01 =new THREE.Mesh(geometry01,material01)
// mesh01.position.x=2
// scene.add(mesh01)

// const geometry02=new THREE.SphereGeometry(0.5, 50, 50)
// const material02 =new THREE.MeshStandardMaterial()
// const mesh02=new THREE.Mesh(geometry02,material02)
// mesh02.position.x=-5
// scene.add(mesh02)

// const geometry03=new THREE.TorusBufferGeometry(0.3,0.2,20,45)
// const material03 =new THREE.MeshStandardMaterial()
// const mesh03=new THREE.Mesh(geometry03,material03)
// mesh03.position.x=-2
// scene.add(mesh03)


// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
// colorTexture.wrapS=THREE.RepeatWrapping
// colorTexture.wrapT=THREE.RepeatWrapping
colorTexture.rotation=Math.PI/4
colorTexture.center.x=0.5
colorTexture.center.y=0.5

//********Filter of image 
towCubitBWTexture.magFilter=THREE.NearestFilter
// towCubitBWTexture.minFilter=THREE.NearestFilter
// colorTexture.wrapS=THREE.MirroredRepeatWrapping
// colorTexture.wrapT=THREE.MirroredRepeatWrapping

// const material =new THREE.MeshBasicMaterial({
//     map:earthTexture,
  
// })
// const material1 =new THREE.MeshBasicMaterial({
//     color:0xffffff
// }) 

const meshBox =new THREE.Mesh(geometryBox,materialBox)
// const mesh =new THREE.Mesh(geometry,material)
// const mesh1 =new THREE.Mesh(tourous,material1)
//scene.add(meshBox)


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
moon.position.set(2,0,0);
scene.add(moon);

const earthGeometry = new THREE.SphereGeometry( 1, 30, 50 );
const earthMaterial = new THREE.MeshBasicMaterial({
  map:earthTexture
});
 const earth = new THREE.Mesh(earthGeometry, earthMaterial);
 scene.add(earth);



//Position
// mesh.position.y=0
// mesh.position.x=0
// mesh.position.z=0
//mesh.position.set(0,-1,0)

//Scale
// mesh.scale.x=2
// mesh.scale.y=0.5
// mesh.scale.z=0.5
//mesh.scale.set(1,0.5,0.5)

//Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x=1
// mesh.rotation.y=Math.PI*0.1
//  scene.add(mesh)
// scene.add(mesh1)



// const group=new THREE.Group()


//     scene.add(group)
//     group.position.y=-1
//     group.rotation.y=0.5
//     const cube1=new THREE.Mesh(
//         new THREE.BoxGeometry(1,1,1),
//         new THREE.MeshBasicMaterial({color:0x00ff00})
//     )
//     group.add(cube1)

//     const cube2=new THREE.Mesh(
//         new THREE.BoxGeometry(1,1,1),
//         new THREE.MeshBasicMaterial({color:0x00ff00})
//     )
//     cube2.position.x=-2
//     group.add(cube2)

//     const cube3=new THREE.Mesh(
//         new THREE.BoxGeometry(1,1,1),
//         new THREE.MeshBasicMaterial({color:0x00ff00})
//     )
//     cube3.position.x=2
   
//     group.add(cube3)

//     group.rotation.z=Math.PI

// scene.add(group)
//     //AxesHelper
    // const axesHelper=new THREE.AxesHelper(3)
    // scene.add(axesHelper)


    //Sizes
    const sizes={
        width:window.innerWidth,
        height:window.innerHeight
    }

//window.addEventListener('resize',()=>{
//Update sizes
//sizes.width=window.innerWidth
//sizes.height=window.innerHeight

// update camera
//camera.aspect=sizes.width/sizes.height
//camera.updateProjectionMatrix()
//updat render
//renderer.setSize(sizes.width,sizes.height)

//})



    //Camera
    const camera=new THREE.PerspectiveCamera(40,sizes.width / sizes.height,1,1000)
     const aspectRatio=sizes.width/sizes.height
    // console.log(aspectRatio)
    // const camera=new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100)
    camera.position.z=7
    // camera.position.x=2
     camera.position.y=3
    // camera.position.x=Math.sin(cursor.x*Math.PI*2)*3
     //camera.position.z=Math.cos(cursor.x*Math.PI*2)*3
    //camera.position.y=cursor.y*5

    scene.add(camera)
    //camera.lookAt(new THREE.Vector3(3,0,0))
    //camera.lookAt(mesh.position)






    //Renderer
    const canvas =document.querySelector('.webgl')


    //console.log(canvas)
    const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas

    })

//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping = false

controls.update()

renderer.setSize(sizes.width,sizes.height)
// let time=Date.now()
// const clock=new THREE.Clock
//Animation
    
// gsap.to(mesh.position,{duration :1 ,delay :1,x:2})

// gsap.to(mesh.position,{duration :1 ,delay :2,x:0})
var r = 2;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;


//Vector pointing towards the earth
var earthVec = new THREE.Vector3(0,0,0);

//Set position increments
// var dx = .01;
// var dy = -.01;
// var dz = -.05;

const tick=()=>
 {

    // camera.position.x += dx;
    // camera.position.y += dy;
    // camera.position.z += dz;
  
    //Flyby reset
    // if (camera.position.z < -10) {
    //   camera.position.set(0,10,20);
    // }
  
    //Point the camera towards the earth
    // camera.lookAt(earthVec);
  

//Update render
// const currenttime=Date.now()
// const delltatime=currenttime-time
// time=currenttime
// const elapsedTime=clock.getElapsedTime()
//mesh.rotation.y =elapsedTime


//Update Camera
// camera.position.z=Math.cos(cursor.x*Math.PI*2)*3
// camera.position.x=Math.sin(cursor.x*Math.PI*2)*3
// camera.position.y=cursor.y*5
//camera.lookAt(mesh.position)
//camera.position.y=Math.sin(elapsedTime)

//camera.position.x=Math.cos(elapsedTime)
// camera.lookAt(mesh.position)
// mesh.rotation.y -= 0.001;
// theta += dTheta;
//   moon.position.x = r * Math.cos(theta);
//   moon.position.y = r * Math.sin(theta);


renderer.render(scene,camera)

window.requestAnimationFrame(tick)
   console.log('tick')

}
tick()

