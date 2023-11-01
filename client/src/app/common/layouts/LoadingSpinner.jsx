import { Spinner } from "react-bootstrap";

/**
 * Wraps a loading spinner
 */
function LoadingSpinner() {

    return (
        <div className="d-flex flex-column align-items-center position-absolute top-50 start-50">
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
            </Spinner>
            <span className="visually">Loading</span>
        </div>
    );
}

export default LoadingSpinner;
