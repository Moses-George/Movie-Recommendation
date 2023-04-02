import { RemoveCircleOutline, Star } from "@mui/icons-material";
import Button from "../UI/Button";
import '../../styles/Movies/MovieCard.scss';
import { Link } from "react-router-dom";

const FavouriteCard = ({ favourite, removeFavourite }) => {


    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}`} alt="" />
            <Link to={`/${favourite.type === "movie" ? "movies" : "tv"}/${favourite.id}`}> <Button>Read More</Button></Link>
            <h3>{favourite.title.length > 20 ? `${favourite.title.slice(0, 17)}...` : favourite.title}</h3>
            <div className="movie-info">
                <p>{new Date(favourite.release_date).getFullYear()}</p>
                <div className="movie-info__right">
                    <span>
                        <RemoveCircleOutline onClick={() => removeFavourite(favourite.id)} sx={{ color: "#fff", fontSize: "23px" }} />
                    </span>
                    <span> <Star sx={{ fontSize: "22px", color: "gold" }} /> {favourite.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default FavouriteCard;