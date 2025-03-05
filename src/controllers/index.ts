import { Request, Response, NextFunction } from 'express'
import { logging } from '~/config/logging'
import { Controller } from '~/decorators/controller'
import { Route } from '~/decorators/route'
import { Validate } from '~/decorators/validate'
import Joi from 'joi'

const postHealthCheckValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email()
})

@Controller()
class MainController {
  @Route('get', '/healthcheck')
  getHealthCheck(req: Request, res: Response, next: NextFunction) {
    logging.info('getHealthCheck called')
    return res.status(200).json({ hello: '123' })
  }
}

export default MainController
