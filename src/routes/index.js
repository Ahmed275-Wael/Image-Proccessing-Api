"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const img_router_1 = __importDefault(require("./img_router"));
const routes = express_1.default.Router();
routes.use('/img_router', img_router_1.default);
routes.get('/', (request, response) => {
    response.send('<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/img_router">/img_router</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/img_router?filename=fjord">/img_router?filename=fjord</a></li><li><a href="/img_router?filename=fjord&width=100&height=100">/img_router?filename=fjord&width=100&height=100</a></li></ul></p>');
});
exports.default = routes;
