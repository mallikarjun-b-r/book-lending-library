export type Book = {
    id: number
    author: string
    title: string
    isbn: string
    type: "REFERENCE" | "NON_REFERENCE"
    status: "AVAILABLE" | "BORROWED"
    borrowerId?: number // Yet to be implemented
    borrowedAt?: Date // Yet to be implemented
}

export type User = {
    id: number
    email: string
    role: "USER" | "ADMIN"
}



