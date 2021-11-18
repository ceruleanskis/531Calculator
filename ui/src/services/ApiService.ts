import {Bar, CalcMethod} from 'shared/Constants';


export interface CalculatorRequest {
    calcMethod: CalcMethod;
}

export interface WeightCalculationRequest extends CalculatorRequest {
    "bp-1rm": number;
    "bp-50": number;
    "bp-55": number;
    "bp-60": number;
    "bp-65": number;
    "bp-70": number;
    "bp-75": number;
    "bp-80": number;
    "bp-85": number;
    "bp-90": number;
    "bp-95": number;
    "bp-tmax": number;
    "dl-1rm": number;
    "dl-50": number;
    "dl-55": number;
    "dl-60": number;
    "dl-65": number;
    "dl-70": number;
    "dl-75": number;
    "dl-80": number;
    "dl-85": number;
    "dl-90": number;
    "dl-95": number;
    "dl-tmax": number;
    "ohp-1rm": number;
    "ohp-50": number;
    "ohp-55": number;
    "ohp-60": number;
    "ohp-65": number;
    "ohp-70": number;
    "ohp-75": number;
    "ohp-80": number;
    "ohp-85": number;
    "ohp-90": number;
    "ohp-95": number;
    "ohp-tmax": number;
    "squat-1rm": number;
    "squat-50": number;
    "squat-55": number;
    "squat-60": number;
    "squat-65": number;
    "squat-70": number;
    "squat-75": number;
    "squat-80": number;
    "squat-85": number;
    "squat-90": number;
    "squat-95": number;
    "squat-tmax": number;
}

interface WarmupRequest extends CalculatorRequest {
    startingSet: number;
    barType: Bar;
}

/**
 * A service to handle calls to the backend API.
 */
class ApiService {
    private endpoint = '/api/calculate'

    /**
     * POST request to the api endpoint
     * @param body a CalculatorRequest
     */
    async postRequest(body: CalculatorRequest) {
        const init: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }
        return fetch(this.endpoint, init)
            .then((response) => {
                let responseJson = response.json();
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                console.error(error);
                Promise.resolve(error);
            })
    }

    /**
     * Retrieves the warmup data from the api given a weight and bar type
     * @param startingSet
     * @param barType
     */
    async getWarmup(startingSet: number, barType: Bar) {
        const warmupRequest: WarmupRequest = {
            startingSet: startingSet,
            calcMethod: CalcMethod.WARMUP,
            barType: barType
        }

        return this.postRequest(warmupRequest);
    }

    /**
     * Gets the weight calculations from the API given form values.
     * @param {WeightCalculationRequest} formValues
     * @returns {Promise<any>}
     */
    getWeightCalculations(formValues: WeightCalculationRequest) {
        return this.postRequest(formValues);
    }
}

export default ApiService