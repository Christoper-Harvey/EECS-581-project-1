import json

class Player():
    # Subclass for each ship a player has
    class Ship():
        def __inti__(self, type, pos=["A1"]):
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
            # Deincriments and returns hit or sunk
            self.hp -= 1
            if self.hp > 0:
                return 1 # Hit
            else:
                return 0 # Sunk
            
        def set_pos(self, cords):
            self.pos = cords
     
    # Player instance
    def __init__(self, id):
        self.id = id
        self.ships = self.createShips()
        self.hits = []
        self.misses = []

    # Creates the 5 battleships
    def createShips(self):
        a = self.Ship('A')
        b = self.Ship('B')
        c = self.Ship('C')
        s = self.Ship('S')
        d = self.Ship('D')
        return [a,b,c,s,d]

    # Checks status of players ships
    def status(self):
        if len(self.ships) == 0:
            return "You lost."
        
        status = f"You have {len(self.ships)} left:\n"
        for ship in self.ships:
            status += f"{ship.name}\n"
        return status
    
    # Checks the coordinates of launch removing the available point and calls hit or returns miss prompt
    def check_pos(self, cord="A1"):
        # Assume missed
        hit = -1
        ship = None
        # Checks if any of the players ships are hit
        for i, ship in enumerate(self.ships):
            if cord in ship.pos:
                ship.pos.remove(cord)
                hit =  self.ships[i].hit()
                break

        # Removes sunked ships
        if hit == 0:
            self.ships.pop(i)
        # Returns prompt whether the user sunk the ship
        return hit, ship

    # Attacks other players ships, records the hit/miss and returns result of attacks   
    def attack(self, otherPlayer, cord):
        hit, ship = otherPlayer.check_pos(cord)
        match hit:
            case -1:
                self.misses.append(cord)
                return "Miss."
            case 0:
                self.hits.append(cord)
                return f"Sunk {ship.name}."
            case 1:
                self.hits.append(cord)
                return f"Hit {ship.name}."

    # Makes JSON representation of the players game state with ID and ship hit points     
    def make_state(self):
        # Sets null state to each of the ship variables if not in self.ships list
        a = 0
        b = 0
        c = 0
        s = 0
        d = 0
        # Iterates through remaining ships and updates the current hp of each ship
        for ship in self.ships:
            match ship.type:
                case 'A': # Aircraft carrier
                    a = ship.hp
                case 'B': # Battleship
                    b = ship.hp
                case 'C': # Crusier
                    c = ship.hp
                case 'S': # Submarine
                    s = ship.hp
                case 'D': # Destroyer
                    d = ship.hp

        # Define JSON object to pass 
        state = {"ID":self.id,
                 "Aircraft":a,
                 "Battleship":b,
                 "Crusier":c,
                 "Submarine":s,
                 "Destroyer":d,
                 "Hits":self.hits,
                 "Misses":self.misses
                }
        # Convert to JSON
        state = json.dumps(state)
        return state