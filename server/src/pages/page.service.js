import dayjs from "dayjs"
import ROLE from "../auth/role.js"

import * as PageMapper from "./page.mapper.js"
import * as PageRepository from "./page.repository.js"
import * as UserRepository from "../users/user.repository.js"
import * as BlockRepository from "../blocks/block.repository.js"
import { mapBlocks } from "../blocks/block.mapper.js"


export const getById = async (id) => {
    const author = await UserRepository.findById(page.author)

    const page = await PageRepository.findById(id);

    return PageMapper.mapPageResponse(page, author)
}

export const removeById = async (user, id) => {
    const page = await PageRepository.findById(id)

    if (user.role !== ROLE.ADMIN && page.author !== user.id) {
        return { deleted: false, cause: "You can not delete this page" }
    }

    const deleted = await PageRepository.deleteById(id);

    if (deleted) {
        await BlockRepository.deleteAllByPageId(id)
    }

    return { deleted: deleted }
}

export const getPages = async () => {
    const pages = await PageRepository.findAll();

    const pagesResponse = await Promise.all(pages.map(async (p) => {
        const author = await UserRepository.findById(p.author)
        return PageMapper.mapPageResponse(p, author)
    }))

    return pagesResponse;
}

export const getSortedPages = async () => {
    const allPages = await getPages();
    const sortedPages = sortByPublishedDate(allPages);
    return sortedPages
}

const sortByPublishedDate = (pages) => {
    pages.sort((a, b) => dayjs(a.publishedAt).isAfter(dayjs(b.publishedAt)) ? -1 : 1);
    return pages
}

export const updatePage = async (updateRequest) => {
    const author = await UserRepository.findByUsername(updateRequest.author)

    if (!author) {
        return { updated: null, cause: "Username not found" }
    }

    const toUpdate = PageMapper.mapPageEntity(updateRequest, author)

    const updated = await PageRepository.findAndUpdate(toUpdate);

    if (!updated) {
        return { updated: null, cause: "Page not found" }
    }

    return { updated: PageMapper.mapPageResponse(updated, author) }
}

export const createPage = async (pageRequest) => {
    const author = await UserRepository.findByUsername(pageRequest.page.info.author)

    if (!author) {
        return { page: false, cause: "Username not found" }
    }

    const pageEntity = PageMapper.mapPageEntity(pageRequest.page.info, author)

    const persisted = await PageRepository.save(pageEntity)

    const blocks = await BlockRepository.saveMul(pageRequest.page.blocks.map(block => ({ pageId: persisted.id, ...block })))

    return { info: PageMapper.mapPageResponse(persisted, author), blocks: mapBlocks(blocks) }
}