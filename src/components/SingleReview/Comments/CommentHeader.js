import { Avatar } from "@mui/material";
import '../../../styles/SingleReview/CommentHeader.scss';
import React, { useEffect } from "react";

const CommentHeader = ({username}) => {

    return (
        <div className="comment-header">
            {/* <img src="" alt="" /> */}
            <Avatar /> 
            <p className="username">{username}</p>
            {/* <div className="user">You</div> */}
            <p className="createdAt"> 1 month ago </p>
        </div>
    )
}

export default CommentHeader;