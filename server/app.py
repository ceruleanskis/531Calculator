from flask import Flask, request, Response

from routes import calculate as calculator

app = Flask(__name__)

version = "0.1.7"


@app.route('/api/calculate', methods=['POST'])
def calculate() -> Response:
    '''Route for calculating percentages and training maxes

    :return: JSON representation of percentages/training maxes
    :rtype: Response
    '''
    error = None
    if request.method == 'POST':
        return calculator.calculate(request.json)


@app.route('/api/warmup', methods=['POST'])
def warmup() -> Response:
    '''Route for calculating warmup sets

    :return: JSON list of warmup sets
    :rtype: Response
    '''
    error = None
    if request.method == 'POST':
        return calculator.calculate_warmups(request.json)


if __name__ == '__main__':
    app.run()
