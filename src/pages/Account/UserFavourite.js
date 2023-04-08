import FavouriteCard from "../../components/Movies/FavouriteCard";
import "../../styles/pages/UserFavouriteMovies.scss";
import { collection, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { useState, useEffect, useRef } from "react";
import { EmojiEmotions } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserFavourite = () => {

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

    return (
        <div className="favourite-grid" ref={scrollToFavourites} >
            {userFavourites.length > 0 && <div className="favourite-grid__length">
                <p> {`Found ${userFavourites.length} Favourites`} </p>
            </div>}
            <div className="favourite-grid__wrapper">
                {userFavourites.map(favourite => <FavouriteCard key={favourite.id} favourite={favourite.data} id={favourite.id} removeFavourite={removeFavourite} />)}
            </div>
            {userFavourites.length === 0 && <div className="no-favourite">
                <h2>No Fvaourite Found!</h2>
                <EmojiEmotions sx={{ fontSize: "9rem", color:"#e4e7eb" }} />
                <Link to="/movies">Wanna explore ? let's go! </Link>
            </div>}
        </div>
    )
}

export default UserFavourite;