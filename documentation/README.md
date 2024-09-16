
# Battleship Game

This is a Battleship game built using Flask, JavaScript, and CSS. It features two players, ship placement, and a turn-based attack system.

## Installation Instructions

1. **Download the Package**:  
   First, download the project package and `cd` into the directory.

2. **Install Conda**:  
   Install [Conda](https://docs.conda.io/en/latest/miniconda.html) on your machine if it's not already installed.

3. **Initialize Conda**:  
   If this is your first time using Conda, run the following command to initialize it:  
   ```
   conda init
   ```

4. **Activate Environment**:  
   Activate the Flask environment with:  
   ```
   conda activate flask
   ```

5. **Launch the Web App**:  
   Run the following command to launch the web application:  
   ```
   python app.py
   ```

6. **Open the Game in Browser**:  
   Open your web browser and navigate to `http://127.0.0.1:5000/` to start playing the game.

## Playing the Game
Once the web app is running, the game can be accessed in your browser. Two players will take turns placing ships on their respective boards and then attacking each other’s ships.

---

## File Descriptions

### Key Files:
- **`app.py`**: The main Flask application file that serves the web app.
- **`game.js`**: Handles the core game logic, including ship placement and turn-based attacks.
- **`board.js`**: Responsible for setting up the game boards and managing ship placement.
- **`Player.js`**: Manages player-specific actions, like placing ships and endgame verification
- **`turnSystem.js`**: Controls the turn-based system and switches between players.
- **`styles.css`**: Contains all the CSS for the visual styling of the game.
- sfx, animations, and fireworks are managed by js files of the same name.
---

## Functions Overview

### `game.js`
- **`placeShip(row, col, length, direction)`**:  
  Places a ship on the player's board at the specified row and column in the given direction.
  
- **`playHitAnimation(cell)`**:  
  Plays the explosion animation when a ship is hit.

- **`playMissAnimation(cell)`**:  
  Plays the water splash animation when a player misses.

- **`playRandomHitSound()`**:  
  Randomly selects and plays one of the hit sound effects.

- **`playRandomMissSound()`**:  
  Randomly selects and plays one of the miss sound effects.

- **`placeShip()`**: 
  Adds the ship objects to the player class to update the scoreboard and endGame checks.

- **`canPlaceShip()`**: 
  Checks if ship is valid.

- shipConfirm, start-game-button, pass-screen, next-player-place-ship, start-game: all control the buttons of the game. These control game flow and player turns.

- There are event listeners for each board and the various buttons which controlls how the boards are targeted and trigger the functions that control the logic of the game.

### `board.js`
- **`createBoard()`**:  
  Creates the game board by dynamically generating the cells for the grid.

- **`toggleOpponentView(isPlayer1Turn)`**:  
  Hides or shows the ships on the opponent's board depending on the player's turn.

### `Player.js`
- **`Player()`**:  
  Defines the player class, which manages individual player actions, such as placing ships and attacking.

- **`Ship()`**:  
  Defines the ship class, which handles ship arrays, hits, and sinks.

### `turnSystem.js`
- **`nextTurn()`**:  
  Switches between Player 1 and Player 2 at the end of each turn.

- **`alert(message)`**:  
  Creats a popup with an error message so player can be informed but not taken out of the game.


### `fireworks.js`
- **`startFireworks()`**:  
  Activates the fireworks and plays the fireworks sfx.

- **`animate()`**:  
  Creates canvas art of fireworks at random with random colors with a trail behind them.