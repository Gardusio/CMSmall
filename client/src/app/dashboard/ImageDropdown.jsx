import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';

const ImageDropdown = ({ onSet, btn }) => {

    const images = [
        '/imgs/blu.jpg',
        '/imgs/lego.jpg',
        '/imgs/mongo.jpg',
        '/imgs/pink.jpg'
    ];

    // Define the styles
    const imgStyle = {
        width: '100%',
        height: 'auto',
        maxHeight: '100px',
    };

    const handleSelect = (img) => {
        onSet(img.split("/")[2])
    }

    return (
        <>
            <Dropdown className="mt-2 ">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {btn || "Image"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {images.map((img, index) => (
                        <Dropdown.Item onClick={() => handleSelect(img)} key={index}>
                            <Image src={img} rounded style={imgStyle} />
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default ImageDropdown;
