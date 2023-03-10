import React from "react";
import Reply from "./Reply";
import '../../../styles/SingleReview/Replies.scss';

// const replies = ['r1', 'r2', 'r3'];

const Replies = ({replies}) => {

    return (
        <div className='replies'>
            {replies.map(reply =>
                <Reply
                    key={reply}
                />)}
        </div>
    )
}

export default Replies;