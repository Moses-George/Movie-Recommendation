import React, { useState } from "react";
import { Favorite, Star } from "@mui/icons-material";
import Button from "../UI/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { getDocs, collection, doc, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";

const TvShowCard = ({ tvShow }) => {

    const [favoriteMovie, setFavoriteMovie] = useState("");

    // const handleLikedMovie = () => {
    //     setFavoriteMovie(tvShow.id);
    // }


    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const LikedMovie = {
        id: tvShow.id,
        title: tvShow.title,
        poster_path: tvShow.poster_path,
        release_date: tvShow.release_date,
        vote_average: tvShow.vote_average,
        type: "tv"
    }

    const handleLikedMovie = async () => {
        try {
            const docId = currentUser?.docId;
            const docRef = doc(db, 'users', docId);
            const colRef = collection(docRef, "favourites");
            const docs = getDocs(colRef);
            const favourites = docs?.docs.find(doc=> doc.data.title === tvShow.title); 

            if (favourites) {
                console.log("Already exist in favourite list!");
            } else {
                await addDoc(colRef, LikedMovie);
                console.log("Added to list!");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt="" />
            <Link to={`/tv/${tvShow.id}`}> <Button>Read More</Button></Link>
            <h3>{tvShow.name}</h3>
            <div className="movie-info">
                <p>{new Date(tvShow.first_air_date).getFullYear()}</p>
                <div className="movie-info__right">
                    <span> <Favorite onClick={handleLikedMovie}
                        sx={{ fontSize: "23px", color: `${favoriteMovie ? "red" : "gray"}` }}
                        className={`${tvShow.id === favoriteMovie && "bump"}`} /> </span>
                    <span> <Star sx={{ fontSize: "22px" }} /> {tvShow.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default TvShowCard;