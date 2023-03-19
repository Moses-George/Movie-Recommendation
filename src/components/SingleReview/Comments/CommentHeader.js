import { Avatar } from "@mui/material";
import '../../../styles/SingleReview/CommentHeader.scss';
import timeAgo from "../../../utils/time";
import React, { useEffect } from "react";

const CommentHeader = ({ timestamp, username, imageUrl }) => {

    const sentAt = timeAgo(timestamp);
    console.log(timestamp);

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