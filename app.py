'''
 * NAME: Battleship - EECS581 Project 1 - app.py
 * DESCRIPTION: This program loads in and hosts our web app. It also manages requests from the webapp as a server would.
 * INPUT: index.html
 * OUTPUT: port to game file hosted by flask
 * SOURCES: 
 * AUTHORS: Chris Harvey
 * DATE: 9/11/24
'''

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Game data (depreciated)
game_state = {
    "board_size": 10,
    "ships": [(1, 1), (2, 2), (3, 3)], 
    "hits": [],
    "misses": []
}

@app.route('/')
def index():
    return render_template('index.html') # loads webapp and hosts it at http://127.0.0.1:5000/

@app.route('/api/check', methods=['POST']) # takes requests from the server to load any data. (depreciated)
def check_shot(): #(depreciated)
    data = request.json
    row = data['row']
    col = data['col']
    
    if (row, col) in game_state['ships']:
        game_state['hits'].append((row, col))
        return jsonify({"status": "hit", "row": row, "col": col})
    else:
        game_state['misses'].append((row, col))
        return jsonify({"status": "miss", "row": row, "col": col})

if __name__ == "__main__": # runs the python code
    app.run(debug=True)

# if __name__ == "__main__": (depreciated)
#     app.run(host='0.0.0.0', port=5000, debug=True)
