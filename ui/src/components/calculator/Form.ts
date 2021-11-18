import React, {useState} from 'react';

/**
 * A Hook to handle form value changes and form submission.
 * @param callback The async handler for submission
 * @param initialState  Initial state values for the form
 * @constructor
 */
export const Form = (callback: any, initialState: { [key: string]: any } = {}) => {
    const [values, setValues] = useState(initialState);

    /**
     * Updates the form values to {event.target.name: event.target.value}
     * @param event The change event
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

