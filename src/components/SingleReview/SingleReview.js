import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Forum, EmojiEmotions } from "@mui/icons-material";
import '../../styles/SingleReview/SingleReview.scss';
import TextArea from "./TextArea";
import Comment from "./Comments/Comment";
import ViewReplies from "./Replies/ViewReplies";
import { collection, doc, addDoc, serverTimestamp, onSnapshot, orderBy, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import useMedia from "../../hook/useMedia";

const SingleReview = () => {

    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const scrollToComments = useRef(null);

    const media = useMedia();
    const [user] = useAuthState(auth);
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);


    useEffect(() => {
        scrollToComments.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    const btnIsDisabled = !content || content.trim().length === 0;


    const sendComment = async () => {
        const docId = currentUser?.docId;
        const docRef = doc(db, "movies", media?.name);
        const colRef = collection(docRef, "comments");
        await addDoc(colRef, {
            content: content,
            sentAt: serverTimestamp(),
            user: {
                userId: docId,
                username: currentUser?.data.username,
            }
        });
        setContent("");
    };

    const sendNotification = async (senderId, receiverId, commentId) => {
        const docRef = doc(db, "users", receiverId);
        const colRef = collection(docRef, "notifications");
        await addDoc(colRef, {
            senderId: senderId,
            createdAt: serverTimestamp(),
            senderName: currentUser?.data.username,
            read: false,
            media: {
                mediaId: media?.id,
                mediaName: media?.name,
                mediaType: media?.mediaType
            },
            commentId: commentId
        })
    }

    const sendReply = async (commentId) => {
        const docId = currentUser?.docId;
        const docRef = doc(db, "movies", media?.name, "comments", commentId);
        const colRef = collection(docRef, "replies");
        const snapshot = await getDoc(docRef);
        const receiverId = snapshot.data().user?.userId ;
        await addDoc(colRef, {
            content: content,
            sentAt: serverTimestamp(),
            replyingTo: snapshot.data().user?.username,
            user: {
                userId: docId,
                username: currentUser?.data.username,
            }
        });
        await sendNotification(docId, receiverId, commentId);
        setContent("");
    };

    useEffect(() => {
        if (media?.name) {
            onSnapshot(collection(db, "movies", media?.name, "comments"), orderBy(
                'timestamp', 'asc'), (snapshot) => {
                    setComments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                });
        }
    }, [media?.name]);

    const commentSize = comments.length;

    const Reviews =
        <div className="single__review" ref={scrollToComments} >
            {user && <h2> {commentSize === 0 ? "No Comment" :
                commentSize === 1 ? "01 Comment" :
                    commentSize > 0 && commentSize <= 9 ? `0${commentSize} Comments` :
                        `${commentSize} Comments`}</h2>}
            <div className="reviews-container">
                <div className="comments scroller" >
                    {comments?.map(comment => <Comment
                        key={comment.id}
                        commentId={comment.id}
                        commentContent={comment.data.content}
                        username={comment.data.user.username}
                        userId={comment.data.user.userId}
                        timestamp={new Date(comment?.data.sentAt?.toDate())}
                        score={comment.data.score}
                    />)}
                </div>
                {user && commentSize === 0 && <div className="no-comment">
                    <Forum sx={{ color: "#fff", fontSize: "10rem" }} />
                    <p>Be the first to comment.</p>
                </div>}
                {!user && commentSize === 0 && <div className="no-comment">
                    <EmojiEmotions sx={{ color: "gold", fontSize: "10rem" }} />
                    <Link to="/auth/login">Login to add a review</Link>
                </div>}
                {user && <TextArea
                    placeholder="What's on your mind ?"
                    setContent={setContent}
                    value={content}
                    disabled={btnIsDisabled}
                    sendComment={sendComment}
                    action="comment"
                />}
            </div>
        </div>

    const comment =
        <div className="single__review" ref={scrollToComments} >
            <div className="reviews-container">
                <div className="single-comment scroller" >
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