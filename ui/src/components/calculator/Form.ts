import React, {useState} from 'react';

/**
 * A Hook to handle form value changes and form submission.
 * @param callback The async handler for submission
 * @param {{[p: string]: any}} initialState Initial state values for the form
 * @returns {{onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: any) => Promise<void>, values: {[p: string]: any}}}
 * @constructor
 */
export const Form = (callback: any, initialState: { [key: string]: any } = {}) => {
    const [values, setValues] = useState(initialState);
    /**
     * Updates the form values to {event.target.name: event.target.value}
     * @param {React.ChangeEvent<HTMLInputElement>} event The change event
     */
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values, [event.target.name]:
            event.target.value
        });
    };

    /**
     * Awaits the onSubmit action and prevents page refresh on form submission
     * @param event
     * @returns {Promise<void>}
     */
    const onSubmit = async (event: any) => {
        event.preventDefault();
        await callback();
    };

    return {
        onChange,
        onSubmit,
        values
    };
}

