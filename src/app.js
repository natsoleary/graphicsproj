/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
 import { WebGLRenderer, PerspectiveCamera, Vector3, AudioListener, Audio, AudioLoader } from 'three';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
 import { SeedScene } from 'scenes';
 import coralIcon from './components/icons/coral/coral.png'
 import song from './audio/bensound-psychedelic.mp3'
 
 import './app.css'
 
 // Initialize core ThreeJS components
 const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
 const scene = new SeedScene(camera);
 const renderer = new WebGLRenderer({ antialias: true });

var listener = new AudioListener();
camera.add( listener );
var sound = new Audio( listener );
var audioLoader = new AudioLoader();
// the audio source comes from Bensound.com
audioLoader.load( song, ( buffer ) => {
sound.setBuffer( buffer );
sound.setLoop( true );
sound.setVolume( 1 );
sound.pause();
});
 
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
 
 // lives and points count
 let babiesCollected = 0;
 let corals = 3;
 let pastcorals = 3;
 
 var babiesDiv = document.createElement('div');
 babiesDiv.id = 'babies';
 babiesDiv.innerHTML = 'Babies: ' + babiesCollected;
 document.body.appendChild(babiesDiv);
 
 
 var lifeDiv = document.createElement('div');
 lifeDiv.id = 'lives';
 lifeDiv.innerHTML = 'Lives: ';
 document.body.appendChild(lifeDiv);
 
 
 let coralDiv = document.createElement('div');
 coralDiv.id = 'coral';
 
 
 for (let i = 0; i < corals; i++) {
     let coralImg = document.createElement('img');
     coralImg.src = coralIcon;
     coralDiv.appendChild(coralImg);
 }
 
 document.body.appendChild(coralDiv);
 

 var easy = false;
 var medium = false;
 var hard = false;
 

 
 
 // start screen 
 scene.pauseTurtle();
 
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
 
         let beginContentButton = document.createElement('div');
         beginContentButton.id = 'begin-button';
         beginContentButton.innerHTML = 'Play!';
         beginContent.appendChild(beginContentButton);
 
 
 
         // Begin game
         beginContentButton.onclick = function () {
             beginContainer.style.display = 'none';
             scene.unpauseTurtle(easy, medium, hard);
             sound.play();
 
         };
 
 
 
 
 
         // Set up instructions
         let instructionsContainer = document.createElement('div');
         instructionsContainer.id = 'instructions-container';
 
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
             "Avoid the obstacles using the arrow keys and collect babies! Encounter a shark and you die.<br><br>"; 
             // add graphics to show what these things are 
             // add the arrow keys and babies and shark
             
          
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
 
 
         // set up about container
         let aboutContainer = document.createElement('div');
         aboutContainer.id = "about-container";
 
         let aboutButton = document.createElement('div');
         aboutButton.id = 'about-button';
         aboutButton.innerHTML = 'About';
         beginContent.appendChild(aboutButton);
 
         aboutButton.onclick = function () {
             beginContainer.style.display = 'none';
             aboutContainer.style.display = 'flex';
         };
 
         let aboutContent = document.createElement('div');
         aboutContent.id = 'about-content';
         aboutContainer.appendChild(aboutContent);
 
         let aboutContentText = document.createElement('div');
         aboutContentText.id = 'about-text';
         aboutContent.appendChild(aboutContentText);
 
         let aboutTitleText = document.createElement('h1');
         aboutTitleText.innerText = 'About';
         aboutContentText.appendChild(aboutTitleText);
 
         let aboutContentDescription = document.createElement('p');
         aboutContentDescription.innerHTML =
             "Turtle Trek is a single player infinite runner game created by Natatlie O'Leary and Isabel Greene for their COS426 final project.  Natalie and Isabel are both seniors and can be reached for feedback at noleary@princeton.edu and igreene@princeton.edu. Thanks for playing! <br><br>";
         aboutContentText.appendChild(aboutContentDescription);
 
         let backButtonAbout = document.createElement('div');
         backButtonAbout.id = 'back-button-about';
         backButtonAbout.innerHTML = 'Back';
         aboutContent.appendChild(backButtonAbout);
 
         backButtonAbout.onclick = function () {
             beginContainer.style.display = 'flex';
             aboutContainer.style.display = 'none';
         };
         document.body.appendChild(aboutContainer);
 
         // set up difficulty container
 
             let difficultyContainer = document.createElement('div');
             difficultyContainer.id = "difficulty-container";
     
             let difficultyButton = document.createElement('div');
             difficultyButton.id = 'difficulty-button';
             difficultyButton.innerHTML = 'Difficulty';
             beginContent.appendChild(difficultyButton);
     
             difficultyButton.onclick = function () {
                 beginContainer.style.display = 'none';
                 difficultyContainer.style.display = 'flex';
             };
     
             let difficultyContent = document.createElement('div');
             difficultyContent.id = 'difficulty-content';
             difficultyContainer.appendChild(difficultyContent);
     
             let difficultyContentText = document.createElement('div');
             difficultyContentText.id = 'difficulty-text';
             difficultyContent.appendChild(difficultyContentText);
     
             let difficultyTitleText = document.createElement('h1');
             difficultyTitleText.innerText = 'Difficulty';
             difficultyContentText.appendChild(difficultyTitleText);
     
             let difficultyContentDescription = document.createElement('p');
             difficultyContentDescription.innerHTML =
                 "Choose the speed of your turtle! <br><br>";
             difficultyContentText.appendChild(difficultyContentDescription);
 
             let easyButtonDifficulty = document.createElement('div');
             easyButtonDifficulty.id = 'easy-button-difficulty';
             easyButtonDifficulty.innerHTML = 'Easy';
             difficultyContent.appendChild(easyButtonDifficulty);
     
             easyButtonDifficulty.onclick = function () {
                 beginContainer.style.display = 'flex';
                 difficultyContainer.style.display = 'none';
                
                 easy = true;
                 medium = false;
                 hard = false;
             };
 
             let mediumButtonDifficulty = document.createElement('div');
             mediumButtonDifficulty.id = 'medium-button-difficulty';
             mediumButtonDifficulty.innerHTML = 'Medium';
             difficultyContent.appendChild(mediumButtonDifficulty);
     
             mediumButtonDifficulty.onclick = function () {
                 beginContainer.style.display = 'flex';
                 difficultyContainer.style.display = 'none';
              
                 medium = true;
                 hard = false;
                 easy = false;
             };
 
             let hardButtonDifficulty = document.createElement('div');
             hardButtonDifficulty.id = 'hard-button-difficulty';
             hardButtonDifficulty.innerHTML = 'Hard';
             difficultyContent.appendChild(hardButtonDifficulty);
     
             hardButtonDifficulty.onclick = function () {
                 beginContainer.style.display = 'flex';
                 difficultyContainer.style.display = 'none';
                 
                 hard = true;
                 medium = false;
                 easy = false;
             };
             document.body.appendChild(difficultyContainer);


             // end container
             // Set up outro screen
let endContainer = document.createElement('div');
endContainer.id = 'end-container';
document.body.appendChild(endContainer);

let endContent = document.createElement('div');
endContent.id = 'end-content';
endContainer.appendChild(endContent);

let endContentText = document.createElement('div');
endContentText.id = 'end-text';
endContent.appendChild(endContentText);

let endContentTitleText = document.createElement('h1');
endContentTitleText.innerText = 'GAME OVER :(';
endContentText.appendChild(endContentTitleText);

let endContentDescription = document.createElement('p');
endContentDescription.innerHTML = 'Your babies:';
endContentText.appendChild(endContentDescription);

let endContentScore = document.createElement('h1');
endContentScore.id = 'end-score';
endContentText.appendChild(endContentScore);

let endContentButton = document.createElement('div');
endContentButton.id = 'end-button';
endContentButton.innerHTML = 'Play Again!';
endContent.appendChild(endContentButton);

// End game and reset by refreshing
endContentButton.onclick = function () {
    endContainer.style.display = 'none';
    babiesCollected = 0;
    corals = 3;
    scene.pauseTurtle();
    for (let i = 0; i < corals; i++) {
        let coralImg = document.createElement('img');
        coralImg.src = coralIcon;
        coralDiv.appendChild(coralImg);
    }
    window.location.reload();
};

endContainer.style.display = 'none';

  
 
 // Render loop
 const onAnimationFrameHandler = (timeStamp) => {
     controls.update();
     renderer.render(scene, camera);
     scene.update && scene.update(timeStamp);
     window.requestAnimationFrame(onAnimationFrameHandler);
     babiesCollected = scene.getBabies();
     document.getElementById('babies').innerHTML = 'Babies: ' + babiesCollected;
     corals = scene.getLives();
     if (corals < pastcorals) {
         console.log("got here");
        coralDiv.removeChild(coralDiv.lastChild);
     }
     pastcorals = corals;

         // game over if lives are 0
    if (corals <= 0) {
     
        endContainer.style.display = 'flex';
        endContentScore.innerText = babiesCollected;
        sound.pause();
    }
    document.getElementById('babies').innerHTML = 'Babies: ' + babiesCollected;
 
     
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
