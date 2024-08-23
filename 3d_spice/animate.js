import { scene,renderer,camera } from './scene.js';
import { controls } from './controls.js';
import { generateNoiseTexture, materialPlane  } from './generaterRoom.js';
import * as THREE from "three";
import { updateControls } from './controls.js';

export let noiseTexture = generateNoiseTexture(64, 64);
let isPaused = false;

const clock = new THREE.Clock();
export function animate() {
  if (!isPaused) {
    requestAnimationFrame(animate);
    console.log(camera);
    updateControls(clock.getDelta());

    //controls.update(clock.getDelta());
    noiseTexture = generateNoiseTexture(64, 64);

    materialPlane.map = noiseTexture;
    console.log(camera.position)
    console.log(scene.children) // log the scene children to see if they are being added correctly
    renderer.render(scene, camera);

  }  console.log(controls);
  
}


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    isPaused = !isPaused;
    if (!isPaused) {
      requestAnimationFrame(animate);
    }
  }
});