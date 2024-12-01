import * as THREE from 'three';

// import textures
import texture1 from './../../public/assets/texture-1.jpg';
import texture2 from './../../public/assets/texture-2.jpg';
import texture3 from './../../public/assets/texture-3.jpg';
import texture4 from './../../public/assets/texture-4.jpg';
import texture5 from './../../public/assets/texture-5.jpg';
import texture6 from './../../public/assets/texture-6.jpg';

// scene
import { createScene } from './../components/scene';

// Create a scene
const { scene, camera, renderer } = createScene('#canvas-1');

// Load textures
const loader = new THREE.TextureLoader();
const textures = [
  new THREE.MeshStandardMaterial({ map: loader.load(texture1) }),
  new THREE.MeshStandardMaterial({ map: loader.load(texture2) }),
  new THREE.MeshStandardMaterial({ map: loader.load(texture3) }),
  new THREE.MeshStandardMaterial({ map: loader.load(texture4) }),
  new THREE.MeshStandardMaterial({ map: loader.load(texture5) }),
  new THREE.MeshStandardMaterial({ map: loader.load(texture6) }),
];

// Create a geometry
const geometry = new THREE.BoxGeometry();

// Create a mesh with different materials for each face
const cube = new THREE.Mesh(geometry, textures);
cube.castShadow = true;
cube.receiveShadow = true;

// Scale the cube to be 2 times larger
cube.scale.set(2, 2, 2);

// Add the cube to the scene
scene.add(cube);

// Add a green directional light in the top right corner
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
light.castShadow = true;

light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

// Add a second directional light in the bottom left corner (opposite to the first)
const secondLight = new THREE.DirectionalLight(0xffffff, 1); // White light
secondLight.position.set(-1, -1, -1); // Opposite position to the first light
secondLight.castShadow = true;

secondLight.target.position.set(0, 0, 0); // Pointing to the center of the scene
scene.add(secondLight);
scene.add(secondLight.target);

// Add an point light
const pointLight = new THREE.PointLight(0x00ff00, 2, 10); // Red light, intensity 2, range 10
pointLight.position.set(-2, 2, 2); // Position it on the left side
pointLight.castShadow = true;
scene.add(pointLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Start the animation loop
animate();