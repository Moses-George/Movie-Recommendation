import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Forum } from "@mui/icons-material";
import '../../styles/SingleReview/SingleReview.scss';
import TextArea from "./TextArea";
import Comment from "./Comments/Comment";
import ViewReplies from "./Replies/ViewReplies";
import { collection, doc, addDoc, serverTimestamp, onSnapshot, orderBy, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import useMovieName from "../../hook/useMovieName";
import ReviewSpinner from "../UI/Spinners/ReviewSpinner";

const SingleReview = () => {

    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { movie, fetching } = useMovieName();
    const [user] = useAuthState(auth);
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const btnIsDisabled = !content || content.trim().length === 0;


    const sendComment = async () => {
        const docRef = doc(db, "movies", movie);
        const colRef = collection(docRef, "comments");
        await addDoc(colRef, {
            content: content,
            sentAt: serverTimestamp(),
            user: {
                username: currentUser?.data.username,
                image: currentUser?.data.imageUrl
            }
        });
        setContent("");
    };

    const sendReply = async (commentId) => {
        const docRef = doc(db, "movies", movie, "comments", commentId);
        const colRef = collection(docRef, "replies");
        const snapshot = await getDoc(docRef);
        await addDoc(colRef, {
            content: content,
            sentAt: serverTimestamp(),
            replyingTo: snapshot.data().user?.username,
            user: {
                username: currentUser?.data.username,
                image: currentUser?.data.imageUrl
            }
        });
        setContent("");
    };

    useEffect(() => {
        setIsLoading(true);
        onSnapshot(collection(db, "movies", movie, "comments"), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
        setIsLoading(false);
    }, [movie]);

    const commentSize = comments.length;

    const Reviews =
        <div className="movie-single__review">
            {fetching && <ReviewSpinner />}
            {!fetching && <h2>{commentSize === 0 ? "No Comment" :
                commentSize === 1 ? "01 Comment" :
                    commentSize > 0 && commentSize <= 9 ? `0${commentSize} Comments` :
                        `${commentSize} Comments`}</h2>}
            <div className="comments scroller" >
                {comments?.map(comment => <Comment
                    key={comment.id}
                    commentId={comment.id}
                    commentContent={comment.data.content}
                    username={comment.data.user.username}
                    imageUrl={comment.data.user.image}
                    timestamp={new Date(comment?.data.sentAt?.toDate())}
                    score={comment.data.score}
                />)}
            </div>
            {!fetching && commentSize === 0 && <div className="no-comment">
                <Forum sx={{ color: "#fff", fontSize: "100px" }} />
                <p>Be the first to comment.</p>
            </div>}
            {user && <TextArea
                placeholder="Add a comment..."
                setContent={setContent}
                value={content}
                disabled={btnIsDisabled}
                sendComment={sendComment}
                action="comment"
            />}
        </div>

    const comment =
        <div className="movie-single__review">
            <div
                className="single-comment scroller" >
                <ViewReplies />
            </div>
            {user && <TextArea
                placeholder="Reply..."
                setContent={setContent}
                value={content}
                sendReply={sendReply}
                disabled={btnIsDisabled}
                action="Reply" />}
        </div>

    return (
        <>
            <Routes>
                <Route index={true} element={Reviews} />
                <Route path='/:commentId' element={comment} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default SingleReview;