
import {ISettingType,ConvertStrMap,ISettingValueType,ConvertStrMapCondtion} from '../src/'

describe('ConvertStrMap', () => {
  test('convert', () => {



    const cals: ISettingType[] = [{
      functionName: "lessThan",
      inputPropName: ["window", "contentWidth"],
    
      outputPropName: ["window", "device"],
      values: {
          default: 0,
          small: 800,
          medium: 1240,
          large: 1480,
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
        small: 25,
        medium: 50,
        large: 70,
      }, {
        default: 0,
        small: 50,
        medium: 70,
        large: 100,
      }]
    
    }];

    const globalObject = {window: {device: "default", top: "default"}};
    expect(ConvertStrMap.of(cals).convert({window: {contentWidth: 500, scrollTop: 30}}, globalObject)).toEqual(
       {window: {device: "small", top: "medium"}})
    expect(ConvertStrMap.of(cals).convert({window: {contentWidth: 1000, scrollTop: 30}}, globalObject)).toEqual(
        {window: {device: "medium", top: "small"}})

 
  })
  it('ConvertStrMapCondtion', () => {
    const conds: ISettingValueType[] = [{
      conditions: [{
        inputPropName: ["window", "device"],
        value: ["small", "default"],
      }],
      default: 0,
      small: 25,
      medium: 50,
      large: 70,
    },{
      conditions: [{
        inputPropName: ["window", "device"],
        value: ["larger"],
      },{
        inputPropName: ["window", "top"],
        value: ["small"],
      }],
      default: -1,
      small: -2,
    }, {
      default: 0,
      small: 50,
      medium: 70,
      large: 100,
    }];   
  expect(ConvertStrMapCondtion.of(conds).convert({window: {device: "small", top: "small"}})).toEqual(
    { default: 0,
      small: 25,
      medium: 50,
      large: 70})
      expect(ConvertStrMapCondtion.of(conds).convert({window: {device: "larger", top: "small"}})).toEqual(
        {  default: -1,
          small: -2,})
          expect(ConvertStrMapCondtion.of(conds).convert({window: {device: "larger", top: "medium"}})).toEqual(
            { default: 0,
              small: 50,
              medium: 70,
              large: 100,})
})
})
