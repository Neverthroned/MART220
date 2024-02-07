//shapes x and y
var c1x = 200;
var c1y = 200;
var c2x = 300;
var c2y = 300;
var c3x = 100;
var c3y = 100;


//speed (placeholder)
c1spd = 3;
c3spdx = 0;
c3spdy = 0;

//chase
var chaseMathx = 1;
var chaseMathy = 1;

//time
var myTime = 10;


function setup() {
  setInterval(changeTime, 1000);

  createCanvas(800, 800);
}

function draw() {
  background(220);

  //timer
  fill(0, 0, 0);
    textSize(15);

    text(myTime + " seconds", 50, 50);


  //chase algo
  if(c3x > c2x && chaseMathx > 0 || c3x < c2x && chaseMathx < 0)
    {
      chaseMathx *= -1
    }
  if(c3y > c2y && chaseMathy > 0 || c3y < c2y && chaseMathy < 0)
    {
      chaseMathy *= -1
    }
  if(myTime == 0)
    {
      chaseMathx += 0.01;
      chaseMathy += 0.01;
    }

  //bounce shape
  fill(200, 1, 200);
  circle(c1x, c1y, 50);
  c1x += c1spd
  if(c1x >= 800 || c1x <= 0)
    {
      c1spd *= -1;
    }
  //chase shape
  fill(200, 1, 1);
  circle(c3x, c3y, 50);
  c3x += c3spdx;
  c3y += c3spdy;
  if(c3x == c2x)
    {
      c3spdx = 0
    }
  else
    {
      c3spdx = chaseMathx
    }
  if(c3y == c2y)
    {
      c3spdy = 0
    }
  else
    {
      c3spdy = chaseMathy
    }


  //player
  fill(1, 200, 1);
  circle(c2x, c2y, 50);
  //player movement
  if(keyIsPressed)
  {
    if(key == 'a')
    {
        c2x-=5;
    }

    else if(key == 'd')
    {
        c2x+=5;
    }
    else if(key == 'w')
    {
        c2y-=5;
    }
    else if(key == 's')
    {
        c2y+=5;
    }
  }
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
