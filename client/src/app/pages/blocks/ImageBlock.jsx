import React from 'react'
import { Image } from 'react-bootstrap';
function ImageBlock({ path }) {

    return (
        <Image src={path} width="90%" />
    );
}

export default ImageBlock;
