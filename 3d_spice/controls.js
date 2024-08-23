// /Users/raimundkohlprath/Desktop/PROJEKTE/3D_spice/3d_spice/controls.js

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls  } from "three/examples/jsm/controls/FirstPersonControls.js";

import {camera, renderer} from  './scene.js';

export let currentControlType = 'firstPerson';
let controls;
let orbitControls;

export function initControls() {
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.lookSpeed = 0.3;
  controls.movementSpeed = 5;

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.25;
  orbitControls.enableZoom = true;
  orbitControls.minDistance = 5;
  orbitControls.maxDistance = 20;
  orbitControls.maxPolarAngle = Math.PI / 2;

  switchControls('firstPerson');
}

export function switchControls(controlType) {
  if (controlType === 'firstPerson') {
    currentControlType = 'firstPerson';
    controls.enabled = true;
    orbitControls.enabled = false;
  } else if (controlType === 'orbit') {
    currentControlType = 'orbit';
    controls.enabled = false;
    orbitControls.enabled = true;
  }
}

export function updateControls(delta) {
  if (currentControlType === 'firstPerson') {
    controls.update(delta);
  } else if (currentControlType === 'orbit') {
    orbitControls.update(delta);
  }
}