import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv'
import passport from 'passport';
import authRouter from "./auth/auth.routes.js"
import pageRouter from "./pages/page.routes.js"
import { serverSideError } from './http/http.service.js';
import blockRouter from './blocks/block.routes.js';
import siteRouter from './website/site.routes.js';

dotenv.config()
const app = express();

app.use(express.json());
app.use(cors(
    { origin: 'http://localhost:5173', credentials: true, }
));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/pages', pageRouter);
app.use('/api/blocks', blockRouter);
app.use('/api/site', siteRouter);


/**
 * Catch all error handler
*/
app.use((err, req, res, _) => {
    console.log("REQUEST ERROR: ", req.sessionID)
    console.log("SERVER ERROR: ", err)
    return serverSideError(res)
})

export const orElseHandle = async (fn, handler) => {
    try { await fn() }
    catch (err) { handler(err) }
}

export default app