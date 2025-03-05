import { Request, Response, NextFunction } from 'express'
import { Model } from 'mongoose'
import { logging } from '~/config/logging'

export function MongoGetAll(model: Model<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const documents = await model.find()
        req.mongoGetAll = documents
      } catch (error) {
        logging.error(String(error))
        return res.status(500).json({ error: String(error) })
      }
      return originalMethod.call(this, req, res, next)
    }
    return descriptor
  }
}
