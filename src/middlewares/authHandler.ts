import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(403).json({ message: 'Access Denied' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    // req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' })
  }
}
