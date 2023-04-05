import React from "react";
import { Link } from "react-router-dom";
import Reply from "./Reply";
import '../../../styles/SingleReview/Replies.scss';
import { Avatar } from "@mui/material";
import useFetchProfilePic from "../../../hook/useFetchProfilePic";

const Replies = ({ replies }) => {

    return (
        <div className='replies'>
            {replies.map(reply =>
                <Reply
                    key={reply.id}
                    replyId={reply.id}
                    replyContent={reply.data.content}
                    username={reply.data.user.username}
                    userId={reply.data.user.userId}
                    replyingTo={reply.data.replyingTo}
                    timestamp={new Date(reply?.data.sentAt?.toDate())}
                />)}
        </div>
    )
}

const ReplyPreview = ({reply, commentId}) => {

    const imageUrl = useFetchProfilePic(reply?.data.user.userId); 

    return (
        <div className="replies-outline" >
        {imageUrl ? <img src={imageUrl} alt="" /> : <Avatar />}
        <Link to={commentId}> {reply.data.user.username}</Link>
        <p> {reply.data.content?.length > 12 ? `${reply.data.content?.slice(0, 12)}...` : reply.data.content} </p>
    </div>
    )
}

export const RepliesPreview = ({ replies, commentId }) => {

    return (
        <div className="replies">
            {replies.map(reply =>
                <ReplyPreview reply={reply} key={reply.id} commentId={commentId} /> 
            )}
        </div>
    )
}

export default Replies;