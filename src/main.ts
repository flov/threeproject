import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  GridHelper,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

const scene = new Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);
const canvasElement = document.querySelector<HTMLCanvasElement>('#bg')!;
const renderer = new WebGLRenderer({
  canvas: canvasElement,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
camera.position.setZ(10);

renderer.render(scene, camera);

const geometry = new TorusGeometry(10, 3, 16, 100);
const material = new MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const torus = new Mesh(geometry, material);

scene.add(torus);

const pointLight = new PointLight(0xffffff, 1, 1000);
pointLight.position.set(20, 10, 10);
scene.add(pointLight);

const gridHelper = new GridHelper(200, 50);
scene.add(gridHelper);

// const ambientLight = new THREE.AmbientLight(0xfff, 3);
// scene.add(ambientLight)

const lightHelper = new PointLightHelper(pointLight);
scene.add(lightHelper);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const addStar = () => {
  const g = new SphereGeometry(0.25, 32, 16);
  const m = new MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new Mesh(g, m);
  const [x, y, z] = new Array(3)
    .fill(null)
    .map(() => MathUtils.randFloatSpread(100));
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

renderer.render(scene, camera);
const animate = () => {
  // torus.rotateX(0.003);
  // torus.rotateY(0.008);
  // torus.rotateZ(0.001);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

// window.addEventListener('mousemove', (event) => {
//   camera.position.set(event.screenX / 100, 0, event.screenY / 100);
// });
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = window.innerHeight / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
