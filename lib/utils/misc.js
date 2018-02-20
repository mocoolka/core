"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.camelCase = lodash_1.camelCase;
exports.union = lodash_1.union;
exports.capitalize = lodash_1.capitalize;
exports.upperFirst = lodash_1.upperFirst;
exports.isPlainObject = lodash_1.isPlainObject;
exports.merge = lodash_1.merge;
var lodash_2 = require("lodash");
exports.repeatSpace = function (count) { return lodash_2.repeat("  ", count); };
exports.returnNull = function () { return null; };
exports.returnTrue = function () { return true; };
exports.getKey = function (item, index) {
    return item && typeof item.id !== "undefined" ? item.id : index;
};
exports.isUndef = function (value) { return typeof value === "undefined"; };
exports.isFunction = function (value) { return typeof value === "function"; };
exports.isString = function (value) { return typeof value === "string"; };
exports.isObject = function (value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};
exports.isValidPositiveNumberOrZero = function (num) {
    return Number.isFinite(num) && num >= 0;
};
//# sourceMappingURL=misc.js.map