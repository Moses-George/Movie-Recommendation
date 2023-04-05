import React, { Fragment, memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "./CommentHeader";
import CommentHeaderBtn from "./CommentHeaderBtn";
import CommentVote from './CommentVote';
import UpdateTextArea from "../../UI/UpdateTextArea/UpdateTextArea";
import { RepliesPreview } from "../Replies/Replies";
import { doc, getDoc, updateDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import useMovieName from "../../../hook/useMovieName";


const Comments = ({ username, userId, commentId, timestamp, commentContent }) => {

    // Fetch movie/tvShow name from api with the custom hook
    const { movie } = useMovieName();

    const [isEditing, setIsEditing] = useState(false);

    const [content, setContent] = useState("");
    const [replies, setReplies] = useState([]);

    // Edit user comment on textArea
    const editComment = async (id) => {
        setIsEditing(true);
        const docRef = doc(db, "movies", movie, "comments", id);
        const snapshot = await getDoc(docRef);
        setContent(snapshot.data().content);
    };

    // Send edited comment to database
    const updateComment = async (id) => {
        const docRef = doc(db, "movies", movie, "comments", id);
        await updateDoc(docRef, {
            content: content
        });
        setIsEditing(false);
    };

    // Fetch all Replies for a specific comment 
    useEffect(() => {
        onSnapshot(collection(db, "movies", movie, "comments", commentId, "replies"), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setReplies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
    }, [commentId, movie]);


    return (
        <div className='comment-section'>
            <div className="comment">
                <div className="comment-vote">
                    <CommentVote
                        reviewId={commentId}
                        isComment={true}
                    />
                </div>
                <div className='comment-info'>
                    <div className='comment-top'>
                        <CommentHeader
                            timestamp={timestamp}
                            username={username}
                            userId={userId}
                        />
                        <CommentHeaderBtn
                            username={username}
                            type="comment"
                            reviewId={commentId}
                            editReview={() => editComment(commentId)}
                        />
                    </div>
                    {!isEditing && <div className="comment-content"> {commentContent} </div>}
                    {isEditing && <UpdateTextArea
                        value={content}
                        setContent={setContent}
                        updateReview={() => updateComment(commentId)}
                    />}
                </div>
            </div>
            {replies.length >= 3 && <Link to={commentId}>{`View all ${replies.length} replies...`}</Link>}

            {replies.length < 3 && <RepliesPreview replies={replies} commentId={commentId} />}
        </div>
    )
}

export default memo(Comments);