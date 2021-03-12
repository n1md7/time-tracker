import dotenv from "dotenv";

dotenv.config();

import {initMySql} from "./database";
import config from "./config";
import Server from "./server";
import logWrite from './logger';

(async () => {
    try {
        // When DB is not accessible fail the app
        await initMySql({debug: true});
        // Start Koa server
        new Server(config).init().startServer();
    } catch (error) {
        logWrite.error(error.message || error.toString());
        process.exit(1);
    }
})();
