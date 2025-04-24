import { User} from "../types/library";
import {LibraryUserClient} from "./libraryUserClient";
import {BookProvider} from "../provider/bookProvider";
import {LibraryOwnerClient} from "./libraryOwnerClient";
import {Result} from "../types/result";
import {UserNotFoundError} from "../types/errors";


export class LibraryClient {

    private readonly libraryUserClient: LibraryUserClient
    private readonly libraryOwnerClient: LibraryOwnerClient

    constructor(bookProvider: BookProvider, private readonly users: User[], private  readonly owner: User) {
        this.libraryUserClient = new LibraryUserClient(bookProvider);
        this.libraryOwnerClient = new LibraryOwnerClient(bookProvider);
    }

    public getUserClient(userId: number): Result<LibraryUserClient, UserNotFoundError> {
        const user = this.users.find(user => user.id === userId);
        if (!user) {
            return {success: false, error: { errorType: "USER_NOT_FOUND"} };
        }
        return {success: true, data: this.libraryUserClient};
    }

    public getOwnerClient(ownerId: number): Result<LibraryOwnerClient, UserNotFoundError>  {
        if(this.owner.id !== ownerId) {
            return {success: false, error: { errorType: "USER_NOT_FOUND"} };
        }
        return {success: true, data: this.libraryOwnerClient};
    }

}
