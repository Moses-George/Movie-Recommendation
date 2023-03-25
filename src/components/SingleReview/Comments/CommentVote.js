import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";
import '../../../styles/SingleReview/CommentVote.scss';
import useMovieName from "../../../hook/useMovieName";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../../store/features/currentUserSlice";
import { doc, getDocs, collection, onSnapshot, orderBy, addDoc, where, query, deleteDoc } from "firebase/firestore";

const CommentVote = ({ isComment, reviewId }) => {

    const { commentId } = useParams();
    const navigate = useNavigate();

    const [votes, setVotes] = useState([]);

    const [user] = useAuthState(auth);
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);
    const { movie } = useMovieName();

    const addVote = async () => {
        if (user) {
            const colRef = isComment ? collection(db, "movies", movie, "comments", reviewId, "votes") :
                collection(db, "movies", movie, "comments", commentId, "reply", reviewId, "votes");
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

    const removeVote = async () => {
        if (user) {
            const colRef = isComment ? collection(db, "movies", movie, "comments", reviewId, "votes") :
                collection(db, "movies", movie, "comments", commentId, "reply", reviewId, "votes");
            const q = query(colRef, where("userId", "==", currentUser?.data.uid));
            const docs = await getDocs(q);
            if (docs.docs.length !== 0) {
                try {
                    const docId = docs.docs[0].id;
                    const docRef = isComment ? doc(db, "movies", movie, "comments", reviewId, "votes", docId) :
                        doc(db, "movies", movie, "comments", commentId, "reply", reviewId, "votes", docId);
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

    useEffect(() => {
        const colRef = isComment ? collection(db, "movies", movie, "comments", reviewId, "votes") :
            collection(db, "movies", movie, "comments", commentId, "reply", reviewId, "votes");
        onSnapshot(colRef, orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setVotes(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
    }, [commentId, reviewId]);


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