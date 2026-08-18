const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const pauseButton = document.getElementById("pauseButton");

const bottomHudY = 550;
const bottomHudHeight = 170;

ctx.imageSmoothingEnabled = false;

const scoreElement = document.getElementById("score");

const energyFill = document.getElementById("energyFill");
const energyText = document.getElementById("energyText");

const welcomeImage = new Image();
welcomeImage.src = "assets/ui/welcome-page-mobile.png";

const quinnyButton = document.getElementById("quinnyButton");
const quinnyPopup = document.getElementById("quinnyPopup");

const simonIdleImage = new Image();
simonIdleImage.src = "assets/simon/simon-idle.png";

const simonRun01Image = new Image();
simonRun01Image.src = "assets/simon/simon-run-01.png";

const simonRun02Image = new Image();
simonRun02Image.src = "assets/simon/simon-run-02.png";

const simonJumpImage = new Image();
simonJumpImage.src = "assets/simon/simon-jump.png";

const quinny01Image = new Image();
quinny01Image.src = "assets/quinny/quinny-01.png";

const quinny02Image = new Image();
quinny02Image.src = "assets/quinny/quinny-02.png";

const johnKeltonImage = new Image();
johnKeltonImage.src = "assets/john/jk-01.png";

const midRailImage = new Image();
midRailImage.src = "assets/background/mid-rail.png";

const farRailImage = new Image();
farRailImage.src = "assets/background/far-rail.png";

const turfNearImage = new Image();
turfNearImage.src = "assets/background/turf-near.png";

const turfFarImage = new Image();
turfFarImage.src = "assets/background/turf-far.png";

const sbBannerImage = new Image();
sbBannerImage.src = "assets/branding/sb-banner.png";

const vegetationImage = new Image();
vegetationImage.src = "assets/background/vegetation.png";

const grandstandImage = new Image();
grandstandImage.src = "assets/background/grandstand.png";

const obstacleImage = new Image();
obstacleImage.src = "assets/obstacles/obstacle.png";

const clouds01Image = new Image();
clouds01Image.src = "assets/background/clouds-01.png";

const clouds02Image = new Image();
clouds02Image.src = "assets/background/clouds-02.png";

let score = 0;
let energy = 100;

let backgroundX = 0;

let midRailX = 0;
const midRailSpeed = 3;

let farRailX = 0;
const farRailSpeed = 1.5;

let turfNearX = 0;
let turfFarX = 0;

let cloudsX = 0;

const cloudsSpeed = 0.4;
const cloudsWidth = 1200;
const cloudsHeight = 300;

const turfNearSpeed = 4;
const turfFarSpeed = 1.5;

const backgroundSpeed = 5;

const gravity = 0.8;

const player = {
  x: 140,
  y: 260,

  width: 200,
  height: 200,

  velocityY: 0,
  jumpStrength: -21,
  grounded: true
};

let jumpCount = 0;
const maxJumps = 2;

let runFrame = 0;
let animationTimer = 0;

const animationSpeed = 10;

let bannerX = 0;
const bannerSpeed = 3.5;

let sceneryX = 0;

const scenerySpeed = 1.2;

const vegetationWidth = 480;
const vegetationHeight = 220;

const grandstandWidth = 600;
const grandstandHeight = 260;

const obstacles = [];

let obstacleTimer = 0;

let nextObstacleTime = 120;

let gameOver = false;

let gameStarted = false;

let gamePaused = false;

let showWelcome = true;

let showQuinny02 = false;
let energyBeforeQuinny = 0;

const trackReports = [

  "Track is looking good today. Expect a pretty straightforward run.",

  "The surface has a little give in it. You'll want to stay balanced early.",

  "Conditions are quick today. This could get interesting.",

  "The rail is out and there's not much room for error. Pick your line carefully.",

  "A few tricky sections out there today. Don't get caught napping.",

  "Track looks excellent. No excuses today.",

  "There's a bit happening out there. I'd be keeping something in reserve.",

  "Good racing surface today. The horse should appreciate these conditions."

];

let currentTrackReport = "";

function selectTrackReport() {

  const randomIndex = Math.floor(
    Math.random() * trackReports.length
  );

  currentTrackReport = trackReports[randomIndex];

}

function drawWelcomeScreen() {

  ctx.drawImage(
    welcomeImage,
    0,
    0,
    canvas.width,
    canvas.height
  );

}

function drawTrackReport() {

  // =========================
  // BACKGROUND
  // =========================

  ctx.fillStyle = "#07152d";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  // =========================
  // HEADER
  // =========================

  ctx.fillStyle = "#f2a900";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    8
  );


  ctx.fillStyle = "white";
  ctx.textAlign = "left";

  ctx.font = 'bold 38px "Press Start 2P"';

  ctx.fillText(
    "TRACK REPORT",
    60,
    80
  );


  // Small divider
  ctx.fillStyle = "#f2a900";

  ctx.fillRect(
    60,
    105,
    1160,
    4
  );


  // =========================
  // JOHN KELTON
  // =========================

  const johnWidth = 280;
  const johnHeight = 280;

  const johnX = 70;
  const johnY = 155;

  ctx.drawImage(
    johnKeltonImage,
    johnX,
    johnY,
    johnWidth,
    johnHeight
  );


  // =========================
  // JOHN NAMEPLATE
  // =========================

  ctx.fillStyle = "#f2a900";

  ctx.fillRect(
    70,
    435,
    280,
    55
  );


  ctx.fillStyle = "#07152d";

  ctx.font = 'bold 20px "Press Start 2P"';

  ctx.textAlign = "center";

  ctx.fillText(
    "JOHN KELTON",
    210,
    470
  );


  // =========================
  // TRACK REPORT BOX
  // =========================

  const reportX = 400;
  const reportY = 155;

  const reportWidth = 800;
  const reportHeight = 335;


  ctx.fillStyle = "#101820";

  ctx.fillRect(
    reportX,
    reportY,
    reportWidth,
    reportHeight
  );


  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;

  ctx.strokeRect(
    reportX,
    reportY,
    reportWidth,
    reportHeight
  );


  // Little yellow heading
  ctx.fillStyle = "#f2a900";

  ctx.font = 'bold 18px "Press Start 2P"';

  ctx.textAlign = "left";

  ctx.fillText(
    "JOHN KELTON SAYS:",
    reportX + 35,
    reportY + 55
  );


  // =========================
  // TRACK REPORT TEXT
  // =========================

  ctx.fillStyle = "white";

  ctx.font = '30px "VT323"';

  wrapText(
    ctx,
    currentTrackReport,

    reportX + 35,
    reportY + 115,

    reportWidth - 70,
    38
  );


  // =========================
  // START PROMPT
  // =========================

  ctx.textAlign = "center";

  ctx.fillStyle = "#f2a900";

  ctx.font = 'bold 20px "Press Start 2P"';

  ctx.fillText(
    "TAP TO START",
    canvas.width / 2,
    585
  );


  ctx.fillStyle = "white";

  ctx.font = '22px "VT323"';

  ctx.fillText(
    "SD says the track is fine. Kelts actually checked.",
    canvas.width / 2,
    630
  );


  // =========================
  // CREDIT
  // =========================

  ctx.fillStyle = "#7f8c8d";

  ctx.font = '26px "VT323"';

  ctx.fillText(
    "made by kevie.monkeyking",
    canvas.width / 2,
    685
  );


  ctx.textAlign = "left";

}

function drawBottomHUD() {

  const hudY = 550;
  const hudHeight = 170;

  // Dark HUD background
  ctx.fillStyle = "#101820";

  ctx.fillRect(
    0,
    hudY,
    canvas.width,
    hudHeight
  );

  // Top border
  ctx.fillStyle = "#f2a900";

  ctx.fillRect(
    0,
    hudY,
    canvas.width,
    4
  );


  // =========================
  // SCORE - LEFT
  // =========================

  ctx.fillStyle = "white";

  ctx.font = '22px "Press Start 2P"';

  ctx.textAlign = "left";

  ctx.fillText(
    "SCORE",
    40,
    hudY + 45
  );


  ctx.font = '42px "VT323"';

  ctx.fillText(
    Math.floor(score / 10),
    40,
    hudY + 95
  );


  // =========================
  // ENERGY - RIGHT
  // =========================

  ctx.font = '22px "Press Start 2P"';

  ctx.fillText(
    "ENERGY",
    850,
    hudY + 45
  );


  // Energy bar background
  ctx.fillStyle = "#333";

  ctx.fillRect(
    850,
    hudY + 65,
    330,
    30
  );


  // Energy bar
  if (energy <= 25) {

    ctx.fillStyle = "#ff4b3e";

  } else {

    ctx.fillStyle = "#4cd137";

  }

  ctx.fillRect(
    850,
    hudY + 65,
    330 * (energy / 100),
    30
  );


  // Energy bar border
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;

  ctx.strokeRect(
    850,
    hudY + 65,
    330,
    30
  );


  ctx.fillStyle = "white";
  ctx.font = '32px "VT323"';

  ctx.fillText(
    Math.round(energy) + "%",
    1190,
    hudY + 90
  );


  ctx.textAlign = "left";

}

const sdQuotes = [

  // DAD JOKES
  "Why did the horse cross the road? To say HAY!",
  "This race is un-STABLE!",
  "I'm feeling a little HOARSE!",
  "Hay Siz... heard that one before?",
  "I'm not horsing around!",
  "This is a NEIGH-biting finish!",
  "I asked the horse for advice... he said NEIGH.",
  "I'm outstanding in my field!",
  "Hay! That's my favourite food!",
  "What time do horses go to sleep? At Knight time",
  "How do horses communicate over long distances? Horse code",
  "Where do horse live Down Under? Syd-neigh Australia",

  // SIZ / ETHAN TEASING
  "SIZ! Are you actually producing?",
  "Keep up, Siz!",
  "You getting this, Ethan?",
  "Siz, less producing... more cheering!",
  "Ethan! Tell Quinny I need backup!",
  "Siz! This one's going in the highlights!",
  "How's the show going back there, Siz?",
  "Siz, I could do this all day!",
  "Ethan! That's how it's done!",
  "Hope you're taking notes, Siz!"

];

let currentSDQuote = "";

let sdQuoteTimer = 0;
let nextSDQuoteTime = 500;

let sdQuoteDisplayTimer = 0;

const sdQuoteDuration = 150;

function updateBackground(deltaTime) {

  backgroundX -= backgroundSpeed * deltaTime;

}

function updateRailBackgrounds(deltaTime) {

  midRailX -= midRailSpeed * deltaTime;
  farRailX -= farRailSpeed * deltaTime;

  if (midRailX <= -canvas.width) {
    midRailX = 0;
  }

  if (farRailX <= -canvas.width) {
    farRailX = 0;
  }

}

function showRandomSDQuote() {

  const randomIndex =
    Math.floor(Math.random() * sdQuotes.length);

  currentSDQuote = sdQuotes[randomIndex];

  sdQuoteDisplayTimer = sdQuoteDuration;

}

function updateSDQuotes() {

  sdQuoteTimer++;

  if (sdQuoteTimer >= nextSDQuoteTime) {

    showRandomSDQuote();

    sdQuoteTimer = 0;

    // Random delay between roughly 8 and 15 seconds
    nextSDQuoteTime =
      480 + Math.random() * 420;

  }

  if (sdQuoteDisplayTimer > 0) {

    sdQuoteDisplayTimer--;

  }

}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {

  const words = text.split(" ");
  const lines = [];

  let currentLine = "";

  for (const word of words) {

    const testLine =
      currentLine.length > 0
        ? currentLine + " " + word
        : word;

    const testWidth =
      ctx.measureText(testLine).width;

    if (testWidth > maxWidth && currentLine !== "") {

      lines.push(currentLine);
      currentLine = word;

    } else {

      currentLine = testLine;

    }

  }

  lines.push(currentLine);

  for (let i = 0; i < lines.length; i++) {

    ctx.fillText(
      lines[i],
      x,
      y + (i * lineHeight)
    );

  }

}

function drawSDQuote() {

  if (
    sdQuoteDisplayTimer <= 0 ||
    !currentSDQuote ||
    gameOver ||
    gamePaused
  ) {
    return;
  }

  const bubbleWidth = 360;
  const bubbleHeight = 85;

  const bubbleX = player.x + 120;
  const bubbleY = player.y - 70;

  // White speech bubble
  ctx.fillStyle = "white";

  ctx.fillRect(
    bubbleX,
    bubbleY,
    bubbleWidth,
    bubbleHeight
  );


  // Black pixel border
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  ctx.strokeRect(
    bubbleX,
    bubbleY,
    bubbleWidth,
    bubbleHeight
  );


  // Speech bubble pointer
  ctx.fillStyle = "white";

  ctx.beginPath();

  ctx.moveTo(
    bubbleX + 25,
    bubbleY + bubbleHeight
  );

  ctx.lineTo(
    bubbleX + 50,
    bubbleY + bubbleHeight
  );

  ctx.lineTo(
    bubbleX + 25,
    bubbleY + bubbleHeight + 18
  );

  ctx.closePath();
  ctx.fill();


  // Quote text
  ctx.fillStyle = "black";

  ctx.font = '22px "VT323"';

  ctx.textAlign = "center";

  wrapText(
    ctx,
    currentSDQuote,

    bubbleX + (bubbleWidth / 2),

    bubbleY + 28,

    bubbleWidth - 30,

    20
  );

  ctx.textAlign = "left";

}

function drawQuinny01() {

  if (
    energy <= 25 &&
    energy > 0 &&
    gameStarted &&
    !gameOver &&
    !gamePaused
  ) {

    const quinnyWidth = 190;
    const quinnyHeight = 190;

    const quinnyX =
      canvas.width - quinnyWidth - 20;

    const hudY = 550;

    const quinnyY =
      canvas.height - quinnyHeight - 180;

    ctx.drawImage(
      quinny01Image,
      quinnyX,
      quinnyY,
      quinnyWidth,
      quinnyHeight
    );

  }

}

function drawScrollingRail(image, x, y, width, height) {

  ctx.drawImage(
    image,
    x,
    y,
    width,
    height
  );

  ctx.drawImage(
    image,
    x + width,
    y,
    width,
    height
  );

}

function drawRailBackgrounds() {

  // FAR RAIL
  drawScrollingRail(
    farRailImage,
    farRailX,
    250,
    960,
    45
  );

  // MID RAIL
  drawScrollingRail(
    midRailImage,
    midRailX,
    350,
    960,
    110
  );
}

function updateTurf(deltaTime) {

  turfNearX -= turfNearSpeed * deltaTime;
  turfFarX -= turfFarSpeed *deltaTime;

}

function drawTurf() {
  drawTurfLayer(
    turfFarImage,
    turfFarX,
    280,
    960,
    120
  );

  drawTurfLayer(
    turfNearImage,
    turfNearX,
    390,
    960,
    180
  );
}

function drawTurfLayer(image, x, y, width, height) {

  const offset = x % width;

  // Draw enough copies to cover the wider 1280px canvas
  for (let i = -1; i < 3; i++) {

    ctx.drawImage(
      image,
      offset + (i * width),
      y,
      width,
      height
    );

  }

}

function updateBanners(deltaTime) {

  bannerX -= bannerSpeed * deltaTime;

}

function updateClouds(deltaTime) {

  cloudsX -= cloudsSpeed * deltaTime;

  const totalCloudWidth = cloudsWidth * 2;

  if (cloudsX <= -totalCloudWidth) {
    cloudsX += totalCloudWidth;
  }

}

function drawClouds() {

  const cloudsY = 0;

  const totalCloudWidth = cloudsWidth * 2;

  // Draw two repeating sets so there's never an empty seam
  for (let set = -1; set <= 1; set++) {

    const startX =
      cloudsX + (set * totalCloudWidth);

    ctx.drawImage(
      clouds01Image,
      startX,
      cloudsY,
      cloudsWidth,
      cloudsHeight
    );

    ctx.drawImage(
      clouds02Image,
      startX + cloudsWidth,
      cloudsY,
      cloudsWidth,
      cloudsHeight
    );

  }

}


function spawnObstacle() {

  const random = Math.random();

  let obstacleCount;
  let obstacleSpacing;

  if (random < 0.60) {

    // 60% chance: single obstacle
    obstacleCount = 1;
    obstacleSpacing = 0;

  } else if (random < 0.90) {

    // 30% chance: two obstacles
    obstacleCount = 2;
    obstacleSpacing = 350;

  } else {

    // 10% chance: three obstacles
    obstacleCount = 3;
    obstacleSpacing = 450;

  }


  for (let i = 0; i < obstacleCount; i++) {

    const obstacle = {

      x: canvas.width + (i * obstacleSpacing),

      y: 410,

      width: 100,
      height: 100,

      speed: 7

    };

    obstacles.push(obstacle);

  }

}

function updateObstacles(deltaTime) {

  obstacleTimer++;

  if (obstacleTimer >= nextObstacleTime) {

    spawnObstacle();

    obstacleTimer = 0;

    // Randomise when the next hurdle arrives
    nextObstacleTime = 90 + Math.random() * 100;
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {

    const obstacle = obstacles[i];

    obstacle.x -= obstacle.speed * deltaTime;

    // Remove obstacles once they're off screen
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(i, 1);
    }
  }
}

function drawObstacles() {

  for (const obstacle of obstacles) {

    ctx.drawImage(
      obstacleImage,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );

  }

}

function updateScenery(deltaTime) {

  sceneryX -= scenerySpeed * deltaTime;

  const sceneryLoopWidth = 4200;

  if (sceneryX <= -sceneryLoopWidth) {
    sceneryX = 0;
  }

}

function drawScenery() {

  const sceneryY = 80;

  const vegetationSpacing = 480;

  /*
    Scene layout:

    TREES TREES TREES TREES
    GRANDSTAND
    TREES TREES TREES TREES
  */

  const positions = [
    0,
    480,
    960,
    1440,

    1920, // Grandstand

    2520,
    3000,
    3480,
    3960
  ];


  // First four vegetation sections
  for (let i = 0; i < 4; i++) {

    ctx.drawImage(
      vegetationImage,
      sceneryX + positions[i],
      sceneryY,
      vegetationWidth,
      vegetationHeight
    );

  }


  // Grandstand
  ctx.drawImage(
    grandstandImage,
    sceneryX + positions[4],
    60,
    grandstandWidth,
    grandstandHeight
  );


  // Vegetation after grandstand
  for (let i = 5; i < positions.length; i++) {

    ctx.drawImage(
      vegetationImage,
      sceneryX + positions[i],
      sceneryY,
      vegetationWidth,
      vegetationHeight
    );

  }

}

function checkCollisions() {

  // Smaller hitbox inside SD's sprite
  const playerHitbox = {
    x: player.x + 45,
    y: player.y + 65,
    width: player.width - 90,
    height: player.height - 90
  };

  for (const obstacle of obstacles) {

    // Smaller hitbox inside the obstacle artwork
    const obstacleHitbox = {
      x: obstacle.x + 15,
      y: obstacle.y + 25,
      width: obstacle.width - 30,
      height: obstacle.height - 25
    };

    const collision =
      playerHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
      playerHitbox.x + playerHitbox.width > obstacleHitbox.x &&
      playerHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
      playerHitbox.y + playerHitbox.height > obstacleHitbox.y;

    if (collision) {
      endGame();
    }

  }

}

function endGame() {

  gameOver = true;

  quinnyButton.style.display = "none";

}

function restartGame() {

  score = 0;

  energy = 100;

  obstacles.length = 0;

  obstacleTimer = 0;

  nextObstacleTime = 120;

  player.y = 330;

  player.velocityY = 0;

  player.grounded = true;

  jumpCount = 0;

  gameOver = false;

  quinnyButton.style.display = "none";

  energyFill.style.width = "100%";

  energyText.textContent = "100%";

}

function drawGameOver() {

  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "white";

  ctx.textAlign = "center";

  ctx.font = '90px "VT323"';
  ctx.fillText(
    "GAME OVER",
    canvas.width / 2,
    220
  );

  ctx.font = '30px "VT323"';
  ctx.fillText(
    "SCORE: " + Math.floor(score / 10),
    canvas.width / 2,
    280
  );

  ctx.font = 'bold 20px "Press Start 2P"';
  ctx.fillText(
    "TAP TO RACE AGAIN",
    canvas.width / 2,
    340
  );

  ctx.font = '26px "VT323"';
  ctx.fillText(
    "made by kevie.monkeyking",
    canvas.width / 2,
    400
  );

  ctx.textAlign = "left";
}

function jump() {

  if (jumpCount >= maxJumps) return;

  player.velocityY = player.jumpStrength;

  player.grounded = false;

  jumpCount++;

  energy -= 5;

}

function updatePlayer() {

  player.velocityY += gravity;

  player.y += player.velocityY;

  const groundY = 330;

  if (player.y >= groundY) {

    player.y = groundY;

    player.velocityY = 0;

    player.grounded = true;

    jumpCount = 0;

  }

}

function updateEnergy() {

  energy -= 0.015;

  energy = Math.max(0, Math.min(100, energy));

  energyFill.style.width = energy + "%";

  energyText.textContent = Math.round(energy) + "%";

  if (energy <= 25) {

    quinnyButton.style.display = "block";

  } else {

    quinnyButton.style.display = "none";

  }

  if (energy <= 0) {
  endGame();
}

}

function drawBackground() {

  // Sky
  ctx.fillStyle = "#5bbcff";
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // Dirt track
  ctx.fillStyle = "#8b5a2b";
  ctx.fillRect(
    0,
    470,
    canvas.width,
    20
  );

  // Grass
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(
    0,
    490,
    canvas.width,
    50
  );

}

function drawPlayer() {

  let currentImage;

  // If Simon is airborne, use the jump sprite
  if (!player.grounded) {

    currentImage = simonJumpImage;

  } else {

    // Alternate between the two running sprites
    animationTimer++;

    if (animationTimer >= animationSpeed) {

      runFrame = runFrame === 0 ? 1 : 0;

      animationTimer = 0;
    }

    currentImage =
      runFrame === 0
        ? simonRun01Image
        : simonRun02Image;
  }

  ctx.drawImage(
    currentImage,
    player.x,
    player.y,
    player.width,
    player.height
  );

}

function drawBanners() {

  const bannerWidth = 300;
  const bannerHeight = 70;

  const bannerY = 330;

  // Number of banners in each group
  const bannersPerGroup = 3;

  // Width of one complete group
  const groupWidth =
    bannerWidth * bannersPerGroup;

  // Empty space after each group
  const groupGap = 1000;

  // Total distance before the next group begins
  const repeatDistance =
    groupWidth + groupGap;


  // Draw enough groups to cover either side of the canvas
  for (let group = -1; group < 3; group++) {

    const groupX =
      (group * repeatDistance) +
      (bannerX % repeatDistance);


    // Draw the three connected banners
    for (let i = 0; i < bannersPerGroup; i++) {

      const x =
        groupX + (i * bannerWidth);

      ctx.drawImage(
        sbBannerImage,
        x,
        bannerY,
        bannerWidth,
        bannerHeight
      );

    }

  }

}

function updateScore() {

  score++;

  scoreElement.textContent = Math.floor(score / 10);

}

let lastFrameTime = 0;

function gameLoop(currentTime) {

  if (!lastFrameTime) {
    lastFrameTime = currentTime;
  }

  let deltaTime =
    (currentTime - lastFrameTime) / 16.67;
  
  // Prevent giant jumps if the browser briefly freezes
  deltaTime = Math.min(deltaTime, 3);
  
  lastFrameTime = currentTime; 

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  // =========================
  // WELCOME SCREEN
  // =========================

  if (showWelcome) {

    drawWelcomeScreen();

  }


  // =========================
  // JOHN'S TRACK REPORT
  // =========================

  else if (!gameStarted && !gameOver) {

    drawTrackReport();

  }


  // =========================
  // GAME
  // =========================

  else {

    drawBackground();

    drawClouds();

    drawScenery();

    drawTurf();

    drawRailBackgrounds();

    drawBanners();

    drawObstacles();

    drawPlayer();

    drawSDQuote();

    drawQuinny01();

    drawBottomHUD();

    drawQuinny02();


    if (!gameOver && !gamePaused) {

      updatePlayer();
      updateEnergy();
      updateScore();

      updateBackground(deltaTime);
      updateClouds(deltaTime);
      updateScenery(deltaTime);
      updateTurf(deltaTime);
      updateRailBackgrounds(deltaTime);
      updateBanners(deltaTime);

      updateObstacles(deltaTime);
      updateSDQuotes();
      checkCollisions();

    }


    if (gamePaused) {

      drawPauseScreen();

    }


    if (gameOver) {

      drawGameOver();

    }

  }


  // Keep drawing the game
  requestAnimationFrame(gameLoop);

}

function activateQuinny() {

  if (
    energy > 25 ||
    gameOver ||
    !gameStarted ||
    gamePaused
  ) {
    return;
  }

  energyBeforeQuinny = Math.round(energy);

  energy = 80;

  energyFill.style.width = "80%";
  energyText.textContent = "80%";

  quinnyButton.style.display = "none";

  showQuinny02 = true;

  setTimeout(() => {

    showQuinny02 = false;

  }, 1800);

}

function drawQuinny02() {

  if (!showQuinny02) {
    return;
  }

  const hudY = 550;

  // Quinny image
  ctx.drawImage(
    quinny02Image,
    300,
    hudY + 10,
    300,
    150
  );


  // Energy boost information
  ctx.fillStyle = "#f2a900";

  ctx.font = "bold 22px monospace";

  ctx.textAlign = "center";

  ctx.fillText(
    "GIVE EM STRENGTH!!",
    700,
    hudY + 45
  );


  ctx.font = "bold 30px monospace";

  ctx.fillStyle = "#ff4b3e";

  ctx.fillText(
    energyBeforeQuinny + "%",
    660,
    hudY + 90
  );


  ctx.fillStyle = "white";

  ctx.fillText(
    "→",
    730,
    hudY + 90
  );


  ctx.fillStyle = "#4cd137";

  ctx.fillText(
    "80%",
    800,
    hudY + 90
  );


  ctx.textAlign = "left";

}

function drawPauseScreen() {

  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.font = '42px "Press Start 2P"';

  ctx.fillText(
    "PAUSED",
    canvas.width / 2,
    240
  );

  ctx.font = "20px monospace";

  ctx.fillText(
    "TAP II TO CONTINUE",
    canvas.width / 2,
    300
  );

  ctx.textAlign = "left";
}

// =========================
// MOBILE TOUCH CONTROLS
// =========================

// TAP CANVAS
canvas.addEventListener("pointerdown", (event) => {

  event.preventDefault();

  // WELCOME SCREEN
  if (showWelcome) {

    showWelcome = false;
    selectTrackReport();

    return;
  }

  // TRACK REPORT
  if (!gameStarted && !gameOver) {

    gameStarted = true;

    return;
  }

  // GAME OVER
  if (gameOver) {

    restartGame();
    selectTrackReport();

    gameStarted = false;

    return;
  }

  // PAUSED
  if (gamePaused) {
    return;
  }

  // RACING
  jump();

});


// =========================
// PAUSE BUTTON
// =========================

pauseButton.addEventListener("pointerdown", (event) => {

  event.preventDefault();
  event.stopPropagation();

  if (!gameStarted || gameOver || showWelcome) {
    return;
  }

  gamePaused = !gamePaused;

});


// =========================
// QUINNY BUTTON
// =========================

quinnyButton.addEventListener("pointerdown", (event) => {

  event.preventDefault();
  event.stopPropagation();

  activateQuinny();

});


// =========================
// PRELOAD GAME ASSETS
// =========================

const gameImages = [
  
  simonIdleImage,
  simonRun01Image,
  simonRun02Image,
  simonJumpImage,

  midRailImage,
  farRailImage,

  turfNearImage,
  turfFarImage,

  sbBannerImage,

  vegetationImage,
  grandstandImage,

  obstacleImage,

  quinny01Image,
  quinny02Image,

  clouds01Image,
  clouds02Image,

  johnKeltonImage,
  welcomeImage
];


function waitForImages(images) {

  return Promise.all(

    images.map((image) => {

      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {

        image.onload = resolve;

        image.onerror = () => {
          reject(
            new Error(
              "Failed to load image: " + image.src
            )
          );
        };

      });

    })

  );

}


waitForImages(gameImages)

  .then(() => {

    console.log("All game assets loaded!");

    selectTrackReport();

    gameLoop();

  })

  .catch((error) => {

    console.error(
      "Game asset loading error:",
      error
    );

  });
