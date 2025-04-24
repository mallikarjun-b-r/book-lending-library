import {Book} from "../types/library";
import {Result} from "../types/result";
import {BookError} from "../types/errors";

export class BookProvider {

    constructor(private readonly books: Book[]) {
    }

    public getBooks(): Book[] {
        return this.books
    }

    public borrowBook(bookId: number): Result<Book, BookError> {
        let book = this.books.find(book => book.id === bookId);
        if (!book) {
            return { success: false, error: { errorType: "BOOK_NOT_FOUND"} };
        }
        if (book.type === "REFERENCE") {
            return { success: false, error: { errorType: "REF_BOOK_NOT_BORROWABLE"} };
        }
        if (book.status === "BORROWED") {
            return { success: false, error: { errorType: "BOOK_ALREADY_BORROWED"} };
        }

        book.status = "BORROWED";

        return {success: true, data: {...book!}};

    }

}