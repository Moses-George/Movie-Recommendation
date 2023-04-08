import React from "react";
import { Star } from "@mui/icons-material";
import '../../styles/MovieSingle/MovieSingleInfo.scss';
import Season from "./Season";

const TvShowSingleInfo = ({ single }) => {

console.log(single)
    return (
        <div className="movie-single__info">
            <h1> {single?.name} </h1>
            <img src={`https://image.tmdb.org/t/p/w1280${single?.backdrop_path}`} alt="" />
            <div className="rating">
                <span> <Star sx={{ color: "gold" }} /> {single?.vote_average} </span>
                <span>Runtime: {single?.runtime}</span>
            </div>
            <p> {single?.overview} </p>
            <h2>{`Seasons (${single?.seasons.length})`}</h2>
            <div className="seasons horizontal-scroll"> 
                { single?.seasons &&  single?.seasons.map(season=> <Season key={season.id} season={season} />)}
            </div>
        </div>
    )

}

export default TvShowSingleInfo; 