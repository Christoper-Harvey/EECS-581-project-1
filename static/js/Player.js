class Player {
    myBoard = [[]];//matrix for this player to view their own ships and hits against them. "Bottom board"
    oppBoard = [[]];//matrix for this player to view their shots against the opponent. "Top board"
    shipsLeft;
    constructor(id) {
        this._id = id;
        //initalize boards
    }

    //player id getter
    get id(){
        return this._id;
    }

    //shipsLeft getter
    get shipsLeft() {
        return this._shipsLeft;
    }
}