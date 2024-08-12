import { scene,renderer,camera } from './scene.js';
import { controls } from './controls.js';
import { generateNoiseTexture, materialPlane  } from './generaterRoom.js';

export let noiseTexture = generateNoiseTexture(64, 64);

export function animate() {
  requestAnimationFrame(animate);
  controls.update();
  noiseTexture = generateNoiseTexture(64, 64);
  materialPlane.map = noiseTexture;
  renderer.render(scene, camera);
}