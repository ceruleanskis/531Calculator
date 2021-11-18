import React, {ChangeEventHandler, MouseEventHandler} from 'react';
import {Button, Spinner} from 'react-bootstrap';

/**
 * A hook for an input element for entering weight values.
 * @param {string} id a string indicating which id should be given to the input element
 * @param {string} displayText The string label to display for the input
 * @param color {string} The color to display for the warmup button
 * @param {boolean} disabled Boolean toggle for if the input is disabled or not
 * @param {React.ChangeEventHandler<HTMLInputElement>} onChange The input's change event handling function
 * @param onWarmupButtonClick {MouseEventHandler<HTMLButtonElement>} The event handler for the onChange function of the warmup button
 * @param warmupLoadingShow {boolean} Whether to show or hide the loading spinner for the warmup button
 * @returns {JSX.Element}
 * @constructor
 */
function WeightInput(id: string, displayText: string, color: string, disabled: boolean,
                     onChange: ChangeEventHandler<HTMLInputElement>,
                     onWarmupButtonClick: MouseEventHandler<HTMLButtonElement>, warmupLoadingShow?: boolean) {
    const maxValue = 1000;
    const minValue = 0;

    /**
     * Displays the warmup button with a spinner.
     * @param {string} id
     * @returns {JSX.Element}
     */
    function warmupButton(id: string) {
        if (id.includes('tmax') || id.includes('1rm')) {
            return (<div className="col-1 pb-1"/>)
        } else {
            return (
                <div className="col-1 pb-1">
                    <Button id={`warmup-${id}`} type="button" className={`btn btn-${color} float-start`}
                            onClick={onWarmupButtonClick}>
                        <Spinner animation="border" role="status" variant="light" as="span" size="sm"
                                 hidden={!warmupLoadingShow}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <i className="fas fa-fire-alt icon" id={`icon-warmup-${id}`} hidden={warmupLoadingShow}/>
                    </Button>
                </div>
            )
        }
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className={`col-4 text-start`}>
                    <label htmlFor={`${id}`} className="col-form-label">{displayText}</label>
                </div>
                <div className={`col-5 pb-1`}>
                    <input type="number" step="2.5" name={`${id}`} id={`${id}`} defaultValue="0"
                           max={maxValue} min={minValue}
                           className="form-control text-center" onChange={onChange} readOnly={disabled}/>

                </div>
                {warmupButton(id)}
            </div>
        </>
    )
}

export default WeightInput