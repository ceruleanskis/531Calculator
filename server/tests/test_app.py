# pylint: skip-file

from .data_handler import inject_test_data
from fivethreeonecalc.app import create_app
from flask import testing
from typing import Union, NamedTuple
import pytest
import json


class TestCalculator:

    WARMUP_TEST_DATA = inject_test_data(file_path='warmup_tests.json')

    @pytest.fixture(name='client')
    def fixture_client(self) -> testing.FlaskClient:
        '''
        Configures a client for testing.
        :return: A client for sending requests
        :rtype: testing.FlaskClient
        '''
        return create_app().test_client()

    @pytest.mark.parametrize('input', WARMUP_TEST_DATA.test_warmup_lower_bound)
    def test_warmup_lower_bound(self, client, input: NamedTuple):
        ''' Warmups should have lower bound on bar type weight '''
        endpoint = '/api/warmup'
        res = client.post(endpoint, json=input.request._asdict())
        json_data = res.get_json()
        assert res.status_code == input.expected_status_code
        assert json_data['message'] == input.expected_response

    @pytest.mark.parametrize('input', WARMUP_TEST_DATA.test_warmup_calculation)
    def test_warmup_calculation(self, client, input: NamedTuple):
        '''
        Warmups should calculate as follows (w is weight):
            [
                "2 x 5 @ 0.25 * w",
                "1 x 5 @ 0.42 * w",
                "1 x 3 @ 0.58 * w",
                "1 x 2 @ 0.75 * w"
            ]
        '''
        endpoint = '/api/warmup'
        res = client.post(endpoint, json=input.request._asdict())
        json_data = res.get_json()
        assert res.status_code == input.expected_status_code
        assert json_data['message'] == input.expected_response