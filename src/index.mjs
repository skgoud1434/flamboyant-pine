document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.getElementById("game-board");
  const scoreDisplay = document.getElementById("score-value");
  const gridSize = 20;
  const boardSize = 20;
  const snakeSpeed = 150; // milliseconds
  let snakeDirection = "right";
  let snake = [{ x: 10, y: 10 }];
  let food = {};
  let score = 0;

  function draw() {
    gameBoard.innerHTML = "";

    snake.forEach((segment, index) => {
      const block = document.createElement("div");
      block.classList.add("snake-block");
      if (index === 0) block.classList.add("snake-head");
      block.style.left = segment.x * gridSize + "px";
      block.style.top = segment.y * gridSize + "px";
      gameBoard.appendChild(block);
    });

    const foodBlock = document.createElement("div");
    foodBlock.classList.add("food");
    foodBlock.style.left = food.x * gridSize + "px";
    foodBlock.style.top = food.y * gridSize + "px";
    gameBoard.appendChild(foodBlock);
  }

  function moveSnake() {
    let newHead = { ...snake[0] };

    switch (snakeDirection) {
      case "up":
        newHead.y--;
        break;
      case "down":
        newHead.y++;
        break;
      case "left":
        newHead.x--;
        break;
      case "right":
        newHead.x++;
        break;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      scoreDisplay.textContent = score;
      generateFood();
    } else {
      snake.pop();
    }

    checkCollision();
  }

  function checkCollision() {
    if (
      snake[0].x < 0 ||
      snake[0].x >= boardSize ||
      snake[0].y < 0 ||
      snake[0].y >= boardSize ||
      snake
        .slice(1)
        .some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
      clearInterval(gameInterval);
      alert("Game Over! Your Score: " + score);
    }
  }

  function generateFood() {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);

    // Make sure food doesn't appear on snake body
    while (snake.some((segment) => segment.x === x && segment.y === y)) {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    }

    food = { x, y };
  }

  generateFood();
  draw();

  const gameInterval = setInterval(() => {
    moveSnake();
    draw();
  }, snakeSpeed);

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (snakeDirection !== "down") snakeDirection = "up";
        break;
      case "ArrowDown":
        if (snakeDirection !== "up") snakeDirection = "down";
        break;
      case "ArrowLeft":
        if (snakeDirection !== "right") snakeDirection = "left";
        break;
      case "ArrowRight":
        if (snakeDirection !== "left") snakeDirection = "right";
        break;
    }
  });
});
