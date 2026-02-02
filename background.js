const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 200;
const ROTATION_SPEED = Math.PI / 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

function createStars() {
  stars = [];
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const maxDist = Math.hypot(cx, cy);

  for (let i = 0; i < STAR_COUNT; i++) {
    const distance = Math.random() * maxDist;
    const angle = Math.random() * Math.PI * 2;

    stars.push({
      angle,
      distance,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      twinkle: (Math.random() * 0.5 + 0.5) / 10,
      speed: (Math.random() * 0.5 + 0.5) * ROTATION_SPEED
    });
  }
}

let currentTime = performance.now();
let pastTime = currentTime;

function drawStars() {
  pastTime = currentTime;
  currentTime = performance.now();
  const dt = (currentTime - pastTime) / 1000;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  for (const star of stars) {
    star.angle += star.speed * dt;

    const x = cx + Math.cos(star.angle) * star.distance;
    const y = cy + Math.sin(star.angle) * star.distance;

    star.alpha += star.twinkle * dt;
    if (star.alpha <= 0 || star.alpha >= 1) star.twinkle *= -1;

    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();
