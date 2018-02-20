"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertObject_1 = require("./convertObject");
var ConvertStrMapCondtion = /** @class */ (function () {
    function ConvertStrMapCondtion(value) {
        this.settings = value;
    }
    ConvertStrMapCondtion.of = function (value) {
        return new ConvertStrMapCondtion(value);
    };
    ConvertStrMapCondtion.prototype.convert = function (inputObject) {
        return convertObject_1.valueGetValue(this.settings)(inputObject);
    };
    return ConvertStrMapCondtion;
}());
exports.ConvertStrMapCondtion = ConvertStrMapCondtion;
//# sourceMappingURL=ConvertStrMapCondtion.js.map