import {Book} from "./library";

export interface Filter  {
    matches: (book: Book) => boolean
}

export class AttributeFilter<T extends keyof Book> implements Filter {

    constructor(private readonly attribute: T, private readonly value: Book[T]) {
    }

    matches(book: Book): boolean {
        return book[this.attribute] === this.value
    }
}