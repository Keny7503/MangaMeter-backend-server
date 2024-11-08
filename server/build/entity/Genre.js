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
exports.Genre = void 0;
var typeorm_1 = require("typeorm");
var Manga_1 = require("./Manga");
// Genre entity
var Genre = /** @class */ (function () {
    function Genre() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)('varchar', { length: 255 }),
        __metadata("design:type", String)
    ], Genre.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 255 }),
        __metadata("design:type", String)
    ], Genre.prototype, "Name", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Manga_1.Manga; }, function (manga) { return manga.genres; }),
        __metadata("design:type", Array)
    ], Genre.prototype, "mangas", void 0);
    Genre = __decorate([
        (0, typeorm_1.Entity)()
    ], Genre);
    return Genre;
}());
exports.Genre = Genre;
//# sourceMappingURL=Genre.js.map