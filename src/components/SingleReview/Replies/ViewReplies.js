import React, { Fragment, memo, useState } from "react";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "../Comments/CommentHeader";
import CommentHeaderBtn from "../Comments/CommentHeaderBtn";
import CommentVote from '../Comments/CommentVote';
import Replies from "../Replies/Replies";

const replies = ['r1', 'r2', 'r3', 'r4'];


const ViewReplies = (props) => {


    const [isReplying, setIsReplying] = useState(false);
    const [vote, setVote] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // const addReply = (newReply) => {
    //     const replies = [...commentData.replies, newReply];
    //     props.onAddReply(replies, commentData.id);
    //     setIsReplying(false);
    // }

    // const deleteComment = (type, id) => {
    //     props.removeComment(type, id, commentData.id);
    // }


    return (
        <Fragment>
            <div className='comment-section'>
                <div className="comment">
                    <div className="comment-vote">
                        <CommentVote vote={vote} setVote={setVote} />
                    </div>
                    <div className='comment-info'>
                        <div className='comment-top'>
                            <CommentHeader />
                            <CommentHeaderBtn
                                isReplying={isReplying}
                                setIsReplying={setIsReplying}
                                setIsEditing={setIsEditing}
                            />
                        </div>
                        <div className="comment-content">
                            Joss Whedon has a little bit of a history with superhero movies, and for
                            creating layered female characters. After his documented frustrations with Wonder Woman, he's
                            getting another chance at the DC Extended Universe and Warner Bros., closing in on a
                        </div>
                        {/* {isEditing && <UpdateTextArea
                            type="Comment"
                            setIsEditing={setIsEditing} />} */}
                    </div>
                </div>

                <Replies replies={replies} />
            </div>
        </Fragment>
    )
}

export default memo(ViewReplies);