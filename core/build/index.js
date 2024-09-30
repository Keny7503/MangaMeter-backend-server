"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
const world = 'MangaMeter';
function hello(who = world) {
    return `Hello ${who}! `;
}
console.log(hello());
