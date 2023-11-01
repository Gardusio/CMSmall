import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ErrorsContext } from "../../context/ErrorsProvider";
import ImageDropdown from "../../dashboard/ImageDropdown";
import { EyeFill } from "react-bootstrap-icons";
import { getNextDisplayId, sortByOrder } from "../../../api/blocks.api";

function BlocksBar({ blocks, setBlocks, onSave }) {

    const { clearErrors } = useContext(ErrorsContext);

    const [showControls, setShowControls] = useState(true);
    const [showNewText, setShowNewText] = useState({ shown: true, type: "header" });
    const [newText, setNewText] = useState("");

    const handleSave = async () => {
        clearErrors();

        if (onSave)
            return await onSave()
        else {
            setShowControls(!showControls)
        }
    };

    const openNewText = (type) => {
        clearErrors();
        setShowNewText({ shown: true, type: type });
    };

    const doCreateText = () => {
        createTextBlock(newText)
    }

    const createTextBlock = () => {
        setBlocks((currentBlocks) => {
            const prevBlocks = currentBlocks.map((b) => ({
                ...b,
                order: b.order + 1,
            }));

            return sortByOrder([
                ...prevBlocks,
                {
                    displayId: getNextDisplayId(blocks),
                    content: newText,
                    order: 0,
                    type: showNewText.type,
                },
            ]);
        });

        setShowNewText(false);
    };

    const createImageBlock = (newImg) => {
        setBlocks((currentBlocks) => {
            const prevBlocks = currentBlocks.map((b) => ({
                ...b,
                order: b.order + 1,
            }));

            return [
                ...prevBlocks,
                {
                    displayId: getNextDisplayId(blocks),
                    content: newImg,
                    order: 0,
                    type: "img",
                },
            ].sort((a, b) => a.order - b.order);
        });
    };

    return (
        <>
            {showControls ? (
                <div className="d-flex flex-column w-100">
                    <div className="d-flex w-100 align-items-end mb-5 bg-light shadow p-4 rounded-3">
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex w-100 align-items-center mb-2">
                                <h4>Add blocks</h4>
                                <Button
                                    onClick={() => setShowControls(!showControls)}
                                    className="btn-warning ms-4"
                                >
                                    <EyeFill className="mb-1" />
                                </Button>
                            </div>

                            <div className="d-flex align-items-center w-75 mt-2 flex-wrap">
                                <Button
                                    onClick={() => openNewText("header")}
                                    className="btn-secondary mt-2"
                                >
                                    Header
                                </Button>
                                <Button
                                    onClick={() => openNewText("paragraph")}
                                    className="btn-secondary mt-2 ms-4 me-4"
                                >
                                    Paragraph
                                </Button>
                                <ImageDropdown onSet={createImageBlock} />
                            </div>

                            {showNewText && (
                                <div className="d-flex align-items-center w-100 mt-4">
                                    <Form.Group className="w-50 me-2">
                                        <Form.Control
                                            onChange={(e) => setNewText(e.target.value)}
                                            as="textarea"
                                            rows={1}
                                        />
                                    </Form.Group>
                                    <Button disabled={newText.length === 0} onClick={doCreateText} className="btn-success">
                                        Create {showNewText.type.toString()}
                                    </Button>
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleSave}
                            className="bg-dark w-25 fw-bold">
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                    onClick={() => setShowControls(!showControls)}
                    className="btn-warning w-25 mb-4"
                >
                    <EyeFill className="me-2 mb-1" />
                    Controls
                </Button>
            )}
        </>
    );
}

export default BlocksBar;
