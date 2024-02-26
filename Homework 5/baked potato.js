//timer
var myTime = 10;
var time = 0;

//font
let myfont;

//images
//speed stuff, will figure out later
/*var i1x = 100;
var i1y = 100;
var i1spd = 2;
var i1spdy = 0;

var i2x = 300;
var i2y = 300;
var i2spd = 1;
var i2spdy = 0;

var i3x = 500;
var i3y = 500;
var i3spdx = 3;
var i3spdy = 0;
*/
//food array
let foodObjects = [];

//old food image vars
//var img1;
//var img2;
//var img3;

//character stuff
var walkingCycle = [];
var flipX = false;
var xImage = 50, yImage = 300;

function preload() {
  //images, I don't know if I need this anymore
  img1 = loadImage('images/image (1).png')
  img2 = loadImage('images/image (2).png')
  img3 = loadImage('images/image (3).png')

  //font
  myFont = loadFont('fonts/CooperHewitt-Light.otf');
}

function setup() {
  //food array and setup
  for (let i = 0; i < 3; i++) {  
    let foodObject = new food("images/image (" + (i+1) + ").png", 0, 0, 50, 50);  // food setup
    foodObject.randomizePosition();  // random pos
    foodObjects.push(foodObject);  // surprised this worked, really didn't want to at first
}
//character animation setup
  for(var k = 0; k < 10; k++)
  {
    console.log("images/Idle (" + (k+1) + ").png");
    walkingCycle[k] =  new character1("images/Idle (" + (k+1) + ").png", 50, 300, 547, 481);
  }


  //timer
  setInterval(changeTime, 100);

  createCanvas(800, 800);
}

function draw() {
  background(220);
//resize character
  for (let i = 0; i < walkingCycle.length; i++) 
  {
    walkingCycle[i].resize(100, 100); 
  }

  //timer
  fill(0, 0, 0);
  textSize(15);
  text(myTime + " seconds", 20, 30);

  //text
  textFont(myFont);
  text("Bridger Burkes", 480, 580);
  text("Baked Potato 2.0", 200, 20);

  //images
  //new food(img3, 0, 0, 100, 100).display();
  //new food(img2, 0, 0, 100, 100).display();
  //new food(img1, 0, 0, 100, 100).display();
  for (let i = 0; i < foodObjects.length; i++) {
    foodObjects[i].display();
  }
  


  fill(200, 1, 200);
  //I'll figure out speed later beacuse arrays make it hard
  /*i1x += i1spd;
  i1y += i1spdy;
  if(i1x >= width || i1x <= 0)
    {
      i1spd *= -1;
    }
  if(i1y >=600 || i1y <= 0)
    {
      i1y = 0;
    }

  //image 2
  i2x += i2spd;
  i2y += i2spdy;
  if(i2x >= width || i2x <= 0)
    {
      i2spd *= -1;
    }
  if(i2y >=600 || i2y <= 0)
    {
      i2y = 0;
    }
  

  //image 3
  i3x += i3spdx;
  i3y += i3spdy;
  if(i3x >= width || i3x <= 0)
    {
      i3spdx *= -1;
    }
  if(i3y >=600 || i3y <= 0)
    {
      i3y = 0;
    }

  //timer movement with images
  if(myTime == 0)
    {
      i3spdy = 3
    }
  if(myTime == 1 && i3spdy > 0)
    {
      i2spdy = 1
    }
  if(myTime == 2 && i2spdy > 0)
    {
      i1spdy = 2
    }*/

  //could not for the life of me figure out how to flip the character around, I knew it was happening but he moved so far off screen I didn't know what to set the translation to
  if (foodObjects - walkingCycle <= 0) {
  }
  //if (flipX) {
    // The push and pop functions save and reset the previous transformation.
    //push();

    // Scale -1, 1 means reverse the x axis, keep y the same.
   // scale(-1, 1);

    // Because the x-axis is reversed, we need to draw at different x position.
   // pop();
  //}
  //else {
    //console.log(xImage);

    //DO NOT REMOVE, everytime I did the animation dissappeared
    walkingCycle[time].draw();
    //image(walkingCycle[i], xImage,yImage);
      //}

      //character movement
  if (keyIsPressed) {
    if (key == "w") {
      yImage -= 2;
      for(var ii = 0; ii < walkingCycle.length; ii++)
      {
        walkingCycle[ii].updateY(yImage);
            
      }
    }
    if (key == "s") {
      yImage += 2;
      for(var ii = 0; ii < walkingCycle.length; ii++)
      {
        walkingCycle[ii].updateY(yImage);
            
      }
    }
    if (key == "a") {
      xImage -= 2;
      for(var ii = 0; ii < walkingCycle.length; ii++)
      {
        walkingCycle[ii].updateX(xImage);
            
      }
      flipX = true;
    }
    if (key == "d") {
      xImage += 2;
      for(var ii = 0; ii < walkingCycle.length; ii++)
      {
        walkingCycle[ii].updateX(xImage);
            
      }
      console.log(time);
      flipX = false;
    }
  }
    //collision removal, couldn't figure out how to remove only one food at a time, at least when you supposedly eat what I think is food1 or I guess img1, not that I'm using that variable anyways
    for (let i = foodObjects.length - 1; i >= 0; i--) {
      let foodBoundingBox = foodObjects[i].getBoundingBox();

      for (let j = 0; j < walkingCycle.length; j++) {
          let walkingCycleBoundingBox = walkingCycle[j].getBoundingBox();

          if (checkCollision(walkingCycleBoundingBox, foodBoundingBox)) {
              foodObjects.splice(i, 1);
              console.log("Collision! Food removed.");
          }
      }
  }
}
//time change
function changeTime()

{
    myTime--;
    if(myTime < 0)
    {
        // reset
        myTime = 10;
    }
}
//character animation time link
function changeTime() {

  time++;
  if (time > walkingCycle.length - 1) {
      time = 0;
  }
}
//collision
function checkCollision(walkingCycle, foodObjects) {
  return (
      walkingCycle.x < foodObjects.x + foodObjects.width &&
      walkingCycle.x + walkingCycle.width > foodObjects.x &&
      walkingCycle.y < foodObjects.y + foodObjects.height &&
      walkingCycle.y + walkingCycle.height > foodObjects.y
  );
}