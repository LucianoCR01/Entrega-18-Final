import winston from "winston";
import dotenv from "dotenv"

dotenv.config()
const APP_ENV = process.env.APP_ENV

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({ level: "http" }),
//         new winston.transports.File({ filename: "./errors.log", level: "warn" })
//     ]
// })

const loggerDesarrollo = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ level: "debug" })
    ]
})

const loggerProduccion = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: "./errors.log", level: "error" })
    ]
})

export const addLogger = (req, res, next) => {
    console.log(`La aplicacion se encuentra en nivel de ${APP_ENV}`)
    if (APP_ENV == "produccion") {
        req.logger = loggerProduccion
        req.logger.info(`[${req.method}] ${req.url} - ${new Date().toLocaleDateString()}`)
        next()
    } else {
        req.logger = loggerDesarrollo
        req.logger.info(`[${req.method}] ${req.url} - ${new Date().toLocaleDateString()}`)
        next()
    }
}