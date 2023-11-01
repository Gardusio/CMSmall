import dayjs from 'dayjs'

function PageItemFooter({ page }) {
    return (
        <>
            <p className="text-muted small">By {page.author.username}</p>
            <div className="d-flex align-items-center justify-content-between ">
                <span className="text-muted small"><strong>Created </strong>{dayjs(page.createdAt).format("ddd DD MM [at] HH:mm")}</span>
                <span><strong>Status:</strong> {page.status}</span>
            </div>
        </>
    )
}

export default PageItemFooter