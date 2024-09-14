
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
- **`Player.js`**: Manages player-specific actions, like placing ships and taking turns.
- **`turnSystem.js`**: Controls the turn-based system and switches between players.
- **`styles.css`**: Contains all the CSS for the visual styling of the game.
- **`class.py`**: Backend Python class representation of the game state and player interaction

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

### `board.js`
- **`createBoard()`**:  
  Creates the game board by dynamically generating the cells for the grid.

- **`toggleOpponentView(isPlayer1Turn)`**:  
  Hides or shows the ships on the opponent's board depending on the player's turn.

### `Player.js`
- **`Player()`**:  
  Defines the player class, which manages individual player actions, such as placing ships and attacking.

- **`attack(row, col)`**:  
  Handles an attack at the specified row and column.

### `turnSystem.js`
- **`switchTurn()`**:  
  Switches between Player 1 and Player 2 at the end of each turn.

- **`toggleOpponentView(isPlayer1Turn)`**:  
  Toggles the view of the boards depending on which player is taking their turn.

### `class.py`
- **`Player - __init__(id)`**:
  Sets the player ID and intial ships for the player object

- **`Player - createShips()`**:
  Initializes the battleship objects on instance of player object

- **`Player - status()`**:
  Returns the current number and which ships are left to a given player

- **`Player - check_pos(cord)`**:
  Given a coordinate, returns if the attack is a miss, hit or sink as well as the ship if hit

- **`Player - attack(otherPlayer, cord)`**:
  Calls check_pos against another player

- **`Ship - __init__(type, pos)`**:
  Defines the type of ship instantied which sets the name and hp while the position is set from the frontend

- **`Ship - hit()`**:
  When a hit occurs on a ship, decreases hp and returns if it is a sink or not

- **`Ship - set_pos(cords)`**:
  Sets the list of coordinates the ships are placed on the front end

---

## License
[MIT License](LICENSE)
