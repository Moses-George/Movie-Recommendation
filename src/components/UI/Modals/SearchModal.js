import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import '../Modals/SearchModal.scss';
import SearchBar from '../SearchBar';
import SearchItem from "./SearchItem";
import Backdrop from "./Backdrop";
import Button from "../Button";
import { Cancel } from "@mui/icons-material";
import SearchSpinner from "../Spinners/SearchSpinner";

const SearchModalOverlay = ({ onClick }) => {

    const [result, setResult] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchRef = useRef();

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        }
    }

    const handleChange = async (value) => {
        setIsLoading(true);
        try {
            const API_KEY = "325e920b899e3b823d52fa3739a5c71d";
            const filter = searchRef.current.textContent.trim();
            const res = await fetch(`https://api.themoviedb.org/3/search/${filter}?api_key=${API_KEY}&query=${value}`);
            if (!res.ok) {
                throw new Error("No Result Found");
            }
            const result = await res.json();
            setResult(result.results);
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
        setIsLoading(false);
    }

    const optimizedFn = useCallback(debounce(handleChange), []);

    useEffect(() => {
        if (searchTerm && filteredTerm) {
            optimizedFn(searchTerm);
        }
    }, [searchTerm, filteredTerm, optimizedFn]);


    return (
        <div className="search-modal">
            {filteredTerm && <SearchBar onClick={onClick} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />}
            <div className="adv-search">
                {filteredTerm && <div className="filtered-term">
                    <span ref={searchRef} > {filteredTerm} </span>
                    <Cancel />
                </div>}
                <p>Search From:</p>
                <div className="search-btn">
                    <Button onClick={() => setFilteredTerm("movie")} className={filteredTerm === "movie" ? "active-filter" : "inactive-filter"} >Movie</Button>
                    <Button onClick={() => setFilteredTerm("tv")} className={filteredTerm === "tv" ? "active-filter" : "inactive-filter"} >TvShow</Button>
                </div>
            </div>
            <hr />
            <div className="search-result">
                {!isLoading && !error && result.length > 0 && result.map(movie => <SearchItem
                    key={movie.id}
                    movieId={movie.id}
                    filter={filteredTerm === "movie" ? "movies" : filteredTerm}
                    overview={movie.overview}
                    title={movie.title || movie.name}
                    imageUrl={movie.poster_path} />)}
                {isLoading && <SearchSpinner />}
                {error && <h3 className="error">{error}</h3>}
            </div>
        </div>
    )
}

const SearchModal = ({ onClick }) => {

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={onClick} />,
                document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<SearchModalOverlay onClick={onClick} />,
                document.getElementById("modal-root"))}
        </>
    )
}

export default SearchModal;