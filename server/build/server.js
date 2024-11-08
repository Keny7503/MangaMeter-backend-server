"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\server.ts
var index_js_1 = require("./index.js");
var PORT = process.env.PORT || 3000;
// Start the server
index_js_1.default.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
//# sourceMappingURL=server.js.map