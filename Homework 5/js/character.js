class character1
{
    constructor(myFileName, x, y, w, h)
    {
        this.characterImage = loadImage(myFileName);
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.characterImage.resize(this.width, this.height);
    }

    updateX(x)
    {
        this.x = x;
    }
    
    updateY(y)
    {
        this.y = y;
    }

    draw()
    {
        image(this.characterImage, this.x, this.y);
    }

    resize(newWidth, newHeight) 
    {
        this.width = newWidth;
        this.height = newHeight;
        this.characterImage.resize(this.width, this.height); // Resize the image
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
