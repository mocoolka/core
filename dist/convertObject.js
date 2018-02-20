"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ord_1 = require("fp-ts/lib/Ord");
var monocle_ts_1 = require("monocle-ts");
var type_1 = require("./type");
var inputPropNameGet = monocle_ts_1.Lens.fromProp("inputPropName").get;
var functionNameGet = monocle_ts_1.Lens.fromProp("functionName").get;
var outputPropNameGet = monocle_ts_1.Lens.fromProp("outputPropName").get;
var valuesGet = monocle_ts_1.Lens.fromProp("values").get;
var inputPropNameGetConditionUnit = monocle_ts_1.Lens.fromProp("inputPropName").get;
var valueGetConditionUnit = monocle_ts_1.Lens.fromProp("value").get;
var OrdFunctions = {
    greaterThan: Ord_1.greaterThan(Ord_1.ordNumber),
    greaterThanOrEq: Ord_1.greaterThanOrEq(Ord_1.ordNumber),
    lessThan: Ord_1.lessThan(Ord_1.ordNumber),
    lessThanOrEq: Ord_1.lessThanOrEq(Ord_1.ordNumber),
};
var ordCondition = function (currentValue) { return function (funcitonName) { return function (item) {
    return OrdFunctions[funcitonName](currentValue)(item.value);
}; }; };
var calCondition = function (outputObject) { return function (conditionUnit) {
    var inputPropName = inputPropNameGetConditionUnit(conditionUnit);
    var value = valueGetConditionUnit(conditionUnit);
    var globalPropValueGet = type_1.StrMap.fromPath(inputPropName).get;
    return value.indexOf(globalPropValueGet(outputObject)) >= 0;
}; };
var calConditions = function (conditionUnit) { return function (global) {
    return type_1.IndexedCollection.of(conditionUnit).asSequence()
        .count(calCondition(global)) === conditionUnit.length;
}; };
var valueGetValue = function (valuesObject) { return function (paramObject) {
    if (Array.isArray(valuesObject)) {
        for (var _i = 0, valuesObject_1 = valuesObject; _i < valuesObject_1.length; _i++) {
            var item = valuesObject_1[_i];
            var conditions = item.conditions, otherProps = __rest(item, ["conditions"]);
            if (conditions) {
                if (calConditions(conditions)(paramObject)) {
                    return otherProps;
                }
            }
            else {
                return otherProps;
            }
        }
    }
    else {
        return valuesObject;
    }
}; };
var ConvertStrMap = /** @class */ (function () {
    function ConvertStrMap(value) {
        this.settings = value;
        this.settingProps = this.settings.map(function (setting) {
            var outputPropName = outputPropNameGet(setting);
            var inputPropName = inputPropNameGet(setting);
            var functionName = functionNameGet(setting);
            var values = valuesGet(setting);
            var inputPropGet = type_1.StrMap.fromPath(inputPropName).get;
            var outputPropGet = type_1.StrMap.fromPath(outputPropName).get;
            var outputPropSet = type_1.StrMap.fromPath(outputPropName).set;
            var valuesCalGet = valueGetValue(values);
            return {
                functionName: functionName,
                inputPropGet: inputPropGet,
                inputPropName: inputPropName,
                outputPropName: outputPropName,
                outputPropGet: outputPropGet,
                outputPropSet: outputPropSet,
                setting: setting,
                valuesCalGet: valuesCalGet,
            };
        });
    }
    ConvertStrMap.of = function (value) {
        return new ConvertStrMap(value);
    };
    ConvertStrMap.prototype.convertUnit = function (inputObject) {
        return function (outputObject, _a) {
            var inputPropGet = _a.inputPropGet, outputPropGet = _a.outputPropGet, outputPropSet = _a.outputPropSet, functionName = _a.functionName, valuesCalGet = _a.valuesCalGet;
            var inputPropValue = inputPropGet(inputObject);
            var precidate = ordCondition(inputPropValue)(functionName);
            var findFunc = type_1.compose(type_1.StrMap.find(precidate), type_1.StrMap.of, valuesCalGet);
            var calResult = findFunc(outputObject).key;
            return outputPropSet(calResult)(outputObject);
        };
    };
    ConvertStrMap.prototype.convert = function (inputObject, outputObject) {
        var reduceFunc = this.convertUnit(inputObject);
        var isModify = false;
        return this.settingProps.reduce(reduceFunc, outputObject);
    };
    return ConvertStrMap;
}());
exports.ConvertStrMap = ConvertStrMap;
//# sourceMappingURL=convertObject.js.map