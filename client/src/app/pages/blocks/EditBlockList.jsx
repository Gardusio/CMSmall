import { useContext } from "react";
import { ErrorsContext } from "../../context/ErrorsProvider";
import EditBlock from "./EditBlock";
import { sortByOrder } from "../../../api/blocks.api"


function EditBlockList({ blocks, setBlocks }) {
    const { clearErrors } = useContext(ErrorsContext);

    const editContent = (updated) => {
        clearErrors()
        setBlocks((prevBlocks) =>
            prevBlocks.map((b) =>
                b.displayId === updated.displayId ? updated : b
            )
        );
    };

    const editOrder = (updated, step) => {
        setBlocks((prevBlocks) => {
            const currBlockModification = step === -1 ? 1 : -1

            const updatedBlocks = prevBlocks.map(b => {
                if (b.order === updated.order) {
                    return { ...b, order: b.order + currBlockModification }
                }
                else if (b.displayId === updated.displayId) {
                    return updated
                }
                return b
            })

            sortByOrder(updatedBlocks)
            return updatedBlocks;
        });

        clearErrors();
    };

    const removeBlock = (block) => {
        clearErrors()
        setBlocks((prevBlocks) => {

            const newBlocks = prevBlocks
                .map(b => b.order > block.order ? { ...b, order: b.order - 1 } : b)
                .filter((b) => b.displayId !== block.displayId)

            sortByOrder(newBlocks)
            return newBlocks
        });
    };

    return (
        <ul>
            {blocks.map((block) => (
                <EditBlock
                    key={block.displayId}
                    block={block}
                    edit={editContent}
                    move={editOrder}
                    remove={removeBlock}
                />
            ))
            }
        </ul>
    );
}

export default EditBlockList;
