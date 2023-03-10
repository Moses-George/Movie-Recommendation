import React from "react";
import { Star } from "@mui/icons-material";
import '../../styles/MovieSingle/MovieSingleInfo.scss';
import pic from "../../Assets/images/robot.jpg";

const TvShowSingleInfo = ({single}) => {


        // return (
        //     <div className="movie-single__info">
        //         <h1> {single?.title} </h1>
        //         <img src={`https://image.tmdb.org/t/p/w1280${single?.backdrop_path}`} alt="" />
        //         <div className="rating">
        //             <span> <Star sx={{ color: "gold" }} /> {single?.vote_average} </span>
        //             <span>Runtime: {single?.runtime}</span>
        //         </div>
        //         <p> {single?.overview} </p>
        //     </div>
        // )

        return (
            <div className="movie-single__info">
                <h1> Wednesday </h1>
                <img src={pic} alt="" />
                <div className="rating">
                    <span> <Star sx={{ color: "gold" }} /> 7.5 </span>
                    <span>Runtime: 20 minutes</span>
                </div>
                <p> dggggggggggggg dggdddddddddd dgggggggggg gsgsg ggsd ghs hwwwyw ywyyyyyy gwgtgww gwwyywtgtwv </p>
            </div>
        )

}

export default TvShowSingleInfo; 