import {Button, Modal} from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Hook to display the warmup values retrieved from the API in a popup modal.
 * @param props An array of attribute values:
 * {
        warmupdata: An array of values from the API containing the warmup data. See WarmupResponse for shape
        warmupmodalcolor: A string specifying the main color of the modal, as a bootstrap variable
        warmupmodallift: The string representing the calculated lift, to be displayed in the modal title
        lift: The shorthand string representing the lift, for use in id attributes
        show: Boolean toggling show or hide behavior for the modal
        onHide: A function for the onHide behavior
    }
 * @constructor
 */
function WarmupModal(props: any) {
    /**
     * Takes the array of warmup data and returns an array of HTML list items.
     * @param {string[]} warmupdata
     * @returns {JSX.Element[]}
     */
    function displayWarmupData(warmupdata: string[]) {
        let lines: JSX.Element[] = []
        let i = 0;
        for (let warmup of warmupdata) {
            lines.push(
                <li className="list-group-item list-group-item-action" key={`p-warmup-${i}`}>{warmup}</li>
            )
            i++;
        }
        return lines
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className={`bg-${props.warmupmodalcolor}`}>
                <Modal.Title id="contained-modal-title-vcenter" className="text-white text-center w-100">
                    {props.warmupmodallift} Warmup
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <ul className="list-group">
                    {displayWarmupData(props.warmupdata)}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

WarmupModal.propTypes = {
    warmupdata: PropTypes.array,
    warmupmodalcolor: PropTypes.string,
    warmupmodallift: PropTypes.string,
    lift: PropTypes.string,
    show: PropTypes.bool,
    onHide: PropTypes.func
}


export default WarmupModal