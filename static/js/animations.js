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