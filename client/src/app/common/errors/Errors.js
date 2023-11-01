
const DEFAULT_MESSAGE = "Something went wrong, please try again later"

class ServerSideError extends Error {
    constructor(message) {
        super(message || DEFAULT_MESSAGE)
        this.name = "ServerSideError"
    }
}

class ActionError extends Error {
    constructor(message) {
        super(message || DEFAULT_MESSAGE)
        this.name = "ActionError"
    }
}

export { ServerSideError, ActionError }