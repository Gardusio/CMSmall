import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function EditInfoForm({ ptitle, pauthor, ppublishedAt, close, authorField, onSave, saveBtn }) {

    const [title, setTitle] = useState(ptitle)
    const [publishedAt, setPublishedAt] = useState(ppublishedAt)
    const [author, setAuthor] = useState(pauthor)

    const handleSave = async (e) => {
        e.preventDefault()
        return await onSave(title, publishedAt, author)
    }

    return (
        <div className="position-relative bg-light p-2 m-auto mb-4  rounded-4 shadow">
            <h4 className="text-center pt-2">{ptitle}</h4>
            <Button
                onClick={close}
                className="position-absolute top-0 end-0 m-2 btn-sm text-white bg-dark bg-opacity-50 text-dark border-0" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </Button>

            <Form onSubmit={handleSave} validated
                className="d-flex flex-column w-100 m-auto pt-4 pb-2">
                <div className="d-flex flex-wrap justify-content-around align-items-center">
                    <Form.Group className="mx-4">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            defaultValue={ptitle} />
                    </Form.Group>
                    <Form.Group className="mx-2">
                        <Form.Label>Publish date</Form.Label>
                        <Form.Control
                            onChange={(e) => setPublishedAt(e.target.value)}
                            defaultValue={ppublishedAt}
                            required
                            type="date"
                        />
                    </Form.Group>
                    {authorField ?
                        <Form.Group className="mx-4">
                            <Form.Label>Author </Form.Label>
                            <Form.Control
                                onChange={(e) => setAuthor(e.target.value)}
                                defaultValue={pauthor} />
                        </Form.Group>
                        : null
                    }
                </div>
                <Button type="submit" onClick={handleSave} className="bg-dark fw-bold w-25 align-self-center mt-5">
                    {saveBtn || "Save"}
                </Button>
            </Form>
        </div>
    );
}

export default EditInfoForm