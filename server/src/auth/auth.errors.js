
export class UserNotFoundError extends Error {
    constructor(message) {
        super(message || "User not found");
        this.name = "UserNotFoundError"
    }
}

export class WrongCredentialsError extends Error {
    constructor(message) {
        super(message || "Wrong credentials");
        this.name = "WrongCredentialsError"
    }
}

