import { beforeEach, describe, expect, it } from "vitest";
import { LibraryClient } from "../libraryClient";
import { LibraryUserClient } from "../libraryUserClient";
import { LibraryOwnerClient } from "../libraryOwnerClient";
import { BookProvider } from "../../provider/bookProvider";
import { User } from "../../types/library";
import { books } from "../../provider/__tests__/testData";
import {Failure, Success} from "../../types/result";
import {UserNotFoundError} from "../../types/errors";

describe("LibraryClient", () => {
    let bookProvider: BookProvider;
    let libraryClient: LibraryClient;
    let users: User[];
    let owner: User;

    beforeEach(() => {
        bookProvider = new BookProvider(books);
        users = [
            { id: 1, email: "usera@example.com", role: "USER" },
            { id: 2, email: "userb@example.com", role: "USER" }
        ];
        owner = { id: 3, email: "ownera@example.com", role: "ADMIN" };
        libraryClient = new LibraryClient(bookProvider, users, owner);
    });

    it("should return a LibraryUserClient instance when user exists", () => {
        const result = libraryClient.getUserClient(1) as Success<LibraryUserClient>;
        expect(result.success).toBe(true);
        expect(result.data).toBeInstanceOf(LibraryUserClient);
    });

    it("should return USER_NOT_FOUND error when user does not exist", () => {
        const result = libraryClient.getUserClient(999) as Failure<UserNotFoundError>;
        expect(result.success).toBe(false);
        expect(result.error.errorType).toBe("USER_NOT_FOUND");
    });

    it("should return a LibraryOwnerClient instance when owner ID matches", () => {
        const result = libraryClient.getOwnerClient(3) as Success<LibraryOwnerClient>;
        expect(result.success).toBe(true);
        expect(result.data).toBeInstanceOf(LibraryOwnerClient);
    });

    it("should return USER_NOT_FOUND error when owner ID does not match", () => {
        const result = libraryClient.getOwnerClient(999) as Failure<UserNotFoundError>;
        expect(result.success).toBe(false);
        expect(result.error.errorType).toBe("USER_NOT_FOUND");
    });
});
