function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  //potato
  fill(179, 119, 0)
  ellipse(200, 200, 200, 150);

  //sour cream
  fill(256, 256, 256);
  circle(125, 205, 40);
  circle(275, 195, 40);
  circle(150, 200, 50);
  circle(175, 210, 50);
  circle(250, 200, 50);
  circle(225, 190, 50);
  circle(200, 200, 50);

  //cheese
  fill(255, 204, 102);
  rect(200, 200, 10, 40);
  rect(130, 180, 15, 25);
  rect(160, 170, 10, 60);
  rect(185, 180, 10, 30);
  rect(220, 170, 13, 60);
  rect(250, 190, 10, 30);

  //silverware
  fill(199, 199, 199);
  ellipse(40, 275, 15, 175);
  ellipse(40, 200, 12, 70);
  ellipse(25, 200, 12, 70);
  ellipse(55, 200, 12, 70);
  ellipse(360, 275, 15, 175);
  ellipse(355, 220, 20, 150);
}
