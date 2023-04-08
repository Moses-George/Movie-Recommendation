import TvShowCard from "./TvShowCard";
import '../../styles/Movies/MoviesRow.scss';
import CardSkeleton from "../UI/Spinners/CardSkeleton";

const arr = new Array(20);

const TvShowRow = ({ header, tvShowData, loading}) => {


    return (
        <>
            <section className="movies-row">
                <h1>{header}</h1>
                <div className="movies-catalog__row horizontal-scroll">
                    {!loading && tvShowData?.map(tvShow => <TvShowCard key={tvShow.id} tvShow={tvShow} />)}
                    {loading && arr.map(tvShow => <CardSkeleton key={tvShow.id}  />)}
                </div>
            </section>
        </>
    )
}

export default TvShowRow;