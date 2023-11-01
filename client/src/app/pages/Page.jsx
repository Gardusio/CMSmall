import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getBlocks } from '../../api/blocks.api';
import { ServerSideError } from '../common/errors/Errors';
import LoadingSpinner from '../common/layouts/LoadingSpinner';
import Block from './blocks/Block';
import PageInfo from './PageInfo';
import { PagesContext } from '../context/PagesProvider';
import { ErrorsContext } from '../context/ErrorsProvider';

function Page() {

    const { pageId } = useParams();
    const { getPageById } = useContext(PagesContext);

    const { setServerError } = useContext(ErrorsContext)

    const [blocks, setBlocks] = useState([])
    const [page, setPage] = useState({})

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        setPage(getPageById(pageId))

        getBlocks(pageId)
            .then(res => setBlocks(res.data))
            .catch(err => {
                setServerError(new ServerSideError())
            })
            .finally(() => setIsLoading(false))
    }, [pageId])

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <>
            <PageInfo title={page.title} author={page.author.firstName + " " + page.author.lastName} publishedAt={page.publishedAt} />
            {blocks.map((block) => <Block key={block.id} block={block} />)}
        </>
    );
}

export default Page;
