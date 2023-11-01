import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ErrorsContext } from "../context/ErrorsProvider";
import { PagesContext } from "../context/PagesProvider";
import { getBlocks, invalidBlocks, updateBlocks } from "../../api/blocks.api";
import PageInfo from "./PageInfo";
import LoadingSpinner from "../common/layouts/LoadingSpinner";
import { ServerSideError } from "../common/errors/Errors";
import BlocksBar from "./blocks/BlocksBar";
import EditBlockList from "./blocks/EditBlockList";
import { sortByOrder } from "../../api/blocks.api"


function EditPage() {
    const { pageId } = useParams();

    const { setServerError, setActionError } = useContext(ErrorsContext);
    const { getPageById } = useContext(PagesContext);

    const [blocks, setBlocks] = useState([]);
    const [page, setPage] = useState(null);

    const [isLoading, setIsLoading] = useState(true);


    const mapToDisplayBlocks = (blocks) => {
        const mblocks = blocks.map((b, i) => ({ ...b, displayId: b.id }))
        sortByOrder(mblocks)
        return mblocks
    }

    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const rpage = getPageById(pageId)
        setPage(rpage)

        getBlocks(pageId)
            .then((res) =>
                setBlocks(
                    mapToDisplayBlocks(res.data)
                ))
            .catch((err) => setServerError(new ServerSideError()))
            .finally(() => setIsLoading(false));
    }, [refetch]);


    const handleSave = async () => {
        if (invalidBlocks(blocks)) {
            setActionError("A page must have at least one Header and one Paragraph or Image")
            return
        }

        try {
            setIsLoading(true)
            const res = await updateBlocks(pageId, blocks)
            const updatedBlocks = mapToDisplayBlocks(res.data);
            setBlocks(updatedBlocks)
            setRefetch(true)
        }
        catch (err) { setServerError(new ServerSideError()) }
        finally { setIsLoading(false) }
    }

    return (
        <main className="w-100">
            <BlocksBar
                blocks={blocks}
                setBlocks={setBlocks}
                onSave={handleSave} />

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <PageInfo title={page.title} author={page.author.firstName + " " + page.author.lastName} publishedAt={page.publishedAt} />
            )}

            <EditBlockList blocks={blocks} setBlocks={setBlocks} />
        </main>
    );
}

export default EditPage;
