// // Xác định ai có quyền truy cập vào API server
import { Request, Response, NextFunction } from 'express'

export function corsHandler(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', req.header('origin') || '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.status(200).json({ message: 'ERROR corsHandler' })
    return
  }

  next() // Chuyển tiếp request nếu không phải preflight
}

// import { RequestHandler } from 'express'

// export const corsHandler: RequestHandler = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.header('origin') || '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   res.header('Access-Control-Allow-Credentials', 'true')

//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//     res.status(200).json({ message: 'ERROR corsHandler' })
//     return
//   }

//   next()
// }
