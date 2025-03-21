// Import `supertest` để thực hiện các HTTP request đến ứng dụng của chúng ta trong môi trường test
import request from 'supertest'

// Import ứng dụng Express và hàm Shutdown từ file server.ts để kiểm tra
import { application, Shutdown } from '../src/index'

// Mô tả nhóm các test cases cho ứng dụng của chúng ta
describe('Our Application', () => {
  // Sau khi tất cả các test hoàn thành, gọi hàm `Shutdown` để đảm bảo ứng dụng được đóng đúng cách
  afterAll((done) => {
    Shutdown(done) // Đóng kết nối database, server hoặc các tài nguyên khác nếu có
  })

  // Kiểm tra xem ứng dụng có khởi động đúng và môi trường test có được cấu hình chuẩn hay không
  it('Starts and has the proper test environment', async () => {
    // Kiểm tra giá trị của biến môi trường `NODE_ENV` phải là `test`
    expect(process.env.NODE_ENV).toBe('test')

    // Kiểm tra xem `application` có được định nghĩa không (ứng dụng đã khởi động chưa)
    expect(application).toBeDefined()
  }, 10000) // Timeout là 10 giây để tránh lỗi khi khởi động chậm

  // Kiểm tra API cho phép gọi phương thức HTTP nào bằng request OPTIONS
  it('Returns all options allowed to be called by customers (http methods)', async () => {
    // Gửi một HTTP request với phương thức OPTIONS đến endpoint `/`
    const response = await request(application).options('/')

    // Kiểm tra xem server có phản hồi với status code 200 không (OK)
    expect(response.status).toBe(200)

    // Kiểm tra xem header 'Access-Control-Allow-Methods' có tồn tại không,
    // và có giá trị mong đợi hay không (có thể cần so sánh với danh sách cụ thể)
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PUT, PATCH, DELETE')
  })
})
