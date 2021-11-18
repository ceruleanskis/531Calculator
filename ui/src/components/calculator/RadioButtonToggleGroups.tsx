import {ButtonGroup} from 'react-bootstrap';
import React, {ChangeEventHandler} from 'react';
import {Bar, CalcMethod} from 'shared/Constants';

/**
 * Contains methods to create the radio buttons and their toggle groups for the calculation method and bar type toggles.
 */
class RadioButtonToggleGroups {
    /**
     * Takes a change handler function for the toggles.
     * @param {React.ChangeEventHandler<HTMLInputElement>} onChange
     */
    constructor(private onChange: ChangeEventHandler<HTMLInputElement>) {
    }

    radioToggleButton = (name: string, id: string, value: string,
                         defaultChecked: boolean, label: string, color: string) => {
        return (
            <>
                <input type="radio" className="btn-check w-100" name={name} id={id}
                       value={value} autoComplete="off" onChange={this.onChange} defaultChecked={defaultChecked}/>
                <label className={`btn btn-outline-${color} w-100`} htmlFor={id}>
                    {label}
                </label>
            </>
        )
    }

    calcMethodToggleGroup = () => {
        return (
            <>
                {this.radioToggleButton(
                    'calcMethod', 'btnRadioCalcMethodTrainingMax', CalcMethod.TMAX,
                    true, 'Calculate By Training Max', 'info'
                )}
                {this.radioToggleButton(
                    'calcMethod', 'btnRadioCalcMethodOneRepMax', CalcMethod.ONERM,
                    false, 'Calculate By 1RM', 'info'
                )}
            </>
        )
    }

    barTypeToggleGroup = () => {
        return (
            <>
                {this.radioToggleButton(
                    'barType', 'btnRadioStandardBarType', Bar.STANDARD, true,
                    'Standard Olympic Bar', 'secondary'
                )}
                {this.radioToggleButton(
                    'barType', 'btnRadioCurlBarType', Bar.CURL, false,
                    'Curl Bar', 'secondary'
                )}
            </>
        )
    }

    buttonGroup = (toggleGroup: JSX.Element, ariaLabel: string, paddingClass: string | null) => {
        return (
            <ButtonGroup size="sm" className={`w-100 ${paddingClass}`} role="group"
                         aria-label={ariaLabel}>
                {toggleGroup}
            </ButtonGroup>
        )
    }

    allToggleGroups = () => {
        return (
            <>
                {this.buttonGroup(this.calcMethodToggleGroup(),
                    "Radio button toggle group for calculation method", null)}
                {this.buttonGroup(this.barTypeToggleGroup(),
                    "Radio button toggle group for bar type", "pt-1")}
            </>
        )
    }
}

export default RadioButtonToggleGroups;