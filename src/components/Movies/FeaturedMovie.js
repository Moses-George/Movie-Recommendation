import React, { useEffect, useMemo, useState, useRef } from "react";
import '../../styles/Movies/FeaturedMovie.scss';
import { Star, Circle, AddCircleOutline } from "@mui/icons-material";
import Button from '../UI/Button';
import { useGetTrendingMoviesQuery } from "../../store/features/movieApiSlice";
import { formatDate } from "../../utils/dateFormatter";
import { moviesGenre } from "../../utils/genreData";
import { Link } from "react-router-dom";

const FeaturedMovie = () => {

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const { data: trendingMovies, isLoading: isTrendingMoviesLoading, isFetching: isTrendingMoviesFetching, isSuccess } = useGetTrendingMoviesQuery(1);
    // if (!isTrendingMoviesFetching) {
    //     localStorage.setItem("trending", JSON.stringify(trendingMovies.results.map(item => item)));
    // }
    const TrendingItems = useMemo(() => {
        return localStorage.getItem("trending") !== null ? JSON.parse(localStorage.getItem("trending")) : []
    }, [])

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }


    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => setIndex(prevIndex => prevIndex === TrendingItems.length - 1 ? 0 : prevIndex + 1), 10000)
        // console.log(index)

        return () => {
            resetTimeout();
        };
    }, [index, TrendingItems])

    return (
        <section className="slideshow">
            <div className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {!isTrendingMoviesLoading && TrendingItems.map((movie) =>
                    <div key={movie.id} className="featured-movie__container"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`, }}
                    >
                        <div className="featured-movie__genre">
                            {moviesGenre.filter(genre => movie.genre_ids.includes(genre.id))
                                .map(filteredGenre => <div key={filteredGenre.id}>{filteredGenre.name}</div>)} 
                        </div>
                        <h1>{movie.title}</h1>
                        <div className="featured-movie__info">
                            <span> <Star sx={{ fontSize: "20px", color: "gold" }} /> {movie.vote_average}</span>
                            <span> <Circle sx={{ fontSize: "10px" }} /> </span>
                            <span>Runtime: 2h21'</span>
                            <span> <Circle sx={{ fontSize: "10px" }} /> </span>
                            <span>Rated: PG-13</span>
                            <span> <Circle sx={{ fontSize: "10px" }} /> </span>
                            <span>Release: {formatDate(movie.release_date)}</span>
                        </div>
                        <div className="movie-btn">
                            <Button><Link to={`/movies/${movie.id}`}>More Details</Link></Button>
                            <Button> <AddCircleOutline /> Add Favourite </Button>
                        </div>
                    </div>)}
            </div>

            <div className="slideshowDots">
                {TrendingItems.map((__, indx) => (
                    <div key={indx} onClick={() => setIndex(indx)} className={`slideshowDot ${index === indx ? "activeDot" : ""}`}></div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedMovie;