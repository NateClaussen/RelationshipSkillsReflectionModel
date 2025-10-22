const canvas = document.getElementById("canvas");
canvas.width = 1400;
canvas.height = 600;

let fly = false;
let counter = 5;

const ctx = canvas.getContext("2d");

const RocketImage = new Image();
RocketImage.src = "images/idleRocket.png";

const RocketTwoImage = new Image();
RocketTwoImage.src = "images/fly1Rocket.png";

const RocketThreeImage = new Image();
RocketThreeImage.src = "images/fly2Rocket.png";

class Rocket {
	constructor(x, y) {
		this.X = x;
		this.Y = y;
		this.R = 0;
		this.image = RocketImage;

		this.dx = 0.5;
		this.dy = -0.5;
		this.dz = 1;

		this.draw = function () {
			ctx.save();

			ctx.translate(
				canvas.width / 2 - 700 + this.X,
				canvas.height / 2 - 300 + this.Y
			);
			ctx.rotate((this.R * Math.PI) / 180);
			ctx.drawImage(
				this.image,
				-this.image.width / 2,
				-this.image.height / 2
			);
			ctx.restore();
		};
	}
}
let fancyRocket = new Rocket(225, 539);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//starting point
	ctx.fillStyle = "green";
	ctx.fillRect(200, 550, 50, 50);
	// finish point
	ctx.fillStyle = "red";
	ctx.fillRect(1200, 550, 50, 50);
	//draw the rocket
	fancyRocket.draw();
}

function animateRocket() {
	//Stop if they haven't started the animation yet
	if (fly == false) {
		return;
	}
	//Set the correct image
	if (fancyRocket.Y < 515) {
		fancyRocket.image = RocketThreeImage;
	} else if (fancyRocket.Y < 539) {
		fancyRocket.image = RocketTwoImage;
	} else {
		fancyRocket.image = RocketImage;
	}

	//Take off!
	if (fancyRocket.R < 50 && fancyRocket.X < 626) {
		fancyRocket.X += fancyRocket.dx;
		fancyRocket.Y += fancyRocket.dy;
		fancyRocket.R += fancyRocket.dz;
	}

	//Initial climb
	if (fancyRocket.R >= 50 && fancyRocket.X < 626) {
		fancyRocket.X += fancyRocket.dx * 3;
		fancyRocket.Y -= fancyRocket.dx * 2;
	}

	//start descent
	if (fancyRocket.X < 1225 && fancyRocket.X > 626) {
		if (fancyRocket.R < 59) {
			fancyRocket.R += 1;
		}
		fancyRocket.X += fancyRocket.dx * 3;
		fancyRocket.Y -= fancyRocket.dx;
	}
	//Rotate back and land!
	if (fancyRocket.X >= 1225 && fancyRocket.Y < 540) {
		if (fancyRocket.R > 0) {
			fancyRocket.R -= 2;
		}
		fancyRocket.Y -= fancyRocket.dy * 3;
	}

	draw();
	//If the animation is not done, then request a new frame and play it...
	if (fancyRocket.X <= 1225 && fancyRocket.Y < 540 && fly == true) {
		requestAnimationFrame(animateRocket);
	} else {
		//else stop the animation
		ctx.fillText("You made it, Mission Complete!!", 375, 50);
		fly = false;
	}
}

//Reset all of the variables
function reset() {
	fly = false;
	counter = 5;
	fancyRocket.X = 225;
	fancyRocket.Y = 539;
	fancyRocket.R = 0;
	draw();
	ctx.font = "bold 50px seriff";
	ctx.fillText("Press Space to Start Countdown", 375, 50);
}
//Starts the countdowna nd requests the animation frame when it's done.
function startCountdown() {
	if (counter == 0) requestAnimationFrame(animateRocket);
	if (counter > 0) {
		draw();
		ctx.fillText(counter--, canvas.width / 2, canvas.height / 2);
		setTimeout(startCountdown, 1000);
		fly = true;
	}
}

//Make sure that everything is reset and drawn when the page loads.
document.body.onload = function () {
	reset();
};

document.getElementById("startButton").onclick = function (e) {
	//Make it so that the button can't be focused because this makes it start the animation and immediately cancel it to the reset position.
	e.target.blur();
	if (fly == false) reset();
};

document.onkeydown = function (e) {
	//Remove the fly == false if you want to make the rocket go super quick by spamming the space bar!
	if (e.key == " " && fly == false) {
		startCountdown();
	}
};
