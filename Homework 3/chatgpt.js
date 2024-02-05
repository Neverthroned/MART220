let balls = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  // Update and display all existing balls
  for (let ball of balls) {
    ball.update();
    ball.display();
  }
}

function mousePressed() {
  // Create a new ball at the mouse position when clicked
  let newBall = new Ball(mouseX, mouseY, random(20, 40));
  balls.push(newBall);
}

class Ball {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    // Move the ball
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x <= 0 || this.x >= width) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.speedY *= -1;
    }

    // Check collisions with other balls
    for (let other of balls) {
      if (other !== this) {
        let d = dist(this.x, this.y, other.x, other.y);
        let minDist = this.diameter / 2 + other.diameter / 2;
        if (d < minDist) {
          // Bounce off the other ball
          this.speedX *= -1;
          this.speedY *= -1;
        }
      }
    }
  }

  display() {
    // Draw the ball
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
