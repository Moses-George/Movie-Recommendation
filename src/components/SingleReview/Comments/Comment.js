import React, { Fragment, memo, useState } from "react";
import '../../../styles/SingleReview/Comment.scss';
import CommentHeader from "./CommentHeader";
import CommentHeaderBtn from "./CommentHeaderBtn";
import CommentVote from './CommentVote';
import TextArea from "../TextArea";
import Replies from "../Replies/Replies";
import { Link } from "react-router-dom";
// import Replies from "./Replies";

const replies = ['r1', 'r2', 'r3'];


const Comments = ({content, username, score}) => {

    // const { isScrolling, handleMouseOver, handleMouseOut } = useScroll();

    // const {pathname} = useLocation();
    // // const path = location.pathname;
    // console.log(pathname.split('/'))

    // const authPage = path.split("/").includes("auth");

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


    // return (
    //     <Fragment>
    //         <div  className='comment-section'>
    //             <div className="comment">
    //                 <div className="comment-vote">
    //                     <CommentVote score={score} setVote={setVote} />
    //                 </div>
    //                 <div className='comment-info'>
    //                     <div className='comment-top'>
    //                         <CommentHeader username={username} />
    //                         <CommentHeaderBtn
    //                             isReplying={isReplying}
    //                             setIsReplying={setIsReplying}
    //                             setIsEditing={setIsEditing}
    //                         />
    //                     </div>
    //                     <div className="comment-content"> {content} </div>
    //                     {/* {isEditing && <UpdateTextArea
    //                         type="Comment"
    //                         setIsEditing={setIsEditing} />} */}
    //                 </div>
    //             </div>
    //             {replies.length >= 3 && <Link to="c1">View 3 replies....</Link>}

    //             {isReplying && <TextArea
    //                 // col={30}
    //                 action="REPLY"
    //             />}

    //             {replies.length < 3 && <Replies replies={replies} />}
    //         </div>
    //     </Fragment>
    // )
    return (
        <Fragment>
            <div  className='comment-section'>
                <div className="comment">
                    <div className="comment-vote">
                        <CommentVote score={score} setVote={setVote} />
                    </div>
                    <div className='comment-info'>
                        <div className='comment-top'>
                            <CommentHeader username={username} />
                            <CommentHeaderBtn
                                isReplying={isReplying}
                                setIsReplying={setIsReplying}
                                setIsEditing={setIsEditing}
                            />
                        </div>
                        <div className="comment-content"> hdhdhhdhd dvddgd vdvdvddv vsvvsd </div>
                        {/* {isEditing && <UpdateTextArea
                            type="Comment"
                            setIsEditing={setIsEditing} />} */}
                    </div>
                </div>
                {replies.length >= 3 && <Link to="c1">View 3 replies....</Link>}

                {isReplying && <TextArea
                    // col={30}
                    action="REPLY"
                />}

                {replies.length < 3 && <Replies replies={replies} />}
            </div>
        </Fragment>
    )
}

export default  memo(Comments);