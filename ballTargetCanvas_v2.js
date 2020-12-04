
"use strict";

let screenLog = document.querySelector('#screen-log');
document.addEventListener('mousemove', logKey);

function logKey(e) {
  screenLog.innerText = `
    Canvas X/Y: ${e.screenX - 440}, ${e.screenY - 134}
    Client X/Y: ${e.clientX}, ${e.clientY}`;
}

//
//
//								       |
//------------------------------       |
//							  w8       |
//        -----------------------------|
//								  w7   |
//------------------------------	   |
//							  w6	   |
//   .         .					   |
//resetX9    randomX10				   |
//        .         .				   |
//   randomX9    randomX8			   |
//   .         .  ------------------------------------------------------------
//randomX7   randomX6            w5    |
//        .         .                  |
//   randomX5    randomX4              |w9
//------------------------------       |
//                            w4       |
//                                     |
//     . -------------------------------------------------|
//	randomX3			w3			   					  |
//									   		              |
//----------------------------------------- .     		  |
//	w2				                    randomX2   		  |
//									   		              |
//                       w1 ------------------------------|
//									 O  x,y,ballRadius    |w10
//---------------------------------------------------------------------------


// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Paddle_and_keyboard_controls
var canvas            = document.getElementById("myCanvas");
var ctx               = canvas.getContext("2d");
var i 				  = 0;

// ------------------------------------------------------------------------------------------------------------------------ //
// variables

// circles

var ballRadius =  30;

var blRdRandom =   5;

var spinRadius = 312;
var spinRSmall = 210;

var spinR1     =   5;

// ball x
var x         = canvas.width/2      ; var y         = canvas.height-ballRadius - 1;

// random ball x
var randomX2  = canvas.width -380   ; var randomY2  = canvas.height-160           ;
var randomX3  = canvas.width -720   ; var randomY3  = canvas.height-240           ;
var randomX4  = canvas.width -560   ; var randomY4  = canvas.height-380           ;
var randomX5  = canvas.width -700   ; var randomY5  = canvas.height-380           ;
var randomX6  = canvas.width -630   ; var randomY6  = canvas.height-420           ;
var randomX7  = canvas.width -770   ; var randomY7  = canvas.height-420           ;
var randomX8  = canvas.width -560   ; var randomY8  = canvas.height-460           ;
var randomX9  = canvas.width -700   ; var randomY9  = canvas.height-460           ;
var randomX10 = canvas.width -630   ; var randomY10 = canvas.height-500           ;

// reset ball x
var resetX9   = canvas.width -770   ; var resetY9   = canvas.height-500           ;

// spin 'x'
var sX1 	  =  32;
var sX2 	  =  94;
var sX3 	  = 156; // reset x
var sX4 	  = 218;
var sX5 	  = 280;

var sYa 	  = 200;
var sYb 	  = 130; // reset x
var sYc 	  =  70;

// walls
var h  = 3;

// horizontal walls
var a1 = canvas.width -600; var b1 = canvas.height- 80; var w1 = 300;
var a2 = canvas.width -800; var b2 = canvas.height-165; var w2 = 400;
var a3 = canvas.width -700; var b3 = canvas.height-240; var w3 = 400;
var a4 = canvas.width -800; var b4 = canvas.height-315; var w4 = 200;
var a5 = canvas.width -600; var b5 = canvas.height-423; var w5 = 600;
var a6 = canvas.width -800; var b6 = canvas.height-535; var w6 = 200; // hardbounce
var a7 = canvas.width -700; var b7 = canvas.height-610; var w7 = 200;
var a8 = canvas.width -800; var b8 = canvas.height-685; var w8 = 200;

// vertical walls
var a9 = canvas.width -500; var b9 = canvas.height-720; var w9 = 483;
var a10= canvas.width -300; var b10= canvas.height-240; var w10= 240;

var px                = 1;
var py                = 1;

var xBounce           = 10;
var yBounce           = 10;
var wBounce           = 20;
var hardBounce        = 40;

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

drawBall(canvas.width - sX1, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2))), spinR1, 0, '#9219c2');
drawBall(canvas.width - sX2, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2))), spinR1, 0, '#9219c2');
drawBall(canvas.width - sX3, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2))), spinR1, 0, '#abf5f5');
drawBall(canvas.width - sX4, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2))), spinR1, 0, '#9219c2');
drawBall(canvas.width - sX5, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2))), spinR1, 0, '#9219c2');

drawBall(canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2))), sYa, spinR1, 0, '#9219c2');
drawBall(canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2))), sYb, spinR1, 0, '#abf5f5');
drawBall(canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2))), sYc, spinR1, 0, '#9219c2');

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

// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //
  
function paint(event) {
/*   x,  y = position middle of ball; cX, cY = "client" = mouse; px, py = position x, y + px  */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var cX = event.clientX - 440; // Because '0' of canvas left edge lays 440px to the right
  var cY = event.clientY;
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

  var spin1 = circleIntersect(x, y, ballRadius, canvas.width - sX1 , Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2))) , spinR1);
  var spin2 = circleIntersect(x, y, ballRadius, canvas.width - sX2 , Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2))) , spinR1);
  var spin3 = circleIntersect(x, y, ballRadius, canvas.width - sX3 , Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2))) , spinR1);
  var spin4 = circleIntersect(x, y, ballRadius, canvas.width - sX4 , Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2))) , spinR1);
  var spin5 = circleIntersect(x, y, ballRadius, canvas.width - sX5 , Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2))) , spinR1);

  var spina = circleIntersect(x, y, ballRadius, canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2))), sYa, spinR1);
  var spinb = circleIntersect(x, y, ballRadius, canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2))), sYb, spinR1);
  var spinc = circleIntersect(x, y, ballRadius, canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2))), sYc, spinR1);

  if (inter2 || inter3 || inter4 || inter5 || inter6 || inter7 || inter8 || inter9 || inter10) 
  {rdm < 5 ? x += random : x -= random; rdm2 < 5 ? y += random : y -= random;}

  if (inRes1 || spin3 || spinb) 
  {x = canvas.width/2; y = canvas.height-ballRadius - 1;}
  
  if (spin1 || spin2 || spin4 || spin5) 
  {x -= hardBounce; y += hardBounce;}

  if (spina || spinc) 
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

  sX1 += 1; sX2 += 1; sX3 += 1; sX4 += 1; sX5 += 1;

  sYa += 1; sYb += 1; sYc += 1;

  if (sX1 == spinRadius) {sX1 = 0};
  if (sX2 == spinRadius) {sX2 = 0};
  if (sX3 == spinRadius) {sX3 = 0};
  if (sX4 == spinRadius) {sX4 = 0};
  if (sX5 == spinRadius) {sX5 = 0};

  if (sYa == spinRadius) {sYa = 0};
  if (sYb == spinRadius) {sYb = 0};
  if (sYc == spinRadius) {sYc = 0};

  drawBall(canvas.width - sX1, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX1, 2))), spinR1, 0, '#9219c2');
  drawBall(canvas.width - sX2, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX2, 2))), spinR1, 0, '#9219c2');
  drawBall(canvas.width - sX3, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX3, 2))), spinR1, 0, '#abf5f5');
  drawBall(canvas.width - sX4, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX4, 2))), spinR1, 0, '#9219c2');
  drawBall(canvas.width - sX5, Math.round(Math.sqrt(Math.pow(spinRadius, 2) - Math.pow(sX5, 2))), spinR1, 0, '#9219c2');

  drawBall(canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYa, 2))), sYa, spinR1, 0, '#9219c2');
  drawBall(canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYb, 2))), sYb, spinR1, 0, '#abf5f5');
  drawBall(canvas.width - Math.round(Math.sqrt(Math.pow(spinRSmall, 2) - Math.pow(sYc, 2))), sYc, spinR1, 0, '#9219c2');

};

// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------ //

