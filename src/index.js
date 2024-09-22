"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.Crawler = void 0;
const crawler_1 = require("./lib/crawler");
Object.defineProperty(exports, "Crawler", { enumerable: true, get: function () { return crawler_1.Crawler; } });
const middleware = (cb) => {
    return (req, res, next) => {
        // If there is a cb, execute it
        if (typeof cb === 'function') {
            cb.call(this, req, res, next);
        }
        // Initiate
        req.Crawler = new crawler_1.Crawler(req);
        next();
    };
};
exports.middleware = middleware;
