"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertObject_1 = require("./convertObject");
var cals = [{
        functionName: "lessThan",
        inputPropName: ["window", "contentWidth"],
        outputPropName: ["window", "device"],
        values: {
            default: 0,
            large: 1480,
            medium: 1240,
            small: 800,
        },
    }, {
        functionName: "lessThan",
        inputPropName: ["window", "scrollTop"],
        outputPropName: ["window", "top"],
        values: [{
                conditions: [{
                        inputPropName: ["window", "device"],
                        value: ["small", "default"],
                    }],
                default: 0,
                large: 70,
                medium: 50,
                small: 25,
            }, {
                default: 0,
                large: 100,
                medium: 70,
                small: 50,
            }],
    }];
var globalObject = { window: { device: "default", top: "default" } };
var windowObject = { window: { contentWidth: 500, scrollTop: 30 } };
convertObject_1.ConvertStrMap.of(cals).convert({ window: { contentWidth: 500, scrollTop: 30 } }, globalObject);
convertObject_1.ConvertStrMap.of(cals).convert({ window: { contentWidth: 1000, scrollTop: 30 } }, globalObject);
//# sourceMappingURL=index.js.map