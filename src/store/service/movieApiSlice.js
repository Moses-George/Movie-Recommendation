import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_API_KEY } from "../../config";


export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
    endpoints: (builder) => ({
        getMoviesDiscover: builder.query({
            query: (pageNum) => `discover/movie?api_key=${TMDB_API_KEY}&page=${pageNum}`,
        }),
        getUpcomingMovies: builder.query({
            query: (pageNum) => `movie/upcoming?api_key=${TMDB_API_KEY}&page=${pageNum}`,
        }),
        getTopRatedTVShows: builder.query({
            query: (pageNum) => `tv/top_rated?api_key=${TMDB_API_KEY}&page=${pageNum}`,
        }),
        getPopularTVShows: builder.query({
            query: (pageNum) => `tv/popular?api_key=${TMDB_API_KEY}&page=${pageNum}`,
        }),
        getTrendingMovies: builder.query({
            query: (pageNum) => `trending/movie/day?api_key=${TMDB_API_KEY}&page=${pageNum}`,
        }),
        getSingleMovie: builder.query({
            query: (movieId) => `movie/${movieId}?api_key=${TMDB_API_KEY}`,
        }),
        getSingleTvShow: builder.query({
            query: (tvShowId) => `tv/${tvShowId}?api_key=${TMDB_API_KEY}`,
        }),
        getSortedMovies: builder.query({
            query: (page, query) =>  `movie/upcoming?sort_by=${query}&api_key=${TMDB_API_KEY}&page=${page}`
        }),
        getSortedTvShows: builder.query({
            query: (page, query) => `tv/on_the_air?sort_by=${query}&api_key=${TMDB_API_KEY}&page=${page}` ,
        }),
        getMovieVideos: builder.query({
            query: (movieId) => `movie/${movieId}/videos?api_key=${TMDB_API_KEY}`,
        }),
        getTvShowVideos: builder.query({
            query: (tvShowId) => `tv/${tvShowId}/videos?api_key=${TMDB_API_KEY}`,
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
    useGetSortedMoviesQuery,
    useGetSortedTvShowsQuery,
    useGetMovieVideosQuery,
    useGetTvShowVideosQuery
} = movieApi;