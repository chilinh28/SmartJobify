// // Xác định ai có quyền truy cập vào API server
import { Request, Response, NextFunction } from 'express'
import { Document } from 'mongoose'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      mongoGet: Document | undefined
      mongoGetAll: Document[]
      mongoUpdate: Document | undefined
      mongoDelete: Document | undefined
      mongoCreate: Document | undefined
      mongoQuery: Document[]
    }
  }
}
export function declareHandler(req: Request, res: Response, next: NextFunction) {
  req.mongoCreate = undefined
  req.mongoDelete = undefined
  req.mongoGet = undefined
  req.mongoGetAll = []
  req.mongoQuery = []
  req.mongoUpdate = undefined

  next()
}
