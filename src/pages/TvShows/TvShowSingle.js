import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import '../../styles/MovieSingle/MovieSingle.scss';
import TvShowSingleInfo from "../../components/TvShowSingle/TvShowSingleInfo";
import TvShowSingleMoreInfo from "../../components/TvShowSingle/TvShowSingleMoreInfo";
import SingleReview from '../../components/SingleReview/SingleReview';
import { useGetSingleTvShowQuery } from "../../store/features/movieApiSlice";
import Spinner from "../../components/UI/Spinners/Spinner";

const TvShowSingle = () => {
 
    const { tvShowId } = useParams();

    const { data: single, isError, error, isFetching, isSuccess } = useGetSingleTvShowQuery(tvShowId);

    // if(isFetching) {
    //     return <Spinner />
    // }

    // return (
    //     <div className="movie-single">
    //         {isSuccess && <TvShowSingleInfo single={single} />}
    //         <Routes>
    //             <Route index={true} element={isSuccess && <TvShowSingleMoreInfo single={single} />} />
    //             <Route path='comments/*' element={<SingleReview />} />
    //         </Routes>
    //     </div>
    // )

    return (
        <div className="movie-single">
             <TvShowSingleInfo single={single} />
            <Routes>
                <Route index={true} element={ <TvShowSingleMoreInfo single={single} />} />
                <Route path='comments/*' element={<SingleReview />} />
            </Routes>
        </div>
    )
}

export default TvShowSingle;