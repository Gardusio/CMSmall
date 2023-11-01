import { get, orElseThrow, post } from "./api";

export const getSiteName = async () => {

    const doGet = async () => await get("/site");

    return await orElseThrow(doGet)
}


export const updateSiteName = async (newName) => {

    const doPost = async () => await post("/site", { name: newName });

    return await orElseThrow(doPost)
}