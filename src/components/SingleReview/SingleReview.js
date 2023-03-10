import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import '../../styles/SingleReview/SingleReview.scss';
import TextArea from "./TextArea";
import Comment from "./Comments/Comment";
import ViewReplies from "./Replies/ViewReplies";
import { collection, doc, addDoc, serverTimestamp, onSnapshot, orderBy, Firestore } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { useGetSingleMovieQuery, useGetSingleTvShowQuery } from "../../store/features/movieApiSlice";

const SingleReview = () => {

    // const initializer = localStorage.getItem("comments") !== null ? JSON.parse(localStorage.getItem("comments")) : []

    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);

    // localStorage.setItem("comments", JSON.stringify(comments.map(item=> item)));/

    const { movieId, tvShowId } = useParams();

    const [user] = useAuthState(auth);

    // const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);
    // const { data: singleMovie, isError, error, isFetching, isSuccess } = useGetSingleMovieQuery(movieId);
    // const { data: singleTvShow } = useGetSingleTvShowQuery(tvShowId);

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    }

    const btnIsDisabled = !commentContent || commentContent.trim().length === 0;

    // const movie = singleMovie.original_title;
    // const tvShow = singleTvShow.name;

    const sendComment = async () => {
        // const docRef = doc(db, "movies", movie);
        // const colRef = collection(docRef, "comments");
        // await addDoc(colRef, {
        //     content: commentContent,
        //     score: 0,
        //     sentAt: serverTimestamp(),
        //     user: {
        //         username: currentUser?.data.username,
        //         image: currentUser?.data.imageUrl
        //     }
        // });
        setCommentContent("");
    }


    // useEffect(() => {
    //     // const docRef = Firestore.instance.collection("movies").doc(movie).get();

    //     // if (docRef !== null || docRef.exists) {
    //     onSnapshot(collection(db, "movies", movie, "comments"), orderBy(
    //         'timestamp', 'asc'), (snapshot) => {
    //             setComments(snapshot.docs.map(doc => ({
    //                 id: doc.id,
    //                 data: doc.data()
    //             })))
    //         })
    //     // }
    // }, [movieId])

    const Reviews =
        <div className="movie-single__review">
            <h2>04 comments</h2>
            <div className="comments scroller" >
                {/* {comments.map(comment => <Comment
                    key={comment.id}
                    username={comment.data.user.username}
                    content={comment.data.content}
                    score={comment.data.score} />)} */}
                <Comment username="George" score="12" />
                <Comment username="George" score="12" />
            </div>
            {/* {user && <TextArea
                placeholder="Add a comment"
                onChange={handleCommentChange} 
                value={commentContent}
                disabled={btnIsDisabled}
                onClick={sendComment}
            />} */}
        </div>

    const comment =
        <div className="movie-single__review">
            <div
                className="single-comment scroller" >
                <ViewReplies />
            </div>
            {/* <TextArea placeholder="Reply" /> */}
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