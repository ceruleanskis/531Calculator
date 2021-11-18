import React, {ChangeEventHandler} from 'react';


/**
 *
 * @param {string} id a string indicating which id should be given to the input element
 * @param {string} displayText The string label to display for the input
 * @param {boolean} disabled Boolean toggle for if the input is disabled or not
 * @param {React.ChangeEventHandler<HTMLInputElement>} onChange The input's change event handling function
 * @returns {JSX.Element}
 * @constructor
 */
function WeightInput(id: string, displayText: string, disabled: boolean,
                     onChange: ChangeEventHandler<HTMLInputElement>) {
    const maxValue = 1000;
    const minValue = 0;

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
            </div>
        </>
    )
}

export default WeightInput