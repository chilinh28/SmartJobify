import { RequestHandler } from 'express'
import 'reflect-metadata'

/**
 * Kiểu dữ liệu phương thức HTTP hợp lệ
 */
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

/**
 * Kiểu dữ liệu lưu trữ route
 */
type RouteHandler = Map<HttpMethod, Map<string, RequestHandler[]>>

/**
 * Decorator `Route` để đăng ký một route vào metadata của class.
 *
 * @param {HttpMethod} method - Phương thức HTTP (GET, POST, PUT, DELETE, v.v.).
 * @param {string} [path=''] - Đường dẫn của route, mặc định là chuỗi rỗng.
 * @param {RequestHandler[]} middleware - Các middleware có thể được áp dụng cho route.
 */
export function Route(method: HttpMethod, path: string = '', ...middleware: RequestHandler[]) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const routerPath = path

    // Lấy prototype của class để lưu metadata đúng chỗ
    const prototype = Object.getPrototypeOf(target)

    // Lấy metadata hiện có, nếu chưa có thì khởi tạo mới
    const routeHandlers: RouteHandler = Reflect.getMetadata('routeHandlers', prototype) || new Map()

    // Kiểm tra nếu method chưa có trong metadata thì thêm vào
    if (!routeHandlers.has(method)) {
      routeHandlers.set(method, new Map())
    }

    // Kiểm tra nếu đường dẫn chưa có thì thêm vào
    if (!routeHandlers.get(method)?.has(routerPath)) {
      routeHandlers.get(method)?.set(routerPath, [])
    }

    // Lấy danh sách middleware + handler hiện có cho route
    const existingHandlers = routeHandlers.get(method)?.get(routerPath) || []

    // Thêm middleware + handler mới vào danh sách (không ghi đè)
    routeHandlers.get(method)?.set(routerPath, [...existingHandlers, ...middleware, descriptor.value])

    // Lưu lại metadata vào class để có thể sử dụng sau này khi đăng ký router
    Reflect.defineMetadata('routeHandlers', routeHandlers, prototype)
  }
}
