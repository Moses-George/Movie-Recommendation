import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from 'react-dom';
import '../Modals/SearchModal.scss';
import SearchBar from '../SearchBar';
import SearchItem from "./SearchItem";
import Backdrop from "./Backdrop";
import Button from "../Button";
import { Cancel } from "@mui/icons-material";

const SearchModalOverlay = ({ onClick }) => {

    const [result, setResult] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState("movie");

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

    const handleChange = (value) => {
        const API_KEY = "325e920b899e3b823d52fa3739a5c71d";
        fetch(`https://api.themoviedb.org/3/search/${filteredTerm}?api_key=${API_KEY}&query=${value}`)  
            .then((res) => res.json())
            .then((result => setResult(result.results)));
    }

    const optimizedFn = useCallback(debounce(handleChange), []);


    return (
        <div className="search-modal">
            {currentTerm && <SearchBar onClick={onClick} onChange={(e) => optimizedFn(e.target.value)} />}
            {/* <hr /> */}
            <div className="adv-search">
                {currentTerm && <div className="filtered-term">
                    <span> {currentTerm} </span>
                    <Cancel onClick={() => setFilteredTerm("")} />
                </div>}
                <p>Search From:</p>
                <div className="search-btn">
                    <Button onClick={() => setFilteredTerm("movie")} >Movie</Button>
                    <Button onClick={() => setFilteredTerm("tv")} >TvShow</Button>
                </div>
            </div>
            <hr />
            <div className="search-result">
                {result.length > 0 && result.map(movie => <SearchItem key={movie.id} overview={movie.overview} title={movie.title || movie.name} imageUrl={movie.poster_path} />)}
                {/* {} */}
            </div>
        </div>
    )
}

const SearchModal = ({ onClick }) => {

    // const [result, setResult] = useState([]);

    // const [value, setValue, debounceValue] = useDebounceState('', 500);

    // useEffect(
    //     () => {
    //         const API_KEY = "325e920b899e3b823d52fa3739a5c71d";
    //         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
    //             .then(response => response.json())
    //             .then(results => {
    //                 //   const filtered = users.filter(user =>
    //                 //     user.name.startsWith(debounceValue)
    //                 //   );
    //                 setResult(results);
    //             })
    //             .catch(e => console.log(e));
    //     },
    //     [debounceValue]
    // );

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