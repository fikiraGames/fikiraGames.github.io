"use strict";

//--------------------------------------------|-----------|-----|
//											  |	          |     |
//											  |w8         |     | 											             
//    |---------------------------------------|           |     |
//    |							w5			  - - - - - - |     |
//    |													  |     |
//    |                             		     		  |     |
//    |                                					  |     |
//    |            . --------------------------------------     |
//	  |       						   			w4		  |     |
//	  | 												  |     |
//	  |													  |	    |
//    |													  |		|
//	  |	  						w3	   		              |     |
//    |------------------------------------- .     		  |     |
//	  |				                    randomX2   		  |w7   |
//	  |													  |	    |
//	  |													  |	    |
//	  |							   		                  |     |
//    |                   w2 ------------------------------     |
//	  |w6	     									      | 	|
//	  |													  |		|
//	  |													  |		|
//	  |					                  w1      O <- x,y,ballRadius    
//    -----------------------------------------------------     |
//																|
//---------------------------------------------------------------

//--------------------------------------------|-----------|-----|
//											  |	          |     |
//											  |w8	      |     | 											             
//    |---------------------------------------|           |     |
//    |							w5			  - - - - - - |     |
//    |			        r12.			 r15.			  |     |
//    |													  |     |
//    |                                					  |     |
//    |         r11.            r10.             r14.      |     |
//	  |       						   					  |     |
//	  | 												  |     |
//	  |  r9.		     r8.			  r13.			  |	    |
//    |					                                  |     |
//    |								                      |		|
//	  |	  	     r7.		        r6.	       w10        |     |
//    |              -------------------------------------|     |
//	  |				                          		      |w7   |
//	  |													  |	    |
//	  |													  |	    |
//	  |							  w9 		              |     |
//    |-------------------------------------              |     |
//	  |w6	     									      | 	|
//	  |													  |		|
//	  |													  |		|
//	  |					                  w1      O <- x,y,ballRadius    
//    -----------------------------------------------------     |
//																|
//---------------------------------------------------------------


// https://stackoverflow.com/questions/38634654/why-does-the-clientx-and-y-change-on-scroll
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
// https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
 
// ------------------------------------------------------------------------------------------------------------------------ //
//     											         CANVAS												                //
// ------------------------------------------------------------------------------------------------------------------------ //
 
var canvas     = document.getElementById("myCanvas");
var ctx        = canvas.getContext("2d")            ;

canvas.width   = 800           					    ;
canvas.height  = 800            				    ;

var canvasW    = canvas.width		                ;
var canvasH    = canvas.height		                ;

var windowW    = window.innerWidth                  ;
var offset     = (windowW - canvasW) / 2            ;  

canvas.addEventListener("touchstart",  function(event) {event.preventDefault()})
canvas.addEventListener("touchmove",   function(event) {event.preventDefault()})
     
// ------------------------------------------------------------------------------------------------------------------------ //
//     											        VARIABLES												            //
// ------------------------------------------------------------------------------------------------------------------------ //

// circles

var i          =                0	 	 ;
var ballRadius = canvasW     *  0.08  	 ;
var ballr3     = (ballRadius /  3)		 ;

var blRdRandom = ballRadius  /  6.4	 	 ;
var spinRadius = ballRadius  *  9.4	 	 ;
var spinRad2   = ballRadius  *  9.8	 	 ;
var spinRad3   = ballRadius  * 12.5	 	 ;

var spinRSmall = ballRadius  *  6.5	 	 ;
var spinR1     = ballRadius  /  6  	 	 ;

var xBounce    = ballRadius  /  4	 	 ;
var yBounce    = ballRadius  /  4     	 ;

var x          = canvasW    /  2   	 	 ; 
var y          = canvasH - 2*ballRadius - 1;

//var x          = canvasW     -  160   	 ; 
//var y          = ballRadius  *  1        ;

var a = 2 * (Math.sqrt( Math.pow( (ballRadius + spinR1) * 1.03, 2) / 2));

// random ball x
// level 1
var randomX2  = ballRadius *  3.5; var randomY2  = ballRadius *   9.0;
var randomX3  = ballRadius *  9.0; var randomY3  = ballRadius *   6.5;
var randomX4  = ballRadius *  9.0; var randomY4  = ballRadius *   1.5;
var randomX5  = ballRadius *  3.5; var randomY5  = ballRadius *   4.0;

// level 2
var randomX6  = 4.3*a  ; var randomY6  = 3.9*a ;
var randomX7  = 2.3*a  ; var randomY7  = 3.9*a ;
var randomX8  = 3.3*a  ; var randomY8  = 2.9*a ;
var randomX9  = 1.3*a  ; var randomY9  = 2.9*a ;
var randomX10 = 4.3*a  ; var randomY10 = 1.9*a ;
var randomX11 = 2.3*a  ; var randomY11 = 1.9*a ;
var randomX12 = 3.3*a  ; var randomY12 = 0.9*a ;

var randomX13 = 5.3*a  ; var randomY13 = 2.9*a ;
var randomX14 = 6.3*a  ; var randomY14 = 1.9*a ;
var randomX15 = 5.3*a  ; var randomY15 = 0.9*a ;

// level 3
var partSpinR = spinRadius / 5;

var sX0 	  = partSpinR * 0;
var sX1 	  = partSpinR * 1;
var sX2 	  = partSpinR * 2;
var sX3 	  = partSpinR * 3;
var sX4 	  = partSpinR * 4;
var sX5 	  = partSpinR * 5;

var sX6 	  = spinRad2     ;

var partSpinS = spinRSmall / 4;

var sYa 	  = partSpinS  * 4; 
var sYb 	  = partSpinS  * 3; // reset x
var sYc 	  = partSpinS  * 2;
var sYd 	  = partSpinS  * 1;
var sYe 	  = partSpinS  * 0;

var sYf 	  = spinRad3      ;

// reset ball x
// level 1
var resetX1   = ballRadius * 1.5;
var resetY1   = ballRadius * 7.5;
// level 2
var resetX2   = 1.3 * a; 
var resetY2   = 4.9 * a;
var resetX3   = 1.3 * a; 
var resetY3   = 0.9 * a;

// level 3
var resetX4   = 1.3 * a; 
var resetY4   = 5.4 * a;
var resetX5   = 1.3 * a; 
var resetY5   = 0.9 * a;

// walls
// height (horizontal), width (vert)
var h         = ballRadius /15 ;
// horizontal
// level 1 & 2
var a1 = ballRadius *  1.0     ; var b1 = canvasH -  1.0*ballRadius; var w1 = canvasW - 2   *ballRadius;
var a5 = ballRadius *  1.0     ; var b5 = canvasH - 11.5*ballRadius; var w5 = canvasW - 5   *ballRadius;
// level 1
var a2 = ballRadius *  4.0     ; var b2 = canvasH -  3.5*ballRadius; var w2 = canvasW - 5   *ballRadius;
var a3 = ballRadius *  1.0     ; var b3 = canvasH -  6.0*ballRadius; var w3 = canvasW - 5   *ballRadius;
var a4 = ballRadius *  4.0     ; var b4 = canvasH -  8.5*ballRadius; var w4 = canvasW - 5   *ballRadius;
// level 2
var a9 = ballRadius *  1.0     ; var b9 = canvasH -  3.2*ballRadius; var w9 = canvasW - 5   *ballRadius;
var a10= ballRadius *  4.2     ; var b10= canvasH -  5.5*ballRadius; var w10= canvasW - 5.15*ballRadius;
// level 3
var a11= ballRadius *  0.7     ; var b11= canvasH -  0.7*ballRadius; var w11= canvasW - 1.5 *ballRadius;
var a12= ballRadius *  0.7     ; var b12= canvasH - 11.8*ballRadius; var w12= canvasW - 4.4 *ballRadius;

// vertical
// level 1 & 2
var a6 = ballRadius *  1.0     ; var b6 = ballRadius *  1.0        ; var w6 = canvasH - 2*ballRadius   ;
var a7 = canvasW - ballRadius  ; var b7 = ballRadius *  0.0        ; var w7 = canvasH - 1*ballRadius   ;
var a8 = canvasW - 4*ballRadius; var b8 = ballRadius *  0.0        ; var w8 = ballRadius * 1.9         ;
// level 3
var a13= ballRadius *  8.8     ; var b13= ballRadius *  0.0        ; var w13= ballRadius * 0.75        ;

var px         = ballRadius * 0.03;
var py         = ballRadius * 0.03;

var xBounce    = ballRadius *  0.3;
var yBounce    = ballRadius *  0.3;
var wBounce    = ballRadius *  0.6;
var hardBounce = ballRadius *  1.2;

// level
var level      = 1;
// level text
var xText      = canvasW / 2 - ballRadius / 1.25;
var yText      = canvasH - ballRadius / 3;

// ------------------------------------------------------------------------------------------------------------------------ //
//     											    	FUNCTIONS												            //
// ------------------------------------------------------------------------------------------------------------------------ //

function drawRect(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
function drawBall(x, y, ballRadius, z, color) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, z, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
function wall(a, b, w, h, ballRadius, wBounce) {
  if (x >= a && x <= a+w && y <= b+h+ballRadius && y >= b+h) {y += wBounce;}  // egdeWall1B
  if (x >= a && x <= a+w && y >= b-ballRadius   && y <= b  ) {y -= wBounce;}  // egdeWall1T
  if (y >= b && y <= b+h && x >= a-ballRadius   && x <= a  ) {x -= wBounce;}  // egdeWall1L
  if (y >= b && y <= b+h && x <= a+w+ballRadius && x >= a+w) {x += wBounce;}  // egdeWall1R
  for ( i = 0; i < ballRadius; i++) {
    var j = Math.sqrt(Math.pow(ballRadius, 2) - Math.pow(i, 2));
    if (x < a   && x >= a-i   && y > b+h && y <= b+h+j) {y += wBounce; x -= wBounce;} // egdeWall1BL
    if (x > a+w && x <= a+w+i && y > b+h && y <= b+h+j) {y += wBounce; x += wBounce;} // egdeWall1BR
    if (x < a   && x >= a-i   && y < b   && y >= b-j  ) {y -= wBounce; x -= wBounce;} // egdeWall1TL
    if (x > a+w && x <= a+w+i && y < b   && y >= b-j  ) {y -= wBounce; x += wBounce;} // egdeWall1TR
  }
};
function drawBallTxt(x, y, xT, yT, ballRadius, z, font, text, color) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, z, Math.PI*2);
  ctx.font = font;
  ctx.strokeText(text, xT, yT);
  ctx.fillStyle = color;
  ctx.stroke();
  ctx.closePath();
};
// arrow (https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag)
function drawArrow(p1, p2, size) {
  var angle = Math.atan2((p2.y - p1.y) , (p2.x - p1.x));
  var hyp = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));

  ctx.save();
  ctx.translate(p1.x, p1.y);
  ctx.rotate(angle);

  // line
  ctx.beginPath();	
  ctx.moveTo(0, 0);
  ctx.lineTo(hyp - size, 0);
  ctx.stroke();

  // triangle
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.lineTo(hyp - size, size);
  ctx.lineTo(hyp, 0);
  ctx.lineTo(hyp - size, -size);
  ctx.fill();

  ctx.restore();
};
// level (https://www.w3schools.com/graphics/canvas_text.asp)
function drawText(x, y, font, text) {
  ctx.font = font;
  ctx.strokeText(text, x, y);
};

function edges() {
  var xEdgeL =  x - ballRadius <= 0      ;
  var xEdgeR =  x + ballRadius >= canvasW;
  var yEdgeT =  y - ballRadius <= 0      ;
  var yEdgeB =  y + ballRadius >= canvasH;	
  if      (xEdgeL) {x += xBounce;}
  else if (xEdgeR) {x -= xBounce;}
  else if (yEdgeT) {y += yBounce;}
  else if (yEdgeB) {y -= yBounce;}
};	

function circleIntersect(x1, y1, r1, x2, y2, r2) {
    // Calculate the distance between the two circles
  let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    // When the distance is smaller or equal to the sum of the two radius, the circles touch or overlap
  return squareDistance <= ((r1 + r2) * (r1 + r2))
};

function nextLevel(xIsMoreThan, xIsLessThan, yIsLessThan, textAlert, xTo, yTo, newLevel, newPosX, newPosY) {
  if (x > xIsMoreThan && x < xIsLessThan && y < yIsLessThan) {
    alert(textAlert)
    x    += xTo	    ;
    y    += yTo	    ;
    level = newLevel;
    x     = newPosX	; 
    y     = newPosY ;
  };
};  

// ------------------------------------------------------------------------------------------------------------------------ //
//     											    	FIRST IMAGE												            //
// ------------------------------------------------------------------------------------------------------------------------ //

if (level == 1) {
  // level (https://www.w3schools.com/graphics/canvas_text.asp)
  drawText(xText, yText, "30px Arial", "LEVEL 1");
  // next level 
  drawBallTxt(canvasW - 2.4*ballRadius, 1.05*ballRadius, canvasW - 3.3*ballRadius, 1.25*ballRadius, ballRadius, 0, "30px Arial", "LEVEL 2", '#cf0c0c')
  // arrow 
  drawArrow({x: canvasW - 2.4*ballRadius, y: 2.5*ballRadius}, {x: canvasW - 2.4*ballRadius, y: 1.5*ballRadius}, 10);
  // draw
  // circles
  drawBall(       x ,        y ,  ballRadius,  0, '#cf0c0c');
  
  drawBall(randomX2 , randomY2 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX3 , randomY3 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX4 , randomY4 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX5 , randomY5 ,  blRdRandom,  0, '#9219c2');
  //reset ball
  drawBall(resetX1  , resetY1  ,  blRdRandom,  0, '#abf5f5');
  // walls
  // horizontal walls
  drawRect(a1, b1, w1,  h , '#FFFF00');
  drawRect(a2, b2, w2,  h , '#FFFF00');
  drawRect(a3, b3, w3,  h , '#FFFF00');
  drawRect(a4, b4, w4,  h , '#FFFF00');
  drawRect(a5, b5, w5,  h , '#db0909');
  // vertical walls
  drawRect(a6, b6, h ,  w6, '#FFFF00');
  drawRect(a7, b7, h ,  w7, '#FFFF00');
  drawRect(a8, b8, h ,  w8, '#db0909');
  // end game box
  drawRect(23*ballRadius, 2*ballRadius, 3*ballRadius,            h, '#FFFF00');
  drawRect(23*ballRadius, 	        0,            h, 2*ballRadius, '#FFFF00');
};

if (level == 2) {
  // level 
  drawText(xText, yText, "30px Arial", "LEVEL 2");
  // next level 
  drawBallTxt(canvasW - 2.4*ballRadius, 1.05*ballRadius, canvasW - 3.3*ballRadius, 1.25*ballRadius, ballRadius, 0, "30px Arial", "LEVEL 3", '#cf0c0c')
  // arrow 
  drawArrow({x: canvasW - 2.4*ballRadius, y: 2.5*ballRadius}, {x: canvasW - 2.4*ballRadius, y: 1.5*ballRadius}, 10);
  // draw
  // circles
  drawBall(       x ,        y ,  ballRadius,  0, '#cf0c0c');
  
  drawBall(randomX6 , randomY6 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX7 , randomY7 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX8 , randomY8 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX9 , randomY9 ,  blRdRandom,  0, '#9219c2');
  drawBall(randomX10, randomY10,  blRdRandom,  0, '#9219c2');
  drawBall(randomX11, randomY11,  blRdRandom,  0, '#9219c2');
  drawBall(randomX12, randomY12,  blRdRandom,  0, '#9219c2');

  drawBall(randomX13, randomY13,  blRdRandom,  0, '#F325F0');
  drawBall(randomX14, randomY14,  blRdRandom,  0, '#F325F0');
  drawBall(randomX15, randomY15,  blRdRandom,  0, '#F325F0');

  //reset ball
  drawBall(resetX2  , resetY2  ,  blRdRandom,  0, '#abf5f5');  
  drawBall(resetX3  , resetY3  ,  blRdRandom,  0, '#abf5f5');

  // walls
  // horizontal walls
  drawRect(a1 , b1 , w1 ,  h , '#FFFF00');
  drawRect(a5 , b5 , w5 ,  h , '#db0909');
  drawRect(a9 , b9 , w9 ,  h , '#FFFF00');
  drawRect(a10, b10, w10,  h , '#FFFF00');
  // vertical walls
  drawRect(a6 , b6 , h  ,  w6, '#FFFF00');
  drawRect(a7 , b7 , h  ,  w7, '#FFFF00');
  drawRect(a8 , b8 , h  ,  w8, '#db0909');
};

if (level == 3) {
  var x          = canvasW    - 200   	 	 ; 
  var y          = canvasH - 1.7*ballRadius - 1;
  // level 
  drawText(xText, yText + 9, "30px Arial", "LEVEL 3");
  // next level 
  drawBallTxt(canvasW - 2.4*ballRadius, 1.05*ballRadius, canvasW - 3.05*ballRadius, 1.25*ballRadius, ballRadius, 0, "30px Arial", "FINAL", '#cf0c0c')
  // arrow 
  drawArrow({x: canvasW - 2.4*ballRadius, y: 2.5*ballRadius}, {x: canvasW - 2.4*ballRadius, y: 1.5*ballRadius}, 10);
  // draw
  // circles
  drawBall(       x ,        y ,  ballRadius,  0, '#cf0c0c');
  // moving circles
  drawBall(canvasW - sX0, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX0, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX1, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX2, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX3, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX4, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX5, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2)), spinR1, 0, '#9219c2');

  drawBall(canvasW - sX6, canvasW - Math.sqrt(Math.pow(spinRad2  , 2) - Math.pow(sX6, 2)), spinR1, 0, '#9219c2');

  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2)), canvasW - sYa, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2)), canvasW - sYb, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2)), canvasW - sYc, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYd, 2)), canvasW - sYd, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYe, 2)), canvasW - sYe, spinR1, 0, '#9219c2');

  drawBall(canvasW - Math.sqrt(Math.pow(spinRad3  , 2) - Math.pow(sYf, 2)), canvasW - sYf, spinR1, 0, '#9219c2');

  //reset ball
  drawBall(resetX4  , resetY4  ,  blRdRandom,  0, '#abf5f5');  
  drawBall(resetX5  , resetY5  ,  blRdRandom,  0, '#abf5f5');

  // walls
  // horizontal walls
  drawRect(a11, b11, w11,  h  , '#FFFF00');
  drawRect(a12, b12, w12,  h  , '#db0909');
  // vertical walls
  drawRect(a13, b13, h  ,  w13, '#db0909');
};


// ------------------------------------------------------------------------------------------------------------------------ //
//     											          LEVEL 1												            //
// ------------------------------------------------------------------------------------------------------------------------ //

function paint1(event) {
  ctx.clearRect(0, 0, canvasW, canvasH)       ;
  var cX     = event.touches[0].pageX - offset; 
  var cY     = event.touches[0].pageY         ;

  wall(a1, b1, w1, h , ballRadius, wBounce)   ;
  wall(a2, b2, w2, h , ballRadius, wBounce)	  ;
  wall(a3, b3, w3, h , ballRadius, wBounce)	  ;
  wall(a4, b4, w4, h , ballRadius, wBounce)	  ;
  wall(a5, b5, w5, h , ballRadius, hardBounce);

  wall(a6, b6, h , w6, ballRadius, wBounce)	  ;
  wall(a7, b7, h , w7, ballRadius, wBounce)	  ;
  wall(a8, b8, h , w8, ballRadius, hardBounce);

  var rdm    = Math.round(Math.random() * 10) ;
  var rdm2   = Math.round(Math.random() * 10) ;
  var random = rdm * 5						  ;

  var inter2 = circleIntersect(x, y, ballRadius, randomX2 , randomY2 , blRdRandom);
  var inter3 = circleIntersect(x, y, ballRadius, randomX3 , randomY3 , blRdRandom);
  var inter4 = circleIntersect(x, y, ballRadius, randomX4 , randomY4 , blRdRandom);
  var inter5 = circleIntersect(x, y, ballRadius, randomX5 , randomY5 , blRdRandom);

  var inRes1 = circleIntersect(x, y, ballRadius, resetX1  , resetY1  , blRdRandom);
  // bounce edges
  edges();
  // random bounce
  if (inter2 || inter3 || inter4 || inter5) 
  {rdm < 5 ? x += random : x -= random; rdm2 < 5 ? y += random : y -= random;}
  // reset
  if (inRes1) 
  {x = canvasW    /  2; y = canvasH - 2*ballRadius - 1;}
  
  else {
      var  i;
      for (i = 0; i < ballRadius; i++) {
        var j = Math.round(Math.sqrt(Math.pow(ballRadius, 2) - Math.pow(i, 2)));
        if        (cX > x-i && cX < x) {
          if      (cY > y-j && cY < y) {x += i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x += i/ballr3; y -= j/ballr3;}
        }
        else if   (cX < x+i && cX > x) {
          if      (cY > y-j && cY < y) {x -= i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x -= i/ballr3; y -= j/ballr3;}
        }
      }
  };
  // level
  drawText(xText, yText, "30px Arial", "LEVEL 1");
  // arrow (https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag)
  drawArrow({x: canvasW - 2.4*ballRadius, y: 2.5*ballRadius}, {x: canvasW - 2.4*ballRadius, y: 1.5*ballRadius}, 10);
  // next level
  drawBallTxt(canvasW - 2.4*ballRadius, 1.05*ballRadius, canvasW - 3.3*ballRadius, 1.25*ballRadius, ballRadius, 0, "30px Arial", "LEVEL 2", '#cf0c0c')
  // draw
  // circles
  drawBall(       x,        y,  ballRadius,  0, '#cf0c0c');
  
  drawBall(randomX2, randomY2,  blRdRandom,  0, '#9219c2');
  drawBall(randomX3, randomY3,  blRdRandom,  0, '#9219c2');
  drawBall(randomX4, randomY4,  blRdRandom,  0, '#9219c2');
  drawBall(randomX5, randomY5,  blRdRandom,  0, '#9219c2');
  //reset ball
  drawBall(resetX1 , resetY1 ,  blRdRandom,  0, '#abf5f5');
  // horizontal walls
  drawRect(      a1,       b1,          w1,  h, '#FFFF00');
  drawRect(      a2,       b2,          w2,  h, '#FFFF00');
  drawRect(      a3,       b3,          w3,  h, '#FFFF00');
  drawRect(      a4,       b4,          w4,  h, '#FFFF00');
  drawRect(      a5,       b5,          w5,  h, '#db0909');
  // vertical walls
  drawRect(      a6,       b6,           h, w6, '#FFFF00');
  drawRect(      a7,       b7,           h, w7, '#FFFF00');
  drawRect(      a8,       b8,           h, w8, '#db0909');
  // end game box
  drawRect(23*ballRadius, 2*ballRadius, 3*ballRadius,            h, '#FFFF00');
  drawRect(23*ballRadius,            0,            h, 2*ballRadius, '#FFFF00');
};

// ------------------------------------------------------------------------------------------------------------------------ //
//     											          LEVEL 2												            //
// ------------------------------------------------------------------------------------------------------------------------ //
 
function paint2(event) {
  ctx.clearRect(0, 0, canvasW, canvasH)          ;
  var cX     = event.touches[0].pageX - offset   ; 
  var cY     = event.touches[0].pageY		     ;
  
  wall(a1 , b1 , w1 , h , ballRadius, wBounce)   ;
  wall(a5 , b5 , w5 , h , ballRadius, hardBounce);
  wall(a9 , b9 , w9 , h , ballRadius, wBounce)	 ;
  wall(a10, b10, w10, h , ballRadius, wBounce)	 ;

  wall(a6 , b6 , h , w6 , ballRadius, wBounce)	 ;
  wall(a7 , b7 , h , w7 , ballRadius, wBounce)	 ;
  wall(a8 , b8 , h , w8 , ballRadius, hardBounce);

  var rdm     = Math.round(Math.random() * 10)	 ;
  var rdm2    = Math.round(Math.random() * 10)	 ;
  var random  = rdm * 5							 ;

  var inter6  = circleIntersect(x, y, ballRadius, randomX6 , randomY6 , blRdRandom);
  var inter7  = circleIntersect(x, y, ballRadius, randomX7 , randomY7 , blRdRandom);
  var inter8  = circleIntersect(x, y, ballRadius, randomX8 , randomY8 , blRdRandom);
  var inter9  = circleIntersect(x, y, ballRadius, randomX9 , randomY9 , blRdRandom);
  var inter10 = circleIntersect(x, y, ballRadius, randomX10, randomY10, blRdRandom);
  var inter11 = circleIntersect(x, y, ballRadius, randomX11, randomY11, blRdRandom);
  var inter12 = circleIntersect(x, y, ballRadius, randomX12, randomY12, blRdRandom);

  var inter13 = circleIntersect(x, y, ballRadius, randomX13, randomY13, blRdRandom);
  var inter14 = circleIntersect(x, y, ballRadius, randomX14, randomY14, blRdRandom);
  var inter15 = circleIntersect(x, y, ballRadius, randomX15, randomY15, blRdRandom);

  var inRes2  = circleIntersect(x, y, ballRadius, resetX2  , resetY2  , blRdRandom);
  var inRes3  = circleIntersect(x, y, ballRadius, resetX3  , resetY3  , blRdRandom);

  // bounce edges
  edges();
  // random bounce
  if (inter6 || inter7 || inter8 || inter9 || inter10 || inter11 || inter12) 
  {rdm < 5 ? x += random : x -= random; rdm2 < 5 ? y += random : y -= random;}
  if (inter13 || inter14) {x -= 6*ballRadius; y += 0;}
  if (inter15) {x -= 4*ballRadius; y += 0;}
  // reset
  if (inRes2 || inRes3) 
  {x = canvasW    /  2; y = canvasH - 2*ballRadius - 1;}

  else {
      var  i;
      for (i = 0; i < ballRadius; i++) {
        var j = Math.round(Math.sqrt(Math.pow(ballRadius, 2) - Math.pow(i, 2)));
        if        (cX > x-i && cX < x) {
          if      (cY > y-j && cY < y) {x += i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x += i/ballr3; y -= j/ballr3;}
        }
        else if   (cX < x+i && cX > x) {
          if      (cY > y-j && cY < y) {x -= i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x -= i/ballr3; y -= j/ballr3;}
        }
      }
  };
  // level
  drawText(xText, yText, "30px Arial", "LEVEL 2");
  // arrow (https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag)
  drawArrow({x: canvasW - 2.4*ballRadius, y: 2.5*ballRadius}, {x: canvasW - 2.4*ballRadius, y: 1.5*ballRadius}, 10);
  // next level
  drawBallTxt(canvasW - 2.4*ballRadius, 1.05*ballRadius, canvasW - 3.3*ballRadius, 1.25*ballRadius, ballRadius, 0, "30px Arial", "LEVEL 3", '#cf0c0c')
  // draw
  // circles
  drawBall(       x  ,        y ,  ballRadius, 0 , '#cf0c0c');
  
  drawBall(randomX6  , randomY6 ,  blRdRandom, 0 , '#9219c2');
  drawBall(randomX7  , randomY7 ,  blRdRandom, 0 , '#9219c2');
  drawBall(randomX8  , randomY8 ,  blRdRandom, 0 , '#9219c2');
  drawBall(randomX9  , randomY9 ,  blRdRandom, 0 , '#9219c2');
  drawBall(randomX10 , randomY10,  blRdRandom, 0 , '#9219c2');
  drawBall(randomX11 , randomY11,  blRdRandom, 0 , '#9219c2');
  drawBall(randomX12 , randomY12,  blRdRandom, 0 , '#9219c2');

  drawBall(randomX13 , randomY13,  blRdRandom, 0 , '#F325F0');
  drawBall(randomX14 , randomY14,  blRdRandom, 0 , '#F325F0');
  drawBall(randomX15 , randomY15,  blRdRandom, 0 , '#F325F0');

  //reset ball
  drawBall(resetX2   , resetY2  ,  blRdRandom, 0 , '#abf5f5');   
  drawBall(resetX3   , resetY3  ,  blRdRandom, 0 , '#abf5f5'); 

  // horizontal walls
  drawRect(       a1 ,       b1 ,         w1 , h , '#FFFF00');
  drawRect(       a5 ,       b5 ,         w5 , h , '#db0909');
  
  drawRect(       a9 ,       b9 ,         w9 , h , '#FFFF00');
  drawRect(       a10,       b10,         w10, h , '#FFFF00');  
  // vertical walls
  drawRect(       a6 ,       b6 ,         h  , w6, '#FFFF00');
  drawRect(       a7 ,       b7 ,         h  , w7, '#FFFF00');
  drawRect(       a8 ,       b8 ,         h  , w8, '#db0909');
  // end game box
  drawRect(23*ballRadius, 2*ballRadius, 3*ballRadius,            h, '#FFFF00');
  drawRect(23*ballRadius,            0,            h, 2*ballRadius, '#FFFF00');
};

// ------------------------------------------------------------------------------------------------------------------------ //
//     											          LEVEL 3												            //
// ------------------------------------------------------------------------------------------------------------------------ //

 
function paint3(event) {
  ctx.clearRect(0, 0, canvasW, canvasH)          ;
  var cX     = event.touches[0].pageX - offset   ; 
  var cY     = event.touches[0].pageY		     ;
  
  wall(a11, b11, w11, h , ballRadius, wBounce)   ;
  wall(a12, b12, w12, h , ballRadius, hardBounce);

  wall(a13, b13, h , w13, ballRadius, hardBounce);

  var rdm    = Math.round(Math.random() * 10) ;
  var rdm2   = Math.round(Math.random() * 10) ;
  var random = rdm * 5						  ;

  var spin0 = circleIntersect(x, y, ballRadius, canvasW - sX0, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX0, 2)) , spinR1);
  var spin1 = circleIntersect(x, y, ballRadius, canvasW - sX1, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2)) , spinR1);
  var spin2 = circleIntersect(x, y, ballRadius, canvasW - sX2, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2)) , spinR1);
  var spin3 = circleIntersect(x, y, ballRadius, canvasW - sX3, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2)) , spinR1);
  var spin4 = circleIntersect(x, y, ballRadius, canvasW - sX4, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2)) , spinR1);
  var spin5 = circleIntersect(x, y, ballRadius, canvasW - sX5, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2)) , spinR1);
  
  var spin6 = circleIntersect(x, y, ballRadius, canvasW - sX6, canvasW - Math.sqrt(Math.pow(spinRad2  , 2) - Math.pow(sX6, 2)) , spinR1);

  var spina = circleIntersect(x, y, ballRadius, canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2)), canvasW - sYa, spinR1);
  var spinb = circleIntersect(x, y, ballRadius, canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2)), canvasW - sYb, spinR1);
  var spinc = circleIntersect(x, y, ballRadius, canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2)), canvasW - sYc, spinR1);
  var spind = circleIntersect(x, y, ballRadius, canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYd, 2)), canvasW - sYd, spinR1);
  var spine = circleIntersect(x, y, ballRadius, canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYe, 2)), canvasW - sYe, spinR1);
  
  var spinf = circleIntersect(x, y, ballRadius, canvasW - Math.sqrt(Math.pow(spinRad3  , 2) - Math.pow(sYf, 2)), canvasW - sYf, spinR1);

  var inRes4  = circleIntersect(x, y, ballRadius, resetX4  , resetY4  , blRdRandom);
  var inRes5  = circleIntersect(x, y, ballRadius, resetX5  , resetY5  , blRdRandom);

  // bounce edges
  edges();
  
  // random bounce   
  if (spin6 || spinf) 
  {rdm < 5 ? x += random * 2 : x -= random * 2; rdm2 < 5 ? y += random * 2 : y -= random * 2;}
  // bounce   
  if (spin0 || spin1 || spin2 || spin3 || spin4 || spin5 || spina || spinb || spinc || spind || spine) 
  {x += wBounce; y += wBounce;}
  // reset
  if (inRes4 || inRes5) 
  {x = canvasW    /  2; y = canvasH - 2*ballRadius - 1;}

  else {
      var  i;
      for (i = 0; i < ballRadius; i++) {
        var j = Math.round(Math.sqrt(Math.pow(ballRadius, 2) - Math.pow(i, 2)));
        if        (cX > x-i && cX < x) {
          if      (cY > y-j && cY < y) {x += i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x += i/ballr3; y -= j/ballr3;}
        }
        else if   (cX < x+i && cX > x) {
          if      (cY > y-j && cY < y) {x -= i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x -= i/ballr3; y -= j/ballr3;}
        }
      }
  };
  sX0 += 2; sX1 += 2; sX2 += 2; sX3 += 2; sX4 += 2; sX5 += 2;
  
  sX6 += 3; 

  sYa += 2; sYb += 2; sYc += 2; sYd += 2; sYe += 2;

  sYf += 3;

  if (sX0 >= spinRadius) {sX0 = 0};
  if (sX1 >= spinRadius) {sX1 = 0};
  if (sX2 >= spinRadius) {sX2 = 0};
  if (sX3 >= spinRadius) {sX3 = 0};
  if (sX4 >= spinRadius) {sX4 = 0};
  if (sX5 >= spinRadius) {sX5 = 0};
  
  if (sX6 >= spinRad2  ) {sX6 = 0};

  if (sYa >= spinRSmall) {sYa = 0};
  if (sYb >= spinRSmall) {sYb = 0};
  if (sYc >= spinRSmall) {sYc = 0};
  if (sYd >= spinRSmall) {sYd = 0};
  if (sYe >= spinRSmall) {sYe = 0};
  
  if (sYf >= spinRad3  ) {sYf = 0};

  // level
  drawText(xText, yText + 9, "30px Arial", "LEVEL 3");
  // arrow (https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag)
  drawArrow({x: canvasW - 2.4*ballRadius, y: 2.5*ballRadius}, {x: canvasW - 2.4*ballRadius, y: 1.5*ballRadius}, 10);
  // next level
  drawBallTxt(canvasW - 2.4*ballRadius, 1.05*ballRadius, canvasW - 3.05*ballRadius, 1.25*ballRadius, ballRadius, 0, "30px Arial", "FINAL", '#cf0c0c')
  // draw
  // circles
  drawBall(       x  ,        y ,  ballRadius, 0 , '#cf0c0c');
  
  drawBall(canvasW - sX0, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX0, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX1, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX2, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX3, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX4, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2)), spinR1, 0, '#9219c2');
  drawBall(canvasW - sX5, canvasW - Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2)), spinR1, 0, '#9219c2');

  drawBall(canvasW - sX6, canvasW - Math.sqrt(Math.pow(spinRad2  , 2) - Math.pow(sX6, 2)), spinR1, 0, '#9219c2');

  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2)), canvasW - sYa, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2)), canvasW - sYb, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2)), canvasW - sYc, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYd, 2)), canvasW - sYd, spinR1, 0, '#9219c2');
  drawBall(canvasW - Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYe, 2)), canvasW - sYe, spinR1, 0, '#9219c2');

  drawBall(canvasW - Math.sqrt(Math.pow(spinRad3  , 2) - Math.pow(sYf, 2)), canvasW - sYf, spinR1, 0, '#9219c2');

  //reset ball
  drawBall(resetX4   , resetY4  ,  blRdRandom, 0 , '#abf5f5');   
  drawBall(resetX5   , resetY5  ,  blRdRandom, 0 , '#abf5f5'); 

  // horizontal walls
  drawRect(a11, b11, w11,  h  , '#FFFF00');
  drawRect(a12, b12, w12,  h  , '#db0909');
  // vertical walls
  drawRect(a13, b13, h  ,  w13, '#db0909');

  // end game box
  drawRect(23*ballRadius, 2*ballRadius, 3*ballRadius,            h, '#FFFF00');
  drawRect(23*ballRadius,            0,            h, 2*ballRadius, '#FFFF00');
};
// ------------------------------------------------------------------------------------------------------------------------ //
//     											           GAME 												            //
// ------------------------------------------------------------------------------------------------------------------------ //

function paint(event) {
  if (level == 1) {paint1(event);};
  nextLevel(canvasW - 2.4 * ballRadius - 2, canvasW - 2.4 * ballRadius + 2, 1.05 * ballRadius + 2, 
    'Congratulations! You\'ve made it to level 2!', 2, 10, 2, canvasW / 2, canvasH - 2 * ballRadius - 1);
  if (level == 2) {paint2(event);};
  nextLevel(canvasW - 2.4 * ballRadius - 2, canvasW - 2.4 * ballRadius + 2, 1.05 * ballRadius + 2, 
    'Congratulations! You\'ve made it to level 3!', 2, 10, 3, canvasW / 2, canvasH - 2 * ballRadius - 1);
  if (level == 3) {paint3(event);};
  nextLevel(canvasW - 2.4 * ballRadius - 2, canvasW - 2.4 * ballRadius + 2, 1.05 * ballRadius + 2, 
    'Congratulations! You\'ve made it to the end!', 2, 10, 1, canvasW / 2, canvasH - 2 * ballRadius - 1);  
  console.log(level)
};
  
// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //