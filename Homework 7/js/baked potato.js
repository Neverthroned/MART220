//Character, time and font
var xImage = 50, yImage = 200;
var myFont;
var myTime = 30;
var i = 0;
var flipX = false;
var idleStrings = [];
var walkStrings = [];
var idleArray = [];
var walkArray = [];

//game over vars
var gameOver = 255;
var endText = -200;

//food and score
var food1;
var objDraw;
var score = 0;

function preload() {
    idleStrings = loadStrings("../textfiles/idleStrings.txt");
    walkStrings = loadStrings("../textfiles/walkStrings.txt");
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

    //food initial
    food1 = new character("../images/image (3).png", 200, 200, 50, 50);
    myFont = loadFont("fonts/CooperHewitt-Light.otf");

    //animation and time interval
    setInterval(changeTime, 100);
    setInterval(countDown, 1000);
}
// this runs continuously
function draw() {
    background(120);

    //food if null
    if (food1 != null) {
        food1.draw();
    }

    //controls and flipping
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
            idleArray[ii].y = yImage;
            walkArray[ii].y = yImage;
            
            if (food1 != null) {
                if (walkArray[ii].checkCollision(food1.x, food1.y, food1.w, food1.h)) {
                    food1 = null;
                    score++;
                    createANewFoodItem();
                }
            }

        }
        objDraw = walkArray;
    }
    else {
        objDraw = idleArray;     
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
function createANewFoodItem()
{
    console.log("HI");
    food1 = new character("../images/image (3).png", random(50, width-100), random(50,height-100), 50, 50);
}