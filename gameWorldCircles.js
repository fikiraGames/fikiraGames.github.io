// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/develop-a-html5-javascript-game

// Set a restitution, a lower value will lose more energy when colliding
const restitution = 0.90;

class GameWorld 
{

    constructor(canvasId)
    {
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;

        this.init(canvasId);
    }

    init(canvasId) 
    {
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.canvas = document.getElementById(canvasId);
	// https://www.w3schools.com/js/js_window.asp    
	this.canvas.width  = (window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth ) * 0.900;
        this.canvas.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.825;
        this.context = this.canvas.getContext('2d');
        
	var slider 			= document.createElement('input');
	slider.style.width 		= document.body.clientWidth * 0.90 + "px";
	slider.style.marginLeft 	= document.body.clientWidth * 0.05 + "px";
	slider.style.marginTop 		= "15px"; 

	slider.id 			= 'input';
	slider.type 			= 'range';
	slider.min 			= '50';
	slider.max 			= '2000';
	slider.value 			= '1500';
	    
	var pre 			= document.createElement('pre');   
	pre.style.width			="30px";
	pre.style.marginLeft 		= document.body.clientWidth / 2 - parseInt(pre.style.width, 10) / 2 + "px";
        pre.innerHTML 			= slider.value; // Display the default slider value
 	// Update the current slider value (each time you drag the slider handle)
	slider.oninput 			= function() {pre.innerHTML = this.value}

        var pr  			= document.createElement('pre');
        pr.innerHTML 			= 'speed: 50 - 2000' + '\n' + ' default = 1500';
        pr.style.width			= "130px";
        pr.style.marginLeft 		= document.body.clientWidth / 2 - parseInt(pr.style.width, 10) / 2  + "px"; 

	var button 			= document.createElement('button');
	button.style.width      	="50px";
       	button.style.marginLeft 	= document.body.clientWidth / 2 - parseInt( button.style.width, 10) / 2  + "px"; 

	var a 				= document.createElement('a');
	a.href 				= "index.html";
	a.innerHTML 			= "Home";
	button.appendChild(a);
	
	document.body.appendChild(slider);
	document.body.appendChild(pre);
	document.body.appendChild(pr);	
	document.body.appendChild(button);
	    
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }
    
/*
random height:
	canvas.width  / 2 means the left half of the width, then * Math.random() (which is between 0 and 1), so min = 0, max = canvas.width / 2
	canvas.height / 4 means the upper quarter of the height, then * Math.random() (which is between 0 and 1), so min = 0, max = canvas.height / 4
*/
    createWorld() 
    {
        this.gameObjects = 
        [     
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4,  7, Math.random() * 10 ,  Math.random() * 10 ),

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 15, Math.random() * 10 ,  Math.random() * 10 ),

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 30, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 30, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 30, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 30, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 30, Math.random() * 10 ,  Math.random() * 10 ),

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 60, Math.random() * 10 ,  Math.random() * 10 ),            
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 60, Math.random() * 10 ,  Math.random() * 10 ),            
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 60, Math.random() * 10 ,  Math.random() * 10 ),            

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 80, Math.random() * 10 ,  Math.random() * 10 )
        ];
    }
    
    gameLoop(timeStamp) 
    {
    	var speed      = 1500;
    	var speedValue = 2050 - document.getElementById('input').value;
        
        if (speedValue > 49 && speedValue < 2001)
        {
        	speed  = speedValue;
        } 
	else
        {
        	speed  = speed;
        }
        // Calculate how much time has passed
        var secondsPassed = (timeStamp - this.oldTimeStamp) / speed;
        this.oldTimeStamp = timeStamp;
        
        // Loop over all game objects to update
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].update(secondsPassed);
        }
        this.detectCollisions();
        this.clearCanvas();
        
		// Loop over all game objects to draw
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].draw();
        }
        
        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }
	
    detectCollisions() 
    {	
        var obj1;
        var obj2;
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].isColliding = false;
        }
        for (var i = 0; i < this.gameObjects.length; i++)
        {
            obj1 = this.gameObjects[i];
            // Check for left and right
         	if (obj1.x < obj1.radius)
         	{
            	obj1.vx = Math.abs(obj1.vx) * restitution;
             	obj1.x = obj1.radius;
         	} 
         	else if (obj1.x > canvas.width - obj1.radius)
         	{
             	obj1.vx = -Math.abs(obj1.vx) * restitution;
             	obj1.x = canvas.width - obj1.radius;
         	}

         	// Check for bottom and top
         	// bottom (restitution (more energy absorption) bigger than top hence ' * restitution * restitution')
         	if (obj1.y < obj1.radius)
         	{
             	obj1.vy = Math.abs(obj1.vy) * restitution;
             	obj1.y = obj1.radius;
         	} 
         	else if (obj1.y > canvas.height - obj1.radius)
         	{
         		//obj1.vy = -Math.abs(obj1.vy) * restitution;
             	obj1.vy = -Math.abs(obj1.vy) * restitution * restitution;
             	obj1.y = canvas.height - obj1.radius;
        	}
            for (var j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];

                if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) 
                {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    var vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    var distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    var vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                    var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
	//				speed *= Math.min(obj1.restitution, obj2.restitution);
					
                    if (speed < 0) 
                    {
                        break;
                    }

                    var impulse = 2 * speed / (obj1.mass + obj2.mass);
                    
                    /*
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                    */
                    
                    function imp() 
                    {
                    	obj1.vx -= ((impulse * obj2.mass * vCollisionNorm.x)/10);
                    	obj1.vy -= ((impulse * obj2.mass * vCollisionNorm.y)/10);
                    	obj2.vx += ((impulse * obj1.mass * vCollisionNorm.x)/10);
                    	obj2.vy += ((impulse * obj1.mass * vCollisionNorm.y)/10);
                    }
                    imp();imp();imp();imp();imp();imp();imp();imp();imp();imp();
    
                }
            }
        }
    }

    circleIntersect(x1, y1, r1, x2, y2, r2) 
    {

    // Calculate the distance between the two circles
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= ((r1 + r2) * (r1 + r2))
    }

    clearCanvas() 
    {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }
}

class GameWorld2 
{

    constructor(canvasId)
    {
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;

        this.init(canvasId);
    }

    init(canvasId) 
    {

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.canvas = document.getElementById(canvasId);
	    // https://www.w3schools.com/js/js_window.asp    
	    this.canvas.width  = (window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth ) * 0.900;
        this.canvas.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.825;
        this.context = this.canvas.getContext('2d');
        
	var slider 			= document.createElement('input');
	slider.style.width 		= document.body.clientWidth * 0.90 + "px";
	slider.style.marginLeft 	= document.body.clientWidth * 0.05 + "px";
	slider.style.marginTop 		= "15px"; 

	slider.id 			= 'input';
	slider.type 			= 'range';
	slider.min 			= '50';
	slider.max 			= '2000';
	slider.value 			= '1500';
	    
	var pre 			= document.createElement('pre');   
	pre.style.width			="30px";
	pre.style.marginLeft 		= document.body.clientWidth / 2 - parseInt(pre.style.width, 10) / 2 + "px";
        pre.innerHTML 			= slider.value; // Display the default slider value
 	// Update the current slider value (each time you drag the slider handle)
	slider.oninput 			= function() {pre.innerHTML = this.value}

        var pr  			= document.createElement('pre');
        pr.innerHTML 			= 'speed: 50 - 2000' + '\n' + ' default = 1500';
        pr.style.width			= "130px";
        pr.style.marginLeft 		= document.body.clientWidth / 2 - parseInt(pr.style.width, 10) / 2  + "px"; 

	var button 			= document.createElement('button');
	button.style.width      	="50px";
        button.style.marginLeft 	= document.body.clientWidth / 2 - parseInt( button.style.width, 10) / 2  + "px"; 

	var a 				= document.createElement('a');
	a.href 				= "index.html";
	a.innerHTML 			= "Home";
	button.appendChild(a);
	
	document.body.appendChild(slider);
	document.body.appendChild(pre);
	document.body.appendChild(pr);	
	document.body.appendChild(button);
	    
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }
    
/*
random height:
	canvas.width  / 2 means the left half of the width, then * Math.random() (which is between 0 and 1), so min = 0, max = canvas.width / 2
	canvas.height / 4 means the upper quarter of the height, then * Math.random() (which is between 0 and 1), so min = 0, max = canvas.height / 4
*/
    createWorld() 
    {
        this.gameObjects = 
        [     
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 10, Math.random() * 10 ,  Math.random() * 10 ),

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 20, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 20, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 20, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 20, Math.random() * 10 ,  Math.random() * 10 ),
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 20, Math.random() * 10 ,  Math.random() * 10 ),

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 40, Math.random() * 10 ,  Math.random() * 10 ),            
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 40, Math.random() * 10 ,  Math.random() * 10 ),            
            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 40, Math.random() * 10 ,  Math.random() * 10 ),            

            new Circle(this.context, Math.random() * canvas.width / 2,  Math.random() * canvas.height / 4, 60, Math.random() * 10 ,  Math.random() * 10 )
        ];
    }
    
    gameLoop(timeStamp) 
    {
    	var speed      = 1500;
    	var speedValue = 2050 - document.getElementById('input').value;
        
        if (speedValue > 49 && speedValue < 2001)
        {
        	speed 	   = speedValue;
        }
        else
        {
        	speed 	   = speed;
        }
        // Calculate how much time has passed
        var secondsPassed = (timeStamp - this.oldTimeStamp) / speed;
        this.oldTimeStamp = timeStamp;
        
        // Loop over all game objects to update
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].update(secondsPassed);
        }
        this.detectCollisions();
        this.clearCanvas();
        
		// Loop over all game objects to draw
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].draw();
        }
        
        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }
	
    detectCollisions() 
    {	
        var obj1;
        var obj2;
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].isColliding = false;
        }
        for (var i = 0; i < this.gameObjects.length; i++)
        {
            obj1 = this.gameObjects[i];
            // Check for left and right
         	if (obj1.x < obj1.radius)
         	{
            	obj1.vx = Math.abs(obj1.vx) * restitution;
             	obj1.x = obj1.radius;
         	} 
         	else if (obj1.x > canvas.width - obj1.radius)
         	{
             	obj1.vx = -Math.abs(obj1.vx) * restitution;
             	obj1.x = canvas.width - obj1.radius;
         	}

         	// Check for bottom and top
         	// bottom (restitution (more energy absorption) bigger than top hence ' * restitution * restitution')
         	if (obj1.y < obj1.radius)
         	{
             	obj1.vy = Math.abs(obj1.vy) * restitution;
             	obj1.y = obj1.radius;
         	} 
         	else if (obj1.y > canvas.height - obj1.radius)
         	{
         		//obj1.vy = -Math.abs(obj1.vy) * restitution;
             	obj1.vy = -Math.abs(obj1.vy) * restitution * restitution;
             	obj1.y = canvas.height - obj1.radius;
        	}
            for (var j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];

                if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) 
                {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    var vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    var distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    var vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                    var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
	//				speed *= Math.min(obj1.restitution, obj2.restitution);
					
                    if (speed < 0) 
                    {
                        break;
                    }

                    var impulse = 2 * speed / (obj1.mass + obj2.mass);
                    
                    /*
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                    */
                    
                    function imp() 
                    {
                    	obj1.vx -= ((impulse * obj2.mass * vCollisionNorm.x)/10);
                    	obj1.vy -= ((impulse * obj2.mass * vCollisionNorm.y)/10);
                    	obj2.vx += ((impulse * obj1.mass * vCollisionNorm.x)/10);
                    	obj2.vy += ((impulse * obj1.mass * vCollisionNorm.y)/10);
                    }
                    imp();imp();imp();imp();imp();imp();imp();imp();imp();imp();
    
                }
            }
        }
    }

    circleIntersect(x1, y1, r1, x2, y2, r2) 
    {

    // Calculate the distance between the two circles
    let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= ((r1 + r2) * (r1 + r2))
    }

    clearCanvas() 
    {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }
}
