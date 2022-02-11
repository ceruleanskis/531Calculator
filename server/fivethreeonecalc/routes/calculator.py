''' Methods for calculating weights and routines. '''
from flask import jsonify, Response

LIFTS = ['ohp', 'bp', 'squat', 'dl']
LIFTS_FULL = {
    'ohp': 'Overhead Press',
    'bp': 'Bench Press',
    'squat': 'Squat',
    'dl': 'Deadlift'
}

percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50]

BAR_LOWER_LIMIT_CURL = 20.0
BAR_LOWER_LIMIT_STANDARD = 45.0


def calculate(values) -> Response:
    '''
    Calculates based on calcMethod value.

    :param values: JSON request values
    :type values: dict
    :return: JSON representation of calculated values
    :rtype: Response
    '''
    response = None
    if values['calcMethod'] == 'tmax':
        response = calculate_percentages(values)
    elif values['calcMethod'] == '1rm':
        response = calculate_maxes(values)

    return response


def calculate_warmups(values) -> Response:
    '''
    Calculates the warmup sets given a weight value.

    :param values: A dict containing the data to calculate.
        {
            'calcMethod': 'warmup',
            'barType': 'standard',
            'startingSet': 30
        }
    :type values: Optional[Any]
        [
            "2 x 5 @ 47.5",
            "1 x 5 @ 80.0",
            "1 x 3 @ 110.0",
            "1 x 2 @ 142.5"
        ]
    :return: A json list of strings representing warmup sets
    :rtype: Response
    '''
    starting_set, bar_type = values['startingSet'], values['barType']
    if not starting_set:
        starting_set = 0.0
    else:
        starting_set = float(starting_set)

    bar_lower_limit = BAR_LOWER_LIMIT_STANDARD
    if bar_type == 'curl':
        bar_lower_limit = BAR_LOWER_LIMIT_CURL
    elif bar_type == 'standard':
        bar_lower_limit = BAR_LOWER_LIMIT_STANDARD
    else:
        # throw error
        pass
    response = []
    workouts = [
        {
            'sets': '2',
            'reps': '5',
            'multiplier': 0.25
        },
        {
            'sets': '1',
            'reps': '5',
            'multiplier': 0.42
        },
        {
            'sets': '1',
            'reps': '3',
            'multiplier': 0.58
        },
        {
            'sets': '1',
            'reps': '2',
            'multiplier': 0.75
        }]

    for workout in workouts:
        multiplier = float(workout['multiplier'])
        weight = weight_round(starting_set * multiplier)
        weight = max(weight, bar_lower_limit)
        response.append(
            f'{workout["sets"]} x {workout["reps"]} @ {weight}')

    return jsonify(message=response)


def calculate_percentages(values) -> Response:
    '''
    Given a set of training maxes, generates a json object containing
    the calculated one rep maxes and the calculated percentages
    of the training maxes.

    :param values: dict, ex.
        {
            "bp-tmax": "225",
            ...(repeat for other lifts)
        }
    :type values: dict
    :return: calculated percentages
    :rtype: Response
        {
            "bp-1rm": 265.0,
            "bp-50": 112.5,
            "bp-55": 125.0,
            "bp-60": 135.0,
            "bp-65": 145.0,
            "bp-70": 157.5,
            "bp-75": 170.0,
            "bp-80": 180.0,
            "bp-85": 190.0,
            "bp-90": 202.5,
            "bp-95": 215.0,
            "bp-tmax": 225.0,
            ...(repeat for other lifts)
        }
    '''
    response = {}
    for lift in LIFTS:
        tmax_form_id = f'{lift}-tmax'
        training_max = values[tmax_form_id]
        if not training_max:
            training_max = 0.0
        else:
            training_max = float(training_max)
        response[tmax_form_id] = training_max

        onerm_form_id = f'{lift}-1rm'
        onerm = calculate_onerm_from_tmax(training_max, 0.85)
        response[onerm_form_id] = onerm
        for percentage in percentages:
            form_id = f'{lift}-{percentage}'
            percent_float = percentage / 100
            calculated_weight = weight_round(
                training_max * percent_float)
            response[form_id] = calculated_weight

    return jsonify(message=response)


def calculate_maxes(values):
    '''
    Given a set of one rep maxes, generates a json object containing
    the calculated training maxes and the calculated percentages
    of the training maxes.

    :param values: dict, ex.
        {
            "bp-1rm": "265",
            ...(repeat for other lifts)
        }
    :type values: dict
    :return: calculated maxes/percentages
    :rtype: Response
        {
            "bp-1rm": 265.0,
            "bp-50": 112.5,
            "bp-55": 125.0,
            "bp-60": 135.0,
            "bp-65": 145.0,
            "bp-70": 157.5,
            "bp-75": 170.0,
            "bp-80": 180.0,
            "bp-85": 190.0,
            "bp-90": 202.5,
            "bp-95": 215.0,
            "bp-tmax": 225.0,
            ...(repeat for other lifts)
        }
    '''
    response = {}
    for lift in LIFTS:
        onerm_form_id = f'{lift}-1rm'
        onerm = values[onerm_form_id]
        if not onerm:
            onerm = 0.0
        else:
            onerm = float(onerm)
        response[onerm_form_id] = onerm
        training_max = calculate_training_max(onerm, 0.85)
        tmax_form_id = f'{lift}-tmax'
        response[tmax_form_id] = training_max

        for percentage in percentages:
            form_id = f'{lift}-{percentage}'
            percent_float = percentage / 100
            calculated_weight = weight_round(
                training_max * percent_float)
            response[form_id] = calculated_weight

    return jsonify(message=response)


def calculate_training_max(
        onerm: float,
        training_max_percent: float = 0.9) -> float():
    '''
    Calculates a training max from a given percentage of a one rep max.

    :param onerm: The one rep max
    :type onerm: float
    :param training_max_percent: percentage of the 1rm, defaults to 0.9
    :type training_max_percent: float, optional
    :return: [description]
    :rtype: [type]
    '''
    training_max = training_max_percent * onerm
    return weight_round(training_max)


def calculate_onerm_from_tmax(
        training_max: float,
        training_max_percent: float = 0.9) -> float:
    '''
    Given a training max, calculates the one rep max.

    :param training_max:
    :type training_max: float
    :param training_max_percent: defaults to 0.9
    :type training_max_percent: float, optional
    :return: The 1RM
    :rtype: float
    '''
    onerm = training_max / training_max_percent
    return weight_round(onerm)


def calculate_onerm(weight: float, reps: int) -> float:
    '''Calculates one rep maxes based on the Epley Formula
    https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula

    :param weight: The weight in lbs
    :type weight: float
    :param reps: The number of repetitions for the weight
    :type reps: int
    :return: The calculated 1RM
    :rtype: float
    '''
    onerm = (weight * reps * 0.0333) + weight
    return weight_round(onerm)


def weight_round(num: float, base=2.5) -> float:
    '''Rounds numbers to the nearest base.

    :param x: Number to be rounded
    :type x: float
    :param base: what step to round to, defaults to 2.5
    :type base: float, optional
    :return: The number rounded to nearest base
    :rtype: float
    '''
    return base * round(num / base)
