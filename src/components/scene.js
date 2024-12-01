import * as THREE from 'three';

export const createScene = (canvasElement) => {
  // get the canvas DOM element
  const canvas = document.querySelector(canvasElement);

  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  return { scene, camera, renderer };
}