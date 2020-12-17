// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/develop-a-html5-javascript-game

// gravity constant 'g'
// mass density 'md', mass = md * volume
const g  = 9.81;
const md = 0.5;

class Circle extends GameObject
{
    constructor (context, x, y, radius, vx, vy, mass){
        super(context, x, y, radius, vx, vy, mass);
        //Set default width and height
        this.radius = radius;
        this.volume = (4/3) * Math.PI * this.radius * this.radius * this.radius
        this.mass = this.volume / md;

    }

    draw(){
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fill();  
        this.context.closePath();

    }
  
    // Set gravitational acceleration
	update(secondsPassed){
    	// Apply acceleration
    	this.vy += g * secondsPassed;

    	// Move with set velocity
    	this.x += this.vx * secondsPassed;
    	this.y += this.vy * secondsPassed;
	}
}
