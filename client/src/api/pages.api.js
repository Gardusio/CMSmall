import { delet, get, orElseThrow, patch, post } from "./api";
import { updateBlocks } from "./blocks.api";

export const getPages = async () => {

    const doGet = async () => await get("/pages/");

    return await orElseThrow(doGet)
}

export const deleteOne = async (pageId) => {
    const id = parseFloat(pageId)
    const doDelete = async () => await delet(`/pages/${id}`);

    return await orElseThrow(doDelete)
}

export const updateOne = async (updated) => {
    const doUpdate = async () => await patch(`/pages`, updated);

    return await orElseThrow(doUpdate)
}

export const createOne = async (pag, blocks) => {

    const doCreate = async () => {
        const pageResponse = await post(`/pages`, { page: { info: pag, blocks: blocks } });
        return pageResponse;
    }

    return await orElseThrow(doCreate)
}
