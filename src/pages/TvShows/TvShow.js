import React from "react";
import '../../styles/pages/Movies.scss';
import TvShowGrid from "../../components/TvShows/TvShowGrid";
import MovieSearch from "../../components/Movies/MovieSearch";

const TvShows = () => {

    return (
        <>
            <div className="tvShows-bg">
                <h1>Tv Show  LISTING</h1>
            </div>
            <div className="tvShows">
                <TvShowGrid  />
                <MovieSearch  />
            </div>
        </>
    )
}

export default TvShows;