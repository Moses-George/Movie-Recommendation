import React from "react";
import NewsCollection from "../components/News/NewsCollection";
import "../styles/pages/News.scss";

const News = () => {

    return (
        <div className="news">
            <NewsCollection header="Headlines" />
            <NewsCollection header="Trending" />
            <NewsCollection header="Top Stories" />
        </div>
    )
}

export default News;