import React from "react";
import MovieCard from "./MovieCard";
import '../../styles/Movies/MoviesRow.scss';
import MovieCardSkeleton from "../UI/Spinners/MovieCardSkeleton";
import FavouriteAdded from "../UI/Modals/FavouriteAdded";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { collection, doc, addDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { showPopUpMessage } from "../../store/features/addFavouriteSlice";

const MoviesRow = ({ header, movieData }) => {


    return (
        <section className="movies-catalog">
            <h1>{header}</h1>
            <div className="movies-catalog__row">
                {movieData.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                {/* {movieData.map(movie => <MovieCardSkeleton key={movie.id} />)} */}
                {/* <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton /> */}
            </div>
        </section>
    )
}

export default MoviesRow;