import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { logging } from '~/config/logging'

export function Validate(schema: Joi.ObjectSchema) {
  return function (target: any, propertKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await schema.validateAsync(req.body)
      } catch (error) {
        logging.error(String(error))

        return res.status(422).json({ error: String(error.message) })
      }
      return originalMethod.call(this, req, res, next)
    }
    return descriptor
  }
}

export const registerSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('employer', 'candidate').required(),
  password: Joi.string().min(6).required()
})
