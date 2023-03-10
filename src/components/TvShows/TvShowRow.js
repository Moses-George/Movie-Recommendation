import React from "react";
import TvShowCard from "./TvShowCard";
import '../../styles/Movies/MoviesRow.scss';

const TvShowRow = ({ header, tvShowData }) => {

    return (
        <section className="movies-catalog">
            <h1>{header}</h1>
            <div className="movies-catalog__row">
                {tvShowData.map(tvShow => <TvShowCard key={tvShow.id} tvShow={tvShow} />)}
            </div>
        </section>
    )
}

export default TvShowRow;