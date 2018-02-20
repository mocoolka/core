"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var StrMap_1 = require("fp-ts/lib/StrMap");
var monocle_ts_1 = require("monocle-ts");
var sequency_1 = require("sequency");
var find = function (predicate) { return function (value) {
    return value.asSequence().find(predicate);
}; };
var StrMap = /** @class */ (function (_super) {
    __extends(StrMap, _super);
    function StrMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StrMap.fromPath = function (path) {
        if (typeof path === "string") {
            return monocle_ts_1.Lens.fromProp(path);
        }
        else {
            var lens = monocle_ts_1.Lens.fromProp(path[0]);
            return path.slice(1).reduce(function (acc, prop) { return acc.compose(monocle_ts_1.Lens.fromProp(prop)); }, lens);
        }
    };
    StrMap.of = function (value) {
        return new StrMap(value);
    };
    StrMap.prototype[Symbol.iterator] = function () {
        var _i, _a, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = Object.keys(this.value);
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    key = _a[_i];
                    return [4 /*yield*/, { key: key, value: this.value[key] }];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    StrMap.prototype.asSequence = function () {
        return sequency_1.asSequence(this);
    };
    StrMap.find = find;
    return StrMap;
}(StrMap_1.StrMap));
exports.StrMap = StrMap;
//# sourceMappingURL=StrMap.js.map