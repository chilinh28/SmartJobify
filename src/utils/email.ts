import sendMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import { logging } from '~/config/logging'

dotenv.config()

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDER_EMAIL = process.env.SENDER_EMAIL

if (!SENDGRID_API_KEY || !SENDER_EMAIL) {
  throw new Error('Missing SENDGRID_API_KEY or SENDGRID_SENDER_EMAIL in .env')
}

sendMail.setApiKey(SENDGRID_API_KEY)

/**
 * Gửi email với SendGrid
 * @param to - Địa chỉ email người nhận
 * @param subject - Tiêu đề email
 * @param text - Nội dung email (text)
 * @param html - Nội dung email (HTML)
 */
export const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
  try {
    const msg = {
      to,
      from: SENDER_EMAIL,
      subject,
      text,
      html
    }
    logging.info(`from: ${msg.from}, to: ${msg.to}, subject: ${msg.subject}, text: ${msg.text}, html: ${msg.html}`)
    await sendMail.send(msg)
    logging.info(`Email sent to ${to}`)
  } catch (error) {
    logging.error(String(error))
    throw new Error('Failed to send email')
  }
}
