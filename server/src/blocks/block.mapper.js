export const mapBlocks = (blockEntities) => {
    const mappedBlocks = blockEntities.map(b => mapBlock(b))
    return mappedBlocks
}


export const mapBlock = (block) => {
    return {
        id: block.id,
        type: block.type,
        order: block.block_order,
        content: block.content
    };
}