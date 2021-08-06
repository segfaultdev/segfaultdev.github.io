let terminus, terminus_bold;

function preload() {
  terminus = loadFont("assets/terminus.ttf");
  terminus_bold = loadFont("assets/terminus_bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51, 51, 51);

  textFont(terminus);
  textSize(48);

  text("Hello, world!", width / 2, height / 2);
}