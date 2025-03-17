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
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../decorators/controller");
const route_1 = require("../decorators/route");
const book_1 = require("../models/book");
const getAll_1 = require("../decorators/mongoose/getAll");
const get_1 = require("../decorators/mongoose/get");
const create_1 = require("../decorators/mongoose/create");
let BooksController = class BooksController {
    getAll(req, res, next) {
        return res.status(200).json(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).json(req.mongoGet);
    }
    create(req, res, next) {
        return res.status(200).json(req.mongoCreate);
    }
    query(req, res, next) {
        return res.status(200).json(req.mongoQuery);
    }
    update(req, res, next) {
        return res.status(200).json(req.mongoUpdate);
    }
    delete(req, res, next) {
        return res.status(200).json({ message: 'delete' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/all'),
    (0, getAll_1.MongoGetAll)(book_1.Book),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(book_1.Book),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('post', '/create'),
    (0, create_1.MongoCreate)(book_1.Book),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('post', '/query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "query", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "delete", null);
BooksController = __decorate([
    (0, controller_1.Controller)('/books')
], BooksController);
exports.default = BooksController;
