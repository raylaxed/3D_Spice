//import { drawRectangle } from './drawing.js';
import {generaterRoom } from './generaterRoom.js';
import {scene,renderer,camera } from './scene.js';
import { controls } from './controls';

const canvasRectangles = document.createElement("canvas");
canvasRectangles.width = 800;
canvasRectangles.height = 600;
document.body.appendChild(canvasRectangles);

const ctxRectangles = canvasRectangles.getContext("2d");

let isDrawing = false;
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let drawingEndX = 0;
let drawingEndY = 0;
let canvasOriginX = canvasRectangles.width / 2;
let canvasOriginY = canvasRectangles.height / 2;
console.log("originX:" + canvasOriginX);
console.log("originY:" + canvasOriginY);
export function initCanvas() {
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


  // Create a button to clear the scene
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Scene";
  document.body.appendChild(clearButton);

  clearButton.addEventListener("click", () => {
    scene.children.forEach((child) => {
      scene.remove(child);
    });
    controls.reset();
    //noiseTexture = generateNoiseTexture(64, 64);
    //materialPlane.map = noiseTexture;
    renderer.render(scene, camera);
  });
}

// Create a button to switch controls
const switchControlsButton = document.createElement("button");
switchControlsButton.textContent = "Switch to Orbit Controls";
document.body.appendChild(switchControlsButton);

switchControlsButton.addEventListener("click", () => {
  if (controls.currentControlType === 'firstPerson') {
    switchControlsButton.textContent = "Switch to Orbit Controls";
    controls.switchControls('orbit');
  } else if (controls.currentControlType === 'orbit') {
    switchControlsButton.textContent = "Switch to First Person Controls";
    controls.switchControls('firstPerson');
  }
});

// Define a function to draw a rectangle on the new canvas
function drawRectangle(x, y, width, height, color) {
  ctxRectangles.fillStyle = color;
  ctxRectangles.fillRect(x, y, width, height);
}

// Define a function to clear the new canvas
function clearCanvasRectangles() {
  ctxRectangles.clearRect(
    0,
    0,
    canvasRectangles.width,
    canvasRectangles.height
  );
}

canvasRectangles.addEventListener("mousedown", (event) => {
  const rect = canvasRectangles.getBoundingClientRect();
  if (
    rect.left <= event.clientX &&
    event.clientX <= rect.right &&
    rect.top <= event.clientY &&
    event.clientY <= rect.bottom
  ) {
    isDrawing = true;
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
  } else {
    console.log("Click outside of canvas");
  }
});

canvasRectangles.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const rect = canvasRectangles.getBoundingClientRect();
    const endX = event.clientX - rect.left;
    console.log("startX:" + startX);

    console.log("endX:" + endX);

    const endY = event.clientY - rect.top;
    console.log("startY:" + startY);

    console.log("endY:" + endY);
    drawingEndX = endX;
    drawingEndY = endY;
    drawRectangle(startX, startY, endX - startX, endY - startY, "red"); // draw the rectangle
  }
});

canvasRectangles.addEventListener("mouseup", () => {
  isDrawing = false;
  console.log("Drawing complete");

  //Transforms origin, bc canvas has 0,0 at top left

  let xWidth = Math.abs(drawingEndX - startX);
  let xDepth = Math.abs(drawingEndY - startY);
  const offsetX = xWidth / 2;
  const offsetY = xDepth / 2;
  let transformedPosX = startX + offsetX - canvasOriginX;
  let transformedPosY = startY + offsetY - canvasOriginY;
  generaterRoom(
    xWidth / 100,
    xDepth / 100,
    1,
    transformedPosX / 100,
    0.5,
    transformedPosY / 100
  );
});
