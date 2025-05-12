let img;
let vessel;
let spacing = 8;
let glitchTimer = 0;
let glitchActive = false;
let prevIsCenter = null;
let mainsound = [];
let altsound = [];

function preload() {
  img = loadImage("Coliseum.jpeg");
  vessel = loadImage('Coliseum.jpeg');
  mainsound[0] = loadSound('mainSound1.mp3');
  mainsound[1] = loadSound('mainSound2.mp3');
  mainsound[2] = loadSound('mainSound3.mp3');
  mainsound[3] = loadSound('mainSound4.mp3');
  mainsound[4] = loadSound('mainSound5.mp3');
  mainsound[5] = loadSound('mainSound6.mp3');
  mainsound[6] = loadSound('mainSound7.mp3');
  altsound[0] = loadSound('altSound0.mp3');
  altsound[1] = loadSound('altSound1.mp3');
  altsound[2] = loadSound('altSound2.mp3');
  altsound[3] = loadSound('altSound3.mp3');
  altsound[4] = loadSound('altSound4.mp3');
  altsound[5] = loadSound('altSound5.mp3');
  altsound[6] = loadSound('altSound6.mp3');
  altsound[7] = loadSound('altSound7.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(width / spacing, height / spacing);
  vessel.resize(width / spacing, height / spacing);
  ellipseMode(CENTER);
  noStroke();
}

function draw(){
  background(0);
  
  fill(255, 20);
  ellipse(width/2, height/2, 160,160);

// Sound control

  let d = dist(mouseX, mouseY, width/2, height/2);

   let isCenter = d < 160;

  // 检测状态变化（切换中心和外圈时触发 glitch）
  if (prevIsCenter !== null && prevIsCenter !== isCenter) {
    glitchTimer = 20; // glitch 持续的帧数
    glitchActive = true;
  }
prevIsCenter = isCenter;
  if (d < 160) {
  let angle = atan2(mouseY - height/2, mouseX -width/2);
  if (angle < 0) angle += TWO_PI;
  let sector = floor(map(angle, 0, TWO_PI, 0, 7));

  for (let i = 0; i < mainsound.length; i++) {
  if (i === sector) {
    if (!mainsound[i].isPlaying()) mainsound[i].loop();
  } else {
      for (let i = 0; i < altsound.length; i++) {
      altsound[i].stop();
      }
  }
  }

  } else {
  // 外圏：altsound
    let angle = atan2(mouseY - 160, mouseX - 160);
    if (angle < 0) angle += TWO_PI;
    let sector = floor(map(angle, 0, TWO_PI, 0, altsound.length));

    for (let i = 0; i < altsound.length; i++) {
      if (i === sector) {
        if (!altsound[i].isPlaying()) altsound[i].loop();
        } else {
        altsound[i].stop();
        }
    }

// 停止 mainsound
    for (let i = 0; i < mainsound.length; i++) {
      mainsound[i].stop();
    }
  }

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
  if (glitchActive) {
  applyGlitch();
  glitchTimer--;
  if (glitchTimer <= 0) {
    glitchActive = false;
  }
}

}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}

function applyGlitch() {
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(10, 100);
    let h = random(2, 10);
    copy(x, y, w, h, x + random(-10, 10), y + random(-10, 10), w, h);
  }
}
