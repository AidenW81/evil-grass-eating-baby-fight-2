function setSize(width, height) {
    // Set the size of the canvas
    let canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        document.body.appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
}

function WebImage(url) {
    this.img = new Image();
    this.img.src = url;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.layer = 0;

    this.setSize = function(width, height) {
        this.width = width;
        this.height = height;
    };

    this.setColor = function(color) {
        // Not applicable for images, but you can add a color overlay if needed
    };

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    this.getX = function() {
        return this.x;
    };

    this.getY = function() {
        return this.y;
    };

    this.move = function(dx, dy) {
        this.x += dx;
        this.y += dy;
    };

    this.draw = function(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
}

function add(element) {
    if (!window.gameElements) window.gameElements = [];
    window.gameElements.push(element);
}

function getElementAt(x, y) {
    for (let i = window.gameElements.length - 1; i >= 0; i--) {
        let elem = window.gameElements[i];
        if (x >= elem.getX() && x <= elem.getX() + elem.width &&
            y >= elem.getY() && y <= elem.getY() + elem.height) {
            return elem;
        }
    }
    return null;
}

function Circle(radius) {
    this.radius = radius;
    this.x = 0;
    this.y = 0;
    this.color = 'black';
    this.layer = 0;

    this.setSize = function(radius) {
        this.radius = radius;
    };

    this.setColor = function(color) {
        this.color = color;
    };

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    this.getX = function() {
        return this.x;
    };

    this.getY = function() {
        return this.y;
    };

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
}

function remove(element) {
    const index = window.gameElements.indexOf(element);
    if (index > -1) {
        window.gameElements.splice(index, 1);
    }
}

// Add a function to handle the game loop and drawing
function gameLoop() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.gameElements.sort((a, b) => a.layer - b.layer);
    for (const elem of window.gameElements) {
        elem.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

window.onload = function() {
    setSize(900, 900); // Set the canvas size
    gameLoop(); // Start the game loop
};
