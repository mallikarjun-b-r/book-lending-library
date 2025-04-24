import { describe, beforeEach, expect, it } from "vitest"
import {BookProvider} from "../bookProvider";
import {books} from "./testData";


describe("BookProvider", () => {
    let provider: BookProvider

    beforeEach(() => {


        provider = new BookProvider(books)
    })

    it("should return all books", () => {
        const result = provider.getBooks()
        expect(result).toEqual(books)
    })

    it("should successfully borrow a NON_REFERENCE and AVAILABLE book", () => {
        const result = provider.borrowBook(1)
        expect(result).toEqual({
            success: true,
            data: books[0]
        })
    })

    it("should return BOOK_NOT_FOUND error if book does not exist", () => {
        const result = provider.borrowBook(999)
        expect(result).toEqual({
            success: false,
            error: { errorType: "BOOK_NOT_FOUND" }
        })
    })

    it("should return REF_BOOK_NOT_BORROWABLE error for REFERENCE book", () => {
        const result = provider.borrowBook(2)
        expect(result).toEqual({
            success: false,
            error: { errorType: "REF_BOOK_NOT_BORROWABLE" }
        })
    })

    it("should return BOOK_ALREADY_BORROWED error if book is already borrowed", () => {
        const result = provider.borrowBook(3)
        expect(result).toEqual({
            success: false,
            error: { errorType: "BOOK_ALREADY_BORROWED" }
        })
    })
})
