import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//cursor
import { GeometryUtils, OBJLoader } from 'three'

const tab = document.querySelector('.tab')
const btn = document.querySelector('.btn')

const cursor = {
  x: 0,
  y: 0,
}

const debugObject = {}

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5
//   cursor.y = -(event.clientY / sizes.height - 0.5)
//   console.log(cursor.x)
//   console.log(cursor.y)
// })

console.log(THREE)
console.log(gsap)

const canvas = document.querySelector('.webgl')

//sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// window.addEventListener('dblclick', () => {
//   if (!document.fullscreenElement) {
//     canvas.requestFullscreen()
//   } else {
//     document.exitFullscreen()
//   }
// })

//Scene
const scene = new THREE.Scene()

let geo = new THREE.BoxBufferGeometry(10, 10, 10)
let mat = new THREE.MeshLambertMaterial({
  color: 'red',
})
let mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

let tex = new THREE.TextureLoader().load(
  'https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png'
)
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping

mat = new THREE.MeshLambertMaterial({
  map: tex,
})
mesh = new THREE.Mesh(geo, mat)
mesh.position.set(0, -5, 0)
mesh.rotation.set(Math.PI / -2, 0, 0)
scene.add(mesh)

//create boxMesh

//Camera

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  10000
)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 300

scene.add(camera)
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

controls.maxPolarAngle = Math.PI / 2
//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

//CLICK ANIMATION

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#d8d2e9'
var loader = new THREE.TextureLoader()
var backgroundTexture = loader.load('https://i.imgur.com/upWSJlY.jpg')
scene.background = backgroundTexture

console.log(canvas)
//Lights
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 1
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xfffffc, 1)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
//animation
const clock = new THREE.Clock()

function createBox() {
  let scale = { x: 1, y: 1, z: 1 }
  let pos = { x: 0, y: 0, z: 0 }

  let box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial({ color: 'red' })
  )
  box.position.set(pos.x, pos.y, pos.z)
  box.userData.name = 'Box'

  scene.add(box)
}

const textureLoader = new THREE.TextureLoader()
const bakedTexture = textureLoader.load('./models/Platonic/RoomUV.jpg')
bakedTexture.flipY = false

function createFigure() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/clickScene/room.gltf', (gltf) => {
    const figure = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
    figure.material = bakedMaterial
    scene.add(figure)
    figure.userData.name = 'figure'
  })
}

function createSphere() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/clickScene/Sphere.gltf', (gltf) => {
    const sphere = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshPhongMaterial({ color: 'red' })
    sphere.material = bakedMaterial
    scene.add(sphere)
    sphere.userData.name = 'sphere'
  })
}

function createPlatonic() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/clickScene/Platonic.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshPhongMaterial({ color: 'red' })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'platonic'
  })
}

createPlatonic()
createFigure()
createSphere()

const raycaster = new THREE.Raycaster()
const clickMouse = new THREE.Vector2()
const moveMouse = new THREE.Vector2()
var clicked = new THREE.Object3D()
var foundlist = []
window.addEventListener('click', (event) => {
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(clickMouse, camera)

  var foundfigure = raycaster.intersectObject(scene.children[4], true)
  var foundplatonic = raycaster.intersectObject(scene.children[3], true)
  var foundsphere = raycaster.intersectObject(scene.children[5], true)

  console.log(foundlist.length)

  if (foundfigure.length > 0 && foundlist.length === 0) {
    console.log(foundfigure)
    clicked = foundfigure[0].object
    foundlist.push(clicked)
    console.log(foundlist.length)

    if (clicked.userData.name === 'figure') {
      tab.classList.add('Show')
      btn.classList.add('Show')

      console.log(`found ${clicked.userData.name}`)

      const { x, y, z } = clicked.position
      console.log(x, y, z)

      gsap.to(camera.position, {
        x: x - 40,
        y: y,
        z: z + 50,

        duration: 1.5,
      })

      controls.target.set(x, y, z)
      controls.enableRotate = false

      console.log(camera.position)

      btn.addEventListener('click', (item) => {
        controls.target.set(0, 0, 0)
        gsap.to(camera.position, {
          x: -40,
          y: 100,
          z: 300,
          duration: 1.5,
        })

        tab.classList.remove('Show')
        btn.classList.remove('Show')
        console.log('back button was clicked')
        console.log(foundfigure.length)
        foundlist.pop(clicked)
        console.log(foundlist.length)
        controls.enableRotate = true
      })
    }
  }

  if (foundplatonic.length > 0 && foundlist.length === 0) {
    console.log(foundplatonic)
    clicked = foundplatonic[0].object
    foundlist.push(clicked)
    console.log(foundplatonic.length)

    if (clicked.userData.name === 'platonic') {
      tab.classList.add('Show')
      btn.classList.add('Show')

      console.log(`found ${clicked.userData.name}`)

      const { x, y, z } = clicked.position
      console.log(x, y, z)

      gsap.to(camera.position, {
        x: x - 40,
        y: y,
        z: z + 50,

        duration: 1.5,
      })

      controls.target.set(x, y, z)
      controls.enableRotate = false

      console.log(camera.position)

      btn.addEventListener('click', (item) => {
        controls.target.set(0, 0, 0)
        gsap.to(camera.position, {
          x: -40,
          y: 100,
          z: 300,
          duration: 1.5,
        })

        tab.classList.remove('Show')
        btn.classList.remove('Show')
        console.log('back button was clicked')
        console.log(foundplatonic.length)
        foundlist.pop(clicked)
        console.log(foundlist.length)
        controls.enableRotate = true
      })
    }
  }

  if (foundsphere.length > 0 && foundlist.length === 0) {
    console.log(foundplatonic)
    clicked = foundsphere[0].object
    foundlist.push(clicked)
    console.log(foundsphere.length)

    if (clicked.userData.name === 'sphere') {
      tab.classList.add('Show')
      btn.classList.add('Show')

      console.log(`found ${clicked.userData.name}`)

      const { x, y, z } = clicked.position
      console.log(x, y, z)

      gsap.to(camera.position, {
        x: x - 40,
        y: y,
        z: z + 50,

        duration: 1.5,
      })

      controls.target.set(x, y, z)
      controls.enableRotate = false

      console.log(camera.position)

      btn.addEventListener('click', (item) => {
        controls.target.set(0, 0, 0)
        gsap.to(camera.position, {
          x: -40,
          y: 100,
          z: 300,
          duration: 1.5,
        })

        tab.classList.remove('Show')
        btn.classList.remove('Show')
        console.log('back button was clicked')
        console.log(foundsphere.length)
        foundlist.pop(clicked)
        console.log(foundlist.length)
        controls.enableRotate = true
      })
    }
  }

  console.log(scene.children)
})

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  // mesh.rotation.y = elapsedTime
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(new THREE.Vector3())

  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
