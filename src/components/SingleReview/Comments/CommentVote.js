import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";
import '../../../styles/SingleReview/CommentVote.scss';
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../../store/service/currentUserSlice";
import { doc, getDocs, collection, onSnapshot, orderBy, addDoc, where, query, deleteDoc } from "firebase/firestore";
import useMedia from "../../../hook/useMedia";

const CommentVote = ({ isComment, reviewId }) => {

    const { commentId } = useParams();
    const navigate = useNavigate();

    const [votes, setVotes] = useState([]);

    // get user authentication state with the useAuthState hook
    const [user] = useAuthState(auth);

    // Fetch current user from firebase db with user found from the authentication state
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    // Fetch movie name from api with the custom hook
    const media = useMedia();

    // Vote on comment/reply
    const addVote = async () => {
        if (user) {
            const colRef = isComment ? collection(db, "movies", media?.name, "comments", reviewId, "votes") :
                collection(db, "movies", media?.name, "comments", commentId, "reply", reviewId, "votes");
            const q = query(colRef, where("userId", "==", currentUser?.data.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(colRef, {
                    userId: currentUser?.data.uid,
                    username: currentUser?.data.username
                });
            } else {
                alert("You cannot vote twice!");
            }
        } else {
            alert("You must be logged in to vote!");
            navigate("/auth/login");
        }
    };

    // Unvote on comment/reply
    const removeVote = async () => {
        if (user) {
            const colRef = isComment ? collection(db, "movies", media?.name, "comments", reviewId, "votes") :
                collection(db, "movies", media?.name, "comments", commentId, "reply", reviewId, "votes");
            const q = query(colRef, where("userId", "==", currentUser?.data.uid));
            const docs = await getDocs(q);
            if (docs.docs.length !== 0) {
                try {
                    const docId = docs.docs[0].id;
                    const docRef = isComment ? doc(db, "movies", media?.name, "comments", reviewId, "votes", docId) :
                        doc(db, "movies", media?.name, "comments", commentId, "reply", reviewId, "votes", docId);
                    await deleteDoc(docRef);
                } catch (err) {
                    console.error(err);
                }
            } else {
                alert("You cannot unvote if you've not voted!");
            }
        } else {
            alert("You must be logged in to unvote!");
            navigate("/auth/login");
        }
    };

    // Fetch votes from database
    useEffect(() => {
        if (commentId && media?.name) {
            const colRef = isComment ? collection(db, "movies", media?.name, "comments", reviewId, "votes") :
            collection(db, "movies", media?.name, "comments", commentId, "reply", reviewId, "votes");
        onSnapshot(colRef, orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setVotes(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
        }
    }, [commentId, reviewId, media?.name]);


    return (
        <div className="vote">
            <button onClick={addVote} >
                <Add sx={{ color: "gray" }} />
            </button>
            <p>{votes.length}</p>
            <button onClick={removeVote} >
                <Remove sx={{ color: "gray" }} />
            </button>
        </div>
    )
}

export default CommentVote;