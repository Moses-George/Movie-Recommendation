import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import '../../styles/MovieSingle/MovieSingleMoreInfo.scss';
import { formatDate } from "../../utils/dateFormatter";
import pic from "../../Assets/images/robot.jpg"


const TvShowSingleMoreInfo = ({single}) => {

    // return (
    //     <div className="movie-single__moreInfo">
    //         <p> <strong>Rated: </strong> {single?.adult ? "PG-18" : "PG-13"} </p>
    //         <p> <strong>Release: </strong> {formatDate(single?.release_date)} </p>
    //         <p> <strong>Language: </strong> {single?.spoken_languages.map(language => language.name + " ")} </p>
    //         <p> <strong>Budget: </strong> {single?.budget} </p>
    //         <p> <strong>Revenue: </strong> {single?.revenue} </p>
    //         <div className="genre">
    //         <p>Genres:</p>
    //             {single?.genres.map(genre => <div key={genre.id}>{genre.name}</div> )}
    //         </div>
    //         <div className="production-companies">
    //             <h3>Production Companies</h3>
    //             {single?.production_companies.map(company => <div key={company.id} className="company">
    //                 {company.logo_path && <img src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} alt="" />}
    //                 <div className="company-detail">
    //                     <p>{company.name}</p>
    //                     <p>{company.origin_country}</p>
    //                 </div>
    //             </div>)}
    //         </div>
    //         <Link to='comments'><Button>View Comments</Button></Link>
    //     </div>
    // )

    return (
        <div className="movie-single__moreInfo">
            <p> <strong>Rated: </strong>  PG-18 </p>
            <p> <strong>Release: </strong> 15, May 2015 </p>
            <p> <strong>Language: </strong> English, French </p>
            <p> <strong>Budget: </strong> 1,200,000 </p>
            <p> <strong>Revenue: </strong> 20,000,000 </p>
            <p>Genres:</p>
            <div className="genre">
            <div>Adventure</div>
            <div>Horror</div>
            <div>Comedy</div>
            <div>Romance</div>
            </div>
            <div className="production-companies">
                <h3>Production Companies</h3>
                {[1,2,3].map(company => <div key={company} className="company">
                    <img src={pic} alt="" />
                    <div className="company-detail">
                        <p> company.name</p>
                        <p> ompany.origin_country</p>
                    </div>
                </div>)}
            </div>
            <Link to='comments'><Button>View Comments</Button></Link>
        </div>
    )
}

export default TvShowSingleMoreInfo;