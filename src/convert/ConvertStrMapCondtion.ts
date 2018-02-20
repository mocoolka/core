import {ISettingValueType,valueGetValue} from './convertObject'
export class ConvertStrMapCondtion<I extends object> {
    public static of(value: ISettingValueType[]) {
        return new ConvertStrMapCondtion(value);
    }
    public settings: ISettingValueType[];
    constructor(value: ISettingValueType[]) {
        this.settings = value;
    }

    public convert(inputObject: I) {
        return valueGetValue(this.settings)(inputObject);
    }
}