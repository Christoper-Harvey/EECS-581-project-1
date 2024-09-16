// Preload audio files
const canonFire = new Audio('/static/sfx/canonFire.wav');
const endGame = new Audio('/static/sfx/finalExplosionGameEnd.wav');
const victoryCry = new Audio('/static/sfx/victoryCry.wav');
const victoryTrumpet = new Audio('/static/sfx/victoryTrumpet.wav');

const champions = new Audio('/static/sfx/champions.wav');

// Preload miss sounds
const hitSounds = [
    new Audio('/static/sfx/hitLarge.wav'),
    new Audio('/static/sfx/hitSmall.wav')
];

// Preload miss sounds
const missSounds = [
    new Audio('/static/sfx/miss1.wav'),
    new Audio('/static/sfx/miss2.wav')
];

// Function to randomly select and play one of the miss sounds
function playRandomMissSound() {
    const randomIndex = Math.floor(Math.random() * missSounds.length);
    missSounds[randomIndex].play();
}

// Function to randomly select and play one of the hit sounds
function playRandomHitSound() {
    const randomIndex = Math.floor(Math.random() * hitSounds.length);
    hitSounds[randomIndex].play();
}

// Function to randomly select and play one of the hit sounds
function playSunkSound() {
    endGame.play();
}