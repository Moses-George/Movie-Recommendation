import React from "react";
import '../../styles/pages/Account.scss';
import Profile from "../../components/Account/Profile";
import ProfileDetails from "../../components/Account/ProfileDetails";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Routes, Route } from "react-router-dom";
import UserFavouriteMovies from "./UserFavouriteMovies";
import Spinner from "../../components/UI/Spinners/Spinner";



const Account = () => {

    const [user, loading] = useAuthState(auth);

    const { data: currentUser, isFetching, isLoading, isError, error } = useFetchCurrentUserQuery(user?.uid);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="account">
            <h1>{`${currentUser?.data.username}'s PROFILE`}</h1>
            <Profile />
            <Routes>
                <Route index={true} element={ <ProfileDetails  />} />
                <Route path='favourites' element={<UserFavouriteMovies />} />
            </Routes>
        </div>
    )
}

export default Account;