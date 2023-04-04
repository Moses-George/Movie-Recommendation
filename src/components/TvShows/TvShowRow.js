import {useState, useEffect} from "react";
import TvShowCard from "./TvShowCard";
import '../../styles/Movies/MoviesRow.scss';
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import FavouriteAdded from "../UI/Modals/FavouriteAdded";

const TvShowRow = ({ header, tvShowData }) => {

    const [message, setMessage] = useState("");

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    // const addToFavourite = async (tvShow, type) => {

    //     try {
    //         const docId = currentUser?.docId;
    //         const docRef = doc(db, 'users', docId);
    //         const colRef = collection(docRef, "favourites");
    //         const docs = await getDocs(colRef);
    //         const favourite = docs?.docs.find(doc => doc.data().title === tvShow.name);
    //         console.log(favourite);

    //         if (favourite) {
    //             setMessage("Already exist in Favourite List!");
    //         } else {
    //             await addDoc(colRef, {
    //                 id: tvShow.id,
    //                 title: tvShow.name,
    //                 poster_path: tvShow.poster_path,
    //                 release_date: tvShow.first_air_date,
    //                 vote_average: tvShow.vote_average,
    //                 type: type
    //             });
    //             setMessage("Added to Favourite List!");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     const timer = setTimeout(() => setMessage(""), 4000);
    //     return () => clearTimeout(timer);
    // }, [message]);

    return (
        <>
            {/* {message && <FavouriteAdded message={message} />} */}
            <section className="movies-catalog">
                <h1>{header}</h1>
                <div className="movies-catalog__row">
                    {tvShowData.map(tvShow => <TvShowCard key={tvShow.id} tvShow={tvShow} />)}
                </div>
            </section>
        </>
    )
}

export default TvShowRow;