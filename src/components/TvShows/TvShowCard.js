import React, { useState, useEffect } from "react";
import { Favorite, Star } from "@mui/icons-material";
import Button from "../UI/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice"; 
import { useDispatch } from "react-redux";
import { addToFavourite } from "../../store/actions/addFavourite";

const TvShowCard = ({ tvShow }) => {

    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [color, setColor] = useState(false);
    const dispatch = useDispatch();

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);


    useEffect(() => {

        const getMovie = async () => {
            const docId = currentUser?.docId;
            const docRef = doc(db, 'users', docId);
            const colRef = collection(docRef, "favourites");
            const docs = await getDocs(colRef);
            setFavouriteMovies(docs?.docs);
            const favourite = favouriteMovies.find(doc => doc.data().title === tvShow.name);

            if (favourite) {
                setColor("red");
            } else {
                setColor("white");
            }
        }

        if (currentUser?.docId) {
            getMovie();
        }
    }, [tvShow.name, currentUser?.docId, favouriteMovies]);

    const tvShowInfo = {
        id: tvShow.id,
        title: tvShow.name,
        poster_path: tvShow.poster_path,
        release_date: tvShow.first_air_date,
        vote_average: tvShow.vote_average,
        type: "tvShow"
    }

    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt="" />
            <Link to={`/tv/${tvShow.id}`}> <Button>Read More</Button></Link>
            <h3>{tvShow.name.length > 20 ? `${tvShow.name.slice(0, 17)}...` : tvShow.name}</h3>
            <div className="movie-info">
                <p>{new Date(tvShow.first_air_date).getFullYear()}</p>
                <div className="movie-info__right">
                    <span>
                        <Favorite onClick={() => dispatch(addToFavourite(tvShowInfo, currentUser?.docId))}
                            sx={{ fontSize: "23px", color: color }}
                        // className={`${tvShow.id === favoriteMovie && "bump"}`}
                        />
                    </span>
                    <span> <Star sx={{ fontSize: "22px" }} /> {tvShow.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default TvShowCard;