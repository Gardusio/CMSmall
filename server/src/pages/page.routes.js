import { Router } from "express";
import { notFound, ok, unauthorized } from "../http/http.service.js";
import { isLoggedIn } from "../auth/auth.middleware.js";
import * as PageService from "./page.service.js"
import { orElseHandle } from "../app.js";


const pageRouter = Router();

pageRouter.get('/', async (req, res, handler) => {

    const doGet = async () => ok(res, await PageService.getSortedPages())

    orElseHandle(doGet, handler)
})

pageRouter.post('/', isLoggedIn, async (req, res, handler) => {

    const doCreate = async () => {
        const { info, blocks, cause } = await PageService.createPage(req.body)

        if (cause) {
            return notFound(res, cause)
        }

        return ok(res, { info: info, blocks: blocks })
    }

    orElseHandle(doCreate, handler)
})


pageRouter.get('/:id', async (req, res, handler) => {
    const doGet = async () => ok(res, await PageService.getById(req.params.id))

    orElseHandle(doGet, handler)
})


pageRouter.delete('/:id', isLoggedIn, async (req, res, handler) => {

    const doDelete = async () => {
        const { deleted, cause } = await PageService.removeById(req.user, parseFloat(req.params.id))

        if (!deleted) {
            return unauthorized(res, cause)
        }

        return ok(res, deleted)
    }

    orElseHandle(doDelete, handler)
})

pageRouter.patch('/', isLoggedIn, async (req, res, handler) => {

    const doUpdate = async () => {
        const updatedPage = req.body

        const { updated, cause } = await PageService.updatePage(updatedPage);

        if (!updated) {
            return notFound(res, cause);
        }

        return ok(res, updated);
    }

    orElseHandle(doUpdate, handler)
})

export default pageRouter;