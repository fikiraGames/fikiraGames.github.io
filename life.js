// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/develop-a-html5-javascript-game

var maxAge  	= 1000;
var grownUp 	=  400;
var maxChildren =    3;
var maxCircles  = 1000;
var counter     =    0;
var parts 	=   20;
var total 	= parts * parts;
var maxCirc	= 20000;
var maxPP 	= Math.ceil(maxCirc / total);
// maxPP = max Circles Per Part

function getRandomInt(minInt, maxInt) 
{
// Get an integer within a range
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};
// returns numbers between a min- and max value. This time, the results will include both the min and the max.

function getRandomBoolean() 
{
  return getRandomInt(0, 1) > 0;
};	
		
class GameObject
{
    constructor (context, x, y, vx, vy, mass, age, children, virus, dirX, dirY)
    {
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mass = mass;
        this.age = age;
        this.children = children;        
        this.virus = virus;
        this.dirX = dirX;
        this.dirY = dirY;

        this.isColliding = false;
    }
};

const md = 0.5;

class Circle extends GameObject
{
    constructor (context, x, y, radius, vx, vy, mass, age, children, virus, dirX, dirY)
    {
        super(context, x, y, radius, vx, vy, mass, age, children, virus, dirX, dirY);
        //Set default width and height
        this.radius = radius;
        this.volume = (4/3) * Math.PI * this.radius * this.radius * this.radius
        this.mass = this.volume / md;
    };
    
// '#f542f2' = 'rgba(245,66,242)' https://www.color-hex.com/color/ff8080
// '#ff8080' = 'rgba(255,128,128)' https://www.color-hex.com/color/ff8080

    draw()
    {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.context.fillStyle = 
        	this.virus == 1 ? 
        	(
        	    this.age >= maxAge * 0.61 && this.age < maxAge * 0.64 ? 'rgba(245,66,242,0.70)' : 
        		this.age >= maxAge * 0.64 && this.age < maxAge * 0.67 ? 'rgba(245,66,242,0.65)' : 
        		this.age >= maxAge * 0.67 && this.age < maxAge * 0.70 ? 'rgba(245,66,242,0.60)' : 
        		this.age >= maxAge * 0.70 && this.age < maxAge * 0.73 ? 'rgba(245,66,242,0.55)' : 
        		this.age >= maxAge * 0.73 && this.age < maxAge * 0.76 ? 'rgba(245,66,242,0.50)' : 
        		this.age >= maxAge * 0.76 && this.age < maxAge * 0.79 ? 'rgba(245,66,242,0.45)' : 
        		this.age >= maxAge * 0.79 && this.age < maxAge * 0.82 ? 'rgba(245,66,242,0.40)' : 
        		this.age >= maxAge * 0.82 && this.age < maxAge * 0.85 ? 'rgba(245,66,242,0.35)' : 
        		this.age >= maxAge * 0.85 && this.age < maxAge * 0.88 ? 'rgba(245,66,242,0.30)' : 
        		this.age >= maxAge * 0.88 && this.age < maxAge * 0.91 ? 'rgba(245,66,242,0.25)' : 
        		this.age >= maxAge * 0.91 && this.age < maxAge * 0.94 ? 'rgba(245,66,242,0.20)' : 
        		this.age >= maxAge * 0.94 && this.age < maxAge * 0.97 ? 'rgba(245,66,242,0.15)' : 
        		this.age >= maxAge * 0.97 && this.age < maxAge * 1.00 ? 'rgba(245,66,242,0.10)' : 
        	    '#f542f2'
        	) : 
        	this.isColliding ? 
        	(
        	    this.age >= maxAge * 0.61 && this.age < maxAge * 0.64 ? 'rgba(255,128,128,0.70)' : 
        		this.age >= maxAge * 0.64 && this.age < maxAge * 0.67 ? 'rgba(255,128,128,0.65)' : 
        		this.age >= maxAge * 0.67 && this.age < maxAge * 0.70 ? 'rgba(255,128,128,0.60)' : 
        		this.age >= maxAge * 0.70 && this.age < maxAge * 0.73 ? 'rgba(255,128,128,0.55)' : 
        		this.age >= maxAge * 0.73 && this.age < maxAge * 0.76 ? 'rgba(255,128,128,0.50)' : 
        		this.age >= maxAge * 0.76 && this.age < maxAge * 0.79 ? 'rgba(255,128,128,0.45)' : 
        		this.age >= maxAge * 0.79 && this.age < maxAge * 0.82 ? 'rgba(255,128,128,0.40)' : 
        		this.age >= maxAge * 0.82 && this.age < maxAge * 0.85 ? 'rgba(255,128,128,0.35)' : 
        		this.age >= maxAge * 0.85 && this.age < maxAge * 0.88 ? 'rgba(255,128,128,0.30)' : 
        		this.age >= maxAge * 0.88 && this.age < maxAge * 0.91 ? 'rgba(255,128,128,0.25)' : 
        		this.age >= maxAge * 0.91 && this.age < maxAge * 0.94 ? 'rgba(255,128,128,0.20)' : 
        		this.age >= maxAge * 0.94 && this.age < maxAge * 0.97 ? 'rgba(255,128,128,0.15)' : 
        		this.age >= maxAge * 0.97 && this.age < maxAge * 1.00 ? 'rgba(255,128,128,0.10)' : 
        	    '#ff8080'
        	) :
        	this.age < grownUp / 2 ? '#a6f799' : 
        	this.age < grownUp     ? '#99e1f7' : 
        	this.age >= maxAge * 0.61 && this.age < maxAge * 0.64 ? 'rgba(102,102,102,0.65)' : 
        	this.age >= maxAge * 0.64 && this.age < maxAge * 0.67 ? 'rgba(102,102,102,0.60)' : 
        	this.age >= maxAge * 0.67 && this.age < maxAge * 0.70 ? 'rgba(102,102,102,0.55)' : 
        	this.age >= maxAge * 0.70 && this.age < maxAge * 0.73 ? 'rgba(102,102,102,0.50)' : 
        	this.age >= maxAge * 0.73 && this.age < maxAge * 0.76 ? 'rgba(102,102,102,0.45)' : 
        	this.age >= maxAge * 0.76 && this.age < maxAge * 0.79 ? 'rgba(102,102,102,0.40)' : 
        	this.age >= maxAge * 0.79 && this.age < maxAge * 0.82 ? 'rgba(102,102,102,0.35)' : 
        	this.age >= maxAge * 0.82 && this.age < maxAge * 0.85 ? 'rgba(102,102,102,0.30)' : 
        	this.age >= maxAge * 0.85 && this.age < maxAge * 0.88 ? 'rgba(102,102,102,0.25)' : 
        	this.age >= maxAge * 0.88 && this.age < maxAge * 0.91 ? 'rgba(102,102,102,0.20)' : 
        	this.age >= maxAge * 0.91 && this.age < maxAge * 0.94 ? 'rgba(102,102,102,0.15)' : 
        	this.age >= maxAge * 0.94 && this.age < maxAge * 0.97 ? 'rgba(102,102,102,0.10)' : 
        	this.age >= maxAge * 0.97 && this.age < maxAge * 1.00 ? 'rgba(102,102,102,0.05)' : 
        	'#0099b0';
        	
        this.context.fill();  
        this.context.closePath();
    };
  
    // Set gravitational acceleration
	update(secondsPassed){
    	// Apply acceleration
    	//this.vy += secondsPassed;

    	// Move with set velocity
    	this.x += this.vx * secondsPassed;
    	this.y += this.vy * secondsPassed;
    	
    	//this.x = getRandomBoolean() ? this.x + this.vx * secondsPassed : this.x - this.vx * secondsPassed;
    	//this.y = getRandomBoolean() ? this.y + this.vy * secondsPassed : this.y - this.vy * secondsPassed;
    	
    	this.age += 1;
    	this.radius += 0.01
	};
};

class GameWorld 
{

    constructor(canvasId)
    {
        this.canvas 		= null;
        this.context 		= null;
        this.oldTimeStamp 	=    0;
        this.gameObjects 	=   [];
        this.resetCounter 	=    0;

        this.init(canvasId);
    };

    init(canvasId) 
    {

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.canvas = document.getElementById(canvasId);
	// https://www.w3schools.com/js/js_window.asp    
	this.canvas.width  = (window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth ) * 0.900;
        this.canvas.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.825;
        this.context = this.canvas.getContext('2d');
        
 	  	var input1				= document.createElement('input');
	  	var input2				= document.createElement('input');
	  	var input3				= document.createElement('input');
	  	var input4				= document.createElement('input');
	  	var input5				= document.createElement('input');

	  	var button1				= document.createElement('button');
	  	var button2				= document.createElement('button');
	  	var button3				= document.createElement('button');
	  	var button4				= document.createElement('button');
	  	var button5				= document.createElement('button');
		
		addButton(input1, button1, 'input1',  '50', '2000', '1900', 'speed: ')
		button1.style.marginLeft = document.body.clientWidth / 2 - 367 + 'px'; 

		addButton(input2, button2, 'input2',   '1',   '50',    '3',        'max children: ')
		addButton(input3, button3, 'input3',  '10',  '500',  '400', 	      'adult age: ')
		addButton(input4, button4, 'input4', '600', '4000', '1200',             'max age: ')
		addButton(input5, button5, 'input5', '100', '1500',  '350',         'max objects: ')
	    
		collaps('input1'); collaps('input2'); collaps('input3'); collaps('input4'); collaps('input5');

		// Home button
		var button 				= document.createElement('button');
		button.style.width     		 	="120px";
	    	button.style.margin     		= '2px';

		var a 					= document.createElement('a');
	    	a.href 					= "index.html";
		a.innerHTML 				= "Home";
		button.appendChild(a);
	
	    document.body.appendChild(button);
	    
	    function addButton(input, button, id, min, max, val, txt)
	    {
	    	input.id 				=       id;
	    	input.className         		= 'slider';
	    	input.type 			    	=  'range';
	    	input.style.display     		= 'table';
	    	input.min 				=      min;
	    	input.max 				=      max;
	    	input.value 				=      val;
	    	
	    	input.style.width 		= document.body.clientWidth * 0.80 + "px";
	        input.style.marginLeft  = document.body.clientWidth * 0.10 + "px";
		    input.style.marginTop 	= "15px";
	    
	    	button.className 		= 'collapsible';
	    	button.style.width		= '120px';
	    	button.style.margin     	= '2px';
     		button.innerHTML 		= txt + input.value;
			input.oninput 		    = function() {button.innerHTML = txt + this.value}

			document.body.appendChild(button);
	    	document.body.appendChild(input);
	    	input.style.display	    =   'none';
	    };

	    function collaps(id) 
		{
			var coll = document.getElementsByClassName("collapsible");
			var i;

			for (i = 0; i < coll.length; i++) 
			{
  				coll[i].addEventListener("click", function() 
  				{
    				this.classList.toggle("active");
    				var content = document.getElementById(id);

    				if (content.style.display === "block") 
    				{
      					content.style.display = "none";
      					button1.style.marginLeft = document.body.clientWidth / 2 - 367 + 'px'; 
    				} 
    				else 
    				{
     					content.style.display = "block";
     				    button1.style.marginLeft = '0px'; 
    				}
  				});
			}
		};
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    };
    
/*
random height:
	canvas.width  / 2 means the left half of the width, then * Math.random() (which is between 0 and 1), so min = 0, max = canvas.width / 2
	canvas.height / 4 means the upper quarter of the height, then * Math.random() (which is between 0 and 1), so min = 0, max = canvas.height / 4
*/
    createWorld() 
    {
        this.gameObjects = 
        [     
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0),
            new Circle(this.context, Math.random() * canvas.width,  Math.random() * canvas.height, 7,  Math.random() * 10,  Math.random() * 10, getRandomInt(0, 100), 0, 0)	
        ]
    };
    
    gameLoop(timeStamp) 
    {
    	
    	var speed      = 2000;
    	var speedValue = 2010 - document.getElementById('input1').value;
        
        if (speedValue > 9 && speedValue < 2001)
        {
        	speed 	   = speedValue;
        }
        else
        {
        	speed 	   = speed;
        }
        
		maxChildren = input2.value;
		grownUp 	= input3.value;
		maxAge 		= input4.value;
		maxCircles 	= input5.value;

        // Calculate how much time has passed
        var secondsPassed = (timeStamp - this.oldTimeStamp) / speed;
        this.oldTimeStamp = timeStamp;
        
        // Loop over all game objects to update
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].update(secondsPassed);
        };
        
        this.cleanUp();
        //this.eliminate();
        this.detectCollisions();
        this.clearCanvas();
        console.log('gameObjects = ' + this.gameObjects.length);

		// Loop over all game objects to draw
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].draw();
        };
        
        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    };
	
	cleanUp()
	{		
	    for (var i = 0; i < this.gameObjects.length; i++) 
		{
			var obj  = this.gameObjects[i];
			var obj1 = this.gameObjects[0];
			var obj2 = this.gameObjects[1];
			var obj3 = this.gameObjects[this.gameObjects.length - 1];

			if (obj.age >= maxAge)
			{
				this.gameObjects.splice(i, i);
				this.gameObjects.shift();
       		};
       		if (this.gameObjects.length < 4)
        	{
                this.gameObjects.push(new Circle(this.context, obj1.x + obj1.radius, obj1.y + obj1.radius,  obj1.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
        		this.gameObjects.push(new Circle(this.context, obj1.x + obj1.radius, obj1.y + obj1.radius,  obj1.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
                this.gameObjects.push(new Circle(this.context, obj1.x + obj1.radius, obj1.y + obj1.radius,  obj1.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
                
                this.gameObjects.push(new Circle(this.context, obj2.x + obj2.radius, obj2.y + obj2.radius,  obj2.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
        		this.gameObjects.push(new Circle(this.context, obj2.x + obj2.radius, obj2.y + obj2.radius,  obj2.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
                this.gameObjects.push(new Circle(this.context, obj2.x + obj2.radius, obj2.y + obj2.radius,  obj2.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
                
                this.gameObjects.push(new Circle(this.context, obj3.x + obj3.radius, obj3.y + obj3.radius,  obj3.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
        		this.gameObjects.push(new Circle(this.context, obj3.x + obj3.radius, obj3.y + obj3.radius,  obj3.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
                this.gameObjects.push(new Circle(this.context, obj3.x + obj3.radius, obj3.y + obj3.radius,  obj3.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
        	};
			
       	};
    };  
	/*
    eliminate()
    {
    	counter = 0;
		for (var j = 0; j <= parts; j++)
		{
    		for(var k = 0; k <= parts; k++)
    		{
        		for(var l = 0; l < this.gameObjects.length; l++)
         		{
             		if(this.gameObjects[l].x > j * canvas.width /parts && this.gameObjects[l].x <= (j+1) * canvas.width /parts 
             		&& this.gameObjects[l].y > k * canvas.height/parts && this.gameObjects[l].y <= (k+1) * canvas.height/parts)
              		{
                  		counter += 1;
                  		console.log('counter = ' + counter);
                   		if (counter > maxPP)
                   		{
                  			this.gameObjects.splice(l, l);
                  			this.gameObjects.shift();
                  			console.log('counter = ' + counter);
                  			//counter = 0;
              			}
              		}
            	}
    		}
		}
	};
	*/	
    detectCollisions() 
    {	
        var obj1;
        var obj2;
        for (var i = 0; i < this.gameObjects.length; i++) 
        {
            this.gameObjects[i].isColliding = false;
            /*
       	 	if (this.gameObjects.length > maxCircles)
        	{
        		this.gameObjects.splice(0, this.gameObjects.length / 3);
        	}
        	*/
        }
        for (var i = 0; i < this.gameObjects.length; i++)
        {
            obj1 = this.gameObjects[i];
            
            // Check for left and right
         	if (obj1.x < obj1.radius)
         	{
            	obj1.vx = Math.abs(obj1.vx);
             	obj1.x = obj1.radius;
         	} 
         	else if (obj1.x > canvas.width - obj1.radius)
         	{
             	obj1.vx = -Math.abs(obj1.vx);
             	obj1.x = canvas.width - obj1.radius;
         	}

         	// Check for bottom and top
         	if (obj1.y < obj1.radius)
         	{
             	obj1.vy = Math.abs(obj1.vy);
             	obj1.y = obj1.radius;
         	} 
         	else if (obj1.y > canvas.height - obj1.radius)
         	{
             	obj1.vy = -Math.abs(obj1.vy);
             	obj1.y = canvas.height - obj1.radius;
        	}
            for (var j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];

                if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) 
                {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
					            
                    if (obj2.age > grownUp && obj2.children < maxChildren)
                    {
                    	this.gameObjects.push(new Circle(this.context, obj2.x + obj2.radius, obj2.y + obj2.radius,  obj2.radius / 2, Math.random() * 10 ,  Math.random() * 10, 0, 0, 0));
						obj2.children += 1;
                    }
                    if (this.gameObjects.length > maxCircles)
        			{
						obj2.virus = 1;
						obj2.children = maxChildren;
						//obj1.children = maxChildren;
						obj2.age = Math.min(maxAge * getRandomInt(5, 9) / 10, obj2.age * getRandomInt(15, 17) / 10);
        			}
					obj1.x -= Math.random() * 5;
                    obj1.y -= Math.random() * 5;
                    obj2.x += Math.random() * 5;
                    obj2.y += Math.random() * 5;
                    } 
            }
        	//console.log(this.gameObjects.length)
        }
   
    };

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
        
    };
};
