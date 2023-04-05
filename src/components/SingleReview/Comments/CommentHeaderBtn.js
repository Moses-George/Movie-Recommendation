import React, { Fragment, useState } from "react";
import { Reply } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import '../../../styles/SingleReview/CommentHeaderBtn.scss';
import { auth } from "../../../firebase";
import { useFetchCurrentUserQuery } from "../../../store/service/currentUserSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import DeleteModal from "../../UI/Modals/DeleteModal/DeleteModal";
import useMovieName from "../../../hook/useMovieName";

const CommentHeaderBtn = ({ editReview, reviewId, type, username }) => {

    const { commentId } = useParams();

    const [confirmDelete, setConfirmDelete] = useState(false);

    // Fetch movie/tvShow name with the custom hook
    const { movie } = useMovieName();

    // get user authentication state with the useAuthState hook
    const [user] = useAuthState(auth);

    // Fetch current user from firebase db with user found from the authentication state
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    // check if username on comment is the currentUser
    const isCurrentUser = currentUser?.data.username === username;

// Delete comment
    const deleteComment = async (commentId) => {
        try {
            const docRef = doc(db, "movies", movie, "comments", commentId);
            await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        }
    };

    // Delete Reply
    const deleteReply = async (commentId, replyId) => {
        try {
            const docRef = doc(db, "movies", movie, "comments", commentId, "replies", replyId);
            await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        }
    };

    // Check for type to delete
    const deleteReview = () => {
        if (type === "comment") {
            deleteComment(reviewId);
        }
        if (type === "reply") {
            deleteReply(commentId, reviewId);
        }
    };


    return (
        <Fragment>
            {confirmDelete &&
                <DeleteModal
                    onCancel={() => setConfirmDelete(false)}
                    onDelete={() => deleteReview()} />}  
            <div className='crud-btn'>
                {!isCurrentUser && <button className="reply" style={{ display: `${type === "reply" ? "none" : "flex"}` }}>
                    <Link to={`${user ? reviewId : "/auth/login"}`}><Reply /></Link>
                </button>}
                {user && isCurrentUser && <button className="delete" onClick={() => setConfirmDelete(true)} >
                    <Delete />
                </button>}
                {user && isCurrentUser && <button className="edit" onClick={editReview} >
                    <Edit />
                </button>}
            </div>
        </Fragment>
    )
}

export default CommentHeaderBtn;