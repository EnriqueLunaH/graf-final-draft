import * as THREE from 'three';

// import textures
import texture1 from './../../public/assets/texture-1.jpg';
import texture2 from './../../public/assets/texture-2.jpg';
import texture3 from './../../public/assets/texture-3.jpg';
import texture4 from './../../public/assets/texture-4.jpg';
import texture5 from './../../public/assets/texture-5.jpg';
import texture6 from './../../public/assets/texture-6.jpg';
import texture7 from './../../public/assets/texture-7.jpg';

// scene
import { createScene } from './../components/scene';

// Create a scene
const { scene, camera, renderer } = createScene('#canvas-3');

if (!scene || !camera || !renderer) {
  console.error('Failed to initialize the scene');
}

// Load a texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(texture7);

// Create a geometry
const geometry = new THREE.DodecahedronGeometry(1, 0);

// Create a material and mesh
const material = new THREE.MeshStandardMaterial({ map: texture });
const star = new THREE.Mesh(geometry, material);
star.castShadow = true;
star.receiveShadow = true;

// Scale the star
star.scale.set(2, 2, 2);

// Add the star to the scene
scene.add(star);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
light.castShadow = true;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the star
  star.rotation.x += 0.01;
  star.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Start the animation loop
animate();