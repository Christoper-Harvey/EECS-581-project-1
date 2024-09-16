/**
 * NAME: Battleship - EECS581 Project 1 - player.js
 * DESCRIPTION: This is a class file for Ships and Players
 * INPUT: input for constructors - player id and ship length and coordinates
 * OUTPUT: none
 * SOURCES: None
 * AUTHORS: Chris Harvey
 * DATE: 9/15/24
 */
class Ship {
    constructor(length, coordinates) {
        this.length = length;
        this.coordinates = coordinates; // Store the ship's coordinates (e.g., ['A1', 'A2'])
        this.hits = 0;
        this.sunk = false;
        this.hitCoordinates = []; // Track hit coordinates to avoid double hits
    }

    hit(coord) {
        // Check if the hit coordinate is part of the ship and hasn't been hit before
        if (this.coordinates.includes(coord) && !this.hitCoordinates.includes(coord)) {
            this.hits++;
            this.hitCoordinates.push(coord); // Mark this coordinate as hit
            if (this.hits === this.length) {
                this.sunk = true;
            }
            return { hit: true, sunk: this.sunk }; // Return both hit status and sunk status
        }
        return { hit: false, sunk: false }; // Not a hit, return false
    }
}



class Player {
    constructor(id) {
        this.id = id;
        this.ships = [];
        this.shipsLeft = 0;
    }

    addShip(length, coordinates) {
        const ship = new Ship(length, coordinates); // Pass the coordinates to the Ship constructor
        this.ships.push(ship);
        this.shipsLeft++;
    }

    recordHit(shipIndex) {
        const sunk = this.ships[shipIndex].hit();
        if (sunk) {
            this.shipsLeft--;
            return true; // Ship was sunk
        }
        return false; // Ship was hit but not sunk
    }
}
