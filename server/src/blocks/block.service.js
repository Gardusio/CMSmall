import Block from "./block.js";
import * as BlockMapper from "./block.mapper.js"
import * as BlockRepository from "./block.repository.js"

const sortByOrder = (blocks) => {
    blocks.sort((a, b) => a.order - b.order);
}

const invalidBlocks = (blocks) => {
    return (
        blocks.filter(b => b.type === "header").length < 1 ||
        blocks.filter(b => b.type === "img" || b.type === "paragraph").length < 1
    )
}

export const getAllByPageId = async (pageId) => {

    const blocks = await BlockRepository.findByPage(pageId);

    const mappedBlocks = BlockMapper.mapBlocks(blocks)

    mappedBlocks.sort((b, b1) => b.order - b1.order)

    return mappedBlocks;
}


export const updateBlocks = async (pid, updatedBlocks) => {
    if (invalidBlocks(updatedBlocks)) {
        return { cause: "A page must have at least one Header and one Paragraph or Image" }
    }

    const existingBlocks = updatedBlocks
        .filter(block => block.id)
        .map(b => new Block(pid, b.type, b.order, b.content).withId(b.id))

    const newBlocks = updatedBlocks
        .filter(block => !block.id)
        .map(b => new Block(pid, b.type, b.order, b.content))

    let toDeleteBlocks = await BlockRepository.findByPage(pid)
    toDeleteBlocks = toDeleteBlocks.filter(b => !existingBlocks.map(bl => bl.id).includes(b.id))

    await BlockRepository.updateMany(existingBlocks)

    await BlockRepository.saveMany(newBlocks)

    await BlockRepository.deleteMany(toDeleteBlocks)

    const retrievedBlocks = await BlockRepository.findByPage(pid)

    const pageBlocks = BlockMapper.mapBlocks(retrievedBlocks)

    sortByOrder(pageBlocks)

    return { blocks: pageBlocks };

}
