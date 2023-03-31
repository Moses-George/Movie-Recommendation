import React from "react";
import MovieCard from "./MovieCard";
import '../../styles/Movies/MoviesRow.scss';
import MovieCardSkeleton from "../UI/Spinners/MovieCardSkeleton";
import FavouriteAdded from "../UI/Modals/FavouriteAdded";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { collection, doc, addDoc, getDocs } from "firebase/firestore";

const MoviesRow = ({ header, movieData }) => {

    const [message, setMessage] = useState("");

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const addToFavourite = async (movie, type) => {

        try {
            const docId = currentUser?.docId;
            const docRef = doc(db, 'users', docId);
            const colRef = collection(docRef, "favourites");
            const docs = await getDocs(colRef);
            const favourite = docs?.docs.find(doc => doc.data().title === movie.title);

            if (favourite) {
                setMessage("Already exist in Favourite List!");
            } else {
                await addDoc(colRef, {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    type: type
                });
                setMessage("Added to Favourite List!");
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=> {
        const timer = setTimeout(()=> setMessage(""), 4000);
       return ()=> clearTimeout(timer);
    }, [message])

    // const 

    return (
        <>
            {message && <FavouriteAdded message={message} />}
            <section className="movies-catalog">
                <h1>{header}</h1>
                <div className="movies-catalog__row">
                    {movieData.map(movie => <MovieCard key={movie.id} movie={movie} onAddFavourite={addToFavourite} />)}
                    {/* {movieData.map(movie => <MovieCardSkeleton key={movie.id} />)} */}
                    {/* <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton /> */}
                </div>
            </section>
        </>
    )
}

export default MoviesRow;