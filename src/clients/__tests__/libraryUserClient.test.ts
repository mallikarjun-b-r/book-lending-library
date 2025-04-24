import { beforeEach, describe, expect, it } from "vitest"
import {AttributeFilter, Filter} from "../../types/filter";
import {LibraryUserClient} from "../libraryUserClient";
import {Book} from "../../types/library";
import {Result} from "../../types/result";
import {BookError} from "../../types/errors";
import {BookProvider} from "../../provider/bookProvider";
import {books} from "../../provider/__tests__/testData";


describe("LibraryUserClient", () => {
    let bookProvider: BookProvider
    let client: LibraryUserClient

    beforeEach(() => {
        bookProvider = new BookProvider(books)
        client = new LibraryUserClient(bookProvider)
    })

    it("should find books by title using attribute filter", () => {
        const titleFilter: Filter = new AttributeFilter('title', 'Book A')

        const result = client.findBooksBy(titleFilter)

        expect(result.length).toEqual(1)
        expect(result[0].title).toEqual('Book A')
    })

    it("should find books by author using attribute filter", () => {
        const titleFilter: Filter = new AttributeFilter('author', 'Author B')

        const result = client.findBooksBy(titleFilter)

        expect(result.length).toEqual(1)
        expect(result[0].author).toEqual('Author B')
    })

    it("should find books by isbn using attribute filter", () => {
        const titleFilter: Filter = new AttributeFilter('isbn', 'ISBN-C')

        const result = client.findBooksBy(titleFilter)

        expect(result.length).toEqual(1)
        expect(result[0].isbn).toEqual('ISBN-C')
    })

    it("should successfully borrow a book", () => {
        const bookId = 1
        const book: Book = { id: 1, author: "Author A", title: "Book A", isbn: "ISBN-A", type: "NON_REFERENCE", status: "AVAILABLE" }

        const mockResult: Result<Book, BookError> = { success: true, data: {...book, status: "BORROWED"} }


        const result = client.borrowBook(bookId)

        expect(result).toEqual(mockResult)
    })

    it("should return error when borrowing a non-existent book", () => {
        const bookId = 999
        const mockError: Result<Book, BookError> = {
            success: false,
            error: { errorType: "BOOK_NOT_FOUND" }
        }

        const result = client.borrowBook(bookId)

        expect(result).toEqual(mockError)
    })

    it("should return error when borrowing a reference book", () => {
        const bookId = 2
        const mockError: Result<Book, BookError> = {
            success: false,
            error: { errorType: "REF_BOOK_NOT_BORROWABLE" }
        }
        const result = client.borrowBook(bookId)

        expect(result).toEqual(mockError)
    })
})
