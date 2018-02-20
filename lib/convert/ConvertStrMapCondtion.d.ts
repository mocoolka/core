import { ISettingValueType } from './convertObject';
export declare class ConvertStrMapCondtion<I extends object> {
    static of(value: ISettingValueType[]): ConvertStrMapCondtion<{}>;
    settings: ISettingValueType[];
    constructor(value: ISettingValueType[]);
    convert(inputObject: I): {
        [propName: string]: any;
    } | undefined;
}
