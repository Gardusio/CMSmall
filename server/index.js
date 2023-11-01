import app from './src/app.js';
import dotenv from 'dotenv'
import * as db from './src/db/db.js';

dotenv.config()
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        if (!db.instance) {
            throw new Error("DB CONNECTION ERROR")
        }

        app.listen(
            PORT,
            () => {
                console.log(`Server started on http://localhost:${PORT}/`)
            });
    } catch (error) {
        console.log(error);
    }
};

startServer();
