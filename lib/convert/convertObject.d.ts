import { ILensGet, ILensSet } from "../type/index";
export interface ISettingType {
    inputPropName: string[] | string;
    functionName: string;
    outputPropName: string[] | string;
    values: ISettingValueType[] | ISettingValueType;
}
export interface IConditionType {
    inputPropName: string[] | string;
    value: string[] | string;
}
export interface ISettingValueType {
    conditions?: IConditionType[];
    [propName: string]: any;
}
export declare const valueGetValue: (valuesObject: ISettingValueType | ISettingValueType[]) => (paramObject: object) => {
    [propName: string]: any;
} | undefined;
export interface ICalculateUnit {
    inputPropGet?: ILensGet;
    outputPropSet?: ILensSet;
    valuesCalGet: ILensGet;
    functionName?: string;
    type: string;
}
export declare class ConvertStrMap<I extends object, O extends object> {
    static of(value: ISettingType[]): ConvertStrMap<{}, {}>;
    settings: ISettingType[];
    settingProps: any[];
    constructor(value: ISettingType[]);
    convertUnit(inputObject: I): (outputObject: object, settingProps: ICalculateUnit) => any;
    convert(inputObject: I, outputObject: O): any;
}
