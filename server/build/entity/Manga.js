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
exports.Manga = void 0;
var typeorm_1 = require("typeorm");
var Genre_1 = require("./Genre");
var User_1 = require("./User");
var Rating_1 = require("./Rating");
// Manga entity
var Manga = /** @class */ (function () {
    function Manga() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)('varchar', { length: 255 }),
        __metadata("design:type", String)
    ], Manga.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 255 }),
        __metadata("design:type", String)
    ], Manga.prototype, "Name", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Genre_1.Genre; }, function (genre) { return genre.mangas; }),
        (0, typeorm_1.JoinTable)({
            name: "MangaGenres", // Join table name for Manga and Genre
            joinColumn: { name: "MangaID", referencedColumnName: "id" },
            inverseJoinColumn: { name: "GenreID", referencedColumnName: "id" }
        }),
        __metadata("design:type", Array)
    ], Manga.prototype, "genres", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return User_1.User; }, function (user) { return user.favoriteMangas; }),
        (0, typeorm_1.JoinTable)({
            name: "FavoriteList", // Join table for Manga and User favorites
            joinColumn: { name: "MangaID", referencedColumnName: "id" },
            inverseJoinColumn: { name: "UserID", referencedColumnName: "id" }
        }),
        __metadata("design:type", Array)
    ], Manga.prototype, "users", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Rating_1.Rating; }, function (rating) { return rating.manga; }),
        __metadata("design:type", Array)
    ], Manga.prototype, "ratings", void 0);
    Manga = __decorate([
        (0, typeorm_1.Entity)()
    ], Manga);
    return Manga;
}());
exports.Manga = Manga;
//# sourceMappingURL=Manga.js.map