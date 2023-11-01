import passport from "passport";
import LocalStrategy from 'passport-local'
import { getUserDetails } from "./auth.service.js";
import { getById } from "../users/user.service.js";
import { forbidden, ok } from "../http/http.service.js";
import { mapUserResponse } from "../users/user.mapper.js";

export const strategy = (username, password, done) => {
    getUserDetails(username, password)
        .then((details) => {
            const { user, error } = details

            if (!user) {
                return done(null, false, error.name)
            }

            return done(null, user);
        })
        .catch((err) => done(
            { status: 500, message: err.name },
            false
        ))
}
passport.use(new LocalStrategy(strategy));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    getById(id)
        .then(user => { done(null, user) })
        .catch(err => { done(err, null) });
});

export const passportAuthenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) next(err);

        if (!user) {
            return forbidden(res)
        }

        req.login(user, (err) => {
            if (err) next(err);

            ok(res, mapUserResponse(user));
        });
    })(req, res, next)
}
