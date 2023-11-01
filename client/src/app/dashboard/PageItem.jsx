import { useNavigate } from "react-router";
import PageItemFooter from "./PageItemFooter";
import { Button, ListGroupItem } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { useContext } from "react";
import { ErrorsContext } from "../context/ErrorsProvider";

function PageItem({ page, deletePage, updatePage, user }) {
    const { clearErrors } = useContext(ErrorsContext)

    const navigate = useNavigate()
    const actionsDisabled = user.role !== "ADMIN" && page.author.id !== user.id

    const handleOpen = (id) => {
        clearErrors()
        navigate("/pages/" + id)
    }

    return (
        <ListGroupItem onClick={() => handleOpen(page.id)} className="p-4 d-flex flex-column list-group-item-action">
            <div className="d-flex justify-content-between align-items-center">
                <h5>{page.title}</h5>

                {actionsDisabled ? false :
                    <div className="d-flex align-items-center justify-content-center">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearErrors()
                                deletePage(page)
                            }}
                            className="btn-sm btn-danger mx-1 fw-bold">
                            <TrashFill className="mb-1 me-1" />Delete
                        </Button>

                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearErrors()
                                updatePage(page)
                            }}
                            className="btn-sm btn-warning mx-1 fw-bold">
                            <PencilSquare className="mb-1 me-1" />Info
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearErrors()
                                navigate("/dashboard/edit/" + page.id)
                            }}
                            className="btn-sm  btn-info mx-1 fw-bold">
                            <PencilSquare className="mb-1 me-1" />Content
                        </Button>
                    </div >
                }

            </div>
            <PageItemFooter page={page} />
        </ListGroupItem >
    )
}

export default PageItem