export const BLOCK_TYPE = {
    HEADER: 'header',
    IMG: 'img',
    PARAGRAPH: 'paragraph',
}

class Block {
    constructor(pageId, type, order, content) {
        this.pageId = pageId;
        this.type = type;
        this.order = order;
        this.content = content;
    }

    withId = (id) => {
        this.id = id
        return this
    }
}

export default Block