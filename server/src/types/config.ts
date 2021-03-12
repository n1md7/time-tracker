export type ConfigOptions = {
    server: ServerConfig,
    origin: string,
    loggerOptions: LoggerOptions,
    mysql: MySql,
    mongo: Mongo
}

type MySql = {
    host: string,
    user: string,
    database: string,
    debug: boolean,
    connectionLimit: number,
}

type Mongo = {
    host: string,
    user: string,
    database: string,
    port: number,
    pass: string,
}

export type ServerConfig = {
    apiContextPath: string,
    hostname: string,
    port: number,
    staticFolderPath: string,
    indexFile: string
}

export type LoggerOptions = {
    fileOptions: File,
    timeStampFormat: string,
    excludeUrlsFromLogger: string[]
}

export type File = {
    maxsize: number,
    maxFiles: number,
    filename: string
}