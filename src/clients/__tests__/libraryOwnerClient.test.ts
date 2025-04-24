import { LibraryOwnerClient } from "../libraryOwnerClient";
import {BookProvider} from "../../provider/bookProvider";
import {Book} from "../../types/library";
import {describe, expect, it } from "vitest";

describe("LibraryOwnerClient", () => {
    let client: LibraryOwnerClient;


    it("should find borrowed books", () => {
        const borrowedBooks: Book[] = [
            { id: 1, author: "Author A", title: "Book A", isbn: "ISBN-A", type: "NON_REFERENCE", status: "BORROWED" },
            { id: 2, author: "Author B", title: "Book B", isbn: "ISBN-B", type: "REFERENCE", status: "BORROWED" }
        ];

        client = new LibraryOwnerClient(new BookProvider(borrowedBooks));

        const result = client.findBorrowedBooks();

        expect(result.length).toEqual(2);
        expect(result).toEqual(expect.arrayContaining(borrowedBooks));
    });

    it("should return an empty array when no books are borrowed", () => {
        const availableBooks: Book[] = [
            { id: 1, author: "Author A", title: "Book A", isbn: "ISBN-A", type: "NON_REFERENCE", status: "AVAILABLE" },
            { id: 2, author: "Author B", title: "Book B", isbn: "ISBN-B", type: "REFERENCE", status: "AVAILABLE" }
        ];
        client = new LibraryOwnerClient(new BookProvider(availableBooks));

        const result = client.findBorrowedBooks();

        expect(result.length).toEqual(0);
    });

});
