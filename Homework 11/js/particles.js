class Particle {

    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.vx = random(-50, 60);
      this.vy = random(-35, -80);
      this.alpha = 225
    }
  
    finished() {
      return this.alpha < 0;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 5;
    }
  
    show() {
      noStroke();
      stroke(225);
      fill(random(255),random(255),random(255), this.alpha);
      ellipse(this.x, this.y, 16);
    }
  
  }