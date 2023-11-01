import sqlite from 'sqlite3'

export const instance = new sqlite.Database('./src/db/db.sqlite', (err) => {
    if (err) throw err;
});

/**
 * Wrapper around db.all
 */
export const dbAll = (sql, params = []) => new Promise((resolve, reject) => {
    instance.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
    });
});

/**
 * Wrapper around db.run
 */
export const dbRun = (sql, params = []) => new Promise((resolve, reject) => {
    instance.run(sql, params, function (err) {
        if (err) {
            console.error('Error executing SQL:', err);
            reject(err);
        } else {
            resolve(this.lastID);
        }
    });
});

/**/
export const dbUpdate = (sql, params = []) => new Promise((resolve, reject) => {
    instance.run(sql, params, function (err) {

        if (err) {
            console.error('Error executing SQL:', err);
            reject(err);
        } else {
            resolve({ count: this.changes });
        }
    });
});

/**/
export const dbInsert = (sql, params = []) => new Promise((resolve, reject) => {
    instance.run(sql, params, function (err) {
        if (err) {
            console.error('Error executing SQL:', err);
            reject(err);
        } else {
            resolve({ lastID: this.lastID });
        }
    });
});



/**
 * Wrapper around db.get
 */
export const dbGet = (sql, params = []) => new Promise((resolve, reject) => {
    instance.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
    });
});