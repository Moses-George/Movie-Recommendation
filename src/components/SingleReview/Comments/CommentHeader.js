import { Avatar } from "@mui/material";
import '../../../styles/SingleReview/CommentHeader.scss';
import timeAgo from "../../../utils/time";
import React, { useEffect } from "react";
import { db } from "../../../firebase";
import { onSnapshot, collection, orderBy } from "firebase/firestore";
import useFetchProfilePic from "../../../hook/useFetchProfilePic";

const CommentHeader = ({ timestamp, username, userId}) => {

    const imageUrl = useFetchProfilePic(userId);

    // Persist commnt posted time 
    const sentAt = timeAgo(timestamp);

    // Update comment posted time
    useEffect(()=> {

        const myTimer =  setTimeout(()=> {
            timeAgo();
        }, 1000);    

        return ()=> {
            clearTimeout(myTimer);
        }
    }, []);

    return (
        <div className="comment-header">
            {imageUrl ? <img src={imageUrl} alt="" /> : <Avatar />}
            <p className="username">{username}</p>
            <p className="createdAt"> {sentAt} </p>
        </div> 
    )
}

export default CommentHeader;