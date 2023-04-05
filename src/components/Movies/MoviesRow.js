import React from "react";
import MovieCard from "./MovieCard";
import '../../styles/Movies/MoviesRow.scss';
import MovieCardSkeleton from "../UI/Spinners/MovieCardSkeleton";

const MoviesRow = ({ header, movieData }) => {


    return (
        <section className="movies-catalog">
            <h1>{header}</h1>
            <div className="movies-catalog__row">
                {movieData.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                {/* {movieData.map(movie => <MovieCardSkeleton key={movie.id} />)} */}
                {/* <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton /> */}
            </div>
        </section>
    )
}

export default MoviesRow;