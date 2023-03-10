import React from "react";
import { Star } from "@mui/icons-material";
import '../../styles/MovieSingle/MovieSingleInfo.scss';

const MovieSingleInfo = ({single}) => {


        return (
            <div className="movie-single__info">
                <h1> {single?.title} </h1>
                <img src={`https://image.tmdb.org/t/p/w1280${single?.backdrop_path}`} alt="" />
                <div className="rating">
                    <span> <Star sx={{ color: "gold" }} /> {single?.vote_average} </span>
                    <span>Runtime: {single?.runtime}</span>
                </div>
                <p> {single?.overview} </p>
            </div>
        )

}

export default MovieSingleInfo;