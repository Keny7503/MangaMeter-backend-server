"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    // Define your routes here
    app.get('/', (req, res) => {
        res.send('Hello from the API');
    });
};
