import express from 'express' // Import Express
import http from 'http' // Import HTTP module
import './config/logging' // Import file logging (nếu có)
import 'reflect-metadata'

// Import các thư viện cần thiết
import { mongo, SERVER } from './config/config'
import { logging } from './config/logging'
import { loggingHandler } from './middlewares/loggingHandler'
import { corsHandler } from './middlewares/corsHandler'
import { routeNotFound } from './middlewares/routeNotFound'
import { defineRoutes } from './modules/routes'
import MainController from './controllers'
import mongoose from 'mongoose'
import { declareHandler } from './middlewares/declareHandler'
import BooksController from './controllers/bookController'
import AuthController from './controllers/userController'
export const application = express() // Tạo ứng dụng Express

// Tạo server HTTP từ Express
export const httpServer = http.createServer(application)

// Hàm khởi tạo server
export const Main = async () => {
  logging.info('🚀 Initializing API...')
  logging.info('----------------------')

  // Middleware xử lý request body
  application.use(express.urlencoded({ extended: true }))
  application.use(express.json())

  // Mongoose server
  logging.info('🚀 Connect to mongoose...')
  logging.info('----------------------')
  try {
    const connection = await mongoose.connect(mongo.MONGO_CONNECTION)
    logging.info('🚀 Connected to MongoDB, Mongoose Version: ' + connection.version)

    logging.info('----------------------')
  } catch (error) {
    logging.info('🚀 Unable to Connect to Mongo:...')
    logging.error(String(error))
    logging.info('----------------------')
  }

  logging.info('📝 Logging & Configuration Completed.')
  logging.info('----------------------')
  // Middleware xử lý logging request & response
  application.use(declareHandler)
  application.use(loggingHandler)
  application.use(corsHandler)

  logging.info('🚀 Define controller Routing...')
  logging.info('----------------------')
  defineRoutes([AuthController], application)
  application.use(routeNotFound)

  // Khởi động server
  httpServer.listen(SERVER.SERVER_PORT, () => {
    logging.info(`🚀 Server is running at http://${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}/`)
    logging.info('----------------------')
  })
}

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback)

Main()
