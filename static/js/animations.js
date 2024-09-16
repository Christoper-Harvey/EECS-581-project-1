/**
 * NAME: Battleship - EECS581 Project 1 - animations.js
 * DESCRIPTION: This program controls all the animations in the battleship game
 * INPUT: hit and miss animations take the cell to animate
 *        alert takes message to alert
 * OUTPUT: outputs an animation or message to UI
 * SOURCES: 
 * AUTHORS: Chris Harvey, Ryan Strong
 * DATE: 9/10/24
 */
// Play hit animation using a GIF file
function playHitAnimation(cell) {
    // Remove any existing hit animation
    const existingHit = cell.querySelector(".hit-animation");
    if (existingHit) {
        existingHit.remove();
    }
    const img = document.createElement("img");
    img.src = '/static/animations/explosion.gif';
    img.classList.add("hit-animation");  // Add a class for reference
    img.style.width = "50px";  // Match cell size
    img.style.height = "50px";
    cell.appendChild(img);

    // Optionally, remove the GIF after a delay (GIFs loop automatically)
    setTimeout(() => {
        img.remove();
    }, 1800);  // 1.8 second delay to remove the GIF
}

// Play miss animation using a GIF file
function playMissAnimation(cell) {
    const img = document.createElement("img");
    img.src = '/static/animations/miss.gif';
    img.style.width = "50px";  // Match cell size
    img.style.height = "50px";
    cell.appendChild(img);

    // Optionally, remove the GIF after a delay (GIFs loop automatically)
    setTimeout(() => {
        img.remove();
    }, 1100);  // 1.1 second delay to remove the GIF
}

//sends in-game text alert with content of param 'message' 
//message will fade out
function alert(message) {
    //make message appear by setting alert content and displaying element
    document.getElementById("text-alert").textContent = message;
    document.getElementById("text-alert").style.display = "inline";

    //fadeout by setting transition time and turning opacity to 0
    setTimeout(() => {
        document.getElementById("text-alert").style.transition = "all 3s";
        document.getElementById("text-alert").style.opacity = "0";
    }, 2000);

    //reset transition to 0 and opactiy to 1 for next button push
    document.getElementById("text-alert").style.transition = "all 0s";
    document.getElementById("text-alert").style.opacity = "1";
}