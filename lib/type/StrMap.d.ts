import { StrMap as _StrMap } from "fp-ts/lib/StrMap";
import { Lens } from "monocle-ts";
import Sequence from "sequency";
export declare type StrMapOf<T> = (arg: {
    [key: string]: T;
}) => StrMap<T>;
export declare type ILensGet = (input: object) => any;
export declare type ILensSet = (setValue: any) => (input: object) => any;
export declare class StrMap<T> extends _StrMap<T> {
    static find: <T>(predicate?: ((item: any) => boolean) | undefined) => (value: StrMap<T>) => {
        key: string;
        value: T;
    } | null;
    static fromPath(path: string[] | string): Lens<any, any>;
    static of<T>(value: {
        [key: string]: T;
    }): StrMap<T>;
    [Symbol.iterator](): Iterator<{
        key: string;
        value: T;
    }>;
    asSequence(): Sequence<{
        key: string;
        value: T;
    }>;
}
