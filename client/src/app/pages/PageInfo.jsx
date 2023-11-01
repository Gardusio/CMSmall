import React from 'react'
import dayjs from "dayjs"

function PageInfo({ title, publishedAt, author }) {

    return (
        <>
            <h1 >{title}</h1>
            <span>Written by: {author}</span>
            <p>Published: {dayjs(publishedAt).format("ddd DD/MM/YYYY")}</p>
        </>
    );
}

export default PageInfo;
