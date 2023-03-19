import React from "react";
import { Divider } from "@mui/material";
import { useParams } from 'react-router-dom'
import '../../styles/Account/ProfileDetails.scss';
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const ProfileDetails = () => {

    const { username } = useParams();

    const [user] = useAuthState(auth);  

        const {data: currentUser, isFetching, isLoading, isError, error} =  useFetchCurrentUserQuery(user?.uid);


    return (
        <section className="profile-details">
            <h1>{`${username}'s PROFILE`} hhh</h1>
            <div className="profile-content">
                <div className="">
                    <p>Username</p>
                    <Divider sx={{borderColor: "rgb(49, 49, 49)"}} />
                    <h4> {currentUser?.data.username} </h4>
                </div>
                <div className="">
                    <p>Email</p>
                    <Divider sx={{borderColor: "rgb(49, 49, 49)"}} />
                    <h4> {currentUser?.data.email} </h4>
                </div>
                <div className="">
                    <p>State</p>
                    <Divider sx={{borderColor: "rgb(49, 49, 49)"}} />
                    <h4> Edo State </h4>
                </div>
                <div className="">
                    <p> Country </p>
                    <Divider sx={{borderColor: "rgb(49, 49, 49)"}} />
                    <h4> Nigeria </h4>
                </div>
            </div>
        </section>
    )
}

export default ProfileDetails;