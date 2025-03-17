import { Request, Response, NextFunction } from 'express'
import { logging } from '../config/logging'
import { Controller } from '../decorators/controller'
import { Route } from '../decorators/route'
import { Validate } from '../decorators/validate'
import { Book } from '../models/book'
import { MongoGetAll } from '../decorators/mongoose/getAll'
import { MongoGet } from '../decorators/mongoose/get'
import { MongoCreate } from '../decorators/mongoose/create'
@Controller('/books')
class BooksController {
  @Route('get', '/all')
  @MongoGetAll(Book)
  getAll(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoGetAll)
  }

  @Route('get', '/:id')
  @MongoGet(Book)
  get(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoGet)
  }

  @Route('post', '/create')
  @MongoCreate(Book)
  create(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoCreate)
  }

  @Route('post', '/query')
  query(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoQuery)
  }

  @Route('patch', '/update/:id')
  update(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoUpdate)
  }

  @Route('delete', '/delete/:id')
  delete(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'delete' })
  }
}

export default BooksController
