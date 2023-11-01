import { dbGet } from "../db/db.js";


export const findByUsername = async (username) => {
    const user = await dbGet(
        "SELECT * FROM Users WHERE username = ?",
        [username]
    );

    return user;
}


export const findById = async (id) => {
    const user = await dbGet(
        "SELECT * FROM Users WHERE id = ?",
        [id]
    );

    return user;
}
