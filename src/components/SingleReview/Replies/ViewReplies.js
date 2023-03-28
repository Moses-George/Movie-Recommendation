import React, { Fragment, memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "../Comments/CommentHeader";
import CommentHeaderBtn from "../Comments/CommentHeaderBtn";
import CommentVote from '../Comments/CommentVote';
import Replies from "../Replies/Replies";
import { db } from "../../../firebase";
import { doc, getDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import useMovieName from "../../../hook/useMovieName";


const ViewReplies = () => {

    const { commentId } = useParams();

    const [singleComment, setSingleComment] = useState({});
    const [replies, setReplies] = useState([]);

    const { movie } = useMovieName();

    useEffect(() => {
        const getComment = async () => {
            const docRef = doc(db, "movies", movie, "comments", commentId);
            const snapshot = await getDoc(docRef);
            setSingleComment(snapshot.data());
        }
        if (commentId) {
            getComment();
        }
    }, [commentId, movie]);


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
        <Fragment>
            <div className='comment-section'>
                <div className="comment">
                    <div className="comment-vote">
                        <CommentVote
                            isComment={true}
                            reviewId={commentId}
                        />
                    </div>
                    <div className='comment-info'>
                        <div className='comment-top'>
                            <CommentHeader
                                username={singleComment?.user?.username}
                                userId={singleComment?.user?.userId}
                                // imageUrl={singleComment?.user?.image}
                                timestamp={new Date(singleComment?.sentAt?.toDate())} />
                            <CommentHeaderBtn type="reply" />
                        </div>
                        <div className="comment-content"> {singleComment?.content} </div>
                    </div>
                </div>
                <Replies replies={replies} />
            </div>
        </Fragment>
    )
}

export default memo(ViewReplies);