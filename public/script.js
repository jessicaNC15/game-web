const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let fruit = { x: 0, y: 0 };
let score = 0;
const boxSize = 20;
let gameInterval;
const speed = 250; 

function setup() {
    direction = { x: boxSize, y: 0 }; 
    score = 0;
    snake = [{ x: 200, y: 200 }];
    spawnfruit();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(draw, speed);
}

function spawnfruit() {
    fruit.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    fruit.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
}

function drawGrid() {
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += boxSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += boxSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawGrid();
    
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'red' : 'lightpink';
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });

    ctx.fillStyle = 'blue';
    ctx.fillRect(fruit.x, fruit.y, boxSize, boxSize);
    
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        snake.unshift(head);
        spawnfruit();
    } else {
        snake.unshift(head);
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert('Nice Try! Your score : ' + score);
        setup(); 
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Nice Try! Your score : ' + score);
            setup();
            return;
        }
    }
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -boxSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: boxSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -boxSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: boxSize, y: 0 };
            break;
    }
});

window.onload = setup;
