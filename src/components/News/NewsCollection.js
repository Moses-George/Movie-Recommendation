import React from "react";
import "../../styles/News/NewsCollection.scss";
import NewsCard from "./NewsCard";
import CardSkeleton from "../UI/Spinners/CardSkeleton";

const arr = new Array(20); 

const NewsCollection = ({header, newsItem, loading}) => {


    return (
        <div className="news-collection ">
            <h1>{header}</h1>
            <div className="news-collection__row horizontal-scroll">
                {!loading && newsItem?.map(news => <NewsCard key={news.id} news={news} />)}
                {loading && arr.map(news => <CardSkeleton key={news.id} />)}
            </div>
        </div> 
    )
}

export default NewsCollection;