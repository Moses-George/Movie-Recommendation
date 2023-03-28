import React, { useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "../Comments/CommentHeader";
import CommentHeaderBtn from "../Comments/CommentHeaderBtn";
import CommentVote from "../Comments/CommentVote";
import UpdateTextArea from "../../UI/UpdateTextArea";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useMovieName from "../../../hook/useMovieName";

const Reply = ({ username, userId, timestamp, replyContent, replyingTo, replyId }) => {

    const { commentId } = useParams();

    const { movie } = useMovieName();

    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");

    const editReply = async (commentId, replyId) => {
        setIsEditing(true);
        const docRef = doc(db, "movies", movie, "comments", commentId, "replies", replyId);
        const snapshot = await getDoc(docRef);
        setContent(snapshot.data().content);
    };

    const updateReply = async (commentId, replyId) => {
        const docRef = doc(db, "movies", movie, "comments", commentId, "replies", replyId);
        await updateDoc(docRef, {
            content: content
        });
        setIsEditing(false);
    };

    return (
        <Fragment>
            <div className='comment'>
                <div className='comment-vote'>
                    <CommentVote
                        isComment={false}
                        reviewId={replyId}
                    />
                </div>
                <div className='comment-info'>
                    <div className='comment-top'>
                        <CommentHeader
                            username={username}
                            timestamp={timestamp}
                            userId={userId}
                            // imageUrl={imageUrl} 
                            />
                        <CommentHeaderBtn
                            reviewId={replyId}
                            username={username}
                            type="reply"
                            editReview={() => editReply(commentId, replyId)} />
                    </div>
                    {!isEditing && <div className='comment-content'>
                        <span> {replyingTo} </span>
                        {replyContent}
                    </div>}
                    {isEditing && <UpdateTextArea
                        value={content}
                        setContent={setContent}
                        updateReview={() => updateReply(commentId, replyId)} />}
                </div>
            </div>
        </Fragment>
    )
}

export default Reply;