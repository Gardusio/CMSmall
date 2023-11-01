import { ServerSideError } from "../app/common/errors/Errors";
import { get, orElseThrow, post } from "./api";

/**
* Attempts a login
* 
* @param username username of the user
* @param password password
*/
export const login = async (username, password) => {

    const doLogin = async () => await post("/auth/login", {
        username: username,
        password: password
    });

    return await orElseThrow(doLogin)
}

/**
* Retrieves the user from the current auth session 
* 
* @param username username of the user
* @param password password
*/
export const getUserFromSession = async (user) => {
    const doGet = async () => await get("/auth/session/");

    return await orElseThrow(doGet)
}

/*
* Logout
*/
export const logout = async () => {
    const doLogout = async () => await post("/auth/logout");

    return await orElseThrow(doLogout)
}