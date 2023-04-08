import React, { useState, useRef } from "react";
import { FormControl, MenuItem, Select, Pagination } from "@mui/material";
import '../../styles/Movies/MovieGrid.scss';
import MovieCard from './MovieCard';
import { useGetSortedMoviesQuery } from "../../store/service/movieApiSlice";
import MovieSpinner from "../UI/Spinners/MovieSpinner";
import MovieCardSkeleton from "../UI/Spinners/CardSkeleton";


const textFieldStyle = {
    width: "100%", "&:hover": { backgroundColor: "#464646" },
    "& .MuiFilledInput-root": { backgroundColor: "#464646", color: "#fff" }
}


const MovieGrid = () => {

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("popularity.asc");
    const scrollToRef = useRef(null);

    // Fetch discovery movies from api using RTK query
    const { data: movies, isLoading, refetch } = useGetSortedMoviesQuery(page, filter);

    // Handle page change from api
    const handlePageChange = (e, value) => {
        setPage(value);
        refetch();
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }


    return (
        <>
            {isLoading && <MovieSpinner />}
            <div className="movie-grid" ref={scrollToRef} >
                <div className="movie-grid__sort">
                    <p> {`Found ${movies?.results.length}s`} </p>
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
                    {!isLoading && movies?.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    {isLoading && movies?.results.map(movie => <MovieCardSkeleton key={movie.id} />)}
                </div>
                <Pagination onChange={handlePageChange} count={20} color="primary" />
            </div>
        </>
    )
}

export default MovieGrid; 