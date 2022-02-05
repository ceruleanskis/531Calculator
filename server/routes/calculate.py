import json
from flask import jsonify, Response

args = None

LIFTS = ['ohp', 'bp', 'squat', 'dl']
LIFTS_FULL = {
    'ohp': 'Overhead Press',
    'bp': 'Bench Press',
    'squat': 'Squat',
    'dl': 'Deadlift'
}

percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50]

bar_lower_limit_curl = 20.0
bar_lower_limit_standard = 45.0


def calculate(values) -> Response:
    '''Calculates based on calcMethod value.

    :param values: JSON request values
    :type values: dict
    :return: JSON representation of calculated values
    :rtype: Response
    '''
    if values['calcMethod'] == 'tmax':
        return calculate_percentages(values)
    elif values['calcMethod'] == '1rm':
        return calculate_maxes(values)
    else:
        # throw error
        pass


def calculate_warmups(values) -> Response:
    starting_set, bar_type = values['startingSet'], values['barType']
    if not starting_set:
        starting_set = 0.0
    else:
        starting_set = float(starting_set)

    bar_lower_limit = bar_lower_limit_standard
    if bar_type == 'curl':
        bar_lower_limit = bar_lower_limit_curl
    elif bar_type == 'standard':
        bar_lower_limit = bar_lower_limit_standard
    else:
        # throw error
        pass
    response = []
    workouts = [
        {
            "sets": "2",
            "reps": "5",
            "multiplier": 0.25
        },
        {
            "sets": "1",
            "reps": "5",
            "multiplier": 0.42
        },
        {
            "sets": "1",
            "reps": "3",
            "multiplier": 0.58
        },
        {
            "sets": "1",
            "reps": "2",
            "multiplier": 0.75
        }]

    for workout in workouts:
        multiplier = float(workout['multiplier'])
        weight = weight_round(starting_set * multiplier)
        if weight < bar_lower_limit:
            weight = bar_lower_limit

        response.append(f"{workout['sets']} x {workout['reps']} @ {weight}")

    return jsonify(message=response)


def calculate_percentages(values):
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
            calculated_weight = weight_round(training_max * percent_float)
            response[form_id] = calculated_weight

    return jsonify(message=response)


def calculate_maxes(values):
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
            calculated_weight = weight_round(training_max * percent_float)
            response[form_id] = calculated_weight

    return jsonify(message=response)


def calculate_training_max(weight: float, training_max_percent: float = 0.9):
    training_max = training_max_percent * weight
    return weight_round(training_max)


def calculate_onerm_from_tmax(training_max: float, training_max_percent: float = 0.9):
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


def weight_round(x: float, base=2.5) -> float:
    '''Rounds numbers to the nearest base.

    :param x: Number to be rounded
    :type x: float
    :param base: what step to round to, defaults to 2.5
    :type base: float, optional
    :return: The number rounded to nearest base
    :rtype: float
    '''
    return base * round(x / base)
