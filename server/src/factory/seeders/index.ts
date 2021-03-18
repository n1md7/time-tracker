import dotenv from "dotenv";

dotenv.config();

import {Sequelize} from "../../database";
import config from "../../config";
import Server from "../../server";
import logWrite from '../../logger';
import createAdminUser from "./CreateAdminUser";
import createProject from "./CreateProject";

( async () => {
    config.server.port = 8761;
    try {
        // When DB is not accessible fail the app
        await Sequelize.authenticate();
        // Start Koa server
        const koa = new Server(config);
        koa.init();
        koa.startServer();

        logWrite.info('Starting custom seeder...');
        const userId = await createAdminUser();
        await createProject(userId);
        logWrite.info('Seeding finished. Stopping server...');
        koa.httpServer.close();
        logWrite.info('koa server stopped!');
    } catch (error) {
        logWrite.error(error.message || error.toString());
        process.exit(1);
    }
} )();
