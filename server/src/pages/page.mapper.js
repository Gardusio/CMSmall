import { mapUserResponse } from "../users/user.mapper.js"
import dayjs from 'dayjs'

export const mapPageResponse = (pageEntity, author) => {
    if (!pageEntity || Object.keys(pageEntity).length === 0) throw new Error()

    return {
        id: pageEntity.id,
        title: pageEntity.title,
        author: mapUserResponse(author),
        publishedAt: pageEntity.publishedAt,
        createdAt: pageEntity.createdAt,
        status: pageEntity.status
    };
}

export const mapPageEntity = (pageRequest, author) => {
    if (!pageRequest || Object.keys(pageRequest).length === 0) throw new Error()

    const dateToCheck = new dayjs(pageRequest.publishedAt)
    const isAfterToday = dateToCheck.isAfter(dayjs());
    const status = isAfterToday ? "Draft" : "Published"

    return {
        id: pageRequest.id,
        title: pageRequest.title,
        author: author.id,
        publishedAt: dayjs(pageRequest.publishedAt),
        createdAt: dayjs(pageRequest.createdAt) || new dayjs(),
        status: status
    };
}

