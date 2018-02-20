"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequency_1 = require("sequency");
var IndexedCollection = /** @class */ (function () {
    function IndexedCollection(value) {
        this.value = value;
    }
    IndexedCollection.of = function (value) {
        return new IndexedCollection(value);
    };
    IndexedCollection.prototype.asSequence = function () {
        return sequency_1.asSequence(this.value);
    };
    return IndexedCollection;
}());
exports.IndexedCollection = IndexedCollection;
//# sourceMappingURL=IndexedCollection.js.map