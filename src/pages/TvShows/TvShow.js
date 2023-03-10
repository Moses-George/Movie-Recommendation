import React from "react";
import '../../styles/pages/Movies.scss';
import MovieGrid from '../../components/Movies/MovieGrid'
import MovieSearch from "../../components/Movies/MovieSearch";

const Movies = () => {

    return (
        <div className="movies">
            <MovieGrid type="series" />
            <MovieSearch type="series" />
        </div>
    )
}

export default Movies;