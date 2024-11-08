"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var genreController_1 = require("../services/genreController");
var router = (0, express_1.Router)();
// Route to get all genres
router.get("/", genreController_1.getAllGenres);
exports.default = router;
//# sourceMappingURL=genre.js.map