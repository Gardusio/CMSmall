import { Router } from "express";
import { isLoggedIn } from "../auth/auth.middleware.js";
import { badRequest, forbidden, ok } from "../http/http.service.js";
import { dbGet, dbUpdate } from "../db/db.js";
import { orElseHandle } from "../app.js";

const siteRouter = Router();


siteRouter.post('/', isLoggedIn, async (req, res, handler) => {

    if (req.user.role !== "ADMIN") {
        return forbidden(res)
    }

    const newName = req.body.name

    if (!newName || newName === "") {
        return badRequest(res, "Please provide a valid name")
    }

    const doUpdate = async (name) => {
        await dbUpdate(
            'UPDATE Website SET name = ? WHERE id = ?',
            [name, 1]
        );

        return ok(res, name)
    }

    orElseHandle(() => doUpdate(newName), handler)
});

siteRouter.get("/", async (req, res, handler) => {

    const doGet = async () => {
        const name = await dbGet(
            "SELECT * FROM Website WHERE id = ?",
            [1]
        );

        return ok(res, name)
    }

    orElseHandle(doGet, handler)
});


export default siteRouter