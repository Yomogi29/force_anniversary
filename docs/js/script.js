const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resultDisplay = document.getElementById('result');
const startButton = document.getElementById('start-btn');

let score = 0;
let timeLeft = 10;
let gameInterval;
let timerInterval;

function spawnMushroom() {
  const mushroom = document.createElement('div');
  mushroom.classList.add('mushroom');

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);

  mushroom.style.left = `${x}px`;
  mushroom.style.top = `${y}px`;

  mushroom.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    gameArea.removeChild(mushroom);
  });

  gameArea.appendChild(mushroom);

  setTimeout(() => {
    if (gameArea.contains(mushroom)) {
      gameArea.removeChild(mushroom);
    }
  }, 1000);
}

function startGame() {
  // 初期化
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = `残り時間: ${timeLeft}秒`;
  resultDisplay.textContent = '';
  startButton.disabled = true;

  gameInterval = setInterval(spawnMushroom, 800);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `残り時間: ${timeLeft}秒`;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  document.querySelectorAll('.mushroom').forEach(m => m.remove());

  if (score >= 8) {
    resultDisplay.textContent = '🎉 クリア！あつしからご褒美がもらえるよ 🎉';
    resultDisplay.style.fontSize = '48px';
    resultDisplay.style.color = 'green';
  } else {
    resultDisplay.textContent = 'ざんねん…もう一回！';
    resultDisplay.style.fontSize = '36px';
    resultDisplay.style.color = 'red';
  }

  startButton.disabled = false;
}

startButton.addEventListener('click', startGame);

