
"use strict";

//	       			                        |		.		.		
//				                        |					
//				       |		|		 .		 .	    |		
//------------------------------       |		|				   .	    |
//			      w8       |		|					   .|	
//        -----------------------------|		|			 .		    |
//				  w7   |		|				 	    |
//------------------------------       |		|					   .|
//			     w6	       |		|					    |
//   .         .		       |		|					    |
//resetX9    randomX10		       |		|					    |
//        .         .		       |		|					    |	
//   randomX9    randomX8	       |		|					    |
//   .         .  ---------------------|		|					    |
//randomX7   randomX6            w5    |		|					    |
//        .         .                  |		|					    |
//   randomX5    randomX4              |w9		|w11				            |w12
//------------------------------       |							    |
//                            w4       |							    |
//                                     |							    |
//     . --------------------------------------------------------------------------------------------
//	randomX3			w3 	         	  |
//							          |
//----------------------------------------- .     		  |
//	w2			     randomX2   		  |w10
//								  |
//                               w1 -------------------------------
//									    O <- x,y,ballRadius    
//---------------------------------------------------------------------------

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Paddle_and_keyboard_controls
var canvas            = document.getElementById("myCanvas");
canvas.addEventListener("touchstart",  function(event) {event.preventDefault()})
canvas.addEventListener("touchmove",   function(event) {event.preventDefault()})
canvas.addEventListener("touchend",    function(event) {event.preventDefault()})
canvas.addEventListener("touchcancel", function(event) {event.preventDefault()})

var body              = document.getElementById("myBody");

var ctx               = canvas.getContext("2d");
var i 				  = 0;
/*
let width = document.querySelector('#width');
width.innerText = "canvas width = " + canvas.clientWidth + ", " + "body width = " + body.clientWidth + ", " + "body height = " + body.clientHeight;
*/
// ------------------------------------------------------------------------------------------------------------------------ //
// variables

// circles

// canvas.heigth = 800 -> ballRadius = 800 * 0.04 = 32
var ballRadius = canvas.height * 0.04;

var blRdRandom = ballRadius /  6.4;

var spinRadius = ballRadius * 10.0;
var spinRSmall = ballRadius *  6.5;

var spinR1     = ballRadius /  6  ;

// ball x
var x          = ballRadius * 20.0; 
var y          = ballRadius * 24 - 1;
//var y          = ballRadius * 8 - ballRadius - 1;

let screenLog  = document.querySelector('#screen-log');
document.addEventListener('mousemove', logKey);

function logKey(e) {
  screenLog.innerText = `
    Canvas X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}` + ' bodyW ' + bodyW + ' bodyH ' + bodyH;
}

var a = Math.round(2 * (Math.sqrt( Math.pow( (ballRadius + spinR1) * 1.03, 2) / 2)));


// random ball x
var randomX2  = 7.7*a; var randomY2  = ballRadius *   20.0;
var randomX3  = 1.5*a; var randomY3  = ballRadius *   17.55;

var randomX4  = 4*a  ; var randomY4  = 7.5*a ;
var randomX5  = 2*a  ; var randomY5  = 7.5*a ;
var randomX6  = 3*a  ; var randomY6  = 6.5*a ;
var randomX7  = a    ; var randomY7  = 6.5*a ;
var randomX8  = 4*a  ; var randomY8  = 5.5*a ;
var randomX9  = 2*a  ; var randomY9  = 5.5*a ;
var randomX10 = 3*a  ; var randomY10 = 4.5*a ;

// reset ball x
var resetX9   = a   ; var resetY9   = 4.5*a ;

// spin 'x'
/*
spinRadius = ballRadius * 10.0;
spinRSmall = ballRadius *  6.5;
*/

// .   .   .   .   .   . 
var partSpinR = spinRadius / 5;

var sX0 	  = partSpinR*0;
var sX1 	  = partSpinR*1;
var sX2 	  = partSpinR*2;
var sX3 	  = partSpinR*3; // reset x
var sX4 	  = partSpinR*4;
var sX5 	  = partSpinR*5;

var partSpinS = spinRSmall / 4;

var sYa 	  = partSpinS*4;
var sYb 	  = partSpinS*3; // reset x
var sYc 	  = partSpinS*2;
var sYd 	  = partSpinS*1;
var sYe 	  = partSpinS*0;

// walls
var h  = ballRadius/10;

// horizontal walls
var a1 = ballRadius *  6.0; var b1 = ballRadius * 22.5; var w1 = ballRadius *  9.5;
var a2 = 0    			  ; var b2 = ballRadius * 20.0; var w2 = ballRadius * 12.5;
var a3 = ballRadius *  3.0; var b3 = ballRadius * 17.5; var w3 = canvas.width - a3;
var a4 = 0                ; var b4 = ballRadius * 15.0; var w4 = ballRadius *  6.5;
var a5 = ballRadius *  5.0; var b5 = ballRadius * 11.5; var w5 = ballRadius *  4.3;
var a6 = 0				  ; var b6 = ballRadius *  7.0; var w6 = ballRadius *  6.5; // hardbounce
var a7 = ballRadius *  5.0; var b7 = ballRadius *  4.5; var w7 = ballRadius *  4.3;
var a8 = 0				  ; var b8 = ballRadius *  2.0; var w8 = ballRadius *  6.5;

// vertical walls
var a9 = ballRadius *  9.2; var b9 = ballRadius *  2.4; var w9 = ballRadius * 15.2;
var a10= ballRadius * 15.4; var b10= ballRadius * 17.5; var w10= ballRadius *  5.1;
var a11= ballRadius * 12.0; var b11= ballRadius *  0.0; var w11= ballRadius * 15.0;
var a12= ballRadius * 25.1; var b12= ballRadius *  3.0; var w12= ballRadius * 22.0;

var px         = ballRadius * 0.03;
var py         = ballRadius * 0.03;

var xBounce    = ballRadius *  0.3;
var yBounce    = ballRadius *  0.3;
var wBounce    = ballRadius *  0.6;
var hardBounce = ballRadius *  1.2;

// ------------------------------------------------------------------------------------------------------------------------ //


function drawRect(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function drawBall(x, y, ballRadius, z, color) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, z, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function wall(a, b, w, h, ballRadius, wBounce) {
  if (x >= a && x <= a+w && y <= b+h+ballRadius && y >= b+h) {y += wBounce;}  // egdeWall1B
  if (x >= a && x <= a+w && y >= b-ballRadius   && y <= b  ) {y -= wBounce;}  // egdeWall1T
  if (y >= b && y <= b+h && x >= a-ballRadius   && x <= a  ) {x -= wBounce;}  // egdeWall1L
  if (y >= b && y <= b+h && x <= a+w+ballRadius && x >= a+w) {x += wBounce;}  // egdeWall1R
  for (i = 0; i < ballRadius; i++) {
    var j = Math.round(Math.sqrt(Math.pow(ballRadius, 2) - Math.pow(i, 2)));
    if (x < a   && x >= a-i   && y > b+h && y <= b+h+j) {y += wBounce; x -= wBounce;} // egdeWall1BL
    if (x > a+w && x <= a+w+i && y > b+h && y <= b+h+j) {y += wBounce; x += wBounce;} // egdeWall1BR
    if (x < a   && x >= a-i   && y < b   && y >= b-j  ) {y -= wBounce; x -= wBounce;} // egdeWall1TL
    if (x > a+w && x <= a+w+i && y < b   && y >= b-j  ) {y -= wBounce; x += wBounce;} // egdeWall1TR
  }
};
function circleIntersect(x1, y1, r1, x2, y2, r2) {
    // Calculate the distance between the two circles
  let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    // When the distance is smaller or equal to the sum of the two radius, the circles touch or overlap
  return squareDistance <= ((r1 + r2) * (r1 + r2))
};

// draw
// circles

drawBall(       x ,        y ,  ballRadius,  0, '#cf0c0c');
drawBall(randomX2 , randomY2 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX3 , randomY3 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX4 , randomY4 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX5 , randomY5 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX6 , randomY6 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX7 , randomY7 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX8 , randomY8 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX9 , randomY9 ,  blRdRandom,  0, '#9219c2');
drawBall(randomX10, randomY10,  blRdRandom,  0, '#9219c2');

drawBall(resetX9  , resetY9  ,  blRdRandom,  0, '#abf5f5');

drawBall(25*ballRadius - sX0, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX0, 2))), spinR1, 0, '#9219c2');
drawBall(25*ballRadius - sX1, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2))), spinR1, 0, '#9219c2');
drawBall(25*ballRadius - sX2, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2))), spinR1, 0, '#9219c2');
drawBall(25*ballRadius - sX3, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2))), spinR1, 0, '#abf5f5');
drawBall(25*ballRadius - sX4, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2))), spinR1, 0, '#9219c2');
drawBall(25*ballRadius - sX5, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2))), spinR1, 0, '#9219c2');

drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2))), sYa, spinR1, 0, '#9219c2');
drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2))), sYb, spinR1, 0, '#abf5f5');
drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2))), sYc, spinR1, 0, '#9219c2');
drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYd, 2))), sYd, spinR1, 0, '#9219c2');
drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYe, 2))), sYe, spinR1, 0, '#9219c2');

// walls

// horizontal walls
drawRect(a1 , b1 , w1,  h  , '#FFFF00');
drawRect(a2 , b2 , w2,  h  , '#FFFF00');
drawRect(a3 , b3 , w3,  h  , '#FFFF00');
drawRect(a4 , b4 , w4,  h  , '#FFFF00');
drawRect(a5 , b5 , w5,  h  , '#FFFF00');
drawRect(a6 , b6 , w6,  h  , '#db0909');
drawRect(a7 , b7 , w7,  h  , '#FFFF00');
drawRect(a8 , b8 , w8,  h  , '#FFFF00');

// vertical walls
drawRect(a9 , b9 , h ,  w9 , '#FFFF00');
drawRect(a10, b10, h ,  w10, '#FFFF00');
drawRect(a11, b11, h ,  w11, '#FFFF00');
drawRect(a12, b12, h ,  w12, '#FFFF00');

// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //

function paint(event) {
/*   x,  y = position middle of ball; cX, cY = "client" = mouse; px, py = position x, y + px  */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var cX = event.touches[0].clientX; // Because '0' of canvas left edge lays 440px to the right
  var cY = event.touches[0].clientY;
  var ballr3 = (ballRadius / 3);
  var xEdgeL = x  - ballRadius <= 0            ;
  var xEdgeR = x  + ballRadius >= canvas.width ;
  var yEdgeT = y  - ballRadius <= 0            ;
  var yEdgeB = y  + ballRadius >= canvas.height;

  // if ball against wall (B,T,L,R) (except ballradius space from both edges)
  wall(a1 , b1 , w1, h  , ballRadius, wBounce);
  wall(a2 , b2 , w2, h  , ballRadius, wBounce);
  wall(a3 , b3 , w3, h  , ballRadius, wBounce);
  wall(a4 , b4 , w4, h  , ballRadius, wBounce);
  wall(a5 , b5 , w5, h  , ballRadius, wBounce);
  wall(a6 , b6 , w6, h  , ballRadius, hardBounce);
  wall(a7 , b7 , w7, h  , ballRadius, wBounce); 
  wall(a8 , b8 , w8, h  , ballRadius, wBounce);
  
  wall(a9 , b9 , h , w9 , ballRadius, wBounce);
  wall(a10, b10, h , w10, ballRadius, wBounce);
  wall(a11, b11, h , w11, ballRadius, wBounce);
  wall(a12, b12, h , w12, ballRadius, wBounce);

  var rdm    = Math.round(Math.random() * 10);
  var rdm2   = Math.round(Math.random() * 10);
  var random = rdm * 5;

  var inter2 = circleIntersect(x, y, ballRadius, randomX2 , randomY2 , blRdRandom);
  var inter3 = circleIntersect(x, y, ballRadius, randomX3 , randomY3 , blRdRandom);
  var inter4 = circleIntersect(x, y, ballRadius, randomX4 , randomY4 , blRdRandom);
  var inter5 = circleIntersect(x, y, ballRadius, randomX5 , randomY5 , blRdRandom);
  var inter6 = circleIntersect(x, y, ballRadius, randomX6 , randomY6 , blRdRandom);
  var inter7 = circleIntersect(x, y, ballRadius, randomX7 , randomY7 , blRdRandom);
  var inter8 = circleIntersect(x, y, ballRadius, randomX8 , randomY8 , blRdRandom);
  var inter9 = circleIntersect(x, y, ballRadius, randomX9 , randomY9 , blRdRandom);
  var inter10= circleIntersect(x, y, ballRadius, randomX10, randomY10, blRdRandom);

  var inRes1 = circleIntersect(x, y, ballRadius, resetX9 , resetY9 , blRdRandom);

  var spin0 = circleIntersect(x, y, ballRadius, 25*ballRadius - sX0, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX0, 2))) , spinR1);
  var spin1 = circleIntersect(x, y, ballRadius, 25*ballRadius - sX1, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2))) , spinR1);
  var spin2 = circleIntersect(x, y, ballRadius, 25*ballRadius - sX2, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2))) , spinR1);
  var spin3 = circleIntersect(x, y, ballRadius, 25*ballRadius - sX3, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2))) , spinR1);
  var spin4 = circleIntersect(x, y, ballRadius, 25*ballRadius - sX4, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2))) , spinR1);
  var spin5 = circleIntersect(x, y, ballRadius, 25*ballRadius - sX5, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2))) , spinR1);

  var spina = circleIntersect(x, y, ballRadius, 25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2))), sYa, spinR1);
  var spinb = circleIntersect(x, y, ballRadius, 25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2))), sYb, spinR1);
  var spinc = circleIntersect(x, y, ballRadius, 25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2))), sYc, spinR1);
  var spind = circleIntersect(x, y, ballRadius, 25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYd, 2))), sYd, spinR1);
  var spine = circleIntersect(x, y, ballRadius, 25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYe, 2))), sYe, spinR1);

// random bounce
  if (inter2 || inter3 || inter4 || inter5 || inter6 || inter7 || inter8 || inter9 || inter10) 
  {rdm < 5 ? x += random : x -= random; rdm2 < 5 ? y += random : y -= random;}

// reset
  if (inRes1 || spin3 || spinb) 
  {x = ballRadius * 20.0; y = ballRadius * 24 - 1;}

// hard bounce   
  if (spin0 || spin1 || spin2 || spin4 || spin5) 
  {x -= hardBounce; y += hardBounce;}

// very hard bounce
  if (spina || spinc || spind || spine) 
  {x -= hardBounce * 4; y += hardBounce * 4;}

  /*
  var d = Math.sqrt(Math.pow(x-randomX1) + Math.pow(y-randomY1))
  if (d < ballRadius + blRdRandom) {y += random; x += random;}
  */
  
  if (xEdgeL) {x += xBounce;}
  else if (xEdgeR) {x -= xBounce;}
  else if (yEdgeT) {y += yBounce;}
  else if (yEdgeB) {y -= yBounce;}
	  
  else {
      var i;
      for (i = 0; i < ballRadius; i++) {
        var j = Math.round(Math.sqrt(Math.pow(ballRadius, 2) - Math.pow(i, 2)));
        if      (cX > x-i && cX < x) {
          if      (cY > y-j && cY < y) {x += i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x += i/ballr3; y -= j/ballr3;}
        }
        else if (cX < x+i && cX > x) {
          if      (cY > y-j && cY < y) {x -= i/ballr3; y += j/ballr3;}
          else if (cY < y+j && cY > y) {x -= i/ballr3; y -= j/ballr3;}
        }
      }
  };
    
  drawBall(       x ,        y ,  ballRadius,  0 , '#cf0c0c');
  drawBall(randomX2 , randomY2 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX3 , randomY3 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX4 , randomY4 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX5 , randomY5 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX6 , randomY6 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX7 , randomY7 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX8 , randomY8 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX9 , randomY9 ,  blRdRandom,  0 , '#9219c2');
  drawBall(randomX10, randomY10,  blRdRandom,  0 , '#9219c2');

  drawBall(resetX9  , resetY9  ,  blRdRandom,  0 , '#abf5f5');

  // horizontal walls
  drawRect(       a1,        b1,          w1,  h , '#FFFF00');
  drawRect(       a2,        b2,          w2,  h , '#FFFF00');
  drawRect(       a3,        b3,          w3,  h , '#FFFF00');
  drawRect(       a4,        b4,          w4,  h , '#FFFF00');
  drawRect(       a5,        b5,          w5,  h , '#FFFF00');
  drawRect(       a6,        b6,          w6,  h , '#db0909');
  drawRect(       a7,        b7,          w7,  h , '#FFFF00');
  drawRect(       a8,        b8,          w8,  h , '#FFFF00');
 
  // vertical walls
  drawRect(       a9,        b9,           h, w9 , '#FFFF00');
  drawRect(      a10,       b10,           h, w10, '#FFFF00');
  drawRect(      a11,       b11,           h, w11, '#FFFF00');
  drawRect(      a12,       b12,           h, w12, '#FFFF00');

  sX0 += 1; sX1 += 1; sX2 += 1; sX3 += 1; sX4 += 1; sX5 += 1;

  sYa += 1; sYb += 1; sYc += 1; sYd += 1; sYe += 1;

  if (sX0 == spinRadius) {sX0 = 0};
  if (sX1 == spinRadius) {sX1 = 0};
  if (sX2 == spinRadius) {sX2 = 0};
  if (sX3 == spinRadius) {sX3 = 0};
  if (sX4 == spinRadius) {sX4 = 0};
  if (sX5 == spinRadius) {sX5 = 0};

  if (sYa == spinRSmall) {sYa = 0};
  if (sYb == spinRSmall) {sYb = 0};
  if (sYc == spinRSmall) {sYc = 0};
  if (sYd == spinRSmall) {sYd = 0};
  if (sYe == spinRSmall) {sYe = 0};

  drawBall(25*ballRadius - sX0, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX0, 2))), spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - sX1, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2))), spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - sX2, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2))), spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - sX3, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2))), spinR1, 0, '#abf5f5');
  drawBall(25*ballRadius - sX4, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2))), spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - sX5, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2))), spinR1, 0, '#9219c2');

  drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2))), sYa, spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2))), sYb, spinR1, 0, '#abf5f5');
  drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2))), sYc, spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYd, 2))), sYd, spinR1, 0, '#9219c2');
  drawBall(25*ballRadius - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYe, 2))), sYe, spinR1, 0, '#9219c2');

};

// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //

