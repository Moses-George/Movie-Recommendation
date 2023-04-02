import React, { useEffect, useState } from "react";
import FeaturedMovie from "../components/Movies/FeaturedMovie";
import MoviesGenreFilter from "../components/Movies/MoviesGenreFilter";
import MoviesRow from "../components/Movies/MoviesRow";
import TvShowRow from "../components/TvShows/TvShowRow";
// import SeriesRow from "../components/MoviesContainer/SeriesRow";
import TopStories from "../components/News/TopStories";
import {
    useGetMoviesDiscoverQuery,
    useGetUpcomingMoviesQuery,
    useGetPopularTVShowsQuery,
    useGetTopRatedTVShowsQuery
} from "../store/service/movieApiSlice";

const Home = () => {

    const { data: discoveryMovies, isLoading, isFetching } = useGetMoviesDiscoverQuery(1);
    // if (!isFetching) {
    //     localStorage.setItem("discoveries", JSON.stringify(discoveryMovies.results.map(item=> item)));
    // }
    const discoveryItems = localStorage.getItem("discoveries") !== null ? JSON.parse(localStorage.getItem("discoveries")) : []

    const { data: upcomingMovies, isLoading: isUpcomingMoviesLoading, isFetching: isUpcomingMoviesFetching, isSuccess } = useGetUpcomingMoviesQuery(1);
    // if (!isUpcomingMoviesFetching) {
    //     localStorage.setItem("latest", JSON.stringify(upcomingMovies.results.map(item => item)));
    // }
    const upcomingItems = localStorage.getItem("latest") !== null ? JSON.parse(localStorage.getItem("latest")) : []

    const { data: popularTVShows, isLoading: isPopularLoading, isFetching: isPopularFetching } = useGetPopularTVShowsQuery(1);
    // if (!isPopularFetching) {
    //     localStorage.setItem("popular", JSON.stringify(popularTVShows.results.map(item => item)));
    // }
    const popularItems = localStorage.getItem("popular") !== null ? JSON.parse(localStorage.getItem("popular")) : []

    const { data: topRatedTVShows, isLoading: isTopRatedLoading, isFetching: isTopRatedFetching } = useGetTopRatedTVShowsQuery(1);
    // if (!isTopRatedFetching) {
    //     localStorage.setItem("rated", JSON.stringify(topRatedTVShows.results.map(item => item)));
    // }
    const topRatedItems = localStorage.getItem("rated") !== null ? JSON.parse(localStorage.getItem("rated")) : [] 

    // console.log(discoveryMovies)
    // console.log(latestMovies)


    return <>
        <FeaturedMovie />
        <MoviesGenreFilter />
        {!isLoading && <MoviesRow header="Discover" movieData={discoveryItems} />}
        {!isUpcomingMoviesLoading && <MoviesRow header="Upcoming Movies" movieData={upcomingItems} />}
        {!isPopularLoading && <TvShowRow header="Popular TV Shows" tvShowData={popularItems} />}
        {!isTopRatedLoading && <TvShowRow header="Top Rated TV Shows" tvShowData={topRatedItems} />}
        <TopStories />
    </>
}

export default Home;