import Sequence from "sequency";
export declare class IndexedCollection<T> {
    static of<T>(value: T[]): IndexedCollection<T>;
    value: T[];
    constructor(value: T[]);
    asSequence(): Sequence<T>;
}
