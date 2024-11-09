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
exports.Rating = void 0;
var typeorm_1 = require("typeorm");
var Manga_1 = require("./Manga");
var User_1 = require("./User");
var Genre_1 = require("./Genre");
// Rating entity
var Rating = /** @class */ (function () {
    function Rating() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Rating.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('int'),
        __metadata("design:type", Number)
    ], Rating.prototype, "RatingScore", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Manga_1.Manga; }, function (manga) { return manga.ratings; }),
        (0, typeorm_1.JoinColumn)({ name: "MangaID" }),
        __metadata("design:type", Manga_1.Manga
        // Many-to-one relationship with User
        )
    ], Rating.prototype, "manga", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.ratings; }),
        (0, typeorm_1.JoinColumn)({ name: "UserID" }),
        __metadata("design:type", User_1.User
        // Many-to-one relationship with Genre (optional, depending on use case)
        )
    ], Rating.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Genre_1.Genre; }),
        (0, typeorm_1.JoinColumn)({ name: "GenreID" }),
        __metadata("design:type", Genre_1.Genre)
    ], Rating.prototype, "genre", void 0);
    Rating = __decorate([
        (0, typeorm_1.Entity)()
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;
//# sourceMappingURL=Rating.js.map