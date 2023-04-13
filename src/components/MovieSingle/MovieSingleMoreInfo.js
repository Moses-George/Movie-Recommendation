import React from "react";
import { Link, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import Button from "../UI/Button/Button";
import '../../styles/MovieSingle/MovieSingleMoreInfo.scss';
import { formatDate } from "../../utils/dateFormatter";
import { useGetMovieVideosQuery } from "../../store/service/movieApiSlice";


const MovieSingleMoreInfo = ({ single }) => {

    const { movieId } = useParams();

    const { data: videos } = useGetMovieVideosQuery(movieId);

    return (
        <div className="movie-single__moreInfo">
            <p> <strong>Rated: </strong> {single?.adult ? "PG-18" : "PG-13"} </p>
            <p> <strong>Release: </strong> {formatDate(single?.release_date)} </p>
            <p> <strong>Language: </strong> {single?.spoken_languages.map(language => language.name + " ")} </p>
            <Divider sx={{ borderColor: "rgb(49, 49, 49)" }} />
            <p>Genres:</p>
            <div className="genre">
                {single?.genres.map(genre => <div key={genre.id}>{genre.name}</div>)}
            </div>
            <Divider sx={{ borderColor: "rgb(49, 49, 49)" }} />
            <h3>{`Videos (${videos?.results.length})`}</h3>
            <div className="horizontal-scroll videos">
                {videos?.results.map(video =>
                    <div className="video" key={video?.id} >
                        <iframe 
                        allowFullScreen
                        allow="accelerometer; clipboard-write; gyroscope; picture-in-picture"
                        title={video?.name} 
                        id={video?.id}
                        src={`https://www.youtube.com/embed/${video?.key}?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widget=1`}></iframe>
                        <div className="video-info"> 
                            <p>{video?.name}</p>
                            <div className="video-type">
                                <span>{video?.type}</span>
                                <span>{formatDate(video?.published_at)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Link to='comments'><Button>View Comments</Button></Link>
        </div>
    )
}

export default MovieSingleMoreInfo;