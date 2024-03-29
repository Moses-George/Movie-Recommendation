import React, { useState, useEffect } from "react";
import { Favorite, Star } from "@mui/icons-material";
import Button from "../UI/Button/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { collection, doc, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToFavourite } from "../../store/actions/addFavourite";

const MovieCard = ({ movie }) => {

    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [color, setColor] = useState(false);
    const [isFavourite, setIsFavourite] = useState("");
    const dispatch = useDispatch();

    // get user authentication state with the useAuthState hook
    const [user] = useAuthState(auth);

    // Fetch current user from firebase db with user found from the authentication state
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);


    // Fetch user favourites movies and set the heart reaction color to red
    useEffect(() => {

        const getMovie = async () => {
            const docId = currentUser?.docId;
            const docRef = doc(db, 'users', docId);
            const colRef = collection(docRef, "favourites");
            const docs = await getDocs(colRef);
            setFavouriteMovies(docs?.docs);
            const favourite = favouriteMovies.find(doc => doc.data().title === movie.title);

            if (favourite) {
                setColor("red");
            } else {
                setColor("white");
            }
        }

        if (currentUser?.docId) {
            getMovie();
        }
    }, [movie.title, currentUser?.docId, favouriteMovies]);

    const movieInfo = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        type: "movie"
    }


    const handleClick = () => {
        // sets movie title to add animation to the clicked movie
        setIsFavourite(movie.title);
        // adds movie to favourite 
        dispatch(addToFavourite(movieInfo, currentUser?.docId));

    }


    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <Link to={`/movies/${movie.id}`}> <Button>Read More</Button></Link>
            <h3>{movie.title.length > 20 ? `${movie.title.slice(0, 17)}...` : movie.title}</h3>
            <div className="movie-info">
                <p>{new Date(movie.release_date).getFullYear()}</p>
                <div className="movie-info__right">
                    {user && <span>
                        <Favorite
                            sx={{ fontSize: "23px", color: color }}
                            className={`${isFavourite === movie.title && "bump"}`}
                            onClick={handleClick} />
                    </span>}
                    <span> <Star sx={{ fontSize: "22px", color: "gold" }} /> {movie.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;