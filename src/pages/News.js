import React from "react";
import NewsCollection from "../components/News/NewsCollection";
import "../styles/pages/News.scss";
import { useGetTopStoriesQuery } from "../store/service/newsApiSlice";

const News = () => {

    const { data: news, isLoading } = useGetTopStoriesQuery();

    const newsSize = news?.articles.length;
    const collectionSize = Math.floor(newsSize / 3);

    const headlines = news?.articles.slice(0, collectionSize);
    const trending =  news?.articles.slice(collectionSize, 2*collectionSize);
    const topStories = news?.articles.slice(2*collectionSize, 3*collectionSize);

    return (
        <div className="news">
            {!isLoading && <NewsCollection header="Headlines" newsItem={headlines} loading={isLoading} />}
            {!isLoading && <NewsCollection header="Trending" newsItem={trending} loading={isLoading} />}
            {!isLoading && <NewsCollection header="Top Stories" newsItem={topStories} loading={isLoading} />}
        </div>
    )
}

export default News;