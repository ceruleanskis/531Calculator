import React from 'react';
import {Form} from 'components/calculator/Form';
import {Button, Col, Container, Row, Spinner} from 'react-bootstrap';
import RadioButtonToggleGroups from 'components/calculator/RadioButtonToggleGroups';
import {Bar, CalcMethod, Lift} from 'shared/Constants';
import WeightInput from 'components/calculator/WeightInput';
import WarmupModal from 'components/calculator/WarmupModal';
import ApiService, {WeightCalculationRequest} from 'services/ApiService';
import {AssertionError} from 'assert';
import LocalStorageService from 'services/LocalStorageService';

/**
 * A hook that contains the form inputs and logic for the calculator.
 * @returns {JSX.Element}
 * @constructor
 */
function CalculatorForm() {
    const calcMethod: CalcMethod = CalcMethod.TMAX;
    const barType: Bar = Bar.STANDARD;
    const lifts: Lift[] = Object.values(Lift);
    const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    const liftFullNames: { [key in Lift]: string } = {
        'ohp': 'Overhead Press',
        'bp': 'Bench Press',
        'squat': 'Squat',
        'dl': 'Deadlift'
    }

    const [warmupLoadingShow, setWarmupLoadingShow] = React.useState(false);
    const [calculateLoadingShow, setCalculateLoadingShow] = React.useState(false);
    const [warmupModalShow, setWarmupModalShow] = React.useState(false);
    const [warmupData, setWarmupData] = React.useState([]);
    const [warmupModalColor, setWarmupModalColor] = React.useState('primary');
    const [warmupModalLift, setWarmupModalLift] = React.useState(Lift.OVERHEAD_PRESS as string);
    const [scrollButtonVisible, setScrollButtonVisible] = React.useState(true)

    const apiService = new ApiService();
    const localStorageService = new LocalStorageService();

    /**
     * Loads local storage values into form on load of this hook.
     */
    const onLoadCalculatorForm = () => {
        if (localStorageService.load('formData') != null) {
            let formData: string = localStorageService.load('formData') as string;
            try {
                let formDataObj = JSON.parse(formData) as { [key: string]: string }
                setCalculatedValuesInForm(formDataObj)
            } catch (err) {
                console.error('Could not parse local storage data.');
                localStorageService.clear();
            }
        }
    }

    /**
     * Retrieves the calculations from the API and sets the returned values in the form.
     * @returns {Promise<void>}
     */
    async function getCalculations() {
        setCalculateLoadingShow(true);
        apiService.getWeightCalculations(values as WeightCalculationRequest).then((response) => {
            setCalculatedValuesInForm(response);
            localStorageService.save('formData', JSON.stringify(response));
        }).catch((err) => {
            console.error(err);
        }).finally(() => setCalculateLoadingShow(false))
    }

    /**
     * Creates an array of form input names and values for each lift.
     * @returns {any}
     */
    const ids = () => {
        const arr: any = {}
        for (const lift of lifts) {
            arr[`${lift}-${CalcMethod.TMAX}`] = 0
            arr[`${lift}-${CalcMethod.ONERM}`] = 0
            for (const percentage of percentages) {
                const key = `${lift}-${percentage.toString()}`;
                arr[key] = 0
            }
        }
        return arr
    }

    /**
     * Sets the initial state of the form.
     * @returns {any}
     */
    const initialState: any = () => {
        let state = ids()
        state['calcMethod'] = calcMethod
        state['barType'] = barType
        return state
    };

    /**
     * Defines the state and form handlers for the Form hook.
     */
    let {onChange, onSubmit, values} = Form(
        getCalculations,
        initialState
    );

    /**
     * Sets the form back to its initial values and fires a
     * change event for the radio buttons to recognize the value.
     */
    const onReset = () => {
        console.log(values)
        const radioInputIds = [
            'btnRadioCalcMethodTrainingMax',
            'btnRadioCalcMethodOneRepMax',
            'btnRadioStandardBarType',
            'btnRadioCurlBarType'
        ]
        values = initialState()
        setCalculatedValuesInForm(values)
        const event = new Event('input', {});
        for (let id of radioInputIds) {
            let input = document.querySelector(`#${id}`) as HTMLInputElement
            input.dispatchEvent(event);
        }
        localStorageService.save('formData', JSON.stringify(values));
        console.log(values)
    }

    const radioButtonToggleGroups = new RadioButtonToggleGroups(onChange);

    /**
     * Given an id attribute, determine which lift it belongs to.
     * @param {string} id
     * @returns {Lift}
     */
    function getLiftFromId(id: string): Lift {
        for (let lift of lifts) {
            if (id.includes(lift)) {
                return lift;
            }
        }
        throw AssertionError;
    }

    /**
     * Returns the Bootstrap color associated with the given Lift.
     * @param {Lift} lift
     * @returns {string}
     */
    function getLiftColor(lift: Lift): string {
        let color = 'primary';
        switch (lift) {
            case Lift.BENCH_PRESS:
                color = 'warning';
                break
            case Lift.SQUAT:
                color = 'danger';
                break
            case Lift.DEADLIFT:
                color = 'info';
                break
            case Lift.OVERHEAD_PRESS:
            default:
                break
        }
        return color
    }

    /**
     * Event handler for the warmup button click.
     * Calls the backend to retrieve warmup values and displays a WarmupModal with the retrieved values.
     * @param {React.MouseEvent<HTMLButtonElement>} event
     * @returns {Promise<void>}
     */
    const onWarmupButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setWarmupLoadingShow(true);
        event.preventDefault();

        // Get the input associated with the warmup button so the value, lift, and color can be defined.
        const target = event.target as HTMLInputElement
        const associatedInputId = (target.id).replace('icon-warmup-', '')
            .replace('warmup-', '')
        const associatedInput = document.querySelector(`#${associatedInputId}`) as HTMLInputElement
        const value = Number(associatedInput.value);
        const lift: Lift = getLiftFromId(associatedInputId);
        const liftTitle: string = liftFullNames[lift] as string;
        const color = getLiftColor(lift);

        apiService.getWarmup(value, values.barType).then((response) => {
                setWarmupData(response.message);
                setWarmupModalColor(color);
                setWarmupModalShow(true);
                setWarmupModalLift(liftTitle);
            }
        ).catch(err => {
            console.error(err);
        }).finally(() => setWarmupLoadingShow(false));
    }

    /**
     * Takes the values returned from calculation and sets them to the appropriate ids in the form.
     * @param {{[p: string]: any}} calculatedValues
     */
    function setCalculatedValuesInForm(calculatedValues: { [key: string]: any }) {
        for (let id in calculatedValues) {
            if (id in ids()) {
                let element = document.querySelector(`#${id}`) as HTMLInputElement
                element.value = calculatedValues[id]
                values[id] = calculatedValues[id]
            }
        }
    }

    /**
     * Returns a WeightInput for the given Lift, CalcMethod and label displayName.
     * @param lift
     * @param calcMethod
     * @param displayName
     */
    const calcMethodInput = (lift: Lift, calcMethod: CalcMethod, displayName: string) => {
        let id = `${lift}-${calcMethod}`;
        return (
            <Row className="justify-content-center text-center">
                {WeightInput(
                    id, displayName, getLiftColor(lift), values.calcMethod !== calcMethod,
                    onChange, onWarmupButtonClick
                )}
            </Row>
        )
    }

    /**
     * Returns an array of rows containing WeightInputs for each of the percentages.
     * @param {Lift} lift
     * @returns {JSX.Element[]}
     */
    const percentageInputs = (lift: Lift) => {
        let inputs: JSX.Element[] = []
        let i = 0
        for (let percentage of percentages) {
            let id = `${lift}-${percentage}`
            let displayName = `${percentage.toString()}%`
            inputs.push(
                <div className="row justify-content-center text-center" key={`${id}-row-${i}`}>
                    {WeightInput(
                        id, displayName, getLiftColor(lift),
                        values.calcMethod !== CalcMethod.PERCENTAGE,
                        onChange, onWarmupButtonClick, warmupLoadingShow
                    )}
                </div>
            )
            i++;
        }
        return inputs
    }

    /**
     * Returns an array of cols for each lift containing a card with the 1RM, TM and percentage inputs.
     * @returns {JSX.Element[]}
     */
    const liftCardCols = () => {
        let cols: JSX.Element[] = []
        let i = 0
        for (const lift of lifts) {
            cols.push(
                <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-1" key={`${lift}-col-${i}`}>
                    <div className={`card border-${getLiftColor(lift)}`}>
                        <div className={`card-header text-center text-white bg-${getLiftColor(lift)}`}
                             key={`${lift}-card-header-${i}`}>
                            <strong>{liftFullNames[lift]}</strong></div>
                        <fieldset id={`${lift}`}>
                            <div className="card-body">
                                {calcMethodInput(lift, CalcMethod.ONERM, '1RM')}
                                {calcMethodInput(lift, CalcMethod.TMAX, 'TM')}
                                {percentageInputs(lift)}
                            </div>
                        </fieldset>
                    </div>
                </div>
            );
            i++;
        }
        return cols
    }

    /**
     * A row containing buttons for form submit and form reset.
     * @returns {JSX.Element}
     */
    function submitAndResetButtonRow() {
        return (
            <Row className="justify-content-center text-center row-full g-0 calculate-button-row">
                <Col className="text-center justify-content-end mt-1 mb-1 g-5">
                    <Button id="calculate" type="submit" variant="info"
                            className="float-end mobile-w-100 border-light">
                        <Spinner animation="border" role="status" variant="light" as="span" size="sm"
                                 hidden={!calculateLoadingShow}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <i className="fas fa-calculator icon" hidden={calculateLoadingShow}/> Calculate
                    </Button>
                </Col>
                <Col className="text-center justify-content-start mt-1 mb-1 g-5">
                    <Button id="clear" type="reset" variant="danger"
                            className="float-start mobile-w-100 border-light">
                        <i className="fas fa-ban icon"/> Reset
                    </Button>
                </Col>
            </Row>
        )
    }

    /**
     * Toggles the visibility of the scroll button.
     */
    const toggleVisibility = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            setScrollButtonVisible(false)
        } else {
            setScrollButtonVisible(true)
        }
    }

    /**
     * Scrolls the window to the bottom of the page.
     */
    const scroll = () => {
        window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "smooth"});
    }

    // eslint-disable-next-line
    React.useEffect(() => onLoadCalculatorForm(), []);
    React.useEffect(() => {
        // eslint-disable-next-line
        // @ts-ignore
        document.addEventListener("scroll", function (e) {
            toggleVisibility()
        }, undefined)
    })

    return (
        <>
            <WarmupModal
                show={warmupModalShow}
                onHide={() => setWarmupModalShow(false)}
                warmupdata={warmupData}
                warmupmodalcolor={warmupModalColor}
                warmupmodallift={warmupModalLift}
            />
            <form id="form" className="row mt-1" onSubmit={onSubmit} onReset={onReset}>
                <Container fluid className="pb-1">
                    <Row className="row-cols-auto row-cols-xxl-3 row-cols-xl-2
                    row-cols-lg-2 row-cols-md-1 row-cols-sm-1 row-cols-xs-1 justify-content-center text-center">
                        <div className="col text-center">
                            {radioButtonToggleGroups.allToggleGroups()}
                        </div>
                    </Row>
                </Container>
                {liftCardCols()}
                {submitAndResetButtonRow()}
                <Button className="btn-circle btn-xl fixed-bottom fixed-right mb-2 mx-2 display-mobile"
                        hidden={!scrollButtonVisible}
                        onClick={() => scroll()}>
                    <i className="fas fa-chevron-down icon"/>
                </Button>
            </form>
        </>
    )
}

export default CalculatorForm