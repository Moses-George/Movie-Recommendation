import React from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";
import '../../../styles/SingleReview/CommentVote.scss';

const CommentVote = ({ score }) => {

    // const increaseVoteHandler = () => {
    //     const score = props.vote + 1
    //     if (commentData.currentUser) {
    //         return;
    //     } else {
    //         props.setVote(score)
    //     }
    // }

    // const decreaseVoteHandler = () => {
    //     const score = props.vote - 1
    //     if (commentData.currentUser) {
    //         return;
    //     } else {
    //         props.setVote(score)
    //     }
    // }

    return (
        <div className="vote">
            <button onClick={() => console.log("add")} >
                <Add sx={{ color: "gray" }} />
            </button>
            <p>{score}</p>
            <button onClick={() => console.log("remove")} >
                <Remove sx={{ color: "gray" }} />
            </button>
        </div>
    )
}

export default CommentVote;