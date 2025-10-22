const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//All of the images for the demonstration
const neutralCouple = new Image();
neutralCouple.src = "images/neutralCouple.png";

const happyCouple = new Image();
happyCouple.src = "images/happyCouple.png";

const loveCouple = new Image();
loveCouple.src = "images/loveCouple.png";

const sadCouple = new Image();
sadCouple.src = "images/sadCouple.png";

const speed = 5;
var finishline = canvas.width - 200;
var steps = [];
var currentStep = 0;
let gameOver = false;
let gameReady = false;

let player = {
	x: 10,
	y: 100,
};

function restart() {
	gameOver = false;
	player.x = 10;
	gameReady = true;
	draw();
	ctx.font = "bold 50px seriff";
	ctx.fillText("Press Space to Start Race", 150, 50);
}

function draw() {
	ctx.fillStyle = "green";
	//Clear the canvas to start with a blank slate
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSteps();

	//Draw the player on the screen
	ctx.drawImage(
		getPic(),
		steps[currentStep].X,
		steps[currentStep].Y - neutralCouple.height
	);
}

function getPic() {
	switch (currentStep) {
		case 0:
		case 1:
			return neutralCouple;
		case 2:
		case 3:
			return happyCouple;
		case 4:
		case 5:
			return loveCouple;
		case 6:
			return happyCouple;
		case 7:
		case 8:
			return neutralCouple;
		case 9:
		case 10:
			return sadCouple;
		default:
			return neutralCouple;
	}
}

function update() {
	finishline = canvas.width - 200;
	if (player.x > finishline) {
		ctx.font = "50px seriff";
		ctx.fillText("Congrats! You Win!", 200, 50);
		cancelAnimationFrame(gameLoop);
		gameOver = true;
		document.getElementById("btnStart").textContent = "Restart Race";
	} else if (false) {
		ctx.fillText("Boo Hoo, You LOSE!", 200, 50);
		cancelAnimationFrame(gameLoop);
		gameOver = true;
		document.getElementById("btnStart").textContent = "Restart Race";
	}
}

function gameLoop() {
	draw();
	update();
	if (!gameOver) {
		requestAnimationFrame(gameLoop);
	}
}

document.body.onload = function () {
	draw();
	restart();
};

document.onkeydown = function (e) {
	if (e.key == "e") {
		player.x += 100;
	}
	if (e.key == "q") {
		player.x -= 100;
	}
	if (e.key == "a") {
		if (currentStep > 0) {
			currentStep--;
			draw();
		}
	}
	if (e.key == "w") {
		player.y -= speed;
	}
	if (e.key == "s") {
		player.y += speed;
	}
	if (e.key == "d") {
		if (currentStep < steps.length - 1) {
			currentStep++;
			draw();
		}
	}
	if (e.key == " " && gameReady) {
		requestAnimationFrame(gameLoop);
	}
};

function drawSteps() {
	let currentX = canvas.width * 0.01;
	let currentY = canvas.height * 0.9;
	steps = [];
	steps.push({ X: currentX, Y: currentY });
	//(X, Y, Width, Height))
	//steps going up
	for (let i = 0; i < 5; i++) {
		ctx.fillRect(currentX, currentY, 10, 100);
		ctx.fillRect(currentX, currentY, 100, 10);
		currentX += 100;
		currentY -= 90;
		if (i < 4) steps.push({ X: currentX, Y: currentY });
	}
	//Reset the Y position for the flat part of the top of the stairs
	currentY += 90;
	//Steps going down
	for (let i = 0; i < 5; i++) {
		steps.push({ X: currentX + 10, Y: currentY });
		ctx.fillRect(currentX, currentY, 100, 10);
		currentX += 100;
		ctx.fillRect(currentX, currentY, 10, 100);
		//currentX += 100;
		currentY += 90;
	}
	console.log(steps);
	console.log(currentStep);
}

document.getElementById("btnStart").onclick = function () {
	gameOver = true;
	gameReady = false;
	restart();
};

//Make canvas resize depending on the screen size :)... definitely not perfect, but it works enough for this assignment lol.
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function resizeCanvas() {
	const aspectRatio = 16 / 9;
	const width = window.innerWidth * 0.7;
	const height = window.innerHeight * 0.85;

	if (width / height > aspectRatio) {
		canvas.width = height * aspectRatio;
		canvas.height = height;
	} else {
		canvas.width = width;
		canvas.height = width / aspectRatio;
	}
	draw();
}
