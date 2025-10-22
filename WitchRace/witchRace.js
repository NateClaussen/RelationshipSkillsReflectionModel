const canvas = document.getElementById("canvas");

var finishline = canvas.width - 200;

const ctx = canvas.getContext("2d");

//All of the images for the demonstration
const neutralCouple = new Image();
neutralCouple.src = "images/neutralCouple.png";

const happyCouple = new Image();
happyCouple.src = "images/happyCouple.png";

const loveCouple = new Image();
loveCouple.src = "images/loveCouple.png";

const player1Img = new Image();
player1Img.src = "images/pinkHat.png";

const player2Img = new Image();
player2Img.src = "images/purpleHat.png";

const speed = 5;
let gameOver = false;
let gameReady = false;

let player = {
	x: 10,
	y: 100,
};

let comp = {
	x: 10,
	y: 200,
};

function restart() {
	gameOver = false;
	player.x = 10;
	comp.x = 10;
	gameReady = true;
	draw();
	ctx.font = "bold 50px seriff";
	ctx.fillText("Press Space to Start Race", 150, 50);
}

function draw() {
	finishline = canvas.width - 200;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Draw the finish line
	ctx.fillRect(finishline, 0, 10, canvas.height);
	//Draw the player on the screen
	ctx.drawImage(player1Img, player.x, player.y);
	//Draw the opponent on the screen
	ctx.drawImage(player2Img, comp.x, comp.y);
}

function update() {
	finishline = canvas.width - 200;
	if (player.x > finishline && comp.x < player.x) {
		ctx.font = "50px seriff";
		ctx.fillText("Congrats! You Win!", 200, 50);
		cancelAnimationFrame(gameLoop);
		gameOver = true;
		document.getElementById("btnStart").textContent = "Restart Race";
	} else if (comp.x > finishline && player.x < comp.x) {
		ctx.fillText("Boo Hoo, You LOSE!", 200, 50);
		cancelAnimationFrame(gameLoop);
		gameOver = true;
		document.getElementById("btnStart").textContent = "Restart Race";
	}

	comp.x += 1;
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
};

document.onkeydown = function (e) {
	if (e.key == "e") {
		player.x += 100;
	}
	if (e.key == "q") {
		player.x -= 100;
	}
	if (e.key == "a") {
		player.x -= speed;
	}
	if (e.key == "w") {
		player.y -= speed;
	}
	if (e.key == "s") {
		player.y += speed;
	}
	if (e.key == "d") {
		player.x += speed;
	}
	if (e.key == " " && gameReady) {
		requestAnimationFrame(gameLoop);
	}
};

document.getElementById("btnStart").onclick = function () {
	gameOver = true;
	gameReady = false;
	restart();
};

//Make canvas resize depending on the screen size :)
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function resizeCanvas() {
	const aspectRatio = 16 / 9;
	const width = window.innerWidth * 0.9;
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
