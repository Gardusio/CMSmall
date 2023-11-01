import { ok } from "../http/http.service.js";
import { getById } from "../users/user.service.js"
import { passportAuthenticate } from "./passport.js";
import { mapUserResponse } from "../users/user.mapper.js";

export const authenticate = (req, res, next) => {
    passportAuthenticate(req, res, next)
};

export const getSession = async (req, res) => {
    const user = await getById(req.user.id)

    return ok(res, mapUserResponse(user))
}


export const endSession = (req, res) => {
    req.logout(() => {
        res.json("Logged out")
        res.end()
    })

}
