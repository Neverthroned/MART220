class Cube {
    constructor(x, y, z, size) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;
    }
    
    display() {
      push(); // Save the current drawing style settings and transformations
      translate(this.x, this.y, this.z);
      box(this.size); // Draw a cube
      pop(); // Restore the previous drawing style settings and transformations
    }
  }