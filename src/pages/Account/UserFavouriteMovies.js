import MovieGrid from "../../components/Movies/MovieGrid";
import MoviesRow from "../../components/Movies/MoviesRow";
import FavouriteCard from "../../components/Movies/FavouriteCard";
import "../../styles/pages/UserFavouriteMovies.scss";
import { collection, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { useState, useEffect, useRef } from "react";

const UserFavouriteMovies = () => {

    const [userFavourites, setUserFavourites] = useState([]);
    const scrollToFavourites = useRef(null);

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
    }, [currentUser?.docId]);
    console.log(userFavourites)

    useEffect(() => {
        scrollToFavourites.current.scrollIntoView({ behavior: "smooth" });
    }, [])

    const removeFavourite = async (favouriteId) => {
        try {
            const docId = currentUser?.docId;
            const docRef = doc(db, "users", docId, "favourites", favouriteId);
            await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        }
    }

    const discoveryItems = localStorage.getItem("discoveries") !== null ? JSON.parse(localStorage.getItem("discoveries")) : []
    return (
        // <div className="userFavourite">
        //     <h1>Your favourites</h1>
        //     <div className="userFavourite-movies">
        //         {userFavourites?.map(favourite => <MovieCard key={favourite.id} movie={favourite.data} isFavouritePage={true} id={favourite.id} removeFavourite={removeFavourite}  />)}
        //     </div>
        // </div>
        <div className="favourite-grid" ref={scrollToFavourites} >
            <div className="favourite-grid__length">
                <p> {`Found ${userFavourites.length} Favourites`} </p>
            </div>
            <div className="favourite-grid__wrapper">
                {userFavourites.map(favourite => <FavouriteCard key={favourite.id} favourite={favourite.data} id={favourite.id} removeFavourite={removeFavourite} />)}
            </div>
        </div>
    )
}

export default UserFavouriteMovies;