

/* This is a starter file for experimenting with 3D animated models
 * in three.js.  The user can rotate the model using the keyboard, and
 * can turn animation on and off.  As an example, it shows  a sphere
 * rotating around a cube.
 *
 * To make your own model, add any global variables that you need for
 * animating the model, build the model in the createWorld() function,
 * and update the animation variables in the updateForFrame() function.
 *
 * For a more complex modeling example using this framework,
 * see diskworld-1.html.
 */

"use strict";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
	canvas: document.querySelector('#glcanvas'),
});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
	color: "red", 
	wireframe: true
});
const torus = new THREE.Mesh(torusGeometry, material);

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

animate()
