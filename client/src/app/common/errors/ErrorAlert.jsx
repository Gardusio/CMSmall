import { Alert } from "react-bootstrap";

/**
 * Wraps the Alert component
 * 
 * @param error the error to display
 */
function ErrorAlert({ error }) {
    return (
        <Alert variant="danger" className="mt-4 mb-0">
            {error}
        </Alert>
    );
}

export { ErrorAlert };
