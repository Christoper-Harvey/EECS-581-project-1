from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Game data
game_state = {
    "board_size": 5,  # A 5x5 board for simplicity
    "ships": [(1, 1), (2, 2), (3, 3)],  # Example ships coordinates (row, col)
    "hits": [],
    "misses": []
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/check', methods=['POST'])
def check_shot():
    data = request.json
    row = data['row']
    col = data['col']
    
    if (row, col) in game_state['ships']:
        game_state['hits'].append((row, col))
        return jsonify({"status": "hit", "row": row, "col": col})
    else:
        game_state['misses'].append((row, col))
        return jsonify({"status": "miss", "row": row, "col": col})

if __name__ == "__main__":
    app.run(debug=True)

# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=5000, debug=True)
