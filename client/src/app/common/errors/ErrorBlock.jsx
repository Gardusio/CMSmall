import { ErrorAlert } from "./ErrorAlert";

function ErrorBlock(props) {
    const dispatchedError = props.error.message ? props.error.message : props.error
    return (
        <div className="d-flex flex-column align-items-center">
            <ErrorAlert error={dispatchedError}></ErrorAlert>
            {props.withBack ? <a className="btn btn-warning bg-dark text-white mt-4" href="/">Go back</a> : null}
        </div>
    )
}

export default ErrorBlock