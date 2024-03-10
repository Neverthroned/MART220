//Character, time and font
var xImage = 50, yImage = 200;
var myFont;
var myTime = 30;
var i = 0;
var flipX = false;

//strings
var idleStrings = [];
var walkStrings = [];
var deadStrings = [];

//animations
var idleArray = [];
var walkArray = [];
var deadArray = [];
var characterDead = false;
var deadFrames = 0;

//game over vars
var gameOver = 255;
var endText = -200;

//food and score
var food1;
var objDraw;
var score = 0;

//hazard
var hazard1;

//sounds
var bgMusic;
var good;
var bad;
var badSoundPlayed = false;


function preload() {
    idleStrings = loadStrings("../textFiles/idleStrings.txt");
    walkStrings = loadStrings("../textFiles/walkStrings.txt");
    deadStrings = loadStrings("../textFiles/deadStrings.txt");

    bgMusic = loadSound('./sounds/background.wav');
    good = loadSound('./sounds/good.wav');
    bad = loadSound('./sounds/bad.wav');

}

function setup() {
    createCanvas(800, 800);

    //animations
    for (let k = 0; k < idleStrings.length; k++) {
        idleArray.push(new character(idleStrings[k], 50, 200, 200, 200));
    }
    for (let k = 0; k < walkStrings.length; k++) {
        walkArray.push(new character(walkStrings[k], 50, 200, 200, 200));
    }
    for (let k = 0; k < deadStrings.length; k++) {
        deadArray.push(new character(deadStrings[k], 50, 200, 200, 200));
    }

    //food initial
    food1 = new character("../images/image (3).png", 200, 200, 50, 50);
    myFont = loadFont("fonts/CooperHewitt-Light.otf");

    //hazards initial
    hazard1 = new character("../images/hazard (1).png", 500, 500, 100, 100);

    //animation and time interval
    setInterval(changeTime, 100);
    setInterval(countDown, 1000);
}
// this runs continuously
function draw() {
    background(120);

    hazard1.draw();

    //food if not null
    if (food1 != null) {
        food1.draw();
    }

    //controls and flipping
    for (var l = 0; l < idleArray.length; l++) {

        //check for death first and foremost... unfortunately looped death animation, prolly fixable
        if (walkArray[l].checkCollision(hazard1.x, hazard1.y, hazard1.w, hazard1.h) || idleArray[l].checkCollision(hazard1.x, hazard1.y, hazard1.w, hazard1.h)) {
            objDraw = deadArray;
            
            //stop looped bad sound if already played... ow my ears
            if (!badSoundPlayed) {
                bad.play();
                badSoundPlayed = true;
            }
        }

        //no death = walk if moving
        else {
            objDraw = walkArray;
        }
    }
    if (objDraw != deadArray) {
        if (keyIsPressed) {
            if (key == "w") {
                yImage -= 2;
            }
            if (key == "s") {
                yImage += 2;
            }
            if (key == "a") {
                xImage -= 2;
                flipX = true;
            }
            if (key == "d") {
                xImage += 2;
                flipX = false;
            }

            for (var ii = 0; ii < idleArray.length; ii++) {
                idleArray[ii].updateX(xImage);
                idleArray[ii].updateFlip(flipX);
                walkArray[ii].updateX(xImage);
                walkArray[ii].updateFlip(flipX);
                deadArray[ii].updateX(xImage);
                deadArray[ii].updateFlip(flipX);
                idleArray[ii].y = yImage;
                walkArray[ii].y = yImage;
                deadArray[ii].y = yImage;

                if (food1 != null) {
                    if (walkArray[ii].checkCollision(food1.x, food1.y, food1.w, food1.h)) {
                        food1 = null;
                        score++;
                        createANewFoodItem();

                        //good sound
                        good.play();
                    }

                }
            }

        }

        else {
            objDraw = idleArray;
        }
    }
    else {
        objDraw = deadArray;
    }

    objDraw[i].draw();


    //score
    fill(50, 200, 209);
    textSize(24);
    textFont(myFont);
    text("Score: " + score, 400, 50);

    //time
    textSize(25);
    text(myTime + " seconds", 50, 50);


    //game over effects
    tint(255, gameOver);
    text("GAME OVER", endText, endText);

}

//time
function changeTime() {
    i++;
    if (i > idleArray.length - 1) {
        i = 0;
    }
}

//game over stuff
function countDown() {
    myTime--;
    if (myTime < 0) {
        myTime = 0
        gameOver = 0;
        endText = 300;
    }
}

//food creation after being eaten
function createANewFoodItem() {
    console.log("HI");
    food1 = new character("../images/image (3).png", random(50, width - 100), random(50, height - 100), 50, 50);
}

//sounds
function mousePressed() {
    bgMusic.loop();
}