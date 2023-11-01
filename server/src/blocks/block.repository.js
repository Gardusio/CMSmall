import { dbAll, dbGet, dbInsert, dbUpdate } from "../db/db.js";

export const findAll = async () => {
    const sql = 'SELECT * FROM Blocks';
    return await dbAll(sql);
};

export const deleteAllByPageId = async (pid) => {
    const sql = 'DELETE FROM Blocks WHERE pageId = ?';
    return await dbUpdate(sql, [pid]);
};

export const findById = async (id) => {
    const sql = 'SELECT * FROM Blocks WHERE id = ?';
    const retrievedBlocks = await dbGet(sql, [id]);
    const blocks = retrievedBlocks ? retrievedBlocks : {}
    return blocks
};

export const findByPage = async (id) => {
    const sql = 'SELECT * FROM Blocks WHERE pageId = ?';
    const retrievedBlocks = await dbAll(sql, [id]);
    const blocks = retrievedBlocks ? retrievedBlocks : []

    return blocks
};

export const deleteById = async (id) => {
    const sql = 'DELETE FROM Blocks WHERE id = ?';

    const { count } = await dbUpdate(sql, [id]);

    return count === 1 ? true : false;
};

export const findAndUpdate = async (updated) => {

    const sql = 'UPDATE Blocks SET type = ?, block_order = ?, content = ? WHERE id = ?';
    const params = [updated.type, updated.order, updated.content, updated.id];

    const { count } = await dbUpdate(sql, params);
    return count;
};

export const updateMany = async (blocks) => {

    let modifiedCount = 0

    blocks.forEach(async (b) => {
        modifiedCount = modifiedCount + await findAndUpdate(b)
    })

    return modifiedCount
}

export const deleteMany = async (blocks) => {

    let deletedCount = 0

    blocks.forEach(async (b) => {
        if (await deleteById(b.id))
            deletedCount++
    })

    return deletedCount
}

export const save = async (block) => {
    const sql = 'INSERT INTO Blocks (pageId, type, block_order, content) VALUES (?, ?, ?, ?)';
    const params = [block.pageId, block.type, block.order, block.content];

    const result = await dbInsert(sql, params);

    if (!result || !result.lastID) {
        return null;
    }

    const savedBlock = await findById(result.lastID);
    return savedBlock;
};

export const saveMany = async (blocks) => {
    const res = blocks.map(async (b) => await save(b))
        .map(_ => 1)
        .reduce(((a, b) => a + b), 0)

    return res
}

export const saveMul = async (blocks) => {
    const res = await Promise.all(blocks.map(async (b) => await save(b)))
    return res
}