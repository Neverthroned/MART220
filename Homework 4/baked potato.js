//timer
var myTime = 10;

//font
let myfont;

//images
var i1x = 100;
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

var img1;
var img2;
var img3;
function preload() {

  //images
  img1 = loadImage('./images/image1.png');
  img2 = loadImage('./images/image2.png');
  img3 = loadImage('./images/image3.png');

  //font
  myFont = loadFont('./fonts/CooperHewitt-Light.otf');
}

function setup() {
  //timer
  setInterval(changeTime, 1000);

  createCanvas(600, 600);
}

function draw() {
  background(220);

  //timer
  fill(0, 0, 0);
  textSize(15);
  text(myTime + " seconds", 20, 30);

  //text
  textFont(myFont);
  text("Bridger Burkes", 480, 580)

  //images
  fill(200, 1, 200);
  image(img1, i1x, i1y);
  i1x += i1spd;
  if(i1x >= 600 || i1x <= 0)
    {
      i1spd *= -1;
    }

  //image 2
  image(img2, i2x, i2y);
  i2x += i2spd;
  if(i2x >= 600 || i2x <= 0)
    {
      i2spd *= -1;
    }

  //image 3
  image(img3, i3x, i3y);
  i3x += i3spdx;
  i3y += i3spdy;
  if(i3x >= 600 || i3x <= 0)
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
  if(myTime == 0 && i3spdy > 0)
    {
      i2spdy = 1
    }
  if(myTime == 0 && i2spdy > 0)
    {
      i1spdy = 2
    }

  //collision
}
function changeTime()

{
    myTime--;
    if(myTime < 0)
    {
        // reset
        myTime = 10;
    }
    //myTime -= 1;
    //myTime = myTime - 1;
}
