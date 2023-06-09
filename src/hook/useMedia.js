import { useParams, useLocation } from "react-router-dom";
import { useGetSingleMovieQuery, useGetSingleTvShowQuery } from "../store/service/movieApiSlice";
import { useEffect, useState } from "react";

const useMedia = () => {

    const { movieId, tvShowId } = useParams();
    const [media, setMedia] = useState({ id: "", name: "", mediaType: "" })

    const { data: singleMovie } = useGetSingleMovieQuery(movieId);
    const { data: singleTvShow } = useGetSingleTvShowQuery(tvShowId);

    const location = useLocation();
    const path = location.pathname;

    const isMovie = path.split("/").includes("movies");

    useEffect(() => {
        if (isMovie) {
            setMedia({ id: movieId, name: singleMovie?.original_title, mediaType: "movies" })
        }

        if (!isMovie) {
            setMedia({ id: tvShowId, name: singleTvShow?.name, mediaType: "tv" })
        }
    }, [movieId, tvShowId, isMovie, singleTvShow?.name, singleMovie?.original_title])


    // const movie = isMovie ? singleMovie?.original_title : singleTvShow?.name;
    // const fetching = isMovie ? isFetchingMovie : isFetchingTvShow;

    return media;
}

export default useMedia;