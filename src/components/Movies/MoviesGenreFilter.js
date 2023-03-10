import React, { useState } from "react";
import Button from "../UI/Button";
import '../../styles/Movies/MoviesGenreFilter.scss';
import { moviesGenre } from "../../utils/genreData";

const MoviesGenreFilter = () => {

    const [selectedGenre, setSelectedGenre] = useState("");

    return (
        <div className="movies-row__filter">
            {moviesGenre.map(genre => <Button key={genre.id}
                className={selectedGenre === genre.name ? "active-genre" : "inactive"}
                onClick={() => setSelectedGenre(genre.name)}>{genre.name}</Button>)}
        </div>
    )
}

export default MoviesGenreFilter;