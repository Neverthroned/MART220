class food
{
    constructor(imgPath, x, y, w, h)
    {
        this.img = loadImage(imgPath);
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        
    }

    display() {
        image(this.img, this.x, this.y, this.width, this.height);
      }

    randomizePosition() {
        this.x = random(800 - this.width);
        this.y = random(800 - this.height);
    }
    getBoundingBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}