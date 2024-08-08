import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import { promises as fsPromises } from 'fs'
import path from 'path'


export const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(path.join(path.resolve(), '/logs')))) {
            await fsPromises.mkdir(path.join(path.join(path.resolve(), '/logs')))
        }
        await fsPromises.appendFile(path.join(path.join(path.resolve(), '/logs'), logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}


export const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode ? res.statusCode : 500
    logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log("FROM ERROR HANDLER: ", err.stack)
    res.status(statuscode)
    res.json({ message: err.message })
}