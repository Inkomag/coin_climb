document.addEventListener("DOMContentLoaded", function() {
    const scoreElement = document.getElementById("score");
    const increaseScoreButton = document.getElementById("increaseScoreButton");
    const sendScoreButton = document.getElementById("sendScoreButton");
    
    let score = 0;
    
    increaseScoreButton.addEventListener("click", function() {
        score += 1;
        scoreElement.textContent = `Score: ${score}`;
    });
    
    sendScoreButton.addEventListener("click", function() {
        Telegram.WebApp.sendData(JSON.stringify({ score: score }));
    });
    
    Telegram.WebApp.ready();
    Telegram.WebApp.MainButton.text = "Send Score";
    Telegram.WebApp.MainButton.show();
});
