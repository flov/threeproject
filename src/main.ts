import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

renderer.render(scene, camera);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  torus.rotateX(0.01);
  torus.rotateY(0.008);
  torus.rotateZ(0.001);
};

animate();
