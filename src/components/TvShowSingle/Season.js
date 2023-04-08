
const Season = ({ season }) => {

    return (
        <div className="season">
            <img src={`https://image.tmdb.org/t/p/w500${season?.poster_path}`} alt="" />
            <div className="season-details">
                <p> {season?.name} </p>
                <p>{`Season ${season?.season_number}`}</p>
                <div className="season-episode">
                    <p> Episodes: <strong>{season?.episode_count}</strong> </p>
                    <p>{new Date(season?.air_date).getFullYear()}</p>
                </div>
                <details>
                    <summary>Overview</summary>
                    <p>{season?.overview}</p>
                </details>
            </div>
        </div>
    )
}

export default Season;
