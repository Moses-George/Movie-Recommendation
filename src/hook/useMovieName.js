import { useParams, useLocation } from "react-router-dom";
import { useGetSingleMovieQuery, useGetSingleTvShowQuery } from "../store/features/movieApiSlice";

const useMovieName = () => {

    const { movieId, tvShowId } = useParams();

    const { data: singleMovie, isFetching: isFetchingMovie } = useGetSingleMovieQuery(movieId);
    const { data: singleTvShow, isFetching: isFetchingTvShow } = useGetSingleTvShowQuery(tvShowId);

    const location = useLocation();
    const path = location.pathname;

    const isMovie = path.split("/").includes("movies");


    const movie = isMovie ? singleMovie.original_title : singleTvShow.name;
    const fetching = isMovie ? isFetchingMovie : isFetchingTvShow;

    return { movie, fetching };
}

export default useMovieName;