import React, { useState, useEffect } from "react";
import { Favorite, Star } from "@mui/icons-material";
import Button from "../UI/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { collection, doc, getDocs } from "firebase/firestore";

const MovieCard = ({ movie, onAddFavourite }) => {

    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [color, setColor] = useState(false);

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);


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
                            setColor("gray");
                       }
        }

        if(currentUser?.docId) {
            getMovie();
        }
    }, [movie.title, currentUser?.docId, favouriteMovies]);

    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <Link to={`/movies/${movie.id}`}> <Button>Read More</Button></Link>
            <h3>{movie.title}</h3>
            <div className="movie-info">
                <p>{new Date(movie.release_date).getFullYear()}</p>
                <div className="movie-info__right">
                    {user && <span> <Favorite onClick={() => onAddFavourite(movie, "movie")}
                        sx={{ fontSize: "23px", color: color }}
                    /> </span>}
                    <span> <Star sx={{ fontSize: "22px", color: "gold" }} /> {movie.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;