const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const topPlayersList = document.getElementById('topPlayers');
const clickEffect = document.getElementById('clickEffect');
const progressBar = document.getElementById('progress');

scoreElement.textContent = score;

// Обновление прогресс-бара (0-100%)
function updateProgress() {
    const progress = Math.min((score % 100) / 100 * 100, 100);
    progressBar.style.width = `${progress}%`;
}

// Эффект клика
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.textContent = '+1';
    effect.className = 'click-animation';
    effect.style.left = `${x - 20}px`;
    effect.style.top = `${y - 30}px`;
    clickEffect.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

// Обработка клика
clickButton.addEventListener('click', (e) => {
    score += 1;
    scoreElement.textContent = score;
    localStorage.setItem('score', score);

    const rect = clickButton.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    createClickEffect(x, y);

    updateProgress();
    updateLeaderboard();
});

// Локальный топ игроков
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [
    { name: 'HamsterKing', score: 500 },
    { name: 'CoinMaster', score: 300 },
    { name: 'ClickHam', score: 150 }
];

function updateLeaderboard() {
    const userName = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name : 'Hamster';
    const userScore = score;

    const existingPlayer = leaderboard.find(p => p.name === userName);
    if (existingPlayer) {
        existingPlayer.score = Math.max(existingPlayer.score, userScore);
    } else {
        leaderboard.push({ name: userName, score: userScore });
    }

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    topPlayersList.innerHTML = '';
    leaderboard.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${player.name}: ${player.score} 🪙`;
        topPlayersList.appendChild(li);
    });
}

// Инициализация
updateProgress();
updateLeaderboard();
