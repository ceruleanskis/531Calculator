''' The main application factory function. '''
from flask import Flask, request, Response

from fivethreeonecalc.routes import calculator


def create_app(test_config=None) -> Flask:
    '''
    Flask application factory function

    :param test_config: the test config to load, defaults to None
    :type test_config: [type], optional
    :return: a Flask instance
    :rtype: Flask
    '''
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # # ensure the instance folder exists
    # try:
    #     os.makedirs(app.instance_path)
    # except OSError:
    #     pass

    @app.route('/api/calculate', methods=['POST'])
    def calculate() -> Response:
        '''Route for calculating percentages and training maxes

        :rtype: Response
        '''
        response = None
        if request.method == 'POST':
            response = calculator.calculate(request.get_json())

        return response

    @app.route('/api/warmup', methods=['POST'])
    def warmup() -> Response:
        '''Route for calculating warmup sets

        :return: JSON list of warmup sets
        :rtype: Response
        '''
        response = None
        if request.method == 'POST':
            response = calculator.calculate_warmups(request.get_json())

        return response

    return app
