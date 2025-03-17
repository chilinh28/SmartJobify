"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareHandler = declareHandler;
function declareHandler(req, res, next) {
    req.mongoCreate = undefined;
    req.mongoDelete = undefined;
    req.mongoGet = undefined;
    req.mongoGetAll = [];
    req.mongoQuery = [];
    req.mongoUpdate = undefined;
    next();
}
