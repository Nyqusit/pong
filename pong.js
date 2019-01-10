//*****GLOABAL VARIABLE ASSIGNMENT*****
// *comments in code are verbose to show my understanding
const playingField = document.getElementById('playingField');
//using const to reduce the mutatable state
const testButton = document.getElementById('testButton');//*Debuging*
let frame = 0;
let leftKeys=NaN ,rightKeys=NaN; 
//initializing to NaN so that unintentional key assignment isn't as likely
let timeDir  = 0;
let leftY = 0, rightY = 700;
const playerMovementSpeed = 10;
let frameWD = 0;
const ballSpeed =2;
let leftScore = 0 ,rightScore = 0;
const leftScoreDoc = document.getElementById('leftScore'), rightScoreDoc = document.getElementById('rightScore');
leftScoreDoc.innerHTML = 0;
rightScoreDoc.innerHTML = 0;
let leftExecute = false, rightExecute = false;
let timeStart =0;
let leftUp = false, rightUp = false;
let ballUp =0;
let rightie, leftie;
let rightHit = 0, leftHit = 0;
//*****SETTING RENDERING PROPERTIES*****
const ctx = playingField.getContext('2d');

//*****SETTING CONTROLS*****
//a=97 z=122 ;=59 /=47
window.onkeypress = (evt) =>{
	var key = evt.keyCode;
	key === 97 || key === 122?leftKeys = key:null;
	key === 59 || key === 47?rightKeys = key:null;
	//using strictly equal so that only number types will be compared
	//trying to reduce code lines with ternary operator to make viablity easier. used this statement so there is two inividual user controls.
}

//*****DEBUGGING*****
testButton.onclick =()=>{
	//switchBallDir();
}

//******GLOBAL FUNCTIONS*****
switchBallDir =()=> { 
	timeDir += 1;
	timeDir %= 2;
	//causes time direction to alternate between 0 and 1 when the function is called
}

//*****VIEW STYLING*****
playingField.width = 800;
playingField.height = 800;

//*****GAME LOOP******
(function animate(time) {
	//*****FRAME DEPENDENT VARIABLE ASSIGNMENT*****
	let leftHitBox = 30;
	let rightHitBox = playingField.width-60;//30 for the width of the player and 30 for the width of the ball
	const revFrame = (frame-playingField.width)*-1

	++timeStart;
	gameReset=()=>{
		frame -= frame;
		timeStart -= timeStart;
	}
	testButton.onclick = function(){
		switchBallDir();

	}

	switch(timeDir){
		case 0:
			ballUp = frame+rightHit;
			frame += ballSpeed;
			break;
		case 1:
			ballUp = ((frame-800)*-1)+rightHit;
			frame -= ballSpeed;
			break;
	}	

	switch(leftKeys){
		case 97:
			leftY>0?leftY -= playerMovementSpeed:null;
			leftUp = true;
			break;
		case 122:
			leftY<playingField.width-100?leftY += playerMovementSpeed:null;
			leftUp = false;
			break;
	}

	switch(rightKeys){
		case 59:
			rightY>0?rightY -= playerMovementSpeed:null;
			rightUp = true;
			break;
		case 47:
			rightY<playingField.width-100?rightY += playerMovementSpeed:null;
			rightUp = false;
			break;
	}

	//*****GAME LOGIC***** 
	timeDir === 0?leftie = leftY:leftie = (leftY-700)*-1;
	timeDir === 0?rightie = rightY:rightie = (rightY-700)*-1;

	if(timeStart > 70){ //tells us when to start the game
		if(frame > rightHitBox && frame > rightie-30 && frame <rightie+100){
			//-30 to compensate for ball height
			switchBallDir();
			rightHit = rightY-20;
		}
		if(frame < leftHitBox && frame > leftie-30 && frame < leftie+100){
			switchBallDir();
			leftHit = leftY-20;
		}
		//score
		if(frame > 900 && !leftExecute){
			gameReset();
			leftScoreDoc.innerHTML = ++leftScore; 
			leftExecute = true;
		}else if(frame < 800){
			leftExecute = false;
		}
		if(frame < -100 && !rightExecute){
			gameReset();
			switchBallDir();
			rightScoreDoc.innerHTML = ++rightScore; 
			rightExecute = true;
		}else if(frame > 0){
			rightExecute = false;
		}
	}
	//*****DRAWRING*****
	//drawing Field
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,playingField.width,playingField.height)

	//drawing players
	ctx.fillStyle = '#ff5050';
	ctx.fillRect(0,leftY,30,100);//left player
	ctx.fillStyle = '#00ffcc';
	ctx.fillRect(playingField.width-30,rightY,30,100);//right Player

	//drawing ball
	ctx.fillStyle = 'white';

	ctx.fillRect(frame,ballUp,30,30);
	//console.log(revFrame);
	//console.log(revFrame)
	//console.log(leftExecute)
	//console.log(leftie)
console.log(ballUp)
	requestAnimationFrame(animate);


})();//IIFE(Immediately Invoked Function Expression)
