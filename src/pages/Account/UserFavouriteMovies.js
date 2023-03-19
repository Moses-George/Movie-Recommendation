import MovieGrid from "../../components/Movies/MovieGrid";
import MoviesRow from "../../components/Movies/MoviesRow";
import MovieCard from "../../components/Movies/MovieCard";
import "../../styles/pages/UserFavouriteMovies.scss";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { useState, useEffect } from "react";

const UserFavouriteMovies = () => {

    const [userFavourites, setUserFavourites] = useState([]);

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    useEffect(() => {
        const docId = currentUser?.docId;
        onSnapshot(collection(db, 'users', docId, 'favourites'),
            orderBy('timestamp', 'asc'), (snapshot) => {
                setUserFavourites(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
    }, []);

    const discoveryItems = localStorage.getItem("discoveries") !== null ? JSON.parse(localStorage.getItem("discoveries")) : []
    return (
        <div className="userFavourite">
            <h1>Your favourites</h1>
            <div className="userFavourite-movies">
                {discoveryItems.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default UserFavouriteMovies;