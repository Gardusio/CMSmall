import { Router } from "express";
import { endSession, getSession } from "../auth/auth.controller.js";
import { isLoggedIn } from "../auth/auth.middleware.js";
import { authenticate } from "../auth/auth.controller.js";


const authRouter = Router();


authRouter.post('/login', authenticate)

authRouter.post('/logout', isLoggedIn, endSession);

authRouter.get("/session/", isLoggedIn, getSession);


export default authRouter