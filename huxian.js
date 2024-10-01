// constants

const bulbEmissiveOn = {
	property: "material.emissiveIntensity",
	from: 1,
	to: 0.66,
};

const bulbMetalnessOn = {
	property: "material.metalness",
	from: 1,
	to: 0.5,
};

const bulbEmissiveOff = {
	property: "material.emissiveIntensity",
	from: 1,
	to: 1,
};

const bulbMetalnessOff = {
	property: "material.metalness",
	from: 1,
	to: 1,
};

// tail colors: dark blue to peach

const tailColors = chroma
	.scale(["#A1ACFF", "#FFDEA4", "#A1ACFF"])
	.mode("lab")
	.colors(9);

// fetch entities

const foxW = document.querySelector("#fox");
const foxG = document.querySelector("#fox-gold");
const foxHead = document.querySelector("#head");
const foxTails = document.querySelector("#ninetails");
const tail1 = document.querySelector("#tail-1");
const tail2 = document.querySelector("#tail-2");
const tail3 = document.querySelector("#tail-3");
const tail4 = document.querySelector("#tail-4");
const tail5 = document.querySelector("#tail-5");
const tail6 = document.querySelector("#tail-6");
const tail7 = document.querySelector("#tail-7");
const tail8 = document.querySelector("#tail-8");
const tail9 = document.querySelector("#tail-9");
const incense = document.querySelector("#incense");
const orangesL = document.querySelector("#oranges-l");
const orangesR = document.querySelector("#oranges-r");
const waterL = document.querySelector("#water-l");
const waterC = document.querySelector("#water-c");
const waterR = document.querySelector("#water-r");
const bulbL = document.querySelector("#bulb-l");
const bulbR = document.querySelector("#bulb-r");

// fetch bgs

const bgFire1 = document.querySelector("#bg-fire1");
const bgFire2 = document.querySelector("#bg-fire2");
const bgFire3 = document.querySelector("#bg-fire3");
const bgGlow = document.querySelector("#bg-glow");

// fetch buttons

const buttonStart = document.querySelector("#button-start");
const buttonSound = document.querySelector("#button-sound");

// functions

[bulbL, bulbR].forEach((e) => {
	e.setAttribute("animation__emissive", bulbEmissiveOn);
	e.setAttribute("animation__emissive", { enabled: false });
	e.setAttribute("animation__metalness", bulbMetalnessOn);
	e.setAttribute("animation__metalness", { enabled: false });
	e.setAttribute("animation__emissiveoff", bulbEmissiveOff);
	e.setAttribute("animation__metalnessoff", bulbMetalnessOff);
});

[tail1, tail2, tail3, tail4, tail5, tail6, tail7, tail8, tail9].forEach(
	(e, i) => {
		e.setAttribute("animation__tails", {
			property: "material.color",
			from: "#FFFFFF",
			to: tailColors[i],
			autoplay: "true",
			loop: "true",
			easing: "linear",
			dir: "alternate",
			dur: "3000",
			enabled: "false",
		});
	}
);

let sound = document.getElementById("audio");
let animating = false;

function audioPause() {
	sound.pause();
	if (animating) {
		buttonSound.innerHTML = "🔇";
	} else {
		buttonSound.innerHTML = "";
	}
}

function audioPlay() {
	buttonSound.innerHTML = "🔊";
	sound.load();
	sound.play();
	sound.loop = true;
	sound.addEventListener("timeupdate", function () {
		var buffer = 2;
		if (this.currentTime > this.duration - buffer) {
			this.currentTime = 2;
			this.play();
		}
	});
}

function audioToggle() {
	if (sound.paused) {
		audioPlay();
	} else {
		audioPause();
	}
}

buttonStart.innerHTML = "▶️️";
buttonSound.innerHTML = "";

buttonSound.onclick = () => {
	audioToggle();
};

buttonStart.onclick = () => {
	animating = !animating;

	if (animating) {
		buttonStart.innerHTML = "⏸️";
		audioPlay();
	} else {
		buttonStart.innerHTML = "▶️️";
		audioPause();
	}

	[orangesL, orangesR, incense, waterL, waterC, waterR, foxW, foxG].forEach(
		(e) => e.setAttribute("visible", !e.getAttribute("visible"))
	);

	[bgFire1, bgFire2, bgFire3].forEach((e) => {
		if (e.style.visibility == "hidden") {
			e.style.visibility = "visible";
		} else {
			e.style.visibility = "hidden";
		}
	});

	[bgGlow].forEach((e) => {
		if (e.style.visibility == "visible") {
			e.style.visibility = "hidden";
		} else {
			e.style.visibility = "visible";
		}
	});

	[bulbL, bulbR].forEach((e) => {
		e.setAttribute("animation__emissive", {
			enabled: !e.getAttribute("animation__emissive").enabled,
		});
		e.setAttribute("animation__metalness", {
			enabled: !e.getAttribute("animation__metalness").enabled,
		});
		e.setAttribute("animation__emissiveoff", {
			enabled: !e.getAttribute("animation__emissive").enabled,
		});
		e.setAttribute("animation__metalnessoff", {
			enabled: !e.getAttribute("animation__metalness").enabled,
		});
	});

	[foxHead].forEach((e) => {
		e.setAttribute("animation__rotation", {
			enabled: !e.getAttribute("animation__rotation").enabled,
		});
		e.setAttribute("animation__position", {
			enabled: !e.getAttribute("animation__position").enabled,
		});
	});

	[tail1, tail2, tail3, tail4, tail6, tail7, tail8, tail9].forEach((e) => {
		e.setAttribute("animation", {
			enabled: !e.getAttribute("animation").enabled,
		});
	});

	[ninetails].forEach((e) => {
		e.setAttribute("animation__rotation", {
			enabled: !e.getAttribute("animation__rotation").enabled,
		});
		e.setAttribute("animation__position", {
			enabled: !e.getAttribute("animation__position").enabled,
		});
	});

	[tail1, tail2, tail3, tail4, tail5, tail6, tail7, tail8, tail9].forEach(
		(e) => {
			e.setAttribute("animation__tails", {
				enabled: !e.getAttribute("animation__tails").enabled,
			});
		}
	);
};

document.getElementById("button-info").onclick = () => {
	document.getElementById("info").style.visibility = "visible";
	document.getElementById("button-x").style.visibility = "visible";
	document.getElementById("button-info").style.visibility = "hidden";
};

document.getElementById("button-x").onclick = () => {
	document.getElementById("info").style.visibility = "hidden";
	document.getElementById("button-x").style.visibility = "hidden";
	document.getElementById("button-info").style.visibility = "visible";
};
