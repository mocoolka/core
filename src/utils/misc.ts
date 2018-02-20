
export {camelCase, union, capitalize, upperFirst, isPlainObject, merge} from "lodash";
import {repeat} from "lodash";

export const repeatSpace = (count: number) => repeat("  ", count);

export const returnNull = () => null;

export const returnTrue = () => true;

export const getKey = (item: {id?: any}, index: number) =>
  item && typeof item.id !== "undefined" ? item.id : index;

export const isUndef = (value: any) => typeof value === "undefined";

export const isFunction = (value: any) => typeof value === "function";

export const isString = (value: any) => typeof value === "string";

export const isObject = (value: any) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isValidPositiveNumberOrZero = (num: number) =>
  Number.isFinite(num) && num >= 0;
