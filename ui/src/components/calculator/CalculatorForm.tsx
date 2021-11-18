import React from 'react';
import {Form} from 'components/calculator/Form';
import {Container, Row} from 'react-bootstrap';
import RadioButtonToggleGroups from 'components/calculator/RadioButtonToggleGroups';
import {Bar, CalcMethod, Lift} from 'shared/Constants';
import WeightInput from 'components/calculator/WeightInput';

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


    /**
     * Sets the initial state of the form.
     * @returns {any}
     */
    const initialState: any = () => {
        // let state = ids()
        let state: any = {};
        state['calcMethod'] = calcMethod
        state['barType'] = barType
        return state
    };

    /**
     * Defines the state and form handlers for the Form hook.
     */
    const {onChange, onSubmit, values} = Form(
        ()=> {},
        initialState
    );
    const radioButtonToggleGroups = new RadioButtonToggleGroups(onChange);

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
                    id, displayName, values.calcMethod !== calcMethod,
                    onChange
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
                        id, displayName,
                        values.calcMethod !== CalcMethod.PERCENTAGE,
                        onChange
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
                <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-1">
                    <div className={`card border-${getLiftColor(lift)}`} key={`${lift}-col-${i}`}>
                        <div className={`card-header text-center text-white bg-${getLiftColor(lift)}`}>
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

    return (
        <>
            <form id="form" className="row mt-1" onSubmit={onSubmit}>
                <Container fluid className="pb-1">
                    <Row className="row-cols-auto row-cols-xxl-3 row-cols-xl-2
                    row-cols-lg-2 row-cols-md-1 row-cols-sm-1 row-cols-xs-1 justify-content-center text-center">
                        <div className="col text-center">
                            {radioButtonToggleGroups.allToggleGroups()}
                        </div>
                    </Row>
                </Container>
                {liftCardCols()}
            </form>
        </>
    )
}

export default CalculatorForm