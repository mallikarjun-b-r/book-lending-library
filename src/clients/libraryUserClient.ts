import {Result} from "../types/result";
import {BookProvider} from "../provider/bookProvider";
import {Book} from "../types/library";
import {Filter} from "../types/filter";
import {BookError} from "../types/errors";

export class LibraryUserClient {

    constructor(private readonly bookProvider: BookProvider) {
    }

    public findBooksBy(filter: Filter): Book[] {
        return this.bookProvider.getBooks().filter(book => filter.matches(book));
    }

    public borrowBook(bookId: number): Result<Book, BookError> {
        return this.bookProvider.borrowBook(bookId);
    }

}