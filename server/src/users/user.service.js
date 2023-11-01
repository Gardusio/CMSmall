import { mapUserResponse } from "./user.mapper.js";
import * as UserRepository from "./user.repository.js"


export const getById = async (id) => {
    const user = await UserRepository.findById(id);
    return mapUserResponse(user)
}

export const getByUsername = async (uname) => {
    const user = await UserRepository.findByUsername(uname);
    return mapUserResponse(user)
}