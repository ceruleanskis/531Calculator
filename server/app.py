from flask import Flask, request

from routes import calculate as calculator

app = Flask(__name__)

version = "0.1.7"


# TODO: Split this route into two; POST /api/calculate and GET /api/warmup
@app.route('/api/calculate', methods=['POST'])
def calculate():
    error = None
    if request.method == 'POST':
        return calculator.calculate(request.json)


if __name__ == '__main__':
    app.run()
