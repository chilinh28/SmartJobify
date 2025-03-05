// import { Router, Express, RequestHandler } from 'express'
// import productRoutes from './product-router'

// const router = Router()

// // Định nghĩa các router con
// router.use('/products', productRoutes)

// export default router

import { Express, RequestHandler } from 'express'

export type RouteHandler = Map<keyof Express, Map<string, RequestHandler[]>>
