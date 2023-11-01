import React, { createContext, useState } from 'react';
import ErrorBlock from '../common/errors/ErrorBlock';


export const ErrorsContext = createContext();

const ErrorsProvider = ({ children }) => {
    const [serverError, setServerError] = useState(null);
    const [actionError, setActionError] = useState(null);

    const clearErrors = () => {
        setServerError(null)
        setActionError(null)
    }

    if (serverError) {
        return <ErrorBlock error={serverError} withBack={true} />
    }

    return (
        <ErrorsContext.Provider value={{
            actionError: actionError,
            clearErrors: clearErrors,
            setActionError: setActionError,
            setServerError: setServerError
        }}>
            <section style={{ "marginTop": "4em" }}>
                {actionError ? <ErrorBlock error={actionError} withBack={false} /> : null}
                {children}
            </section>
        </ErrorsContext.Provider>
    );
};

export default ErrorsProvider
