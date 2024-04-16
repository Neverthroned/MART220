let img1;
let myFont;

function preload() {
    img1 = loadImage('images/red.jpg')
    myFont = loadFont('fonts/CooperHewitt-Light.otf');

}
function setup() {

    createCanvas(400, 400, WEBGL);


}

function draw() {

    //text and main stuff
    background(220);
    textFont(myFont);
    textSize(36);
    fill(0,0,0);
    text("Bridger Burkes", -50, 170);
    text("Spiral", -190, -170)

    //light
    pointLight(255, 200, 200, mouseX, mouseY, 200);
    specularMaterial(100, 0, 0);

    //boxes 1 & 2
    push();
    rotateZ(frameCount);
    texture(img1);
    translate(-200, -200, 0);
    rotate(20, [mouseX, mouseY, 50]);
    box();

    translate(100, 100);
    box();
    pop();

    //box middle/3
    push();
    texture(img1);
    rotateZ(frameCount * 0.5)
    translate(0, 0, 50);
    box();
    pop();

    //boxes 4 & 5
    push();
    rotateZ(frameCount);
    texture(img1);
    translate(100, 100);
    rotate(20, [mouseX * -1, mouseY, 50]);
    box();

    translate(100, 100);
    box();
    pop();

    //plane
    push();
    translate(0, 0, -200);
    plane(1000, 1000);
    pop();

    //donuts
    rotateX(frameCount * 0.1);
    rotateZ(frameCount);
    push();
    torus(30, 15);
    pop();

    push();
    translate(100, -100, 0);
    torus(30, 15);
    pop();

    push();
    translate(-100, 100, 0);
    torus(30, 15);
    pop();

}