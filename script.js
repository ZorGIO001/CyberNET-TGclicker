const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const topPlayersList = document.getElementById('topPlayers');
const clickEffect = document.getElementById('clickEffect');

scoreElement.textContent = score;

// Эффект клика
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.textContent = '+1';
    effect.className = 'click-animation';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
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

    updateLeaderboard();
});

// Локальный топ игроков (имитация)
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [
    { name: 'Player1', score: 100 },
    { name: 'Player2', score: 80 },
    { name: 'Player3', score: 50 }
];

function updateLeaderboard() {
    const userName = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name : 'You';
    const userScore = score;

    // Добавляем текущего игрока в топ
    const existingPlayer = leaderboard.find(p => p.name === userName);
    if (existingPlayer) {
        existingPlayer.score = Math.max(existingPlayer.score, userScore);
    } else {
        leaderboard.push({ name: userName, score: userScore });
    }

    // Сортируем и обрезаем до топ-5
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Отображаем топ
    topPlayersList.innerHTML = '';
    leaderboard.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${player.name}: ${player.score} 💰`;
        topPlayersList.appendChild(li);
    });
}

// Инициализация лидерборда
updateLeaderboard();
