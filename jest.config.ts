// Import kiểu dữ liệu `Config` từ Jest để đảm bảo TypeScript hiểu được cấu trúc của file cấu hình
import type { Config } from 'jest'

// Định nghĩa object `config` với kiểu `Config`
const config: Config = {
  // Sử dụng `ts-jest` làm preset để Jest hỗ trợ TypeScript mà không cần biên dịch trước
  preset: 'ts-jest',

  // Thiết lập môi trường test là Node.js (phù hợp với backend)
  testEnvironment: 'node',

  // Chỉ định thư mục chứa các file test (Jest sẽ tìm test bên trong thư mục `/test`)
  roots: ['<rootDir>/test'],

  // Giới hạn Jest chỉ chạy 1 worker để kiểm soát tài nguyên (hữu ích trên môi trường CI/CD)
  maxWorkers: 1,

  // Phát hiện các kết nối mở chưa được đóng (ví dụ: database connection, server)
  detectOpenHandles: true
}

// Xuất `config` để Jest có thể sử dụng
export default config
