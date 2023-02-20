
import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
	canvas: document.querySelector('#glcanvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Adding shapes
function addTorus(x, y, z, rotate) {
  const geometry = new THREE.TorusGeometry(20, 7, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xe0b0ff, 
    roughness: 0.3,
    metalness: 1.0,
    transparent: 0.5,
    emissive: 0xe0b0ff,
    emissiveIntensity: 0.12,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotateX(rotate);
  torus.position.set(x, y, z);
  scene.add(torus);
}
addTorus(0, 50, -100, Math.PI/4);

function addSphere() {
  const geometry = new THREE.SphereGeometry(0.2);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const sphere = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() =>
   THREE.MathUtils.randFloatSpread(100));
  sphere.position.set(x, y, z);
  scene.add(sphere);
}
Array(150).fill().forEach(addSphere);

function addLand(x, y, z) {
  const geometry = new THREE.BoxGeometry(20, 0.5, 20);
  const material = new THREE.MeshPhongMaterial({
    color: 0xd3d3d3, 
    shininess: 50
  });
  const land = new THREE.Mesh(geometry, material);
  land.position.set(x, y, z);
  scene.add(land);
}
addLand(0, 0, 0);

var octahedron;
function addOctahedron(x, y, z) {
  octahedron = new THREE.Object3D();
  const geometry = new THREE.OctahedronGeometry(3, 0);
  const material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true
  });
  const octa = new THREE.Mesh(geometry, material);
  octa.position.set(x, y, z);
  octahedron.add(octa);
  scene.add(octahedron); 
}
addOctahedron(6, 5, 0);

var ufo;
function addUFO(x, y, z) {
  ufo = new THREE.Object3D();
  const grey = new THREE.MeshStandardMaterial({
    color: 0x555657,
  });
  const yellow = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    emissive: 0x777700,
    specular: 0x070707,
    shininess: 50,
  });
  const saucer = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 8, 2, 32, 1), grey);
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(), yellow);
  sphere.position.set(0, -0.8, -4.5);
  ufo.add(sphere.clone());
  sphere.position.set(0, -0.8, 4.5);
  ufo.add(sphere.clone());
  sphere.position.set(4.5, -0.8, 0);
  ufo.add(sphere.clone());
  sphere.position.set(-4.5, -0.8, 0);
  ufo.add(sphere.clone());
  sphere.position.set(0, -0.8, 0);
  sphere.scale.set(1.5, 1.5, 1.5);
  ufo.add(sphere.clone());
  ufo.add(saucer);
  ufo.position.set(x, y, z);
  scene.add(ufo);
}
addUFO(-5, 10, -15);

const loader = new GLTFLoader();
loader.load( './well/scene.gltf', ( gltf ) => {
  gltf.scene.scale.set(100, 100, 100);
  gltf.scene.position.set(0, 1.1, 0);
	scene.add( gltf.scene );
});

// Adding lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,45,-90);
//const lightHelper = new THREE.PointLightHelper(pointLight);
var ambientLight = new THREE.AmbientLight(0x3a3b4c, 0.6);
var ambientRed = new THREE.AmbientLight(0xff0000, 0.6);

var spotRed = new THREE.SpotLight(0xff0000, 0.5, 0, Math.PI/16);
spotRed.position.set(0, 45, 90);
spotRed.target.position.set(0, 0, 0);
scene.add(spotRed);
scene.add(spotRed.target);

var spotGreen = new THREE.SpotLight(0x00ff00, 0.5, 0, Math.PI/16);
spotGreen.position.set(90, 45, 0);
spotGreen.target.position.set(0, 0, 0);
scene.add(spotGreen);
scene.add(spotGreen.target);

var spotBlue = new THREE.SpotLight(0x0000ff, 0.5, 0, Math.PI/16);
spotBlue.position.set(-90, 45, 0);
spotBlue.target.position.set(0, 0, 0);
scene.add(spotBlue);
scene.add(spotBlue.target);

scene.add(ambientLight);
scene.add(ambientRed);
scene.add(pointLight);
//scene.add(lightHelper);
scene.background = new THREE.Color(0x18191a);

ambientRed.visible = false;
spotRed.visible = false;
spotGreen.visible = false;
spotBlue.visible = false;

// Controlling objects

function UFOCheck() {
  if (animateUFO.checked) {
    ufo.rotation.y += 0.01;
  }
}

function sliderCheck() {
  octaSlider.oninput = function() {
    var x = this.value;
    octahedron.scale.set(x, x, x);
  }
}

function lightCheck() {
  if (option1.checked) {
    ambientRed.visible = false;
    ambientLight.visible = true;
    spotRed.visible = false;
    spotGreen.visible = false;
    spotBlue.visible = false;
  }
  if (option2.checked) {
    ambientRed.visible = true;
    ambientLight.visible = false;
    spotRed.visible = false;
    spotGreen.visible = false;
    spotBlue.visible = false;
  }
  if (option3.checked) {
    ambientRed.visible = false;
    ambientLight.visible = false;
    spotRed.visible = true;
    spotGreen.visible = true;
    spotBlue.visible = true;
  }
}

const controls = new OrbitControls(camera, renderer.domElement);
var animateUFO = document.getElementById("rotateUFO");
var option1 = document.getElementById("Op1");
var option2 = document.getElementById("Op2");
var option3 = document.getElementById("Op3");
// Drawing the scene
function animate() {
  UFOCheck();
  sliderCheck();
  lightCheck();
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();