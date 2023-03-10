import React from "react";
import "../../styles/News/NewsCollection.scss"
import NewsCard from "./NewsCard";

const newsItem = ["n1", "n2", "n3", "n4", "n5", "n6"]

const NewsCollection = ({header}) => {


    return (
        <div className="news-collection">
            <h1>{header}</h1>
            <div className="news-collection__row">
                {newsItem.map(news => <NewsCard key={news} />)}
            </div>
        </div>
    )
}

export default NewsCollection;