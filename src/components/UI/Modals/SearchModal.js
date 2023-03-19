import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import '../Modals/SearchModal.scss';
import SearchBar from '../SearchBar';
import SearchItem from "./SearchItem";
import { useDebounceState } from "use-debounce-state"; 
import Backdrop from "./Backdrop";
// import { useDebounceState } from '@piso/use-debounce-state';

const SearchModalOverlay = ({onClick, value, setValue, result}) => {
    console.log("me");

    // const  [searchTerm, setSearchTerm] = useState("");
    // const [result, setResult] = useState([]);

    // const [value, setValue, debounceValue] = useDebounceState('', 500);

    // useEffect(
    //     () => {
    //         const API_KEY = "325e920b899e3b823d52fa3739a5c71d";
    //       fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
    //         .then(response => response.json())
    //         .then(results => {
    //         //   const filtered = users.filter(user =>
    //         //     user.name.startsWith(debounceValue)
    //         //   );
    //           setResult(results);
    //         })
    //         .catch(e => console.log(e));
    //     },
    //     [debounceValue]
    //   );
//   const [users, setUsers] = useState([]);
    // const [isSearching, setIsSearching] = useState(false);

    // const useDebounce = (value, delay) => {
    //     const [debounceValue, setDebounceValue] = useState(value);

    //     useEffect(()=> {
    //         const handler = setTimeout(()=> {
    //             setDebounceValue(value);
    //         }, delay);

    //         return () => {
    //             clearTimeout(handler);
    //         }
    //     }, [value, delay]);

    //     return debounceValue;
    // }

    // const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // const handleChange = (e) => {
    //     setSearchTerm(e.target.value);
    // }

    // useEffect(()=> {
    //     if (debouncedSearchTerm) {
    //         searchCharacters(debouncedSearchTerm);
    //         // setIsSearching(true);
    //         // searchCharacters(debouncedSearchTerm).then((results)=> {
    //         //     setIsSearching(false);
    //         //     setResult(results);
    //         // });
    //     } 
    //     // else {
    //     //     setResult([]);
    //     //     setIsSearching(false);
    //     // }
    // }, [debouncedSearchTerm]);

    // const searchCharacters = async (search) => {
    //     const API_KEY = "325e920b899e3b823d52fa3739a5c71d";
    //     try {
    //         const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
    //         const result = await response.json();
    //         setResult(result);
    //         console.log(result);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    //     // return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`).then((response)=> response.json()).then((result)=> {
    //     //     console.log(result);
    //     //     return result;
    //     // }).catch((error)=> {
    //     //     console.error(error);
    //     //     return [];
    //     // })
    // }

    // const x = searchCharacters(debouncedSearchTerm).then


    return (
        <div className="search-modal">
            <SearchBar onClick={onClick} searchTerm={value} setSearchTerm={setValue} />
            <hr />
            <div className="search-result">
            { result.results?.map(item=> <SearchItem key={item.id} movie={item} />)}
                {/* {} */}
            </div>
        </div>
    )
}

const SearchModal = ({ onClick }) => {

    const [result, setResult] = useState([]);

    const [value, setValue, debounceValue] = useDebounceState('', 500);

    useEffect(
        () => {
            const API_KEY = "325e920b899e3b823d52fa3739a5c71d";
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
            .then(response => response.json())
            .then(results => {
            //   const filtered = users.filter(user =>
            //     user.name.startsWith(debounceValue)
            //   );
              setResult(results);
            })
            .catch(e => console.log(e));
        },
        [debounceValue]
      );

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={onClick} />,
                document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<SearchModalOverlay onClick={onClick} value={value} setValue={setValue} result={result} />,
                document.getElementById("modal-root"))}
        </>
    )
}

export default SearchModal;