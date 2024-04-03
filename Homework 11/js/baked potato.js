//strings
var idlePaths = [];
var walkPaths = [];
var deadPaths = [];

//animations
var myAnimation;
var dead = false;

//game objects
let walls = [];
let food = [];

//pos
var currentX = 200, currentY = 200;

//score
var score = 0;

//sounds
var bgMusic;
var good;
var bad;

//health bar
let maxHp = 100;
let hp = 100;

//particles
const particles = [];

//every sprite array
let allSprites = [];

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

    //gravity
    world.gravity.y = 10;

    //animations
    myAnimation = new player(200, 200, 150, 150);
    myAnimation.myLoadAnimation('idle', idlePaths);
    myAnimation.myLoadAnimation('walk', walkPaths);
    myAnimation.myLoadAnimation('dead', deadPaths);


    //wall loop, boom did it
    for (let i = 0; i < 3; i++) {
        walls.push(createWall(random(50, width - 100), 0));
    }

    //hazard

    //food
    for (let j = 0; j < 5; j++) {
        food.push(newFood(random(50, width - 100), 0));
    }
    //food = new Sprite(random(50, width - 100), random(50, height - 100), 25, 25, 'static');
    //food.img = "./images/image (1).png";
    //food.scale = 0.05;
    //food.diameter = 50;


    myFont = loadFont("fonts/CooperHewitt-Light.otf");

    //hazards initial
    hazard = new Sprite(450, 400, 100, 100, 'static');
    hazard.img = "./images/hazard (1).png";
    hazard.scale = 0.05;
    hazard.diameter = 100;

    //I hate and love this piece of code right here... puts all my sprites into the same collision and allows the food and hazards to still be damaged and eaten
    //I hate it because it really confuses me when it breaks and takes so much troubleshooting, also because I'm going to have to make food an array 
    //and that is going to be no beuno
    let allSprites = [walls, food, hazard];


}
// this runs continuously
function draw() {
    background(120);

    //Health
    updateHp(hp, maxHp);

    //score
    fill(50, 200, 209);
    textSize(24);
    textFont(myFont);
    text("Score: " + score, 400, 50);

    //controls and flipping
    if (score != 10) {
        if (dead == false) {
            if (kb.pressing('d')) {
                if (myAnimation.isColliding(allSprites)) {
                    myAnimation.drawAnimation('idle');
                    myAnimation.updatePosition('idle');

                }
                else if (myAnimation.isColliding(hazard)) {
                    damage();

                }
                myAnimation.updatePosition('forward');
                myAnimation.drawAnimation('walk');

            }
            else if (kb.pressing('a')) {
                if (myAnimation.isColliding(allSprites)) {
                    myAnimation.drawAnimation('idle');
                    myAnimation.updatePosition('idle');
                }
                else if (myAnimation.isColliding(hazard)) {
                    damage();

                }
                myAnimation.updatePosition('reverse');
                myAnimation.drawAnimation('walk');
            }
            else if (kb.pressing('w')) {
                if (myAnimation.isColliding(allSprites)) {
                    myAnimation.drawAnimation('idle');
                    myAnimation.updatePosition('idle');

                }
                else if (myAnimation.isColliding(hazard)) {
                    damage();

                }
                myAnimation.updatePosition('up');
                myAnimation.drawAnimation('walk');

            }
            else if (kb.pressing('s')) {
                if (myAnimation.isColliding(allSprites)) {
                    myAnimation.drawAnimation('idle');
                    myAnimation.updatePosition('idle');

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

    if (!dead && (kb.pressing('d') || kb.pressing('a') || kb.pressing('w') || kb.pressing('s'))) {
        for (let i = food.length - 1; i >= 0; i--) {
            if (myAnimation.isColliding(food[i])) {
                eat();
                console.log("Collided with food");
                food[i].remove(); // Remove the collided food item from the array
            }
        }
    }

    if (score >= 10 || dead == true) {
        //if not dead and score is 10, win stuff... could simplify probably so no or statement but ¯\_(ツ)_/¯
        if (dead == false) {
            winObj();
            currentX = myAnimation.getCurrentAnimation().x + 160;
            currentY = myAnimation.getCurrentAnimation().y + 50;
            explosion();
        }
        hazard.remove();
        for (let i = food.length - 1; i >= 0; i--) {
            
                food[i].remove(); // Remove the collided food item from the array
        }

    }

    //food
    
    //wall respawn
    for (let i = walls.length - 1; i >= 0; i--) {
        // Draw and update each wall
        walls[i].draw();
        walls[i].update();

        // Check if the wall has fallen off the screen
        if (walls[i].position.y > height) {
            // Remove the wall from the array
            walls.splice(i, 1);
            if (dead == false) {
                if (score != 10) {
                    walls.push(createWall());
                }
            }

        }
    }
    textFont(myFont);
    text("Bridger Burkes", 600, 780);
    text("Baked Potato 2.0", 100, 50);
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
    hp -= 20;

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
    newFood();
    score += 1;
}

//sounds
function mousePressed() {
    bgMusic.loop();
}
function newHazard() {
    hazard = new Sprite(random(50, width - 100), random(50, width - 100), 50, 50, 'static');
    hazard.img = "./images/hazard (1).png";
    hazard.scale = 0.05;
    hazard.diameter = 100;
}

function newFood() {
    console.log("HI");
    let newFoodItem = new Sprite(random(50, width - 100), random(50, height - 100), 25, 25, 'static');
    newFoodItem.img = "./images/image (1).png";
    newFoodItem.scale = 0.05;
    newFoodItem.diameter = 50;
    food.push(newFoodItem);
    return newFoodItem;
}
function winObj() {
    text("YOU WIN", 400, 400);
}

//particles
function explosion() {

    for (let i = 0; i < 50; i++) {
        let p = new Particle(currentX, currentY);
        particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
            // remove this particle
            particles.splice(i, 1);
        }
    }
}
function createWall() {
    let wall = new Sprite(random(50, width - 100), 0, 400, 400, 'dynamic');
    wall.img = "./images/wall.jpg";
    wall.scale = 0.10;
    wall.diameter = 200;
    return wall; // Return the created wall sprite
}