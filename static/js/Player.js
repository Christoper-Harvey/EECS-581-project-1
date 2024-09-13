class Player {
    ships = [];//array containing player's ships
    shipsLeft = 0;//tracks how many ships this player has left
    constructor(id) {
        this._id = id;
    }

    //player id getter
    get id(){
        return this._id;
    }

    //shipsLeft getter
    get shipsLeft() {
        return this._shipsLeft;
    }

    //ships getter
    get ships() {
        return this._ships;
    }
}