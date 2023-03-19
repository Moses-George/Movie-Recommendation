import React from "react";
import { Link } from "react-router-dom";
import Reply from "./Reply";
import '../../../styles/SingleReview/Replies.scss';
import { Avatar } from "@mui/material";

const Replies = ({ replies }) => {

    return (
        <div className='replies'>
            {replies.map(reply =>
                <Reply
                    key={reply.id}
                    replyId={reply.id}
                    replyContent={reply.data.content}
                    username={reply.data.user.username}
                    imageUrl={reply.data.user.image}
                    replyingTo={reply.data.replyingTo}
                    timestamp={new Date(reply.data.sentAt?.toDate())}
                    score={reply.data.score}
                />)}
        </div>
    )
}

export const RepliesOutline = ({ replies, commentId }) => {

    return (
        <div className="replies">
            {replies.map(reply =>
                <div className="replies-outline" key={reply.id} >
                    {reply.data.user.image ? <img src={reply.data.user.image} alt="" /> : <Avatar />}
                    <Link to={commentId}> {reply.data.user.username}</Link>
                    <p> {`${reply.data.content?.slice(0, 13)}...`} </p>
                </div>
            )}
        </div>
    )
}

export default Replies;