import {Book} from "../types/library";
import {BookProvider} from "../provider/bookProvider";

export class LibraryOwnerClient {

    constructor(private readonly bookProvider: BookProvider) {}

    public findBorrowedBooks(): Book[] {
        return this.bookProvider.getBooks().filter(book => book.status === "BORROWED");
    }


}