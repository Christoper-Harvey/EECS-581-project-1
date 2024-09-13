class Player():
    # Subclass for each ship a player has
    class Ship():
        def __inti__(self, type, pos=[('A',1)]):
            # Types: Aircraft (A), Battleship (B), Crusier (C), Submarine (S), Destroyer (D)
            self.type = type
            # Identifies the type of ship and assigns the correct name and hit point value
            match type:
                case 'A':
                    self.name = 'Aircraft Carrier'
                    self.hp = 5
                case 'B':
                    self.name = 'Battleship'
                    self.hp = 4
                case 'C':
                    self.name = 'Crusier'
                    self.hp = 3
                case 'S':
                    self.name = 'Submarine'
                    self.hp = 3
                case 'D':
                    self.name = 'Destroyer'
                    self.hp = 2
            # The position will be held in a list of tuples i.e. [(x1,y1),(x2,y2)]
            self.pos = pos

        # Deincriments hit points of given ship and returns if the user sunk the ship
        def hit(self):
            # Deincriments and returns prompt
            self.hp -= 1
            if self.hp > 0:
                return 1
            else:
                return 0
    
            
        def set_pos(self, cords):
            self.pos = cords
    
    # Player instance
    def __init__(self, id):
        self.id = id
        self.ships = [a = self.Ship('A'), b = self.Ship('B'), c = self.Ship('C'), s = self.Ship('S'), d = self.Ship('D')]

    def status(self):
        if len(self.ships) == 0:
            return "You lost."
        
        status = f"You have {len(self.ships)} left:\n"
        for ship in self.ships:
            status += f"{ship.name}\n"
        return status
    
    # Checks the coordinates of launch removing the available point and calls hit or returns miss prompt
    # Cord is a tuple type
    def check_pos(self, cord=('A',1)):
        # Assume missed
        hit = -1
        ship = None
        # Checks if any of the players ships are hit
        for ship in self.ships:
            if cord in ship.pos:
                ship.pos.remove(cord)
                hit =  self.hit()
                break
        # Returns prompt whether the user sunk the ship
        return hit, ship
            
    def attack(self, otherPlayer, cord):
        hit, ship = otherPlayer.check_pos(cord)
        match hit:
            case -1:
                return "Miss."
            case 0:
                return f"Sunk {ship.name}."
            case 1:
                return f"Hit {ship.name}."

