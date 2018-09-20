var  JOY_DIVISON_FILE = 'assets/Joy_Division-Disorder.mp3';
var start = 110;
var end = 140;
var NUMLINES = 32;
var p = 0;
var CUT_SPEC = NUMLINES;//NUMLINES*10;
var inc = 0.001;
var starting = 0.0;
var LEN = 1024/NUMLINES - 10;
var randoms = new Array(LEN).fill(0);

function preload() {
	myFont = loadFont('assets/Helmet-Regular.ttf');
}

function setup() {
  colorMode(HSB,1,1,1);
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.mouseClicked(togglePlay);
	stroke(255);
  mic = new p5.AudioIn()
  mic.start();
	fft = new p5.FFT(0.9, 1024);
  mic.connect(fft);
	noiseDetail(12, 0.8);
	for (var i = 0; i < 1024/NUMLINES - 10; i++) {
		//randoms[i] = random();
		randoms[i] = 0;
	}
}

function draw() {
stroke(0,0,0,0);
fill(1,0,0,0.1);
rect(0,0, width ,height);
	//background(0);
	textAlign(CENTER);
	textFont(myFont);
	fill(255);
	textSize(36);
	//text("Joy Divisualizer", width/2, 40);
	textSize(24);
fill(1,0,0.5);
	text("based on Joy Divisualizer by Eliana Abraham", width/2, height-10);
	fill(0,0,0,0);
	textSize(24);
	//text("Click to Play/Pause", width/2, height - 10);
	var spectrum = fft.analyze();
	//stroke(255);
	strokeWeight(3);
	var sep = 200;
	//var mult = 1.5;
	var mult = 10;
	for (var j = 0; j < (spectrum.length - CUT_SPEC); j+=NUMLINES) {
		var xoff = randoms[j/NUMLINES] + starting;
		beginShape();
		p = 0;
		// mult *= 1.15;
		//mult *= 1.1;
		for (var i = j; i < (j + NUMLINES + 1); i++) {
      stroke(i*0.9/(spectrum.length - CUT_SPEC + NUMLINES),1,1);
			var beforeY = mult;
			/*if (p <= NUMLINES/2) {
				beforeY = mult*cos(map(p, 0, NUMLINES/2, radians(-180), radians(0)));
				if (beforeY <= 0.0)
					beforeY = 0.0;
			} else {
				beforeY = mult*cos(map(p, NUMLINES/2 + 1, NUMLINES, radians(0), radians(180)));
				if (beforeY <= 0.0)
					beforeY = 0.0;
			}*/
			var addNoise = map(noise(xoff), 0, 1, -5, 2);
			xoff += 0.08;
			var x = map(p, 0, NUMLINES, 1*width/10, 9*width/10);
			var y = 0;
			if (true) {
				if (beforeY*spectrum[i] == 0) {
					//y = end + sep - addNoise;
					y = end + sep;
					if (addNoise < 0) {
						y = end + sep;
					}
				} else {
					if (addNoise < 0) {
						addNoise = 0;
					}
					//y = map(beforeY*spectrum[i], 0, 255, end + sep, start + sep) - addNoise;
					y = map(beforeY*spectrum[i], 0, 255, end + sep, start + sep);
				}
			} else {
				y = map(beforeY*spectrum[i], 0, 255, end + sep, start + sep);
			}
			// console.log(start + sep, end + sep, y);
			curveVertex(x, y);
			p++;	
		}
		endShape();
		sep += 20;
	}
	starting += inc;
}

function togglePlay() {
	if (joydivtrack.isPlaying()) {
	  joydivtrack.pause();
	} else {
	  joydivtrack.loop();
	}
}
