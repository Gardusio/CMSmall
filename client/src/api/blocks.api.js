import { get, orElseThrow, put } from "./api";


export const sortByOrder = (blocks) => {
    blocks.sort((a, b) => a.order - b.order);
    return blocks
}

export const invalidBlocks = (blocks) => {
    return (
        blocks.filter(b => b.type === "header").length < 1 ||
        blocks.filter(b => b.type === "img" || b.type === "paragraph").length < 1
    )
}


export const getBlocks = async (pageId) => {

    const doGet = async () => await get(`/blocks/${pageId}`);

    return await orElseThrow(doGet)
}

export const updateBlocks = async (pageId, blocks) => {

    const doUpdate = async () => await put(`/blocks/${pageId}`, blocks);

    return await orElseThrow(doUpdate)
}

export const getNextDisplayId = (blocks) => {
    if (blocks.length === 0) {
        return 0
    }

    const searchBlocks = [...blocks]
    searchBlocks.sort((a, b) => a.displayId - b.displayId)

    const nextId = searchBlocks[blocks.length - 1].displayId + 1

    return nextId
}