import { forbidden } from "../http/http.service.js";


export const isLoggedIn = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next()
    }

    return forbidden(res, "Log in to access this resource");
}