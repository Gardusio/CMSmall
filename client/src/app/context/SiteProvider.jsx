import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSiteName, updateSiteName } from '../../api/site.api';
import LoadingSpinner from '../common/layouts/LoadingSpinner';
import { ErrorsContext } from './ErrorsProvider';
import { ServerSideError } from '../common/errors/Errors';


export const SiteContext = createContext();

const SiteProvider = ({ children }) => {
    const { setServerError } = useContext(ErrorsContext)

    const [siteName, setSiteName] = useState("CMSmall")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getSiteName()
            .then(response => setSiteName(response.data.name))
            .catch(err => setServerError(new ServerSideError()))
            .finally(() => setIsLoading(false))
    }, []);

    const updateName = async (newName) => {
        setIsLoading(true)
        updateSiteName(newName)
            .then(res => setSiteName(res.data))
            .catch(err => setServerError(new ServerSideError()))
            .finally(() => setIsLoading(false))
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <SiteContext.Provider value={{ name: siteName, updateSiteName: updateName }}>
            {children}
        </SiteContext.Provider>
    );
};

export default SiteProvider
