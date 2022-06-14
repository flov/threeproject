import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector<HTMLCanvasElement>('#bg')!,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(20, 10, 10);
scene.add(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// const ambientLight = new THREE.AmbientLight(0xfff, 3);
// scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const addStar = () => {
  const g = new THREE.SphereGeometry(0.25, 32, 16);
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(g, m);
  const [x, y, z] = new Array(3)
    .fill(null)
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};

Array(200)
  .fill(null)
  .forEach(() => addStar());

const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  camera.position.setX(t * -0.01);
  camera.position.setY(t * -0.0002);
  camera.position.setZ(30 + t * -0.0002);
  camera.far;
};

document.getElementsByTagName('body')[0].onscroll = moveCamera;

const animate = () => {
  requestAnimationFrame(animate);
  torus.rotateX(0.01);
  torus.rotateY(0.008);
  torus.rotateZ(0.001);

  controls.update();
  renderer.render(scene, camera);
};

animate();
