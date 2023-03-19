import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import '../../styles/MovieSingle/MovieSingle.scss';
import MovieSingleInfo from '../../components/MovieSingle/MovieSingleInfo';
import MovieSingleMoreInfo from "../../components/MovieSingle/MovieSingleMoreInfo";
import SingleReview from '../../components/SingleReview/SingleReview';
import { useGetSingleMovieQuery } from "../../store/features/movieApiSlice";
import Spinner from "../../components/UI/Spinners/Spinner";

const MovieSingle = () => {

    const { movieId } = useParams();

    const { data: single, isError, error, isFetching, isSuccess } = useGetSingleMovieQuery(movieId);

    if (isFetching) {
        return <Spinner />
    }

    if (isError) {
        return <h2>An error has occurred!</h2>
    }

    return (
        <div className="movie-single">
            {isSuccess && <MovieSingleInfo single={single} />}
            <Routes>
                <Route index={true} element={isSuccess && <MovieSingleMoreInfo single={single} />} />
                <Route path='comments/*' element={<SingleReview />} />
            </Routes>
        </div>
    )
}

export default MovieSingle;