from app import app
from flask import testing
import pytest


@pytest.fixture(name='client')
def fixture_client() -> testing.FlaskClient:
    '''
    Configures a client for testing.
    :return: A client for sending requests
    :rtype: testing.FlaskClient
    '''
    return app.test_client()


def test_warmup_lower_bound(client):
    ''' Warmups should have lower bound on bar type weight '''
    endpoint = '/api/warmup'

    data = {'calcMethod': 'warmup', 'barType': 'standard', 'startingSet': 30}
    res = client.post(endpoint, json=data)
    json_data = res.get_json()
    assert res.status_code == 200
    assert json_data['message'] == ['2 x 5 @ 45.0',
                                    '1 x 5 @ 45.0',
                                    '1 x 3 @ 45.0',
                                    '1 x 2 @ 45.0']

    data = {'calcMethod': 'warmup', 'barType': 'curl', 'startingSet': 30}
    res = client.post(endpoint, json=data)
    json_data = res.get_json()
    assert res.status_code == 200
    assert json_data['message'] == ['2 x 5 @ 20.0',
                                    '1 x 5 @ 20.0',
                                    '1 x 3 @ 20.0',
                                    '1 x 2 @ 22.5']
    return app.test_client()
