import React from "react";
import { Link } from "react-router-dom";
import "../../styles/News/NewsCard.scss";
// import newsPic from "../../Assets/images/news.jpg";
import { formatDate } from "../../utils/dateFormatter";

// const description = "’m friends with the producer who I worked with on Byzantium and he sent it to me. I read the book as well, which is fantastic. You’re always looking for untold stories and many times they’re women’s stories. What surprised me is that it centers around a woman who’s really quite timid. I guess she’s allowed to be because all of the other characters"

const NewsCard = ({ news }) => {

    return (<article className="news-card">
        <img src={news.urlToImage} alt="" />
        <div className="news-detail">
            <a href={news.url} target='_blank' rel="noreferrer">{news.title}</a>
            <p>{formatDate(news.publishedAt)}</p>
            <p> {`${news.content.slice(0, 85)}...`} </p>
        </div>
        <div className="news-source">
            <p>{news.source.name}</p>
            <p>5 hours ago</p>
        </div>
    </article>
    )
}

export default NewsCard;