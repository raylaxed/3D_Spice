import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, 800 / 600)
camera.position.set(0, 0, 10)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
  antialias: true
})
renderer.setSize(800, 600)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true
controls.minDistance = 5
controls.maxDistance = 20
controls.maxPolarAngle = Math.PI / 2

let noiseTexture

function generateNoiseTexture(width, height) {
  const texture = new THREE.Texture()
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const noise = Math.random() * 2 - 1
      ctx.fillStyle = noise > 0 ? 'white' : 'black'
      ctx.fillRect(x, y, 1, 1)
    }
  }
  texture.image = canvas
  texture.needsUpdate = true
  return texture
}

noiseTexture = generateNoiseTexture(64, 64)
const materialPlane = new THREE.MeshStandardMaterial({
  map: noiseTexture,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
})
// Create a dark red material for the floor
const materialFloor = new THREE.MeshStandardMaterial({
  color: 0x8B0000, // Dark red color
  side: THREE.DoubleSide
})
const materialTop = new THREE.MeshStandardMaterial({
  color: 0xF8F8E7, // Dark red color
  side: THREE.DoubleSide
})
const materialSides = new THREE.MeshStandardMaterial({
  color: 0x666666, // Dark red color
  side: THREE.DoubleSide
})
const meshFloor = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), materialFloor)
meshFloor.rotateX(Math.PI / 2)
meshFloor.position.set(0,-1.5,0)

const meshRight = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), materialSides)
meshRight.rotateY(Math.PI / 2)
meshRight.position.set(1.5,0,0)


const meshLeft = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), materialSides)
meshLeft.rotateY(Math.PI / 2)
meshLeft.position.set(-1.5,0,0)

const meshBack = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), materialSides)
meshBack.position.set(0,0,-1.5)


const meshRightPainting = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), materialPlane)
meshRightPainting.rotateY(Math.PI / 2)
meshRightPainting.position.set(1.45,0,0)


const meshLeftPainting = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), materialPlane)
meshLeftPainting.rotateY(Math.PI / 2)
meshLeftPainting.position.set(-1.45,0,0)

const meshBackPainting = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), materialPlane)
meshBackPainting.position.set(0,0,-1.45)


const meshTop = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), materialTop)
meshTop.rotateX(Math.PI / 2)
meshTop.position.set(0,1.5,0)


// Add a point light in the center
const light = new THREE.PointLight(0xffffff, 10, 100)
light.position.set(0, 1.4, 0)
scene.add(light)
//mesh.rotate(90)
//mesh.position.set()
scene.add(meshFloor)
scene.add(meshBack)
scene.add(meshRight)
scene.add(meshLeft)
scene.add(meshTop)
scene.add(meshRightPainting)
scene.add(meshLeftPainting)
scene.add(meshBackPainting)
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  noiseTexture = generateNoiseTexture(64, 64);
  materialPlane.map = noiseTexture;
  renderer.render(scene, camera)
}

animate()