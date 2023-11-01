import { useContext, useEffect, useState } from "react";
import PagesGrid from "./PagesGrid"
import { PagesContext } from "../context/PagesProvider";

function Home() {

    const { pages } = useContext(PagesContext)

    const [publishedPages, setPublishedPages] = useState([])

    useEffect(() => {
        if (pages) {
            setPublishedPages(pages.filter(p => p.status === "Published"))
        }

    }, [pages])

    return (
        <main className="w-100">
            <h2 className="text-center">Latest pages</h2>
            <PagesGrid pages={publishedPages} />
        </main >
    )
}

export default Home