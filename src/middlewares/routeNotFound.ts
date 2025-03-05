import { Request, Response, NextFunction } from 'express'
import { logging } from '../config/logging' // Đảm bảo import đúng module logging

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error('Route not found')

  logging.error(error.message) // Ghi log lỗi

  res.status(404).json({ message: error.message }) // Trả về JSON với thông báo lỗi
}
