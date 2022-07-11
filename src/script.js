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

camera.position.x = 400
camera.position.y = 300
camera.position.z = 400

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
var backgroundTexture = loader.load('./Textures/background.jpg')
scene.background = backgroundTexture

console.log(canvas)
//Lights
// const ambientLight = new THREE.AmbientLight()
// ambientLight.color = new THREE.Color(0xffffff)
// ambientLight.intensity = 1
// scene.add(ambientLight)

// Directional light
// const directionalLight = new THREE.DirectionalLight(0xfffffc, 1)
// directionalLight.position.set(1, 0.25, 0)
// scene.add(directionalLight)
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
const baseTexture = textureLoader.load('./Textures/BaseUV.jpg')
baseTexture.flipY = false

const counterTexture = textureLoader.load('./Textures/CounterUV.jpg')
counterTexture.flipY = false
const tableTexture = textureLoader.load('./Textures/TableUV.jpg')
tableTexture.flipY = false
const productTexture = textureLoader.load('./Textures/ProductUV.jpg')
productTexture.flipY = false
const doorTexture = textureLoader.load('./Textures/DoorUV.jpg')
doorTexture.flipY = false
const menuTexture = textureLoader.load('./Textures/MenuUV.jpg')
menuTexture.flipY = false
const coffeemachineTexture = textureLoader.load(
  './Textures/CoffeeMachineUV.jpg'
)
coffeemachineTexture.flipY = false
const plantTexture = textureLoader.load('./Textures/R_plantUV.jpg')
plantTexture.flipY = false

function createBase() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/Base.gltf', (gltf) => {
    const figure = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: baseTexture })
    figure.material = bakedMaterial
    scene.add(figure)
    figure.userData.name = 'Base'
  })
}

function createCounter() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/Counter.gltf', (gltf) => {
    const sphere = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: counterTexture })
    sphere.material = bakedMaterial
    scene.add(sphere)
    sphere.userData.name = 'Counter'
  })
}

function createTable() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/Table.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: tableTexture })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'Table'
  })
}

function createProduct() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/Product.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: productTexture })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'Product'
  })
}

function createDoor() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/Door.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: doorTexture })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'Door'
  })
}

function createMenu() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/Menu.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: menuTexture })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'Menu'
  })
}
function createCoffeemachine() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/CoffeeMachine.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({
      map: coffeemachineTexture,
    })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'coffeMachine'
  })
}

function createRplant() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/R_Plant.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({
      map: plantTexture,
    })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'plant'
  })
}

function createLplant() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/models/L_Plant.gltf', (gltf) => {
    const platonic = gltf.scene.children[0]
    const bakedMaterial = new THREE.MeshBasicMaterial({
      map: plantTexture,
    })
    platonic.material = bakedMaterial
    scene.add(platonic)
    platonic.userData.name = 'plant'
  })
}

createCounter()
createTable()
createProduct()
createBase()
createDoor()
createMenu()
createCoffeemachine()
createRplant()
createLplant()
const raycaster = new THREE.Raycaster()
const clickMouse = new THREE.Vector2()
const touchMouse = new THREE.Vector2()
const moveMouse = new THREE.Vector2()
var clicked = new THREE.Object3D()
var foundlist = []

// window.addEventListener('pointerdown', (event) => {
//   console.log('touched')

//   touchMouse.x = (event.clientX / window.innerWidth) * 2 - 1
//   touchMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

//   console.log(touchMouse)
// })
window.addEventListener('pointerdown', (event) => {
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  console.log(clickMouse)

  raycaster.setFromCamera(clickMouse, camera)

  var foundDoor = raycaster.intersectObject(scene.children[7], true) //door
  var foundMenu = raycaster.intersectObject(scene.children[8], true)
  var foundProduct = raycaster.intersectObject(scene.children[5], true)

  console.log(foundlist.length)

  if (foundDoor.length > 0 && foundlist.length === 0) {
    console.log(foundDoor)
    clicked = foundDoor[0].object
    foundlist.push(clicked)
    console.log(foundlist.length)

    if (clicked.userData.name === 'Door') {
      tab.classList.add('Show')
      btn.classList.add('Show')

      console.log(`found ${clicked.userData.name}`)

      const { x, y, z } = clicked.position
      console.log(x, y, z)

      gsap.to(camera.position, {
        x: x - 20,
        y: y,
        z: z + 100,

        duration: 1.5,
      })

      controls.target.set(x, y, z)
      controls.enableRotate = false

      console.log(camera.position)

      btn.addEventListener('click', (item) => {
        controls.target.set(0, 0, 0)
        gsap.to(camera.position, {
          x: 400,
          y: 300,
          z: 400,
          duration: 1.5,
        })

        tab.classList.remove('Show')
        btn.classList.remove('Show')
        console.log('back button was clicked')
        console.log(foundDoor.length)
        foundlist.pop(clicked)
        console.log(foundlist.length)
        controls.enableRotate = true
      })
    }
  }

  if (foundMenu.length > 0 && foundlist.length === 0) {
    console.log(foundMenu)
    clicked = foundMenu[0].object
    foundlist.push(clicked)
    console.log(foundMenu.length)

    if (clicked.userData.name === 'Menu') {
      tab.classList.add('Show')
      btn.classList.add('Show')

      console.log(`found ${clicked.userData.name}`)

      const { x, y, z } = clicked.position
      console.log(x, y, z)

      gsap.to(camera.position, {
        x: x + 130,
        y: y - 100,
        z: z,

        duration: 1.5,
      })

      controls.target.set(x, y, z)
      controls.enableRotate = false

      console.log(camera.position)

      btn.addEventListener('click', (item) => {
        controls.target.set(0, 0, 0)
        gsap.to(camera.position, {
          x: 400,
          y: 300,
          z: 400,
          duration: 1.5,
        })

        tab.classList.remove('Show')
        btn.classList.remove('Show')
        console.log('back button was clicked')
        console.log(foundMenu.length)
        foundlist.pop(clicked)
        console.log(foundlist.length)
        controls.enableRotate = true
      })
    }
  }

  if (foundProduct.length > 0 && foundlist.length === 0) {
    console.log(foundProduct)
    clicked = foundProduct[0].object
    foundlist.push(clicked)
    console.log(foundProduct.length)

    if (clicked.userData.name === 'Product') {
      tab.classList.add('Show')
      btn.classList.add('Show')

      console.log(`found ${clicked.userData.name}`)

      const { x, y, z } = clicked.position
      console.log(x, y, z)

      gsap.to(camera.position, {
        x: x + 100,
        y: y + 150,
        z: z + 50,

        duration: 1.5,
      })

      controls.target.set(x, y, z)
      controls.enableRotate = false

      console.log(camera.position)

      btn.addEventListener('click', (item) => {
        controls.target.set(0, 0, 0)
        gsap.to(camera.position, {
          x: 400,
          y: 100,
          z: 300,
          duration: 1.5,
        })

        tab.classList.remove('Show')
        btn.classList.remove('Show')
        console.log('back button was clicked')
        console.log(foundProduct.length)
        foundlist.pop(clicked)
        console.log(foundProduct.length)
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
