import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchItem.scss";

const SearchItem = ({ overview, title, imageUrl, filter, movieId }) => {

    const navigate = useNavigate();

    return (
        <div className="searchItem" onClick={() => navigate(`/${filter}/${movieId}`)} >
            <img src={`https://image.tmdb.org/t/p/w500${imageUrl}`} alt="" />
            <div className="searchItem-info">
                <h4>{title.length > 20 ? `${title.slice(0, 17)}...` : title}</h4>
                {overview && <p>{`${overview.slice(0, 20)}...`}</p>}
            </div>
        </div>
    )
}

export default SearchItem; 