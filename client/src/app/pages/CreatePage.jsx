import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ErrorsContext } from "../context/ErrorsProvider";
import { PagesContext } from "../context/PagesProvider";
import PageInfo from "./PageInfo";
import { PencilSquare } from "react-bootstrap-icons";
import EditInfoForm from "./EditInfoForm";
import dayjs from 'dayjs'
import BlocksBar from "./blocks/BlocksBar";
import EditBlockList from "./blocks/EditBlockList";

function CreatePage({ user }) {
    const navigate = useNavigate()
    const { clearErrors } = useContext(ErrorsContext);
    const { createPage } = useContext(PagesContext);

    const [blocks, setBlocks] = useState([]);
    const [page, setPage] = useState({ isSet: false });


    const [editForm, setEditForm] = useState({
        shown: true,
        pid: null,
        title: "New page",
        author: user.username,
        publishedAt: new dayjs().format("YYYY-MM-DD")
    });

    const handleSave = async () => {
        clearErrors();
        try {
            const res = await createPage(page, blocks);
            navigate("/dashboard/edit/" + res.page.id);
        } catch (error) {
            console.error(error);
        }
    };

    const updatePageInfo = (title, publishedAt, author) => {
        setPage((prevPage) => (
            {
                ...prevPage,
                isSet: true,
                title: title,
                author: author,
                publishedAt: publishedAt
            }))

        setEditForm({
            ...editForm,
            title: title,
            author: author,
            publishedAt: publishedAt,
            shown: false
        })
    }

    const closeEditForm = () => {
        setEditForm({ ...editForm, shown: false })
    }

    const openEditForm = () => {
        setEditForm({ ...editForm, shown: true })
    }

    return (
        <main className="w-100">
            <div className="d-flex w-100 justify-content-end">
                <Button
                    disabled={!page.isSet}
                    onClick={() => handleSave()}
                    className="btn text-white bg-dark fw-bolder align-self-start">
                    Create page
                </Button>
            </div>

            {editForm.shown ? (
                <EditInfoForm
                    saveBtn={"Done"}
                    ptitle={editForm.title}
                    ppublishedAt={editForm.publishedAt}
                    pauthor={editForm.author}
                    close={closeEditForm}
                    authorField={user.role === "ADMIN"}
                    onSave={updatePageInfo}
                />
            ) : (
                <Button
                    onClick={openEditForm}
                    className="align-self-start btn-info w-25 mb-4 me-4">
                    <PencilSquare className="me-2 mb-1" />
                    Page
                </Button>
            )}

            <BlocksBar
                blocks={blocks}
                setBlocks={setBlocks}
            />

            {page.isSet ? <PageInfo
                title={page.title}
                author={page.author}
                publishedAt={page.publishedAt} />
                : null
            }

            <EditBlockList blocks={blocks} setBlocks={setBlocks} />

        </main >
    );
}

export default CreatePage;
