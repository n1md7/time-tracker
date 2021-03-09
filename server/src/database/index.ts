import mongoose from 'mongoose';
import log from '../logger';

const initDatabase = async (): Promise<void> => {
    const {
        MONGO_DB_NAME,
        MONGO_HOST,
        MONGO_PORT,
        MONGO_USER,
        MONGO_PASS
    } = process.env;
    const url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    await mongoose.connect(url, mongoOptions)
        .catch((error) => {
            log.info(`Connection string is "${url}"`);
            throw new Error(error.message || error);
        });
    log.info('Database connection established successfully');
};

export default initDatabase;
