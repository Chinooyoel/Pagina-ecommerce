import winston from 'winston'
import { logLevel } from '.'

const logger = winston.createLogger({
	level: logLevel,
	format: winston.format.json(),
	transports: [new winston.transports.Console()],
})

export = logger
