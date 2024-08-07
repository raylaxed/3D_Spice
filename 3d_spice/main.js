import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 800 / 600);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
  antialias: true,
});
renderer.setSize(800, 600);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;

let noiseTexture;

function generateNoiseTexture(width, height) {
  const texture = new THREE.Texture();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const noise = Math.random() * 2 - 1;
      ctx.fillStyle = noise > 0 ? "white" : "black";
      ctx.fillRect(x, y, 1, 1);
    }
  }
  texture.image = canvas;
  texture.needsUpdate = true;
  return texture;
}

noiseTexture = generateNoiseTexture(64, 64);
const materialPlane = new THREE.MeshStandardMaterial({
  map: noiseTexture,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide,
});


//MATERIALS FOR ROOM
const materialFloor = new THREE.MeshStandardMaterial({
  color: 0x8b0000, 
  side: THREE.DoubleSide,
});
const materialTop = new THREE.MeshStandardMaterial({
  color: 0xf8f8e7, 
  side: THREE.DoubleSide,
});
const materialSides = new THREE.MeshStandardMaterial({
  color: 0x666666, 
  side: THREE.DoubleSide,
});

const grid = new THREE.GridHelper(10, 10);
scene.add(grid);


//generates a room taking in 3 Parameters for XYZ scaling and 3 Parameters for XYZ offset
function generaterRoom(xWidth, xDepth, xHeight, offsetX, offsetY, offsetZ) {
  
  console.log(xWidth)
  console.log(xDepth)
  console.log(xHeight)
  console.log(offsetX)
  console.log(offsetY)
  console.log(offsetZ)


  const meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(xWidth, xDepth, 64, 64),
    materialFloor
  );
  meshFloor.rotateX(Math.PI / 2);
  meshFloor.position.set(offsetX, offsetY - xHeight / 2, offsetZ);

  const meshRight = new THREE.Mesh(
    new THREE.PlaneGeometry(xDepth, xHeight, 64, 64),
    materialSides
  );
  meshRight.rotateY(Math.PI / 2);
  meshRight.position.set(offsetX + xWidth / 2, offsetY, offsetZ);

  const meshLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(xDepth, xHeight, 64, 64),
    materialSides
  );
  meshLeft.rotateY(Math.PI / 2);
  meshLeft.position.set(offsetX - xWidth / 2, offsetY, offsetZ);

  const meshBack = new THREE.Mesh(
    new THREE.PlaneGeometry(xWidth, xHeight, 64, 64),
    materialSides
  );
  meshBack.position.set(offsetX, offsetY, offsetZ - xDepth / 2);

  const meshTop = new THREE.Mesh(
    new THREE.PlaneGeometry(xWidth, xDepth, 64, 64),
    materialTop
  );
  meshTop.rotateX(Math.PI / 2);
  meshTop.position.set(offsetX, offsetY + xHeight / 2, offsetZ);

  // Add a point light in the center
  const light = new THREE.PointLight(0xffffff, 10, 100);
  light.position.set(offsetX, offsetY+1.4, offsetZ);
  scene.add(light);
  

const meshRightPainting = new THREE.Mesh(
  new THREE.PlaneGeometry(xWidth/3, xHeight/3, 64, 64),
  materialPlane
);
meshRightPainting.rotateY(Math.PI / 2);
meshRightPainting.position.set(offsetX+xWidth/2-0.01, offsetY, offsetZ);

const meshLeftPainting = new THREE.Mesh(
  new THREE.PlaneGeometry(xWidth/3, xHeight/3, 64, 64),
  materialPlane
);
meshLeftPainting.rotateY(Math.PI / 2);
meshLeftPainting.position.set(offsetX-xWidth/2+0.01, offsetY, offsetZ);

const meshBackPainting = new THREE.Mesh(
  new THREE.PlaneGeometry(xWidth/3, xHeight/3, 64, 64),
  materialPlane
);
meshBackPainting.position.set(offsetX, offsetY, offsetZ-xDepth/2+0.01);


scene.add(meshRightPainting);
scene.add(meshLeftPainting);
scene.add(meshBackPainting);


  scene.add(meshFloor);
  scene.add(meshRight);
  scene.add(meshLeft);
  scene.add(meshBack);
  scene.add(meshTop);
  console.log("generating room")
  return scene;
}

generaterRoom(3, 3,3 , 0, 0, 0);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  noiseTexture = generateNoiseTexture(64, 64);
  materialPlane.map = noiseTexture;
  renderer.render(scene, camera);
}




// Create a new canvas element
const canvasRectangles = document.createElement("canvas");
canvasRectangles.width = 800; // adjust the width and height as needed
canvasRectangles.height = 600;
document.body.appendChild(canvasRectangles);

// Set the background color of the canvas to grey
canvasRectangles.style.backgroundColor = "grey";

// Get the 2D drawing context for the new canvas
const ctxRectangles = canvasRectangles.getContext("2d");

// Draw the coordinate axes
ctxRectangles.beginPath();
ctxRectangles.strokeStyle = "black";
ctxRectangles.lineWidth = 2;
ctxRectangles.moveTo(0, canvasRectangles.height / 2);
ctxRectangles.lineTo(canvasRectangles.width, canvasRectangles.height / 2);
ctxRectangles.stroke();

ctxRectangles.beginPath();
ctxRectangles.moveTo(canvasRectangles.width / 2, 0);
ctxRectangles.lineTo(canvasRectangles.width / 2, canvasRectangles.height);
ctxRectangles.stroke();

// Add some text to label the axes
ctxRectangles.font = "18px Arial";
ctxRectangles.textAlign = "center";
ctxRectangles.textBaseline = "middle";
ctxRectangles.fillStyle = "black";
ctxRectangles.fillText("X", canvasRectangles.width / 2, 20);
ctxRectangles.fillText("Y", 20, canvasRectangles.height / 2);

// ... rest of the code ...

// Define a function to draw a rectangle on the new canvas
function drawRectangle(x, y, width, height, color) {
  ctxRectangles.fillStyle = color;
  ctxRectangles.fillRect(x, y, width, height);
}

// Define a function to clear the new canvas
function clearCanvasRectangles() {
  ctxRectangles.clearRect(0, 0, canvasRectangles.width, canvasRectangles.height);
}

let isDrawing = false;
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;


canvasRectangles.addEventListener("mousedown", (event) => {
  const rect = canvasRectangles.getBoundingClientRect();
  if (rect.left <= event.clientX && event.clientX <= rect.right &&
      rect.top <= event.clientY && event.clientY <= rect.bottom) {
    isDrawing = true;
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
  }
});

canvasRectangles.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const rect = canvasRectangles.getBoundingClientRect();
    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;
    drawRectangle(startX, startY, endX - startX, endY - startY, "red"); // draw the rectangle
  }
});

canvasRectangles.addEventListener("mouseup", () => {
  isDrawing = false;
  console.log("draw")
  let xWidth = Math.abs(endX - startX);
  let withHelper =Math.abs(endX - startX)/2;
  //console.log(xWidth)
  xWidth = xWidth / (canvasRectangles.width / 2);

  //console.log(xWidth)
  let xDepth = Math.abs(endY - startY);
  let depthHelper =Math.abs(endX - startX)/2;
  //console.log(xDepth)
  xDepth = xDepth / (canvasRectangles.height / 2);
  //console.log(xDepth)

  const offsetX = startX + (xWidth / 2);
  const offsetY = startY + (xDepth / 2);
  generaterRoom(xWidth, xDepth, 3, (-canvasRectangles.width/2 + offsetX)/100, 0, (-canvasRectangles.height/2 + offsetY)/100);

});
animate();
