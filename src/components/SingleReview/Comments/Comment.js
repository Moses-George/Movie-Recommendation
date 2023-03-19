import React, { Fragment, memo, useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "./CommentHeader";
import CommentHeaderBtn from "./CommentHeaderBtn";
import CommentVote from './CommentVote';
import TextArea from "../TextArea";
import UpdateTextArea from "../../UI/UpdateTextArea";
import Replies from "../Replies/Replies";
import { RepliesOutline } from "../Replies/Replies";
import { doc, getDoc, updateDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import { useGetSingleMovieQuery, useGetSingleTvShowQuery } from "../../../store/features/movieApiSlice";
// import Replies from "./Replies";
import useMovieName from "../../../hook/useMovieName";

// const replies = ['r1', 'r2', 'r3'];


const Comments = ({ username, commentId, imageUrl, timestamp, commentContent, score }) => {

    const { movieId, tvShowId } = useParams();
    const { movie } = useMovieName();

    const [isEditing, setIsEditing] = useState(false);
    const [vote, setVote] = useState(0);

    const [content, setContent] = useState("");
    const [replies, setReplies] = useState([]);

    const editComment = async (id) => {
        setIsEditing(true);
        const docRef = doc(db, "movies", movie, "comments", id);
        const snapshot = await getDoc(docRef);
        setContent(snapshot.data().content);
    };

    const updateComment = async (id) => {
        const docRef = doc(db, "movies", movie, "comments", id);
        await updateDoc(docRef, {
            content: content
        });
        setIsEditing(false);
    };

    useEffect(() => {
        onSnapshot(collection(db, "movies", movie, "comments", commentId, "replies"), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setReplies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
        // }
    }, [commentId]);
    console.log(replies)


    return (
        <Fragment>
            <div className='comment-section'>
                <div className="comment">
                    <div className="comment-vote">
                        <CommentVote score={score} />
                    </div>
                    <div className='comment-info'>
                        <div className='comment-top'>
                            <CommentHeader timestamp={timestamp} username={username} imageUrl={imageUrl} />
                            <CommentHeaderBtn username={username} type="comment" reviewId={commentId} editReview={() => editComment(commentId)} />
                        </div>
                        {!isEditing && <div className="comment-content"> {commentContent} </div>}
                        {isEditing && <UpdateTextArea
                            value={content}
                            setContent={setContent}
                            updateReview={() => updateComment(commentId)}
                        />}
                    </div>
                </div>
                {replies.length >= 3 && <Link to={commentId}>{`View Previous ${replies.length} replies...`}</Link>}

                {replies.length < 3 && <RepliesOutline replies={replies} commentId={commentId} />}
            </div>
        </Fragment>
    )
    // return (
    //     <Fragment>
    //         <div  className='comment-section'>
    //             <div className="comment">
    //                 <div className="comment-vote">
    //                     <CommentVote score={score} setVote={setVote} />
    //                 </div>
    //                 <div className='comment-info'>
    //                     <div className='comment-top'>
    //                         <CommentHeader username={username} />
    //                         <CommentHeaderBtn
    //                             isReplying={isReplying}
    //                             setIsReplying={setIsReplying}
    //                             setIsEditing={setIsEditing}
    //                         />
    //                     </div>
    //                     <div className="comment-content"> hdhdhhdhd dvddgd vdvdvddv vsvvsd </div>
    //                     {/* {isEditing && <UpdateTextArea
    //                         type="Comment"
    //                         setIsEditing={setIsEditing} />} */}
    //                 </div>
    //             </div>
    //             {replies.length >= 3 && <Link to="c1">View 3 replies....</Link>}

    //             {isReplying && <TextArea
    //                 // col={30}
    //                 action="REPLY"
    //             />}

    //             {replies.length < 3 && <Replies replies={replies} />}
    //         </div>
    //     </Fragment>
    // )
}

export default memo(Comments);