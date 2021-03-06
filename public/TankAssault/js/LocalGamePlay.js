// JavaScript Document for main Play
/**************************************************
** Controller functions for the game
**************************************************/

var iterationTime = 10; // in milis

// initialising game Play
maze.prototype.initialize = function() {

	if (onceLoaded > 0) {
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		//document.addEventListener("mousemove", mouseMoveHandler, false);

		onceLoaded = -1;
	}
	initializeTank(tank1);
	initializeTank(tank2);
	for (var i = 0; i < tank1.bulletPack; i++)
    	initializeBullet(tank1, tank1.bullet[i]);

	for (var i = 0; i < tank2.bulletPack; i++)
    	initializeBullet(tank2, tank2.bullet[i]);
	tank1.bulletReload = true;
	tank2.bulletReload = true;
	tank1.bulletShot = tank1.bulletPack;
	tank2.bulletShot = tank2.bulletPack;
}

// Displaying score
var Player1canvas = document.getElementById("player1stats");
var Player1ctx = Player1canvas.getContext('2d');
Player1ctx.font = "30px Comic Sans MS";
Player1ctx.fillStyle = "red";
Player1ctx.textAlign = "center";
Player1ctx.textBaseline="middle";

var Player2canvas = document.getElementById("player2stats");
var Player2ctx = Player2canvas.getContext('2d');
Player2ctx.font = "30px Comic Sans MS";
Player2ctx.fillStyle = "red";
Player2ctx.textAlign = "center";
Player2ctx.textBaseline="middle";

// Displaing bullets
var bullet1canvas=document.getElementById("player1bullets");
var bullet1ctx=bullet1canvas.getContext("2d");
bullet1ctx.fillStyle = "#d6f5d6";
var bullet2canvas=document.getElementById("player2bullets");
var bullet2ctx=bullet2canvas.getContext("2d");
bullet1ctx.fillStyle = "#d6f5d6";
var img=document.getElementById("bullet");

maze.prototype.maintainStats = function() {
	Player1ctx.clearRect(0, 0, Player1canvas.width, Player1canvas.height);
	 Player1ctx.fillText("" + tank1.score, Player1canvas.width/2, Player1canvas.height/2);
	 Player2ctx.clearRect(0, 0, Player2canvas.width, Player2canvas.height);
	 Player2ctx.fillText("" + tank2.score, Player2canvas.width/2, Player2canvas.height/2);

	 // display the remaining bullets
	 var bullet1start = 10;
	 bullet1ctx.clearRect(0, 0, bullet1canvas.width, bullet1canvas.height);
	 //bullet1ctx.fillRect(0, 0, bullet1canvas.width, bullet1canvas.height);
	 for (var i = tank1.bulletShot - 1; i >=0 ; i--){
	 	bullet1ctx.drawImage(img, bullet1start, 10, 16, 40);
	 	bullet1start = bullet1start + 16;
	 }
	 if((tank1.bulletShot == 0) && (!tank1.reloading)){
		 bullet1ctx.drawImage(bulletOver, bullet1canvas.width / 2 - 30, 0, 50, 50);
		 document.getElementById("reload1").style.color = "green";
		 document.getElementById("reload1").innerHTML = "Reload Required..." + "<br>";
	 }

	 var bullet2start = 10;
	 bullet2ctx.clearRect(0, 0, bullet2canvas.width, bullet2canvas.height);
	 for (var i = tank2.bulletShot - 1; i >=0 ; i--){
	 	bullet2ctx.drawImage(img, bullet2start, 10, 16, 40);
	 	bullet2start = bullet2start + 16;
	 }
	 if((tank2.bulletShot == 0) && (!tank2.reloading)){
	 	 bullet2ctx.drawImage(bulletOver, bullet2canvas.width / 2 - 30, 0, 50, 50);
		 document.getElementById("reload2").style.color = "green";
		 document.getElementById("reload2").innerHTML = "Reload Required..." + "<br>";
	 }
}
var a = 0;
maze.prototype.playGame = function() {
	// function which controls the game 
	// called repeatedly after each 'iterationTime' milisecond
	
	 theMaze.moveTank(tank1);
	 theMaze.moveTank(tank2);
	 //if(a == 0){
	 theMaze.draw();
	 /*}else if(a == 1){
	 destroyTank(tank1);
	 }else if(a == 2){
	 destroyTank(tank2);
	 }*/
	 theMaze.shootTank(tank2);
	 theMaze.shootTank(tank1);
	 theMaze.maintainStats();
}

function generate() {
	$('#maze').show();
	makeMaze();
	theMaze.draw();
	tank1 = new Tank();
	tank2 = new Tank();
	tank1.bullet = new Array();
	tank2.bullet = new Array();
	for (var i = 0; i < tank1.bulletPack; i++)
    	tank1.bullet.push(new Bullet());

	for (var i = 0; i < tank2.bulletPack; i++)
    	tank2.bullet.push(new Bullet());
	//theMaze.draw();
	if (onceLoaded ==0) onceLoaded++;
	theMaze.initialize();
	if (loaded == 0){
	var timxxx =	setInterval(theMaze.playGame, iterationTime);
	}

	loaded++;
}
function reSetTank() {
	theMaze.initialize();
}
/*function explode(aTank) {
    //        aTank.explodeRestore();
            setTimeout(function () {
                aTank.explode({
                    maxWidth: 15,
                    minWidth: 5,
                    radius: 231,
                    release: false,
                    recycle: false,
                    explodeTime: 320,
                    canvas: true,
                    round: false,
                    maxAngle: 360,
                    gravity: 10,
                    groundDistance: 150,
                });
            }, 300)
        }*/
function destroyTank(aTank){
	/*ax=aTank.tankCenterX;
	ay=aTank.tankCenterY;
	context.beginPath();
	context.arc(ax,ay,boom_r,0,2*Math.PI);
	context.closePath;
	context.fill();
	if(boom_r<50){
	boom_r=boom_r+20;
	//timx+=1
	}
	else{
	boom_r=10;
	}*/
	console.log("Called");
//	create(aTank);
//	draw(aTank);
		//	a = 0;
	animate(aTank);
	/*  setTimeout(function (){
		animate(aTank);
            }, 300);*/

}
