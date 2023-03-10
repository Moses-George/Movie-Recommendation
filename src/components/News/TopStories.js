import React from "react";
import { Link } from "react-router-dom";
import "../../styles/News/TopStories.scss";
import NewsCard from "./NewsCard";
import { useGetTopStoriesQuery } from "../../store/features/newsApiSlice";

const newsItem = ["n1", "n2", "n3", "n4"]

const TopStories = () => {

    const { data: topStories, isLoading, isFetching } = useGetTopStoriesQuery();
    // if (!isFetching) {
    //     localStorage.setItem("stories", JSON.stringify(topStories.articles.map(item=> item)));
    // }
    const topStoriesItem = localStorage.getItem("stories") !== null ? JSON.parse(localStorage.getItem("stories")) : []

    return (
        <div className="top-stories">
            <div className="top-stories__header">
                <h1>Top Stories</h1>
                <Link to="/news">See all news</Link>
            </div>
            <div className="top-stories__collection">
                {!isLoading && topStoriesItem.slice(0,4).map((news, index) => <NewsCard key={index} news={news} />)}
            </div>
        </div>
    )
}

export default TopStories;