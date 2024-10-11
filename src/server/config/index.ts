const seed = process.env.SEED ?? '123'
const port = process.env.PORT ?? 3000
const database = process.env.URL_DB
const userdb = process.env.USER_DB
const passworddb = process.env.PASSWORD_DB
const hostdb = process.env.HOSTDB
const logLevel = process.env.LOG_LEVEL

export { seed, port, database, userdb, passworddb, hostdb, logLevel }
