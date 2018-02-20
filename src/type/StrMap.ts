import {  StrMap as _StrMap,
   } from "fp-ts/lib/StrMap";
import {Lens} from "monocle-ts";
import Sequence, {asSequence} from "sequency";

const find = <T>(predicate?: (item: any) => boolean) => (value: StrMap<T>) => {
    return value.asSequence().find(predicate);
};
export type StrMapOf<T> = (arg: {
        [key: string]: T;
    }) => StrMap<T>;
export type ILensGet= (input: object) => any;
export type ILensSet= (setValue: any) => (input: object) => any;
export class StrMap<T> extends _StrMap<T> {

    public static find = find;

    public static fromPath(path: string[]|string) {
        if (typeof path === "string") {
          return  Lens.fromProp<any, any>(path);
        } else {
        const lens = Lens.fromProp<any, any>(path[0]);
        return path.slice(1).reduce((acc, prop) => acc.compose(Lens.fromProp<any, any>(prop)), lens);
        }
    }
    public static of<T>(value: {
        [key: string]: T;
    }) {
        return new StrMap<T>(value);
    }
     public *[Symbol.iterator](): Iterator<{key: string, value: T}> {
        for (const key of Object.keys(this.value)) {
            yield {key, value: this.value[key]};
        }

    }
    public asSequence(): Sequence<{key: string, value: T}> {
        return asSequence(this);
     }
}
