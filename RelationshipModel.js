//Get the canvas and context for drawing
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

//All of the images for the demonstration
const neutralCouple = new Image();
neutralCouple.src = "images/NeutralCouple.png";

const happyCouple = new Image();
happyCouple.src = "images/HappyCouple.png";

const happyCouple2 = new Image();
happyCouple2.src = "images/HappyCouple2.png";

const loveCouple = new Image();
loveCouple.src = "images/LoveCouple.png";

const loveCouple2 = new Image();
loveCouple2.src = "images/LoveCouple2.png";

const smirkCouple = new Image();
smirkCouple.src = "images/SmirkCouple.png";

const sadCouple = new Image();
sadCouple.src = "images/SadCouple.png";

//Global variables (might not be the best practice, but it works for this simple demo)
const aspectRatio = 16 / 9;
var steps = [];
var currentStep = 0;
var currentWidth = 100;

function draw() {
	ctx.fillStyle = "green";

	//Clear the canvas to start with a blank slate
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Draw the steps on the screen
	drawSteps();

	//Draw the couple on the current step
	ctx.drawImage(
		getPic(),
		steps[currentStep].X,
		steps[currentStep].Y - currentWidth,
		currentWidth,
		currentWidth
	);

	//draw the description text for each step
	ctx.fillStyle = "red";

	if (window.innerWidth > 1400) {
		ctx.font = "50px seriff";
		ctx.fillText(GetTextTitle(), 10, 50);
	} else if (window.innerWidth > 1200) {
		ctx.font = "40px seriff";
		ctx.fillText(GetTextTitle(), 10, 40);
	} else if (window.innerWidth > 1000) {
		ctx.font = "20px seriff";
		ctx.fillText(GetTextTitle(), 10, 20);
	} else {
		ctx.font = "15px seriff";
		ctx.fillText(GetTextTitle(), 10, 15);
	}
	//ctx.fillText(GetTextTitle(), 10, 50);
}

//Ideally, I'd probably make an object that has the picture and the text alltogether, but I'll keep it like this because it works lol.
function GetTextTitle() {
	if (currentStep == 0) {
		return "Initiation - Let's begin!";
	} else if (currentStep == 1) {
		return "Experimenting - Let's find some common interests!";
	} else if (currentStep == 2) {
		return "Intensifying - I think I like this relationship!";
	} else if (currentStep == 3) {
		return "Integrating - We are a couple now!";
	} else if (currentStep == 4) {
		return "Bonding - I Love you, Let's get married!";
	} else if (currentStep == 5) {
		return "Differentiation - I like this, you like that.";
	} else if (currentStep == 6) {
		return "Circumscribing - I'm not so sure about this...";
	} else if (currentStep == 7) {
		return "Stagnation - I don't want to talk about it...";
	} else if (currentStep == 8) {
		return "Avoiding - Let's just stay away from each other.";
	} else if (currentStep == 9) {
		return "Terminating - This is the end.";
	}
	return "You Broke It!";
}

function getPic() {
	switch (currentStep) {
		case 0:
		case 1:
			return neutralCouple;
		case 2:
			return smirkCouple;
		case 3:
			return happyCouple2;
		case 4:
			return loveCouple2;
		case 5:
			return loveCouple;
		case 6:
			return happyCouple;
		case 7:
			return happyCouple;
		case 8:
			return neutralCouple;
		case 9:
		case 10:
			return sadCouple;
		default:
			return neutralCouple;
	}
}

//Movement for the steps and getting the couple to move through the relationship model
document.onkeydown = function (e) {
	if (e.key == "a") {
		if (currentStep > 0) {
			currentStep--;
			draw();
		}
	}
	if (e.key == "d") {
		if (currentStep < steps.length - 1) {
			currentStep++;
			draw();
		}
	}
	if (e.key == "ArrowLeft") {
		if (currentStep > 0) {
			currentStep--;
			draw();
		}
	}
	if (e.key == "ArrowRight") {
		if (currentStep < steps.length - 1) {
			currentStep++;
			draw();
		}
	}
};
btnLeft.addEventListener("click", function () {
	//btnLeft.blur();
	const event = new KeyboardEvent("keydown", {
		key: "a",
	});
	document.dispatchEvent(event);
});
btnRight.addEventListener("click", function () {
	//btnRight.blur();
	const event = new KeyboardEvent("keydown", {
		key: "d",
	});
	document.dispatchEvent(event);
});

function drawSteps() {
	let currentX = 2; //canvas.width * 0.01;
	let currentY = canvas.height * 0.9;
	//Clear array so we have the most current information

	//Dynamically draw the steps based on the canvas size
	const stepWidth = canvas.width * 0.01;
	const stepHeight = (canvas.height * 0.7) / 4;

	currentWidth = stepHeight;

	steps = [];
	steps.push({ X: currentX, Y: currentY });
	//(X, Y, Width, Height))
	//steps going up
	for (let i = 0; i < 5; i++) {
		ctx.fillRect(currentX, currentY, stepWidth, stepHeight);
		ctx.fillRect(currentX, currentY, stepHeight, stepWidth);
		currentX += stepHeight;
		currentY -= stepHeight - stepWidth;
		if (i < 4) steps.push({ X: currentX, Y: currentY });
	}
	//Reset the Y position for the flat part of the top of the stairs
	currentY += stepHeight - stepWidth;
	//Steps going down
	for (let i = 0; i < 5; i++) {
		steps.push({ X: currentX + stepWidth, Y: currentY });
		ctx.fillRect(currentX, currentY, stepHeight, stepWidth);
		currentX += stepHeight;
		ctx.fillRect(currentX, currentY, stepWidth, stepHeight);
		//currentX += 100;
		currentY += stepHeight - stepWidth;
	}
	// console.log(steps);
	//console.log(currentStep);
}

//Make canvas resize depending on the screen size :)... definitely not perfect the way it scales, but it works enough for this assignment lol.
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function resizeCanvas() {
	const width = window.innerWidth * 0.85;
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

document.body.onload = function () {
	draw();
};
