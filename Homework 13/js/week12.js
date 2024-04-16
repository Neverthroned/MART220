let model1;
let model2;
let planet;
let red;
let desert;
let space;
let metal;
let myFont;
let cubes = [];
let numCubes = 5;
let b1z = 0;
let b2z = 0;
let b1Spd = 0;
let b2Spd = 0;

function preload() {
    model1 = loadModel('assets/model1.obj', true);
    model2 = loadModel('assets/model2.obj', true);
    red = loadImage('images/red.jpg');
    desert = loadImage('images/desert.jpg');
    metal = loadImage('images/metal.jpg');
    space = loadImage('images/space.jpg');
    myFont = loadFont('fonts/CooperHewitt-Light.otf');
    planet = loadModel('assets/planet.obj', true);

}
function setup() {

    createCanvas(600, 600, WEBGL);
    
    for (let i = 0; i < numCubes; i++) {
        cubes.push(new Cube(i * 100 - (numCubes / 2 * 80), 0, 0, 30));
    }


}

function draw() {

    //text and main stuff
    background(220);
    textFont(myFont);
    textSize(36);
    fill(0,0,0);
    text("Bridger Burkes", -50, 170);
    text("Ship", -190, -170)

    //light
    pointLight(255, 200, 200, mouseX, mouseY, 200);
    specularMaterial(100, 0, 0);

    push();
    translate(0,0,0);
    rotateZ(180);
    rotateZ(frameCount * 1);
    texture(metal);
    model(model1);
    pop();

    push();
    for (let i = 0; i < cubes.length; i++) {
        texture(red);
        rotateX(frameCount * 2);
        //rotateY(frameCount * 2);
        //rotateZ(frameCount * 2);
        cubes[i].display();
      }
      pop();

      normalMaterial();
    push();
    translate(-10, 0, b1z);
    if (mouseIsPressed) {
        // Update the shape's position to the mouse position
        b1Spd = 3;
        b2Spd = 3;
        console.log(b1z)
      }
    scale(0.1);
    rotateY(90);
    rotateX(frameCount * 3)
    fill(255, 0, 0);
    model(model2);
    b1z += b1Spd;
    pop();

    push();
    
    translate(10, 0, b2z);
    scale(0.1);
    rotateY(90);
    rotateX(frameCount * 3)
    fill(255, 0, 0);
    model(model2);
    b2z += b2Spd;
    pop();

    if(b1z >= 500) {
        b1z = 0;
        b2z = 0;
        b1Spd = 0;
        b2Spd = 0;
    }

    push();
    translate(-200, 200, -50);
    rotateX(frameCount * 4)
    rotateY(frameCount * 4)
    texture(desert);
    model(planet);
    pop();

    push();
    translate(0, 0, -200);
    texture(space);
    plane(1000, 1000);
    pop();
    
}