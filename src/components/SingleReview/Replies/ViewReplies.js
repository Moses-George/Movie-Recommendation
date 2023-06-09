import React, { Fragment, memo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "../Comments/CommentHeader";
import CommentHeaderBtn from "../Comments/CommentHeaderBtn";
import CommentVote from '../Comments/CommentVote';
import Replies from "../Replies/Replies";
import { db } from "../../../firebase";
import { doc, getDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import useMedia from "../../../hook/useMedia";


const ViewReplies = () => {

    const { commentId } = useParams();

    const [singleComment, setSingleComment] = useState({});
    const [replies, setReplies] = useState([]);
    const scrollToSingleComment = useRef(null);

    const media = useMedia();

    useEffect(() => {
        scrollToSingleComment.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const getComment = async () => {
            const docRef = doc(db, "movies", media?.name, "comments", commentId);
            const snapshot = await getDoc(docRef);
            setSingleComment(snapshot.data());
        }
        if (commentId && media?.name) {
            getComment();
        }
    }, [commentId, media?.name]);


    useEffect(() => {
        if (commentId && media?.name) {
            onSnapshot(collection(db, "movies", media?.name, "comments", commentId, "replies"), orderBy(
                'timestamp', 'asc'), (snapshot) => {
                    setReplies(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                });
        }
    }, [commentId, media?.name]); 


    return (
        <Fragment>
            <div className='comment-section' ref={scrollToSingleComment} >
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
                                timestamp={new Date(singleComment?.sentAt?.toDate())} />
                            <CommentHeaderBtn username={singleComment?.user?.username} type="reply"  />
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