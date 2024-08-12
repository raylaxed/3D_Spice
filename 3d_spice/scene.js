import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";


export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(45, 800 / 600);
camera.position.set(0, 0, 10);

export const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
  antialias: true,
});
renderer.setSize(800, 600);

const loader = new GLTFLoader();

const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

export function initScene() {
    const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 800 / 600);
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".webgl"),
    antialias: true,
  });
  renderer.setSize(800, 600);

  const loader = new GLTFLoader();

}
