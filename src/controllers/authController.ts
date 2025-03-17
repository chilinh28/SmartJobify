import { Request, Response, NextFunction } from 'express'
import { Controller } from '~/decorators/controller'
import { Route } from '~/decorators/route'
import { Validate } from '~/decorators/validate'
import { User } from '~/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerSchema } from '~/decorators/validate'
import { sendEmail } from '~/utils/email'
import fs from 'fs'
import path from 'path'
@Controller('/auth')
class AuthController {
  @Route('post', '/register')
  @Validate(registerSchema)
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, ...userData } = req.body

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ ...userData, password: hashedPassword })
      await newUser.save()

      return res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      next(error)
    }
  }

  @Route('post', '/login')
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).json({ message: 'Incorrect email' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' })
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '1h'
      })
      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '7d' })
      user.refresh_token = refreshToken
      await user.save()
      return res.status(200).json({ message: 'User login successfully', token })
    } catch (error) {
      next(error)
    }
  }

  @Route('post', '/logout')
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' })
      }

      // Tìm user có refreshToken
      const user = await User.findOne({ refresh_token: refreshToken })
      if (!user) {
        return res.status(404).json({ message: 'Invalid refresh token' })
      }

      // Xóa refreshToken trong database
      user.refresh_token = null
      await user.save()

      res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
      next(error)
    }
  }

  @Route('post', '/refresh-token')
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' })
      }

      // Tìm user có refreshToken trong DB
      const user = await User.findOne({ refresh_token: refreshToken })
      if (!user) {
        return res.status(403).json({ message: 'Invalid refresh token' })
      }

      // Xác minh refreshToken
      jwt.verify(refreshToken, process.env.REFRESH_SECRET!, (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid or expired refresh token' })
        }

        // Tạo accessToken mới
        const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
          expiresIn: '1h'
        })

        res.status(200).json({ accessToken })
      })
    } catch (error) {
      next(error)
    }
  }

  @Route('post', '/reset-password')
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Tạo token reset password
      const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '15m'
      })

      // Đọc nội dung file HTML
      const templatePath = path.join(__dirname, '../../src/templates/resetPassword.html')
      let emailHtml = fs.readFileSync(templatePath, 'utf8')

      // Chèn link đặt lại mật khẩu vào template
      const resetLink = `$/reset-password?token=${resetToken}`
      emailHtml = emailHtml.replace('{{reset_link}}', resetLink)

      // Gửi email
      await sendEmail(email, 'Reset Your Password', 'Click the link to reset your password', emailHtml)

      return res.status(200).json({ message: 'Reset password email sent' })
    } catch (error) {
      next(error)
    }
  }

  @Route('post', '/update-password')
  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body

      // Xác nhận token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { userId: string }
      const user = await User.findById(decoded.userId)

      if (!user) {
        return res.status(400).json({ message: 'Invalid token' })
      }

      // Cập nhật mật khẩu mới
      user.password = await bcrypt.hash(newPassword, 10)
      await user.save()

      return res.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
