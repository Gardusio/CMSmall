import { useContext, useState } from "react";
import { PagesContext } from "../context/PagesProvider";
import PageItem from "./PageItem";

import ModalContainer from "../common/layouts/Modal";
import dayjs from 'dayjs'
import { Button, Form } from "react-bootstrap";
import LoadingSpinner from "../common/layouts/LoadingSpinner";
import { ErrorsContext } from "../context/ErrorsProvider";
import { SiteContext } from "../context/SiteProvider";
import { Outlet, useNavigate } from "react-router";
import EditInfoForm from "../pages/EditInfoForm";

function Dashboard({ user }) {
    const navigate = useNavigate()
    const { clearErrors } = useContext(ErrorsContext);
    const { pages, deletePage, updatePage } = useContext(PagesContext);
    const { updateSiteName } = useContext(SiteContext);

    const [editForm, setEditForm] = useState({
        pid: null,
        shown: false,
        title: null,
        author: null,
        publishedAt: null
    });

    const [editSite, setEditSite] = useState(false);
    const [newSiteName, setNewSiteName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const openEditForm = async (id, title, author, publishedAt) => {
        clearErrors();
        setEditForm({
            pid: id,
            shown: true,
            title: title,
            author: author,
            publishedAt: publishedAt
        });
    };

    const closeEditForm = async () => {
        setEditForm({ shown: false });
    };

    const doDelete = async (page) => {
        setIsLoading(true);
        await deletePage(page);
        setIsLoading(false);
    };

    const doUpdate = async (title, publishedAt, author) => {
        setIsLoading(true);
        await updatePage({ id: editForm.pid, title, publishedAt, author });
        setIsLoading(false);
        setEditForm({ shown: false });
    };

    const doUpdateSiteName = async () => {
        setIsLoading(true);
        await updateSiteName(newSiteName);
        setIsLoading(false);
        setEditSite(false);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <main className="w-100">
            {editForm.shown && (
                <ModalContainer shown={true} content={
                    <EditInfoForm
                        ptitle={editForm.title}
                        ppublishedAt={editForm.publishedAt}
                        pauthor={editForm.author}
                        close={closeEditForm}
                        authorField={user.role === "ADMIN"}
                        onSave={doUpdate}
                    />
                } />
            )}

            <div className="d-flex align-items-center justify-content-between w-100">
                <h2 className="align-self-start">Existing pages</h2>
                <div className="d-flex flex-column align-items-center justify-content-around">
                    <div className="d-flex align-items-center justify-content-around w-100">
                        {user.role === "ADMIN" && (
                            <Button
                                onClick={() => setEditSite((s) => !s)}
                                className="btn text-white btn-secondary fw-bolder me-2">
                                Edit Site
                            </Button>
                        )}
                        <Button
                            onClick={() => navigate("/dashboard/create")}
                            className="btn text-white bg-dark fw-bolder">
                            Create page
                        </Button>
                    </div>
                    {editSite && (
                        <div className='d-flex align-items-center justify-content-center mt-3'>
                            <Form.Group className='w-100 me-2'>
                                <Form.Control
                                    onChange={(e) => setNewSiteName(e.target.value)}
                                    placeholder="New site name"
                                />
                            </Form.Group>
                            <Button onClick={doUpdateSiteName} className='btn-success'>Save</Button>
                        </div>
                    )}
                </div>
            </div>

            <ul className="list-group w-100 mt-3">
                {pages.map((p) => (
                    <PageItem
                        key={p.id}
                        page={p}
                        user={user}
                        deletePage={() => doDelete(p)}
                        updatePage={() =>
                            openEditForm(p.id, p.title, p.author.username, dayjs(p.publishedAt).format("YYYY-MM-DD"))
                        }
                    />
                ))}
            </ul>
            <Outlet />
        </main>
    );
}

export default Dashboard;
