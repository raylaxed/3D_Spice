import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";



export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(45, 800 / 600);


const matFloor = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

camera.position.set(0, .6, 10);
export const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
  antialias: true,
});
renderer.setSize(800, 600);

const loader = new GLTFLoader();

const grid = new THREE.GridHelper(10, 10);
scene.add(grid);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 20, 20),
  matFloor
);
floor.rotateX(Math.PI / 2);

//scene.add(floor);

var skyGeo = new THREE.SphereGeometry(5, 25, 25); 
var loaderTexture  = new THREE.TextureLoader(),
texture = loaderTexture.load( "assets/unnamed.jpg" );
var material = new THREE.MeshPhongMaterial({ 
  map: texture
});

var sky = new THREE.Mesh(skyGeo, material);
sky.material.side = THREE.BackSide;
console.log("adding sky")
//scene.add(sky);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

/*
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
*/