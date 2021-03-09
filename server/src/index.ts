import dotenv from "dotenv";
import {Env} from './types';

// When it is executed outside docker env - parse .env file
if (process.env.EXEC_ENV !== Env.Docker) {
    dotenv.config();
}

import initDatabase from "./database";
import config from "./config";
import App from "./server";
import log from './logger';

( async () => {
    try {
        // When DB is not accessible fail the app
        await initDatabase();
        // Start Koa server
        new App(config).init().start();
    } catch (error) {
        log.error(error.message || error.toString());
        process.exit(1);
    }
} )();
