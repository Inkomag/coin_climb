window.Telegram.WebApp.ready();

Telegram.WebApp.onEvent('mainButtonClicked', function() {
    Telegram.WebApp.sendData(JSON.stringify({ score: score }));
});

Telegram.WebApp.MainButton.text = "Send Score";
Telegram.WebApp.MainButton.show();

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 10
};

let coins = [];
let obstacles = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoin(x, y) {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = 'gold';
    context.fill();
    context.closePath();
}

function drawObstacle(x, y) {
    context.fillStyle = 'red';
    context.fillRect(x, y, 50, 50);
}

function drawScore() {
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, 10, 20);
}

function updateGame() {
    if (gameOver) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Управление персонажем
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    // Добавление монет и препятствий
    if (Math.random() < 0.02) {
        coins.push({ x: Math.random() * canvas.width, y: -20 });
    }
    if (Math.random() < 0.01) {
        obstacles.push({ x: Math.random() * (canvas.width - 50), y: -50 });
    }

    // Обновление позиций монет и препятствий
    coins.forEach((coin, index) => {
        coin.y += 5;
        if (coin.y > canvas.height) {
            coins.splice(index, 1);
        }
        if (
            player.x < coin.x + 10 &&
            player.x + player.width > coin.x &&
            player.y < coin.y + 10 &&
            player.y + player.height > coin.y
        ) {
            score++;
            coins.splice(index, 1);
        }
    });

    obstacles.forEach((obstacle, index) => {
        obstacle.y += 5;
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
        }
        if (
            player.x < obstacle.x + 50 &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + 50 &&
            player.y + player.height > obstacle.y
        ) {
            gameOver = true;
        }
    });

    drawPlayer();
    coins.forEach(coin => drawCoin(coin.x, coin.y));
    obstacles.forEach(obstacle => drawObstacle(obstacle.x, obstacle.y));
    drawScore();

    if (!gameOver) {
        requestAnimationFrame(updateGame);
    } else {
        context.fillStyle = 'red';
        context.font = '40px Arial';
        context.fillText('Game Over!', canvas.width / 3, canvas.height / 2);
    }
}

let keys = {};
window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});

updateGame();

