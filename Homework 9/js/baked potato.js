//strings
var idlePaths = [];
var walkPaths = [];
var deadPaths = [];

//animations
var myAnimation;
var dead = false;

//game objects
let wall;
let food;

//let hazard;

//score
var score = 0;

//sounds
var bgMusic;
var good;
var bad;

//health bar
let maxHp = 100;
let hp = 100;

function preload() {
    idlePaths = loadStrings("./images/Idle/idle.txt");
    walkPaths = loadStrings("./images/Walk/walk.txt");
    deadPaths = loadStrings("./images/Dead/dead.txt");

    bgMusic = loadSound('./sounds/background.wav');
    good = loadSound('./sounds/good.wav');
    bad = loadSound('./sounds/bad.wav');



}

function setup() {
    createCanvas(800, 800);

    //animations
    myAnimation = new player(200, 200, 150, 150);
    myAnimation.myLoadAnimation('idle', idlePaths);
    myAnimation.myLoadAnimation('walk', walkPaths);
    myAnimation.myLoadAnimation('dead', deadPaths);


    //walls probably should have just used a loop to create the three walls but I'm kind of lazy
    wall = new Sprite(random(50, width - 100), random(50, width - 100), 400, 400, 'static');
    wall.img = "./images/wall.jpg";
    wall.scale = 0.10;
    wall.diameter = 200;
    wall = new Sprite(random(50, width - 100), random(50, width - 100), 400, 400, 'static');
    wall.img = "./images/wall.jpg";
    wall.scale = 0.10;
    wall.diameter = 200;
    wall = new Sprite(random(50, width - 100), random(50, width - 100), 400, 400, 'static');
    wall.img = "./images/wall.jpg";
    wall.scale = 0.10;
    wall.diameter = 200;

    //hazard

    //food
    food = new Sprite(250, 400, 100, 100, 'static');
    food.img = "./images/image (1).png";
    food.scale = 0.05;
    food.diameter = 50;

    myFont = loadFont("fonts/CooperHewitt-Light.otf");

    //hazards initial
    hazard = new Sprite(450, 400, 100, 100, 'static');
    hazard.img = "./images/hazard (1).png";
    hazard.scale = 0.05;
    hazard.diameter = 100;

}
// this runs continuously
function draw() {
    background(120);

    //Health
    updateHp(hp, maxHp);

    //hazard food collision

    //score
    fill(50, 200, 209);
    textSize(24);
    textFont(myFont);
    text("Score: " + score, 400, 50);

    //controls and flipping
    if (score != 10) {
    if (dead == false) {
        if (kb.pressing('d')) {
            if (myAnimation.isColliding(wall)) {
                myAnimation.drawAnimation('idle');
                myAnimation.updatePosition('idle');

            }
            else if (myAnimation.isColliding(food)) {
                eat();

            }
            else if (myAnimation.isColliding(hazard)) {
                damage();

            }
            myAnimation.updatePosition('forward');
            myAnimation.drawAnimation('walk');

        }
        else if (kb.pressing('a')) {
            if (myAnimation.isColliding(wall)) {
                myAnimation.drawAnimation('idle');
                myAnimation.updatePosition('idle');
            }
            else if (myAnimation.isColliding(food)) {
                eat();

            }
            else if (myAnimation.isColliding(hazard)) {
                damage();

            }
            myAnimation.updatePosition('reverse');
            myAnimation.drawAnimation('walk');
        }
        else if (kb.pressing('w')) {
            if (myAnimation.isColliding(wall)) {
                myAnimation.drawAnimation('idle');
                myAnimation.updatePosition('idle');

            }
            else if (myAnimation.isColliding(food)) {
                eat();

            }
            else if (myAnimation.isColliding(hazard)) {
                damage();

            }
            myAnimation.updatePosition('up');
            myAnimation.drawAnimation('walk');

        }
        else if (kb.pressing('s')) {
            if (myAnimation.isColliding(wall)) {
                myAnimation.drawAnimation('idle');
                myAnimation.updatePosition('idle');

            }
            else if (myAnimation.isColliding(food)) {
                eat();

            }
            else if (myAnimation.isColliding(hazard)) {
                damage();

            }
            myAnimation.updatePosition('down');
            myAnimation.drawAnimation('walk');
        }
        else {
            myAnimation.drawAnimation('idle');
        }
    }
    else {
        myAnimation.drawAnimation('dead');
    }
    }

    if (score == 10) {
        winObj();
    } 
}

//health bar
function updateHp(hp, maxHp) {
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(width / 2 - 100, 750, 200, 15);

    fill(255, 0, 0);
    rect(width / 2 - 100, 750, map(hp, 0, maxHp, 0, 200), 15);
}

//damage caused by hazard
function damage() {
    bad.play();
    hp -= 10;
    
    hazard.remove();
    if (hp <= 0) {
        dead = true;
    }
    newHazard();
}
function eat() {
    good.play();
    if (hp > 90) {
        hp += 0;
    }
    else {
        hp += 10;
    }
    food.remove();
    newFood();
    score += 1;
}

//sounds
function mousePressed() {
    bgMusic.loop();
}
function newHazard() {
    hazard = new Sprite(random(50, width - 100), random(50, width - 100), 100, 100, 'static');
    hazard.img = "./images/hazard (1).png";
    hazard.scale = 0.05;
    hazard.diameter = 100;
    if (hazard.overlaps(wall)) {
        newHazard();
        console.log("hazard wall");
    }
}

function newFood() {
    console.log("HI");
    //food1 = new sprite("../images/image (3).png", random(50, width - 100), random(50, height - 100), 50, 50);
    food = new Sprite(random(50, width - 100), random(50, height - 100), 100, 100, 'static');
    food.img = "./images/image (1).png";
    food.scale = 0.05;
    food.diameter = 50;
    if (food.overlaps(wall)) {
        newFood();
        console.log("food wall");
    }
}
function winObj() {
    text("YOU WIN", 400, 400);
}
