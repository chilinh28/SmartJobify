"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("~/config/logging");
const controller_1 = require("~/decorators/controller");
const route_1 = require("~/decorators/route");
const joi_1 = __importDefault(require("joi"));
const postHealthCheckValidation = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email()
});
let MainController = class MainController {
    getHealthCheck(req, res, next) {
        logging_1.logging.info('getHealthCheck called');
        return res.status(200).json({ hello: '123' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/healthcheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "getHealthCheck", null);
MainController = __decorate([
    (0, controller_1.Controller)()
], MainController);
exports.default = MainController;
