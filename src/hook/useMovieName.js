import { useParams, useLocation } from "react-router-dom";
import { useGetSingleMovieQuery, useGetSingleTvShowQuery } from "../store/features/movieApiSlice";

const useMovieName = () => {

    const { movieId, tvShowId } = useParams();

    const { data: singleMovie } = useGetSingleMovieQuery(movieId);
    const { data: singleTvShow } = useGetSingleTvShowQuery(tvShowId);

    const location = useLocation();
    const path = location.pathname;

    const isMovie = path.split("/").includes("movies");


    const movie = isMovie ? singleMovie.original_title : singleTvShow.name;

    return { movie };
}

export default useMovieName;