"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.test.ts
const server_1 = __importDefault(require("./server"));
describe('getMessage()', () => {
    it('should return the correct message when called', () => {
        expect(server_1.default).toBe('123');
    });
    it('should be super smart', () => {
        expect(true).toBe(true);
    });
});
