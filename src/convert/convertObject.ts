import {greaterThan, greaterThanOrEq, lessThan, lessThanOrEq, ordNumber} from "fp-ts/lib/Ord";
import {Lens} from "monocle-ts";
import {compose, ILensGet, ILensSet, IndexedCollection, StrMap, StrMapOf} from "../type/index";

export interface ISettingType {
    inputPropName: string[]|string;
    functionName: string;
    outputPropName: string[]|string;
    values: ISettingValueType[]|ISettingValueType;
}
const StrMapOfNumber: StrMapOf<number> = StrMap.of;
const inputPropNameGet = Lens.fromProp<ISettingType, "inputPropName">("inputPropName").get;
const functionNameGet = Lens.fromProp<ISettingType, "functionName">("functionName").get;
const outputPropNameGet = Lens.fromProp<ISettingType, "outputPropName">("outputPropName").get;
const valuesGet = Lens.fromProp<ISettingType, "values">("values").get;

export interface IConditionType {
    inputPropName: string[]|string;
    value: string[]|string;
}

const inputPropNameGetConditionUnit = Lens.fromProp<IConditionType, "inputPropName">("inputPropName").get;
const valueGetConditionUnit = Lens.fromProp<IConditionType, "value">("value").get;

export interface ISettingValueType {
    conditions?: IConditionType[];
    [propName: string]: any;
}

const OrdFunctions = {
    greaterThan: greaterThan(ordNumber),
    greaterThanOrEq: greaterThanOrEq(ordNumber),
    lessThan: lessThan(ordNumber),
    lessThanOrEq: lessThanOrEq(ordNumber),

};

const ordCondition = (currentValue: object) => (funcitonName: string) => (item: {value: number}) => {
    return OrdFunctions[funcitonName](currentValue)(item.value);
};
const calCondition = (outputObject: object) => (conditionUnit: IConditionType) => {
    const inputPropName = inputPropNameGetConditionUnit(conditionUnit);
    const value = valueGetConditionUnit(conditionUnit);
    const globalPropValueGet = StrMap.fromPath(inputPropName).get;
    const conditionValue = globalPropValueGet(outputObject);
    if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
        return conditionValue === value;
    }
    return value.indexOf(globalPropValueGet(outputObject)) >= 0;
};

const calConditions = (conditionUnit: IConditionType[]) => (outputObject: object): boolean => {

   return IndexedCollection.of<IConditionType>(conditionUnit).asSequence()
   .count(calCondition(outputObject)) === conditionUnit.length;
};

export const valueGetValue = (valuesObject: ISettingValueType[]|ISettingValueType) => (paramObject: object) => {
    if (Array.isArray(valuesObject)) {
        for (const item of valuesObject) {
            const {conditions, ...otherProps} = item;
            if (conditions ) {
               if (calConditions(conditions)(paramObject)) {
                    return otherProps;
               }
            } else {
                return otherProps;
            }
        }
    } else {
        return valuesObject;
    }
};
export interface ICalculateUnit {inputPropGet?: ILensGet; outputPropSet?: ILensSet;
    valuesCalGet: ILensGet; functionName?: string; type: string; }
export class ConvertStrMap<I extends object, O extends object> {
    public static of(value: ISettingType[]) {
        return new ConvertStrMap(value);
    }
    public settings: ISettingType[];
    public settingProps: any[];
    constructor(value: ISettingType[]) {
        this.settings = value;
        this.settingProps = this.settings.map((setting) => {

            const outputPropName = outputPropNameGet(setting);
            const inputPropName = inputPropNameGet(setting);
            const values = valuesGet(setting);
            const result: ICalculateUnit = {valuesCalGet: valueGetValue(values), type: "calculate"};

            result.inputPropGet = StrMap.fromPath(inputPropName).get;
            result.outputPropSet = StrMap.fromPath(outputPropName).set;
            result.functionName = functionNameGet(setting);

            return result;
         });
    }

    public convertUnit(inputObject: I) {
        return (outputObject: object, settingProps: ICalculateUnit ) => {
            const {inputPropGet, outputPropSet, functionName, valuesCalGet, type} = settingProps;
            if (type === "calculate" && typeof inputPropGet !== "undefined"
             && typeof outputPropSet !== "undefined" && typeof valuesCalGet !== "undefined" ) {
                const inputPropValue = inputPropGet(inputObject );
                const precidate = ordCondition(inputPropValue)(functionName as string);
                const findFunc = compose(StrMap.find(precidate), StrMapOfNumber, valuesCalGet);
                const calResult = (findFunc(outputObject) as {key: any}).key;
                return outputPropSet(calResult)(outputObject);
            } else {
                return valuesCalGet(outputObject);
            }

        };
    }
    public convert(inputObject: I, outputObject: O) {
        const reduceFunc = this.convertUnit(inputObject);
        return this.settingProps.reduce(reduceFunc, outputObject);
    }
}
