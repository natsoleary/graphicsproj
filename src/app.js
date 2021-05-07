/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import './app.css'

// Initialize core ThreeJS components
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const scene = new SeedScene(camera);
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
// camera.position.set(6, 3, -10);
// camera.lookAt(new Vector3(0, 0, 0));
camera.position.y = 350 * Math.sin(Math.PI / 15);
camera.position.z = -300;
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

let instructionsContainer = document.createElement('div');
instructionsContainer.id = 'instructions-container';

// Set up intro screen
let beginContainer = document.createElement('div');
beginContainer.id = 'begin-container';
document.body.appendChild(beginContainer);

let beginContent = document.createElement('div');
beginContent.id = 'begin-content';
beginContainer.appendChild(beginContent);

let beginContentText = document.createElement('div');
beginContentText.id = 'begin-text';
beginContent.appendChild(beginContentText);

let beginContentTitleText = document.createElement('h1');
beginContentTitleText.innerText = "Turtle Trek";
beginContentText.appendChild(beginContentTitleText);

let beginContentDescription = document.createElement('p');
beginContentDescription.innerHTML =
    "Be a turtle! Find your babies! Don't get eaten!!";
beginContentText.appendChild(beginContentDescription);

let instructionsButton = document.createElement('div');
instructionsButton.id = 'instructions-button';
instructionsButton.innerHTML = 'Instructions';
beginContent.appendChild(instructionsButton);

// Set up instructions popup

let instructionsContent = document.createElement('div');
instructionsContent.id = 'instructions-content';
instructionsContainer.appendChild(instructionsContent);

let instructionsContentText = document.createElement('div');
instructionsContentText.id = 'instructions-text';
instructionsContent.appendChild(instructionsContentText);

let instructionsTitleText = document.createElement('h1');
instructionsTitleText.innerText = 'Instructions';
instructionsContentText.appendChild(instructionsTitleText);

let instructionsContentDescription = document.createElement('p');
instructionsContentDescription.innerHTML =
    "Avoid the obstacles, collect babies! Encounter a shark and you die.<br><br>" +
    'DOWN: move down<br>' +
    'LEFT: move left<br>' +
    'RIGHT: move right<br>' +
    'UP: move up<br>';
instructionsContentText.appendChild(instructionsContentDescription);

let backButton = document.createElement('div');
backButton.id = 'back-button';
backButton.innerHTML = 'Back';
instructionsContent.appendChild(backButton);

backButton.onclick = function () {
    beginContainer.style.display = 'flex';
    instructionsContainer.style.display = 'none';
};

document.body.appendChild(instructionsContainer);

instructionsButton.onclick = function () {
    beginContainer.style.display = 'none';
    instructionsContainer.style.display = 'flex';
};

let beginContentButton = document.createElement('div');
beginContentButton.id = 'begin-button';
beginContentButton.innerHTML = 'BEGIN';
beginContent.appendChild(beginContentButton);

// // Set up countdown
// var countDownDiv = document.createElement('div');
// countDownDiv.id = 'countdown';
// document.body.appendChild(countDownDiv);
// let countDownNumber = document.createElement('h1');
// countDownDiv.appendChild(countDownNumber);



// Begin game
beginContentButton.onclick = function () {
    beginContainer.style.display = 'none';
    // writeupContainer.style.display = 'none';
    // countDownDiv.style.display = 'flex';
    // let timeleft = 3;
    // let countDownInterval = setInterval(function () {
    //     if (timeleft < 0) {
    //         countDownDiv.style.display = 'none';
    //         clearInterval(countDownInterval);
    //         countDownNumber.innerText = '';
    //         countDownDiv.style.display = 'none';
    //     } else if (timeleft == 0) {
    //         countDownNumber.innerText = 'Go!';
    //         go.play();
    //         scene.state.newGameStarted = true;
    //         newGameStarted = true;
    //     } else {
    //         countDownNumber.innerText = timeleft;
    //         countdown.play();
    //     }
    //     timeleft -= 1;
    // }, 1000);
};

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
