import React, { useState } from 'react';
import Block from './Block';
import { ArrowUpCircle, ArrowDownCircle, PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';
import ImageDropdown from '../../dashboard/ImageDropdown';

function EditBlock({ block, edit, move, remove }) {
    const [editBlock, setEditBlock] = useState({ shown: false, bid: -1 })

    const [content, setContent] = useState(block.content)

    const openEdit = (bid) => {
        setEditBlock({ shown: true, bid: bid })
    }

    const handleSave = (thisContent) => {
        edit({ ...block, content: thisContent || content })
        setEditBlock({ shown: false })
    }

    const handleMove = (step) => {
        move({ ...block, order: block.order + step }, step)
    }

    return (
        <li className="d-flex w-100 mt-4">
            <Block block={block} />

            <div className="d-flex">
                {(editBlock.shown && (editBlock.bid === block.id)) ?
                    block.type !== "img" ?
                        <div className='d-flex align-items-end w-100' >
                            <Form.Group className='ms-3 me-2'>
                                <Form.Control
                                    onChange={(e) => setContent(e.target.value)}
                                    as="textarea" rows={1}
                                    defaultValue={block.content} />
                            </Form.Group>
                            <Button
                                onClick={() => handleSave()}
                                className='bg-dark'>Save</Button>
                        </div>
                        : <div className='ms-3'><ImageDropdown onSet={(path) => handleSave(path)} /></div>
                    :
                    <div className="d-flex">
                        <div className="d-flex flex-column ms-3 ">
                            <ArrowUpCircle
                                className="mb-2" size={30} onClick={() => handleMove(-1)} />
                            <ArrowDownCircle
                                className="mb-2" size={30} onClick={() => handleMove(+1)} />
                        </div>
                        <div className="d-flex flex-column ms-3 ">
                            <PencilSquare size={30} className="text-primary mb-2" onClick={() => openEdit(block.id)}>Edit</PencilSquare>
                            <TrashFill size={30} className="text-danger" onClick={() => remove(block)}>Delete</TrashFill>
                        </div>
                    </div>
                }
            </div>
        </li >
    );
}

export default EditBlock;
