import json
from collections import OrderedDict, namedtuple
from pathlib import Path

RESOURCES_PATH = Path(__file__).parent


def create_namedtuple_from_dict(obj):
    '''converts given list or dict to named tuples, generic alternative
      to dataclass'''
    if isinstance(obj, dict):
        fields = sorted(obj.keys())
        namedtuple_type = namedtuple(
            typename='TestData',
            field_names=fields,
            rename=True,
        )
        field_value_pairs = OrderedDict(
            (str(field), create_namedtuple_from_dict(obj[field]))
            for field in fields
        )
        try:
            return namedtuple_type(**field_value_pairs)
        except TypeError:
            # Cannot create namedtuple instance so fallback to
            # dict (invalid attribute names)
            return dict(**field_value_pairs)
    elif isinstance(obj, (list, set, tuple, frozenset)):
        return [create_namedtuple_from_dict(item) for item in obj]
    else:
        return obj


def inject_test_data(file_path):
    '''
        Read the content of the JSON file and convert it to a named
        tuple, can be used for injecting test data set to tests,
        helps in separating test data from the tests
    '''
    file_path = str(RESOURCES_PATH.joinpath(file_path))
    with open(file_path, encoding='utf-8') as file:
        raw_data = json.load(file)
    return create_namedtuple_from_dict(raw_data)
