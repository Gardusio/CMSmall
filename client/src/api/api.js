

const API_URL = `http://localhost:8080/api`;

class Response {
    constructor(success) {
        this.success = success
    }
}

class OkResponse extends Response {
    constructor(data) {
        super(true)
        this.data = data
    }
}

class ErrorResponse extends Response {
    constructor(message) {
        super(false)
        this.message = message
    }
}

const DefaultOptions = {
    headers: { "Content-Type": "application/json" },
    credentials: "include"
}


export const orElse = async (fn, callback) => {
    try { return await fn() }
    catch (err) {
        callback()
    }
}

export const orElseThrow = async (fn, error) => {
    try { return await fn() }
    catch (err) {
        if (error)
            throw error(err.message)
        else
            throw err
    }
}

export const delet = async (endpoint) => {
    return await fetchAPI("DELETE", endpoint)
}

export const get = async (endpoint) => {
    return await fetchAPI("GET", endpoint)
}

export const post = async (endpoint, payload) => {
    return await fetchAPI("POST", endpoint, payload)
}

export const put = async (endpoint, payload) => {
    return await fetchAPI("PUT", endpoint, payload)
}

export const patch = async (endpoint, payload) => {
    return await fetchAPI("PATCH", endpoint, payload)
}

const fetchAPI = async (method, endpoint, payload) => {
    const defaultOptions = {
        method: method,
        headers: DefaultOptions.headers,
        credentials: DefaultOptions.credentials
    }

    const options = payload ? {
        body: JSON.stringify(payload),
        ...defaultOptions
    } : defaultOptions

    const response = await fetch(new URL(API_URL + endpoint), options);

    const responseBody = await response.json();

    if (!response.ok) {
        return new ErrorResponse(responseBody.message)
    }

    return new OkResponse(responseBody.data);
} 