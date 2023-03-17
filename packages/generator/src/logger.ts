import chalk from 'chalk'

export const tags = {
  error: chalk.red('prisma:error'),
  warn: chalk.yellow('prisma:warn'),
  info: chalk.cyan('prisma:info'),
  query: chalk.blue('prisma:query'),
}
function print(...data: any[]) {
  console.log(...data)
}
function warn(message: any, ...optionalParams: any[]) {
    // prisma generate not outputting to console, redirecting somewhere else ???
    /* console.warn(`${tags.warn} ${message}`, ...optionalParams) */
    console.info(`${tags.warn} ${message}\n`, ...optionalParams)
}
function info(message: any, ...optionalParams: any[]) {
  console.info(`${tags.info} ${message}\n`, ...optionalParams)
}
function error(message: any, ...optionalParams: any[]) {
  // same as warn ^^
  console.info(`${tags.error} ${message}\n`, ...optionalParams)
}
function query(message: any, ...optionalParams: any[]) {
  console.log(`${tags.query} ${message}\n`, ...optionalParams)
}

export const log = { print, warn, info, error, query }
