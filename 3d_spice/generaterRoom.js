import * as THREE from "three";
import { scene } from "./scene.js";
import { noiseTexture } from "./animate.js";

const materialFloor = new THREE.MeshStandardMaterial({
  color: 0x8b0000,
  side: THREE.DoubleSide,
});
const materialTop = new THREE.MeshStandardMaterial({
  color: 0xf8f8e7,
  //side: THREE.DoubleSide,
});
const materialSides = new THREE.MeshStandardMaterial({
  color: 0x666666,
  side: THREE.DoubleSide,
});
//export noise material bc of updating
export let materialPlane = new THREE.MeshStandardMaterial({
  map: noiseTexture,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide,
});

export function generaterRoom(
  xWidth,
  xDepth,
  xHeight,
  offsetX,
  offsetY,
  offsetZ
) {
  console.log("draw3d");
  console.log(xWidth);
  console.log(xDepth);
  console.log(xHeight);
  console.log(offsetX);
  console.log(offsetY);
  console.log(offsetZ);

  //LIGHTS
  const light = new THREE.PointLight(0xffffff, 3, 100);
  light.position.set(offsetX, offsetY, offsetZ);
  scene.add(light);

  //ROOM
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

  //PICTURES
  const meshRightPainting = new THREE.Mesh(
    new THREE.PlaneGeometry(xDepth / 3, xHeight / 3, 64, 64),
    materialPlane
  );
  meshRightPainting.rotateY(Math.PI / 2);
  meshRightPainting.position.set(offsetX + xWidth / 2 - 0.01, offsetY, offsetZ);

  const meshLeftPainting = new THREE.Mesh(
    new THREE.PlaneGeometry(xDepth / 3, xHeight / 3, 64, 64),
    materialPlane
  );
  meshLeftPainting.rotateY(Math.PI / 2);
  meshLeftPainting.position.set(offsetX - xWidth / 2 + 0.01, offsetY, offsetZ);

  const meshBackPainting = new THREE.Mesh(
    new THREE.PlaneGeometry(xWidth / 3, xHeight / 3, 64, 64),
    materialPlane
  );
  meshBackPainting.position.set(offsetX, offsetY, offsetZ - xDepth / 2 + 0.01);

  scene.add(meshRightPainting);
  scene.add(meshLeftPainting);
  scene.add(meshBackPainting);
  scene.add(meshFloor);
  scene.add(meshRight);
  scene.add(meshLeft);
  scene.add(meshBack);
  scene.add(meshTop);

  console.log("generating room");

  return scene;
}

export function generateNoiseTexture(width, height) {
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
