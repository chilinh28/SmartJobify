// Import dotenv để đọc các biến môi trường từ file .env
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Nạp cấu hình từ file .env vào process.env
dotenv.config()

/**
 * Kiểm tra môi trường hiện tại của ứng dụng
 * Nếu NODE_ENV là "development" => DEVELOPMENT = true
 * Nếu NODE_ENV là "test" => TEST = true
 */
export const DEVELOPMENT = process.env.NODE_ENV === 'development'
export const TEST = process.env.NODE_ENV === 'test'

//Mongoose
export const MONGO_USER = process.env.MONGODB_USER || ''
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
export const MONGO_URL = process.env.MONGO_URL || ''
export const MONGO_DATABASE = process.env.MONGO_DATABASE || ''
export const MONGO_OPTIONS: mongoose.ConnectionOptions = { w: 'majority' }
/**
 * Lấy giá trị SERVER_HOSTNAME từ biến môi trường, nếu không có thì mặc định là "localhost"
 */
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'

/**
 * Lấy giá trị SERVER_PORT từ biến môi trường, nếu không có thì mặc định là 12345
 * Vì process.env lưu giá trị dưới dạng chuỗi nên cần chuyển đổi sang kiểu số bằng Number()
 */
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000

/**
 * Đối tượng SERVER chứa tất cả thông tin về server
 * Giúp dễ dàng import vào các file khác
 */
export const SERVER = {
  SERVER_HOSTNAME,
  SERVER_PORT
}

export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_DATABASE,
  MONGO_OPTIONS,
  // MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`
  MONGO_CONNECTION: `mongodb+srv://chilinh28:chilinh28@cluster-project-job.b1zmq.mongodb.net/project_job?w=majority`
}
