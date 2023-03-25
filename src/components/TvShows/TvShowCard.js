import React, { useState } from "react";
import { Favorite, Star } from "@mui/icons-material";
import Button from "../UI/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";

const TvShowCard = ({ tvShow }) => {

    const [favoriteMovie, setFavoriteMovie] = useState("");

    const handleLikedMovie = () => {
        setFavoriteMovie(tvShow.id);
        // setTimeout(()=> setFavoriteMovie(""), 2000)
    }

    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt="" />
            <Link to={`/tvShow/${tvShow.id}`}> <Button>Read More</Button></Link>
            <h3>{tvShow.name}</h3>
            <div className="movie-info">
                <p>{new Date(tvShow.first_air_date).getFullYear()}</p>
                <div className="movie-info__right">
                    <span> <Favorite onClick={handleLikedMovie}
                        sx={{ fontSize: "23px", color: `${favoriteMovie ? "red" : "gray"}` }}
                        className={`${tvShow.id === favoriteMovie && "bump"}`} /> </span>
                    <span> <Star sx={{ fontSize: "22px" }} /> {tvShow.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default TvShowCard;