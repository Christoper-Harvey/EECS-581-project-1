/**
 * NAME: Battleship - EECS581 Project 1 - fireworks.js
 * DESCRIPTION: This program imports and controls the sound effects for the end of the battleship game and the fireworks animation
 * INPUT: files needed for audio
 * OUTPUT: audio into game and fireworks canvas animation
 * SOURCES: https://youtu.be/8y1GboKuMGk?si=V2XcAOTepuJ6X-G7
 * AUTHORS: Chris Harvey
 * DATE: 9/13/24
 */

// Load canvas to draw fireworks on with a 2d context
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth; // allocate the size of the window being displayed so the fireworks don't go out of bound
canvas.height = window.innerHeight;
window.addEventListener("resize", () => [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight], false);

// Sound effects for fireworks
const fireworks1 = new Audio('/static/sfx/fireworks1.wav');
const fireworks2 = new Audio('/static/sfx/fireworks2.wav');

// this class draws the fireworks randomly per instance.
class Firework {
    constructor() {
        this.x = Math.random() * canvas.width; // math modules to manage the location of the fireworks for where they start and where they will explode.
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -3 - 3;
        this.size = Math.random() * 2 + 1;
        const colorVal = Math.round(0xffffff * Math.random()); //randomly pick the color
        [this.r, this.g, this.b] = [colorVal >> 16, (colorVal >> 8) & 255, colorVal & 255];
        this.shouldExplode = false; // this will explode only when it reaches the correct location.
    }
    update() {
        // which is what this is checking.
        this.shouldExplode = this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= canvas.width;
        this.sy += 0.01;
        [this.x, this.y] = [this.x + this.sx, this.y + this.sy];
    }
    draw() {
        // this creates the trails of each firework
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// class to handle explosions per firework. ton of math here.
class Particle {
    constructor(x, y, r, g, b) {
        [this.x, this.y, this.sx, this.sy, this.r, this.g, this.b] = [x, y, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, r, g, b]; // randomly create the size and shape of explosion.
        this.size = Math.random() * 2 + 1;
        this.life = 100; // timer until boom ends.
    }
    update() {
        [this.x, this.y, this.life] = [this.x + this.sx, this.y + this.sy, this.life - 1];
    }
    draw() {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`; // draw each arc of the spandrels of the explosions until life runs out. this fades the firework over time.
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [new Firework()];
const particles = [];

// Randomly play fireworks sounds
function playFireworksSounds() {
    const randomTime = Math.random() * 300 + 50;  // Random interval between .05 and .3 seconds

    setTimeout(() => {
        if (Math.random() > 0.5) {
            // randomly play 1 or 2 for some cha cha goodness.
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
    Math.random() < 0.25 && fireworks.push(new Firework());  //Controlling the number of fireworks. you can go pretty crazy with this number!!!
    fireworks.forEach((firework, i) => {
        firework.update();
        firework.draw();
        if (firework.shouldExplode) {
            for (let j = 0; j < 50; j++) particles.push(new Particle(firework.x, firework.y, firework.r, firework.g, firework.b));
            fireworks.splice(i, 1);
        }
    });
    // actually draw the explosions and create particle effects and their trials.
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

// Expose the animate function so it can be called externally (from game.js)
window.startFireworks = function() {
    document.getElementById("fireworksCanvas").style.display = "block";  // Show the canvas
    animate(); // activate the fireworks
    playFireworksSounds(); // activate the fireworks sounds
};
