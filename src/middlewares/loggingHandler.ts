import { Request, Response, NextFunction } from 'express'
import { logging } from '../config/logging' // Import logging từ logging.ts

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
  logging.info(`📥 Incoming Request: [${req.method}] ${req.url} - IP: ${req.socket.remoteAddress}`)

  res.on('finish', () => {
    logging.info(
      `📤 Response: [${req.method}] ${req.url} - Status: ${res.statusCode} - IP: ${req.socket.remoteAddress}`
    )
  })

  next() // Chuyển sang middleware tiếp theo
}
