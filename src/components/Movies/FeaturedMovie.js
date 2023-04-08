import React, { useEffect, useState, useRef } from "react";
import '../../styles/Movies/FeaturedMovie.scss';
import { Star, Circle, AddCircleOutline } from "@mui/icons-material";
import Button from '../UI/Button/Button';
import { useGetTrendingMoviesQuery } from "../../store/service/movieApiSlice";
import { formatDate } from "../../utils/dateFormatter";
import { moviesGenre } from "../../utils/genreData";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { auth } from "../../firebase";
import { useTheme, useMediaQuery } from "@mui/material";
import { addToFavourite } from "../../store/actions/addFavourite";
import { useDispatch } from "react-redux";

const FeaturedMovie = () => {

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();

    // get user authentication state with the useAuthState hook
    const [user] = useAuthState(auth);

    // Fetch current user from firebase db with user found from the authentication state
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


    const { data: trendingMovies, isLoading: isTrendingMoviesLoading } = useGetTrendingMoviesQuery(1);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }


    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => setIndex(prevIndex => prevIndex === trendingMovies?.results.length - 1 ? 0 : prevIndex + 1), 10000)

        return () => {
            resetTimeout();
        };
    }, [index, trendingMovies])

    return (
        <section className="slideshow">
            <div className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {!isTrendingMoviesLoading && trendingMovies?.results.map((movie) => {

                    const movieInfo = {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.backdrop_path,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        type: "movie"
                    }

                    return (
                        <div key={movie.id} className="featured-movie__container"
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w${isDesktop ? 1280 : 780}${movie.backdrop_path})`, }}
                        >
                            <div className="featured-movie__genre">
                                {moviesGenre.filter(genre => movie.genre_ids.includes(genre.id))
                                    .map(filteredGenre => <div key={filteredGenre.id}>{filteredGenre.name}</div>)}
                            </div>
                            <h1>{!isDesktop && movie.title.length > 22 ? `${movie.title.slice(0, 22)}...` : movie.title}</h1>
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
                                {user && <Button onClick={() => dispatch(addToFavourite(movieInfo, currentUser?.docId))} > <AddCircleOutline /> Add Favourite </Button>}
                            </div>
                        </div>)
                })}
            </div>

            <div className="slideshowDots">
                {trendingMovies?.results.map((__, indx) => (
                    <div key={indx} onClick={() => setIndex(indx)} className={`slideshowDot ${index === indx ? "activeDot" : ""}`}></div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedMovie;