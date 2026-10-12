// Variable Global
let currentStep = 1;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Function Toggle Password Visibility
function togglePassword() {
  const pwdInput = document.getElementById('password');
  const icon = document.querySelector('.toggle-pwd');
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    pwdInput.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Function Login Handler
function handleLogin(event) {
  event.preventDefault();
  // Musik diputar otomatis setelah interaksi pertama (Login)
  playMusic();
  nextStep(2);
}

// Function Pindah Step
function nextStep(stepNumber) {
  const currentCard = document.getElementById(`step${currentStep}`);
  const nextCard = document.getElementById(`step${stepNumber}`);

  if (currentCard) currentCard.classList.remove('active');
  if (nextCard) nextCard.classList.add('active');

  currentStep = stepNumber;
}

function goToStep(stepNumber) {
  nextStep(stepNumber);
}

// Control Music
function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
  } else {
    bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
    musicToggle.classList.add('playing');
  }
  isPlaying = !isPlaying;
}

function playMusic() {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
    }).catch(err => {
      console.log('Audio error:', err);
    });
  }
}

// Padamkan Lilin Kue Ulang Tahun
function blowOutCandle() {
  const flame = document.getElementById('flame');
  if (flame) {
    flame.classList.add('off');
    alert('🎉 Lilin berhasil ditiup! Selamat ulang tahun Sayanggggg! 💕');
  }
}

// EFEK HEARTS CANVAS BACKGROUND
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 15 + 8;
    this.speed = Math.random() * 1.5 + 0.8;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.swing = Math.random() * 0.05 - 0.025;
    this.angle = 0;
  }

  update() {
    this.y -= this.speed;
    this.angle += this.swing;
    this.x += Math.sin(this.angle);

    if (this.y < -20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ff2a75';
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    
    // Menggambar bentuk hati
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
    ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
    ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
    ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
    
    ctx.fill();
    ctx.restore();
  }
}

const hearts = Array.from({ length: 30 }, () => new Heart());

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateHearts);
}

animateHearts();