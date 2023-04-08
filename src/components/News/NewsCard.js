import React from "react";
import "../../styles/News/NewsCard.scss";
import { formatDate } from "../../utils/dateFormatter";


const NewsCard = ({ news }) => {

    return (<article className="news-card">
        <img src={news?.urlToImage} alt="" />
        <div className="news-detail">
            <a href={news?.url} target='_blank' rel="noreferrer">{news?.title}</a>
            <p>{formatDate(news.publishedAt)}</p>
            {news?.content && <p> {`${ news?.content.slice(0, 85)}...`} </p> }
        </div>
        <div className="news-source">
            <p>{news?.source.name}</p>
        </div>
    </article>
    )
}

export default NewsCard;