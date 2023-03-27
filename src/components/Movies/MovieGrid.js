import React, { useEffect, useState, useRef } from "react";
import { FormControl, MenuItem, Select, Pagination } from "@mui/material";
import '../../styles/Movies/MovieGrid.scss';
import MovieCard from './MovieCard';
import { useGetMoviesDiscoverQuery, useGetSortedMoviesQuery } from "../../store/features/movieApiSlice";
import { useNavigate, createSearchParams, useLocation, useSearchParams } from "react-router-dom";
import MovieSpinner from "../UI/Spinners/MovieSpinner";
// import { current } from "@reduxjs/toolkit";

const movies = new Array(12).fill(null).map((item, index) => "m" + index);
console.log(movies);

const textFieldStyle = {
    width: "100%", "&:hover": { backgroundColor: "#464646" },
    "& .MuiFilledInput-root": { backgroundColor: "#464646", color: "#fff" }
}

// const sortMovies = (movies, sort) => {
//     if (sort === "All" || !sort) {
//         return movies;
//     }
//     if (sort === "Rating Ascending") {
//         return movies?.sort((prevMovie, currentMovie) => prevMovie.vote_average - currentMovie.vote_average);
//     }
//     if (sort === "Rating Descending") {
//         return movies?.sort((prevMovie, currentMovie) => currentMovie.vote_average - prevMovie.vote_average);
//     }
//     if (sort === "Release Date Ascending") {
//         return movies.sort((prevMovie, currentMovie) => prevMovie.release_date - currentMovie.release_date);
//     }
//     if (sort === "Release Date Descending") {
//         return movies.sort((prevMovie, currentMovie) => currentMovie.release_date - prevMovie.release_date);
//     }
//     if (sort === "Popularity Ascending") {
//         return movies.sort((prevMovie, currentMovie) => prevMovie.popularity - currentMovie.popularity);
//     }
//     if (sort === "Popularity Descending") {
//         return movies.sort((prevMovie, currentMovie) => currentMovie.popularity - prevMovie.popularity);
//     }
// }

const MovieGrid = ({ type }) => {

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("popularity.asc");
    const scrollToRef = useRef(null);

    const navigate = useNavigate();

    // const [searchParam] = useSearchParams();
    // const query = searchParam.get('sort');

    const { data: discoveryMovies, isLoading, isFetching, refetch } = useGetSortedMoviesQuery(page, filter);
    // if (!isFetching) {
    //     localStorage.setItem("discoveries", JSON.stringify(discoveryMovies.results.map(item=> item)));
    // }
    const discoveryItems = localStorage.getItem("discoveries") !== null ? JSON.parse(localStorage.getItem("discoveries")) : []


    const handlePageChange = (e, value) => {
        setPage(value);
        refetch();
        scrollToRef.current.scrollIntoView({behavior:"smooth"}); 
    }

    const params = { sort: filter }

    // useEffect(() => {
    //     if (filter)
    //         navigate({
    //             pathname: '/movies',
    //             search: `?${createSearchParams(params)}`,
    //         });
    // }, [filter])

    // const sortedMovies = sortMovies(discoveryItems, query);
    // console.log(discoveryMovies);

    return (
        <>
            {isLoading && <MovieSpinner />}
            <div className="movie-grid" ref={scrollToRef} >
                <div className="movie-grid__sort">
                    <p> {`Found 500 ${type}s`} </p>
                    <div className="sort-by">
                        <span>Sort by:</span>
                        <FormControl fullWidth sx={textFieldStyle}>
                            <Select variant="filled"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                label="Genre">
                                <MenuItem value="All" >All</MenuItem>
                                <MenuItem value="vote_average.asc" >Rating Ascending</MenuItem>
                                <MenuItem value="vote_average.desc" >Rating Descending</MenuItem>
                                <MenuItem value="release_date.asc" >Release Date Ascending</MenuItem>
                                <MenuItem value="release_date.desc" >Release Date Descending</MenuItem>
                                <MenuItem value="popularity.asc" >Popularity Ascending</MenuItem>
                                <MenuItem value="popularity.desc" >Popularity Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="movie-grid__wrapper">
                    {!isLoading && discoveryMovies?.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
                <Pagination onChange={handlePageChange} count={20} color="primary" />
            </div>
        </>
    )
}

export default MovieGrid; 