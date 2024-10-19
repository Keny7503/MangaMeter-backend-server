"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testfn = testfn;
// third-party components
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const App = (0, express_1.default)();
// log by using morgan
App.use((0, morgan_1.default)('combined'));
App.use((0, morgan_1.default)('dev', {
    skip: (req, res) => {
        return res.statusCode < 400;
    },
}));
// support CORS from API
App.use((0, cors_1.default)());
// Routes ==================================================
const route_1 = __importDefault(require("./route"));
(0, route_1.default)(App); // configure our routes
// Create app
const server = http_1.default.createServer(App);
// Start app: http://IP_Address:port
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`API V1.0 started listening on port ${PORT}`);
});
function testfn() {
    return '123';
}
// expose app
exports.default = App;
