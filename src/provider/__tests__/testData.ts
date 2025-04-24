import {Book} from "../../types/library";

export const books: Book[] = [
    {
        id: 1,
        author: "Author A",
        title: "Book A",
        isbn: "ISBN-A",
        type: "NON_REFERENCE",
        status: "AVAILABLE"
    },
    {
        id: 2,
        author: "Author B",
        title: "Book B",
        isbn: "ISBN-B",
        type: "REFERENCE",
        status: "AVAILABLE"
    },
    {
        id: 3,
        author: "Author C",
        title: "Book C",
        isbn: "ISBN-C",
        type: "NON_REFERENCE",
        status: "BORROWED"
    }
]