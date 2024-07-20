document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const player = {
        x: canvas.width / 2 - 15,
        y: canvas.height - 30,
        width: 30,
        height: 30,
        speed: 5,
        color: "blue",
    };

    const keys = {
        left: false,
        right: false,
    };

    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") keys.left = true;
        if (e.key === "ArrowRight") keys.right = true;
    });

    document.addEventListener("keyup", function(e) {
        if (e.key === "ArrowLeft") keys.left = false;
        if (e.key === "ArrowRight") keys.right = false;
    });

    function drawPlayer() {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function updatePlayerPosition() {
        if (keys.left && player.x > 0) player.x -= player.speed;
        if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;
    }

    function gameLoop() {
        clearCanvas();
        updatePlayerPosition();
        drawPlayer();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    Telegram.WebApp.ready();
});
