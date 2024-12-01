import * as THREE from 'three';

// scene
import { createScene } from './../components/scene';

import texture8 from './../../public/assets/texture-8.jpg';

// Create a scene
const { scene, camera, renderer } = createScene('#canvas-5');

// Load texture
const textureLoader = new THREE.TextureLoader();
const faceTexture = textureLoader.load(texture8);

// Create materials
const faceMaterial = new THREE.MeshStandardMaterial({ map: faceTexture }); // Apply texture
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black
const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red
const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black

// Create geometries
const faceGeometry = new THREE.SphereGeometry(1, 32, 32);
const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const mouthGeometry = new THREE.RingGeometry(0.2, 0.3, 32);
const eyebrowGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.05);

// Create meshes
const face = new THREE.Mesh(faceGeometry, faceMaterial);
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);

// Position the elements
leftEye.position.set(-0.3, 0.3, 0.9);
rightEye.position.set(0.3, 0.3, 0.9);
mouth.position.set(0, -0.3, 0.9);
leftEyebrow.position.set(-0.3, 0.5, 0.9);
rightEyebrow.position.set(0.3, 0.5, 0.9);

// Rotate the mouth to make it a smile
mouth.rotation.z = Math.PI;

// Add elements to the face
face.add(leftEye);
face.add(rightEye);
face.add(mouth);
face.add(leftEyebrow);
face.add(rightEyebrow);

// Add the face to the scene
scene.add(face);

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// Animation loop
let eyebrowDirection = 1;
function animate() {
  requestAnimationFrame(animate);

  // Rotate the face
  face.rotation.y += 0.01;

  // Animate the eyebrows
  leftEyebrow.position.y += 0.01 * eyebrowDirection;
  rightEyebrow.position.y += 0.01 * eyebrowDirection;
  if (leftEyebrow.position.y > 0.6 || leftEyebrow.position.y < 0.4) {
    eyebrowDirection *= -1;
  }

  renderer.render(scene, camera);
}

// Start the animation loop
animate();
