import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {camera, renderer} from  './scene.js';

export const controls = new OrbitControls(camera, renderer.domElement);

export function initControls() {
  //Controll type: only orbitControls
  //First Person Camera + Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.maxPolarAngle = Math.PI / 2;
}
