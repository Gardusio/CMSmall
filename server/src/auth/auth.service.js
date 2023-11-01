import { UserNotFoundError, WrongCredentialsError } from "./auth.errors.js"
import * as UserRepository from "../users/user.repository.js"
import crypto from 'crypto'
import { mapUserResponse } from "../users/user.mapper.js";

export const getUserDetails = async (username, password) => {
    const user = await UserRepository.findByUsername(username);

    if (!user) {
        return { error: new UserNotFoundError() }
    }

    const correctPassword = await verifyPassword(user, password);
    if (!correctPassword) {
        return { error: new WrongCredentialsError() }
    }

    return { user: mapUserResponse(user) }
}


export const verifyPassword = async (user, password) => {
    const hash = await new Promise((resolve, reject) => {
        crypto.scrypt(password, user.salt, 32, (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(derivedKey);
        });
    });

    return crypto.timingSafeEqual(hash, Buffer.from(user.password, "hex"))
};