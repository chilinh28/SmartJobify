"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRoutes = defineRoutes;
const logging_1 = require("~/config/logging");
/**
 * Hàm `defineRoutes` dùng để tự động đăng ký các routes từ danh sách controllers vào ứng dụng Express.
 * @param controllers - Danh sách các controller.
 * @param application - Ứng dụng Express để đăng ký routes.
 */
function defineRoutes(controllers, application) {
    // Duyệt qua từng controller trong danh sách
    for (let i = 0; i < controllers.length; i++) {
        const controller = new controllers[i]();
        // Lấy metadata chứa danh sách các route đã được định nghĩa trong controller thông qua @Route decorator
        const routeHandlers = Reflect.getMetadata('routeHandlers', controller);
        // Lấy đường dẫn gốc của controller (nếu có) thông qua @Controller decorator
        const controllerPath = Reflect.getMetadata('baseRoute', controller.constructor);
        // Lấy danh sách các phương thức HTTP ('get', 'post', 'put', 'delete', ...)
        const methods = Array.from(routeHandlers.keys());
        // Duyệt qua từng phương thức HTTP
        for (let j = 0; j < methods.length; j++) {
            const method = methods[j]; // Ví dụ: 'get', 'post'
            // Lấy danh sách route của phương thức hiện tại
            const routes = routeHandlers.get(method);
            if (routes) {
                // Lấy danh sách các đường dẫn API được định nghĩa trong controller
                const routeNames = Array.from(routes.keys());
                // Duyệt qua từng route
                for (let k = 0; k < routeNames.length; k++) {
                    // Lấy danh sách middleware và hàm xử lý request của route hiện tại
                    const handlers = routes.get(routeNames[k]);
                    if (handlers) {
                        // Đăng ký route vào Express, ví dụ: app.get('/healthcheck', handler)
                        application[method](controllerPath + routeNames[k], handlers);
                        // Ghi log để kiểm tra các route đã được đăng ký
                        logging_1.logging.info(`Loading route: ${String(method)} ${controllerPath + routeNames[k]}`);
                    }
                }
            }
        }
    }
}
