import { dbAll, dbUpdate, dbGet, dbInsert, dbRun } from "../db/db.js";
import dayjs from 'dayjs';


export const save = async (page) => {

    const pAt = dayjs(page.publishedAt).format('YYYY-MM-DD HH:mm:ss');
    const cAt = dayjs(page.createdAt).format('YYYY-MM-DD HH:mm:ss');

    const params = [page.title, page.author, pAt, cAt, page.status];
    const sql = 'INSERT INTO Pages (title, author, publishedAt, createdAt, status) VALUES (?, ?, ?, ?, ?)';

    const result = await dbInsert(sql, params);

    if (!result || !result.lastID) {
        return null;
    }

    const savedPage = await findById(result.lastID);
    return savedPage;
};


export const findAll = async () => {
    const sql = 'SELECT * FROM Pages';
    return await dbAll(sql);
};

export const findByAuthor = async (authorId) => {
    const sql = 'SELECT * FROM Pages WHERE author = ?';
    return await dbGet(sql, [authorId]);
};

export const findById = async (id) => {
    const sql = 'SELECT * FROM Pages WHERE id = ?';
    return await dbGet(sql, [id]);
};

export const findAllPublished = async () => {
    return await findAllWithStatus("Published");
};

export const findAllDrafted = async () => {
    return await findAllWithStatus("Drafted");
};

export const findAllWithStatus = async (status) => {
    const sql = 'SELECT * FROM Pages WHERE status = ?';
    return await dbAll(sql, [status]);
};

export const deleteById = async (id) => {
    const sql = 'DELETE FROM Pages WHERE id = ?';

    const { count } = await dbUpdate(sql, [id]);

    return count === 1 ? true : false;
};

export const findAndUpdate = async (updated) => {
    const pAt = dayjs(updated.publishedAt).format('YYYY-MM-DD HH:mm:ss');

    const sql = 'UPDATE Pages SET title = ?, publishedAt = ?, status = ?, author = ? WHERE id = ?';
    const params = [updated.title, pAt, updated.status, updated.author, updated.id];

    await dbUpdate(sql, params);
    return updated;
};