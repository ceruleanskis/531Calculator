import json

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


def calculate(values):
    if values['calcMethod'] == 'tmax':
        calculated_percentages = calculate_percentages(values)
        return json.dumps(calculated_percentages)
    elif values['calcMethod'] == '1rm':
        calculated_percentages = calculate_maxes(values)
        return json.dumps(calculated_percentages)
    elif values['calcMethod'] == 'warmup':
        return json.dumps(calculate_warmups(values['startingSet'], values['barType']))


def calculate_warmups(starting_set, bar_type):
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
        weight = myround(starting_set * multiplier)
        if weight < bar_lower_limit:
            weight = bar_lower_limit

        response.append(f"{workout['sets']} x {workout['reps']} @ {weight}")

    return {"message": response}


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
            calculated_weight = myround(training_max * percent_float)
            response[form_id] = calculated_weight

    return response


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
            calculated_weight = myround(training_max * percent_float)
            response[form_id] = calculated_weight

    return response


def calculate_training_max(weight: float, training_max_percent: float = 0.9):
    training_max = training_max_percent * weight
    return myround(training_max)


def calculate_onerm_from_tmax(training_max: float, training_max_percent: float = 0.9):
    onerm = training_max / training_max_percent
    return myround(onerm)


def calculate_onerm(weight: float, reps: int):
    # epley formula

    onerm = (weight * reps * 0.0333) + weight
    return myround(onerm)


def myround(x, base=2.5):
    return base * round(x / base)
