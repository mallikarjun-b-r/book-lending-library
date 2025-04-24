export type ErrorType = "REF_BOOK_NOT_BORROWABLE" |
    "BOOK_NOT_FOUND" |
    "BOOK_ALREADY_BORROWED" |
    "USER_NOT_FOUND"

export type Error = {
    errorType: ErrorType,
    message?: string;
}

export type RefBookCannotBeBorrowedError = Error & {
    errorType: "REF_BOOK_NOT_BORROWABLE"
}

export type BookNotFoundError = Error & {
    errorType: "BOOK_NOT_FOUND"
}

export type BookAlreadyBorrowedError = Error & {
    errorType: "BOOK_ALREADY_BORROWED"
}

export type UserNotFoundError = Error & {
    errorType: "USER_NOT_FOUND"
}

export type BookError = RefBookCannotBeBorrowedError | BookNotFoundError | BookAlreadyBorrowedError

