import chalk from 'chalk' // Thư viện giúp tô màu log
import moment from 'moment' // Thư viện xử lý thời gian

// Hàm ghi log chung
const log = (level: string, message: string) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  let colorizedMessage = `[${timestamp}] [${level}] ${message}`

  // Tô màu theo loại log
  if (level === 'INFO') colorizedMessage = chalk.blue(colorizedMessage)
  if (level === 'WARN') colorizedMessage = chalk.yellow(colorizedMessage)
  if (level === 'ERROR') colorizedMessage = chalk.red(colorizedMessage)

  console.log(colorizedMessage)
}

// Hàm log theo từng mức độ
export const logging = {
  info: (msg: string) => log('INFO', msg),
  warn: (msg: string) => log('WARN', msg),
  error: (msg: string) => log('ERROR', msg)
}
