import React from "react";
import MovieCard from "./MovieCard";
import '../../styles/Movies/MoviesRow.scss';
import CardSkeleton from "../UI/Spinners/CardSkeleton";

const arr = new Array(20);


const MoviesRow = ({ header, movieData, loading }) => {


    return (
        <section className="movies-row">
            <h1>{header}</h1>
            <div className="horizontal-scroll">
                {!loading && movieData?.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                {loading && arr.map(movie => <CardSkeleton key={movie} />)}
            </div>
        </section>
    )
}

export default MoviesRow;