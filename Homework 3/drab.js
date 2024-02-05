//vars
var circleX = 200
var cicleXspd = 0

var circle2X = 200
var circle2Y = 100
var circle2Xspd = 0
var circle2Yspd = 0

var mouse_x = -200
var mouse_y = -200
function setup() {
  createCanvas(400, 400);
  //random circle speeds
  circleXspd = random(1, 11);
  circle2Xspd = random(1, 11);
  circle2Yspd = random(1, 11);
}

function draw() {
  background(220);

  //names
  fill(0, 0, 0)
  text('Bridger Burkes', 310, 390);
  text('Drab', 0, 10)

  //shapes
  fill(145, 223, 2);
  circle(circleX, 200, 30);
  //movement
  circleX += circleXspd
  if (circleX >= width)
  {
    //restart
    circleX = 0
  }
  if (circleX <= 0 && circleXspd < 0)
    {
      circleX = width;
    }

  //second circle
  fill(23, 243, 123);
  circle(circle2X, circle2Y, 40);
  circle2X += circle2Xspd;
  circle2Y += circle2Yspd;
  //bouncy
  if (circle2X > 380 || circle2X < 0)
  {
    circle2Xspd *= -1;
  }
  if (circle2Y > 380 || circle2Y < 0)
  {
    circle2Yspd *= -1;
  }
  //collision detection and velocity transfer
  var distance = dist(circleX, 200, circle2X, circle2Y);
  if (distance < 20 + 15) {
    //collision occurred
    var temp = circleXspd;
    circleXspd = circle2Xspd;
    circle2Xspd = temp;
  }
  //mouse event circle
  fill(100, 12, 200);
  circle(mouse_x, mouse_y, 50);
  //more collision stuff
  var d2 = dist(circleX, 200, mouse_x, mouse_y,);
  if (d2 < 25 + 15)
    {
      circleXspd *= -1;
    }
  var d3 = dist(circle2X, circle2Y, mouse_x, mouse_y);
  if (d3 < 25 + 20)
    {
      circle2Xspd *= -1;
      circle2Yspd *= -1;
    }
}
//mouse function
  function mouseClicked()
{
  mouse_x = mouseX;
  mouse_y = mouseY;
}
