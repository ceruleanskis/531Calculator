import React from 'react';
import {Form} from 'components/calculator/Form';
import {Container, Row} from 'react-bootstrap';
import RadioButtonToggleGroups from 'components/calculator/RadioButtonToggleGroups';
import {Bar, CalcMethod} from 'shared/Constants';

function CalculatorForm() {
    const calcMethod: CalcMethod = CalcMethod.TMAX;
    const barType: Bar = Bar.STANDARD;

    const initialState = () => {
        // let state = ids()
        let state: any = {};
        state['calcMethod'] = calcMethod
        state['barType'] = barType
        return state
    };

    const {onChange, onSubmit, values} = Form(
        ()=> {},
        initialState
    );
    const radioButtonToggleGroups = new RadioButtonToggleGroups(onChange);


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
            </form>
        </>
    )
}

export default CalculatorForm