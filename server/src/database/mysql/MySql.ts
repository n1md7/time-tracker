import mysql from "mysql2/promise";
import config from "../../config";
import logWrite from "../../logger";

const initMySql = (mode: { debug: boolean } = {debug: false}): mysql.Pool => {

    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT),
        database: process.env.MYSQL_DB,
        password: process.env.MYSQL_PASS,
        debug: config.mysql.debug,
        waitForConnections: true,
    });
    if (mode.debug) {
        logWrite.info(`MySql connection to database [${process.env.MYSQL_DB || config.mysql.database}] successfully established!`);
    }

    return pool;
};

export default initMySql;
