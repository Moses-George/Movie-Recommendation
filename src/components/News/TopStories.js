import React from "react";
import { Link } from "react-router-dom";
import "../../styles/News/TopStories.scss";
import NewsCard from "./NewsCard";
import { useGetTopStoriesQuery } from "../../store/service/newsApiSlice";
import CardSkeleton from "../UI/Spinners/CardSkeleton";

const arr = new Array(10);

const TopStories = () => {

    const { data: topStories, isLoading } = useGetTopStoriesQuery();

    return (
        <div className="top-stories">
            <div className="top-stories__header">
                <h1>Top Stories</h1>
                <Link to="/news">See all news</Link>
            </div>
            <div className="top-stories__collection">
                {!isLoading && topStories?.articles?.slice(0, 4).map(news => <NewsCard key={news.id} news={news} />)}
                {isLoading && arr.map(news => <CardSkeleton key={news.id} />)}
            </div>
        </div>
    )
}

export default TopStories;