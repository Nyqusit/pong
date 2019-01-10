const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ballX = 200, ballY = 600;
let leftPlayer = 0, rightPlayer = 0;
let leftKeys = NaN, rightKeys = NaN;
let leftUp = false, rightUp = false;
const playerMovementSpeed = 20;
let BallDir = {};
BallDir.currentDir = 'nothing';
let ballSpeed = 2;

const leftScoreDoc = document.getElementById('leftScore'), rightScoreDoc = document.getElementById('rightScore');
leftScoreDoc.innerHTML = 0;
rightScoreDoc.innerHTML = 0;

window.onkeypress =(evt)=>{
	var key = evt.keyCode;
	key === 97 || key === 122?leftKeys = key:null;
	key === 59 || key === 47?rightKeys = key:null;
}
gameReset =()=>{
	ballY -= (ballY - 400);
	ballX -= (ballX - 400);
	ballSpeed = 2;
}

canvas.width = 800;
canvas.height = 800;


(gameLoop=(frame)=>{
	//drawing playing field
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,canvas.width,canvas.height)
	

	//player controls
	switch(leftKeys){
		case 97:
			leftPlayer>0?leftPlayer -= playerMovementSpeed:null;
			leftUp = true;
			break;
		case 122:
			leftPlayer<800-100?leftPlayer += playerMovementSpeed:null;
			leftUp = false;
			break;
	}
	switch(rightKeys){
		case 59:
			rightPlayer>0?rightPlayer -= playerMovementSpeed:null;
			rightUp = true;
			break;
		case 47:
			rightPlayer<800-100?rightPlayer += playerMovementSpeed:null;
			rightUp = false;
			break;
	}
	
	ballY <= leftPlayer+100 && ballY >= leftPlayer && ballX <= 31?leftHitBox = true:leftHitBox = false;
	
	ballY <= rightPlayer+100 && ballY >= rightPlayer && ballX >= 740?rightHitBox = true:rightHitBox = false;

	//methods for changing ball direction
	BallDir.northEast = function(){
			ballX+=ballSpeed;
			ballY-=ballSpeed;
			this.currentDir = 'northEast';
		};
	BallDir.southEast = function(){
			ballX+=ballSpeed;
			ballY+=ballSpeed;
			this.currentDir = 'southEast';
		};
	BallDir.southWest = function(){
			ballX-=ballSpeed;
			ballY+=ballSpeed;
			this.currentDir = 'southWest';
		};
	BallDir.northWest = function(){
			ballX-=ballSpeed;
			ballY-=ballSpeed;
			this.currentDir = 'northWest';
		};

	//ball bouncing logic
	if(ballX < 810 && ballX > -10 ){
		if(BallDir.currentDir === 'northWest' || ballY >= 770 && BallDir.currentDir === 'southWest' ){
			BallDir.northWest();
		}
		if(ballY <= 0 && BallDir.currentDir === 'northWest' || BallDir.currentDir === 'southWest'){
			BallDir.southWest();
		}
		if(BallDir.currentDir ==='southEast' || ballY <= 0 && BallDir.currentDir === 'northEast'){
			BallDir.southEast();
		}
		if(ballY >= 770 && BallDir.currentDir === 'southEast' || BallDir.currentDir === 'nothing' || BallDir.currentDir ==='northEast'){
			BallDir.northEast();
		}

		if(rightUp && rightHitBox){
			BallDir.northWest();
		}else if(!rightUp && rightHitBox){
			BallDir.southWest();
		}
		if(leftUp && leftHitBox){
			BallDir.northEast();
		}else if(!leftUp && leftHitBox){
			BallDir.southEast();
		}
	}else{
		ballX < 0 ? rightScoreDoc.innerHTML++:null;
		ballX > 800? leftScoreDoc.innerHTML++:null;
		gameReset();
	}

	if(leftHitBox || rightHitBox){
		ballSpeed += .5;
	}

	//driawing players
	ctx.fillStyle = '#ff5050';
	ctx.fillRect(0,leftPlayer,30,100);
	ctx.fillStyle = '#00ffcc';
	ctx.fillRect(770,rightPlayer,30,100);

	console.log(ballX)

	//drawing ball
	ctx.fillStyle = '#fff';
	ctx.fillRect(ballX,ballY,30,30)
	requestAnimationFrame(gameLoop);
	
})();
