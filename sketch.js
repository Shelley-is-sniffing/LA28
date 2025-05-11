let img;
let vessel;
let spacing = 8;

function preload() {
  img = loadImage('Coliseum.jpeg');   
  vessel = loadImage('Coliseum.jpeg');
}

function setup() {
  createCanvas(1000, 650);
  img.resize(width / spacing, height / spacing);
  vessel.resize(width / spacing, height / spacing);
  ellipseMode(CENTER);
  noStroke();
}

function draw() {
  background(0);

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = img.get(x, y);
      let b = brightness(c);
      let baseRadius = map(b, 0, 255, spacing*2, 1);

      let posX = x * spacing;
      let posY = y * spacing;

      let finalRadius = baseRadius;
      let hover = dist(mouseX, mouseY, posX, posY) < 60;

      if (hover) {
        let explodeFactor = 2.5 + sin(frameCount * 0.3 + x * 0.5 + y * 0.5) * 1.5;
        finalRadius *= explodeFactor;

        let vesselColor = vessel.get(x, y);
        fill(vesselColor);
        ellipse(posX, posY, finalRadius, finalRadius);
      } else {
        fill(255, map(b, 0, 50, 220,200));
        ellipse(posX, posY, finalRadius, finalRadius-5);
      }

      
      
    }
  }
}
