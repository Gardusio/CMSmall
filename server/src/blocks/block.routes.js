import { Router } from "express";
import { badRequest, ok } from "../http/http.service.js";
import * as BlockService from "./block.service.js"
import { orElseHandle } from "../app.js";
import { isLoggedIn } from "../auth/auth.middleware.js";

const blockRouter = Router();

blockRouter.get('/:pageId', async (req, res, handler) => {

    const doGet = async () => ok(res, await BlockService.getAllByPageId(parseFloat(req.params.pageId)))

    orElseHandle(doGet, handler)
})


blockRouter.put('/:pageId', isLoggedIn, async (req, res, handler) => {

    const doUpdate = async () => {
        const { blocks, cause } = await BlockService.updateBlocks(parseFloat(req.params.pageId), req.body)

        if (!blocks) {
            return badRequest(res, cause)
        }
        return ok(res, blocks)
    }

    orElseHandle(doUpdate, handler)
})


export default blockRouter;