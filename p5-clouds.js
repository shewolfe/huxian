var canvas;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(random(150, 200), random(150, 200), 255);
}

var agents = [];
var count = 0;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1");

	background(random(150, 200), random(150, 200), 255);

	for (var i = 0; i < 33; i++) {
		agents.push(new Agent());
	}
}

function draw() {
	for (var i = 0; i < 33; i++) {
		agents[i].draw();
	}

	count++;
}

function Agent() {
	this.x = random(windowWidth);
	this.y = random(windowHeight);
}

Agent.prototype.draw = function () {
	if (count < 10) {
		stroke(random(225, 255), random(225, 255), 255, 5);
		strokeWeight(random(1, 150));

		line(this.lastX, this.lastY, this.x, this.y);
		this.lastX = this.x;
		this.lastY = this.y;

		this.x = this.x + random(-15, 15);

		if (this.x < 0) {
			this.x = abs(this.x);
		} else if (this.x > windowWidth) {
			this.x = abs(this.x - windowWidth);
		}

		this.y = this.y + random(-3, 3);

		if (this.y < 0) {
			this.y = abs(this.y);
		} else if (this.y > windowHeight) {
			this.y = abs(this.y - windowHeight);
		}

		//console.log(this.x, this.y);
	} else {
		count = 0;
		background(random(100, 255), random(100, 255), 255, 10);
	}
};
