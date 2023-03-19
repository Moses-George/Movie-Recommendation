import React from "react";
import "./SearchItem.scss";

const SearchItem = (movie) => {
    return (
        <div className="searchItem">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <div className="searchItem-info">
                <h4>{movie.title || movie.name}</h4>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default SearchItem;