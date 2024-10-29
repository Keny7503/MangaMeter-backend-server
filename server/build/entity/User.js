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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Manga_1 = require("./Manga");
var Rating_1 = require("./Rating");
// User entity
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "Name", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Manga_1.Manga; }, function (manga) { return manga.users; }),
        __metadata("design:type", Array)
    ], User.prototype, "favoriteMangas", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Rating_1.Rating; }, function (rating) { return rating.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "ratings", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map