"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = Controller;
require("reflect-metadata");
function Controller(baseRoute = '') {
    return function (target) {
        Reflect.defineMetadata('baseRoute', baseRoute, target);
    };
}
