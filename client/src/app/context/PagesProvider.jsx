import React, { createContext, useState, useEffect, useContext } from 'react';
import { createOne, deleteOne, getPages, updateOne } from '../../api/pages.api';
import { ActionError, ServerSideError } from '../common/errors/Errors';
import LoadingSpinner from '../common/layouts/LoadingSpinner';
import { ErrorsContext } from './ErrorsProvider';


export const PagesContext = createContext();

const PagesProvider = ({ children }) => {
    const [pages, setPages] = useState([]);

    const [loading, setLoading] = useState(true);
    const { setServerError, setActionError } = useContext(ErrorsContext)

    useEffect(() => {
        setLoading(true)
        getPages()
            .then((res) => {
                if (!res.success) {
                    setActionError(res.message)
                } else {
                    setPages(res.data)
                }
            })
            .catch((err) => setServerError(err))
            .finally(() => setLoading(false));
    }, []);

    const getPageById = (pageId) => {
        return pages.find(p => p.id === parseFloat(pageId))
    };

    const updatePage = (updated) => {
        setLoading(true);

        updateOne(updated)
            .then(response => {
                if (!response.success) {
                    setActionError(new ActionError(response.message));
                    return null;
                }
                setPages((prevPages) =>
                    prevPages.map((p) => (p.id === updated.id ? response.data : p))
                );
                return response.data;
            })
            .catch((err) => setServerError(new ServerSideError()))
            .finally(() => setLoading(false))
    }

    const deletePage = (page) => {
        setLoading(true)
        deleteOne(page.id)
            .then(response => {
                if (response.success) {
                    setPages((prevPages) => prevPages.filter((p) => p.id !== page.id));
                }
                else {
                    setActionError(new ActionError(response.message))
                }
            })
            .catch((err) => setServerError(new ServerSideError()))
            .finally(() => setLoading(false));
    };

    const createPage = async (pageInfo, blocks) => {
        if (
            blocks.filter((b) => b.type === "header").length < 1 ||
            blocks.filter((b) => b.type === "img" || b.type === "paragraph").length < 1
        ) {
            setActionError("A page must have at least one Header and one Paragraph or Image");
            return
        }

        setLoading(true);

        try {
            const response = await createOne(pageInfo, blocks);
            if (!response.success) {
                setActionError(new ActionError(response.message));
                return
            }

            const created = response.data.info;
            setPages((prevPages) => [...prevPages, created]);
            setLoading(false);
            return { page: created, blocks: response.data.blocks };
        } catch (error) {
            setServerError(new ServerSideError());
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <PagesContext.Provider value={{
            pages: pages,
            getPageById: getPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            createPage: createPage
        }}>
            {children}
        </PagesContext.Provider>
    );
};

export default PagesProvider
