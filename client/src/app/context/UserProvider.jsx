import { useContext, useEffect, useState } from 'react';
import { getUserFromSession } from '../../api/auth.api';
import LoadingSpinner from '../common/layouts/LoadingSpinner';
import { ServerSideError } from "../common/errors/Errors"
import { createContext } from "react";
import { logout } from "../../api/auth.api";
import { ErrorsContext } from './ErrorsProvider';

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const { setServerError } = useContext(ErrorsContext)

    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const doLogout = () => {
        logout()
            .catch(err => {
                setServerError(new ServerSideError())
            })
            .finally(() => {
                updateUser(null)
            })
    }

    useEffect(() => {
        if (user) return
        getUserFromSession()
            .then(response => {
                if (response.success) {
                    setUser(response.data)
                }
            })
            .catch(err => setServerError(new ServerSideError()))
            .finally(() => setIsLoading(false))
    }, []);


    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <UserContext.Provider value={{ user, doLogout, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;