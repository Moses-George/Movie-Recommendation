import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "325e920b899e3b823d52fa3739a5c71d";

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
    endpoints: (builder) => ({
        getMoviesDiscover: builder.query({
            query: (pageNum) => `discover/movie?api_key=${API_KEY}&page=${pageNum}`,
        }),
        getUpcomingMovies: builder.query({
            query: (pageNum) => `movie/upcoming?api_key=${API_KEY}&page=${pageNum}`,
        }),
        getTopRatedTVShows: builder.query({
            query: (pageNum) => `tv/top_rated?api_key=${API_KEY}&page=${pageNum}`,
        }),
        getPopularTVShows: builder.query({
            query: (pageNum) => `tv/popular?api_key=${API_KEY}&page=${pageNum}`,
        }),
        getTrendingMovies: builder.query({
            query: (pageNum) => `trending/movie/day?api_key=${API_KEY}&page=${pageNum}`,
        }),
        getSingleMovie: builder.query({
            query: (movieId) => `movie/${movieId}?api_key=${API_KEY}`,
        }),
        getSingleTvShow: builder.query({
            query: (tvShowId) => `tv/${tvShowId}?api_key=${API_KEY}`,
        }),
    })
});

export const { useGetMoviesDiscoverQuery,
    useGetUpcomingMoviesQuery,
    useGetTopRatedTVShowsQuery,
    useGetPopularTVShowsQuery,
    useGetTrendingMoviesQuery,
    useGetSingleMovieQuery,
    useGetSingleTvShowQuery,
} = movieApi;