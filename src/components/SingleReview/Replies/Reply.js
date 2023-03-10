import React, { useState, Fragment } from "react";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "../Comments/CommentHeader";
import CommentHeaderBtn from "../Comments/CommentHeaderBtn";
import CommentVote from "../Comments/CommentVote";
import TextArea from "../TextArea";

const Reply = (props) => {

    const [isReplying, setIsReplying] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);

    // const addReply = (newReply) => {
    //     props.onAddReply(newReply);
    //     setIsReplying(false);
    // }

    return (
        <Fragment>
            <div className='comment'>
                <div className='comment-vote'>
                    <CommentVote  />
                </div>
                <div className='comment-info'>
                    <div className='comment-top'>
                        <CommentHeader />
                        <CommentHeaderBtn
                            isReplying={isReplying}
                            setIsReplying={setIsReplying}
                        />
                    </div>
                    <div className='comment-content'>
                        <span> George </span>
                        Joss Whedon has a little bit of a history with superhero movies,
                        and for creating layered female characters. After his documented
                        frustrations with Wonder Woman, he's getting another chance at
                        the DC Extended Universe and Warner Bros., closing in on a
                    </div>
                    {/* {isEditing && <UpdateTextArea
                        type="Reply"
                        InitialValue={props.commentData.content}
                        commentId={props.commentId}
                        setIsEditing={setIsEditing} Id={props.id}
                        onUpdateComment={props.onUpdateComment} />} */}
                </div>
            </div>

            {/* {isReplying && <TextArea
                col={32}
            />} */}
        </Fragment>
    )
}

export default Reply;