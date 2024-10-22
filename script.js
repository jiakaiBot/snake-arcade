const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;

const snake = {
    body: [{ x: 200, y: 200 }],
    direction: 'right',
    nextDirection: 'right'
};

const food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
};

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.body.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { ...snake.body[0] };

    switch (snake.nextDirection) {
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'right':
            head.x += gridSize;
            break;
    }

    snake.body.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    } else {
        snake.body.pop();
    }

    snake.direction = snake.nextDirection;
}

function checkCollision() {
    const head = snake.body[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over');
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
    moveSnake();

    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (snake.direction !== 'down') {
                snake.nextDirection = 'up';
            }
            break;
        case 'ArrowDown':
            if (snake.direction !== 'up') {
                snake.nextDirection = 'down';
            }
            break;
        case 'ArrowLeft':
            if (snake.direction !== 'right') {
                snake.nextDirection = 'left';
            }
            break;
        case 'ArrowRight':
            if (snake.direction !== 'left') {
                snake.nextDirection = 'right';
            }
            break;
    }
});

gameLoop();
