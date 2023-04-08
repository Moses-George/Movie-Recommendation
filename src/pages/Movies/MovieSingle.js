import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import '../../styles/MovieSingle/MovieSingle.scss';
import MovieSingleInfo from '../../components/MovieSingle/MovieSingleInfo';
import MovieSingleMoreInfo from "../../components/MovieSingle/MovieSingleMoreInfo";
import SingleReview from '../../components/SingleReview/SingleReview';
import { useGetSingleMovieQuery } from "../../store/service/movieApiSlice";
import Spinner from "../../components/UI/Spinners/Spinner";

const MovieSingle = () => {

    const { movieId } = useParams();

    const { data: single} = useGetSingleMovieQuery(movieId);


    return (
        <div className="movie-single">
            <MovieSingleInfo single={single} />
            <Routes>
                <Route index={true} element={ <MovieSingleMoreInfo single={single} />} />
                <Route path='comments/*' element={<SingleReview />} />
            </Routes>
        </div>
    )
}

export default MovieSingle;