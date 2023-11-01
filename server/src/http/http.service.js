export const unauthorized = (res, cause) => {
    return res.status(401).json({ message: cause || "Permission denied" })
}

export const badRequest = (res, cause) => {
    return res.status(400).json({ message: cause || "Permission denied" })
}

export const ok = (res, payload) => {
    return res.status(200).json({ data: payload })
}

export const forbidden = (res, cause) => {
    return res.status(403).json({ message: cause || "Wrong username or password" })
}

export const serverSideError = (res, cause) => {
    return res.status(500).json({ message: cause || "Something went wrong, try again later" })
}

export const notFound = (res, message) => {
    return res.status(404).json({ message: message || "Entity not found" })
}