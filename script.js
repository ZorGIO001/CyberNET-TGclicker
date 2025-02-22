// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();

// Получение данных пользователя (опционально)
const user = tg.initDataUnsafe.user;
if (user) {
    console.log(`User: ${user.first_name} ${user.last_name || ''}, ID: ${user.id}`);
}

// Основная логика кликера
let score = 0;
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');

clickButton.addEventListener('click', () => {
    score += 1;
    scoreElement.textContent = score;
    
    // Показываем эффект клика (опционально)
    clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickButton.style.transform = 'scale(1)';
    }, 100);
});

// Расширение окна на весь экран
tg.expand();
