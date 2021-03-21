export default {
    server: {
        apiContextPath: '/api',
        hostname: '127.0.0.1',
        port: 8080,
        staticFolderPath: '../../../app/build',
        indexFile: '/index.html',
    },
    origin: 'http://localhost:3000',
    loggerOptions: {
        fileOptions: {
            maxsize: 100000000,
            maxFiles: 7,
            filename: process.env.LOGFILE || 'logs/app.log'
        },
        timeStampFormat: 'YYYY-MM-DD HH:mm:ss:ms',
        excludeUrlsFromLogger: ['/health-check']
    }
}
