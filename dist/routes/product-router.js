"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello from the / route!');
});
router.get('/about', (req, res) => {
    res.send('This is the about page!');
});
exports.default = router;
