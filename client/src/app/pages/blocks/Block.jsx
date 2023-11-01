import React from 'react'
import ImageBlock from './ImageBlock';
import HeaderBlock from './HeaderBlock';
import ParagraphBlock from './ParagraphBlock';

function Block({ block }) {

    const type = block.type
    const imgPath = type === "img" ? `/imgs/${block.content}` : ""

    return (
        <> {
            type === "img" ? <ImageBlock path={imgPath} /> :
                type === "header" ? <HeaderBlock content={block.content} /> :
                    <ParagraphBlock content={block.content} />
        }
        </>
    );
}

export default Block;
