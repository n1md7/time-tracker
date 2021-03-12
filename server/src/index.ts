import dotenv from "dotenv";

dotenv.config();

import {initMongoDB, initMySql} from "./database";
import config from "./config";
import Server from "./server";
import logWrite from './logger';

( async () => {
    try {
        // When DB is not accessible fail the app
        await initMongoDB();
        await initMySql({debug: true});
        // Start Koa server
        const koa = new Server(config);
        koa.init();
        koa.startServer();
        koa.startSocket();
    } catch (error) {
        logWrite.error(error.message || error.toString());
        process.exit(1);
    }
} )();
