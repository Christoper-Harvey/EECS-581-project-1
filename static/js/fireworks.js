/**
 * NAME: Battleship - EECS581 Project 1 - fireworks
 * DESCRIPTION: This program controls makes fireworks for the victor of battleship at the end of the game
 * INPUT: None
 * OUTPUT: displays fireworks on the screen
 * SOURCES: 
 * AUTHORS: Chris Harvey
 * DATE: 9/11/24
 */
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight], false);

// Sound effects for fireworks
const fireworks1 = new Audio('/static/sfx/fireworks1.wav');
const fireworks2 = new Audio('/static/sfx/fireworks2.wav');

// fireworks1.loop = true;
// fireworks2.loop = true;

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -3 - 3;
        this.size = Math.random() * 2 + 1;
        const colorVal = Math.round(0xffffff * Math.random());
        [this.r, this.g, this.b] = [colorVal >> 16, (colorVal >> 8) & 255, colorVal & 255];
        this.shouldExplode = false;
    }
    update() {
        this.shouldExplode = this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= canvas.width;
        this.sy += 0.01;
        [this.x, this.y] = [this.x + this.sx, this.y + this.sy];
    }
    draw() {
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, r, g, b) {
        [this.x, this.y, this.sx, this.sy, this.r, this.g, this.b] = [x, y, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, r, g, b];
        this.size = Math.random() * 2 + 1;
        this.life = 100;
    }
    update() {
        [this.x, this.y, this.life] = [this.x + this.sx, this.y + this.sy, this.life - 1];
    }
    draw() {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [new Firework()];
const particles = [];

// Randomly play fireworks sounds
function playFireworksSounds() {
    const randomTime = Math.random() * 300 + 50;  // Random interval between 2 and 5 seconds

    setTimeout(() => {
        if (Math.random() > 0.5) {
            fireworks1.play();
        } else {
            fireworks2.play();
        }
        playFireworksSounds();  // Recursively schedule the next sound
    }, randomTime);
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Math.random() < 0.25 && fireworks.push(new Firework());  //Controlling the number of fireworks
    fireworks.forEach((firework, i) => {
        firework.update();
        firework.draw();
        if (firework.shouldExplode) {
            for (let j = 0; j < 50; j++) particles.push(new Particle(firework.x, firework.y, firework.r, firework.g, firework.b));
            fireworks.splice(i, 1);
        }
    });
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

// animate();

// Expose the animate function so it can be called externally (from game.js)
window.startFireworks = function() {
    document.getElementById("fireworksCanvas").style.display = "block";  // Show the canvas
    animate();
    playFireworksSounds();
};