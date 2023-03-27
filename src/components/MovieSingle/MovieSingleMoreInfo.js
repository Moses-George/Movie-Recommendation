import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import Button from "../UI/Button";
import '../../styles/MovieSingle/MovieSingleMoreInfo.scss';
import { formatDate } from "../../utils/dateFormatter";


const MovieSingleMoreInfo = ({ single }) => {

    return (
        <div className="movie-single__moreInfo">
            <p> <strong>Rated: </strong> {single?.adult ? "PG-18" : "PG-13"} </p>
            <p> <strong>Release: </strong> {formatDate(single?.release_date)} </p>
            <p> <strong>Language: </strong> {single?.spoken_languages.map(language => language.name + " ")} </p>
            <p> <strong>Budget: </strong> {single?.budget} </p>
            <p> <strong>Revenue: </strong> {single?.revenue} </p>
            <Divider sx={{ borderColor: "rgb(49, 49, 49)" }} />
            <p>Genres:</p>
            <div className="genre">
                {single?.genres.map(genre => <div key={genre.id}>{genre.name}</div>)}
            </div>
            <Divider sx={{ borderColor: "rgb(49, 49, 49)" }} />
            <div className="production-companies">
                <h3>Production Companies</h3>
                {single?.production_companies.map(company => <div key={company.id} className="company">
                    {company.logo_path && <img src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} alt="" />}
                    <div className="company-detail">
                        <p>{company.name}</p>
                        <p>{company.origin_country}</p>
                    </div>
                </div>)}
            </div>
            <Link to='comments'><Button>View Comments</Button></Link>
        </div>
    )
}

export default MovieSingleMoreInfo;