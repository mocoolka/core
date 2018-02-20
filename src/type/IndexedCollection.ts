import Sequence, {asSequence} from "sequency";

export class IndexedCollection<T> {
    public static of<T>(value: T[]) {
        return new IndexedCollection<T>(value);
    }
    public value: T[];
    constructor(value: T[]) {
        this.value = value;
    }
    public asSequence(): Sequence<T> {
       return asSequence(this.value);
    }

}
