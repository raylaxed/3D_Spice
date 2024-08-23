import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls  } from "three/examples/jsm/controls/FirstPersonControls.js";

import {camera, renderer} from  './scene.js';

//export const controls = new OrbitControls(camera, renderer.domElement);


export let controls = new FirstPersonControls(camera, renderer.domElement);
controls.lookSpeed = 0.3;
controls.movementSpeed = 5;


let isCtrlDown = false;
let isSpaceDown = false;


document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    isSpaceDown = true;
  }if (event.key === 'Control') {
    isCtrlDown = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === ' ') {
    isSpaceDown = false;
  } if (event.key === 'Control') {
    isCtrlDown = false;
  }
});
export function updateControls(delta) {
  controls.update(delta);
  if (isSpaceDown) {
    camera.position.y += 0.05;
    console.log("Up Up and away")
  }if (isCtrlDown) {
    camera.position.y -= 0.1;
    console.log("Down Down and away")
  }
}
  
//export { controls };

export function initControls() {
  //Controll type: only orbitControls
  //First Person Camera + Controls
  /*
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.maxPolarAngle = Math.PI / 2;
  */
/*
  var controls = new FirstPersonControls(camera, renderer.domElement);
  controls.lookSpeed = 0.4;
  controls.movementSpeed = 5;
  */
  
}
