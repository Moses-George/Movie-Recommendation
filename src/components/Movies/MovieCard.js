import React, { useState } from "react";
import { Favorite, Star } from "@mui/icons-material";
import Button from "../UI/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { collection, doc } from "firebase/firestore";

const MovieCard = ({ movie }) => {

    const [favoriteMovie, setFavoriteMovie] = useState("");

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const heartedMovie = {
        id: movie.id,
        title: movie.title,
        movieImageUrl: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average
    }

    const handleLikedMovie = async () => {
        const docId = currentUser?.docId;
        const docRef = doc(db, 'users', docId);
        const colRef = collection(docRef, "favourites");
        await addDoc(colRef, heartedMovie)
        console.log(heartedMovie);
        // setTimeout(()=> setFavoriteMovie(""), 2000)
    }


    // const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <Link to={`/movies/${movie.id}`}> <Button>Read More</Button></Link>
            <h3>{movie.title}</h3>
            <div className="movie-info">
                <p>{movie.release_date.split("-")[0]}</p>
                <div className="movie-info__right">
                    {user && <span> <Favorite onClick={handleLikedMovie}
                        sx={{ fontSize: "23px", color: `${favoriteMovie ? "red" : "gray"}` }}
                        className={`${movie.id === favoriteMovie && "bump"}`} /> </span>}
                    <span> <Star sx={{ fontSize: "22px", color: "gold" }} /> {movie.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;