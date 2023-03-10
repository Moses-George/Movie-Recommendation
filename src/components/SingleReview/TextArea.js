import { Avatar } from "@mui/material";
import React, { useState, useRef } from "react";
import '../../styles/SingleReview/TextArea.scss';
import Button from "../UI/Button";

const TextArea = ({placeholder, onClick, onChange, value, disabled}) => {

    // const { action } = props;

    // const replyingToPerson = props.replyingTo ? `@${props.replyingTo}` : "";

    const [content, setContent] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef();

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    // const newComment = {
    //     id: Math.random().toString(),
    //     content: content.replace(replyingToPerson, ""),
    //     createdAt: new Date(),
    //     "replyingTo": replyingToPerson,
    //     score: 0,
    //     currentUser: true,
    //     user: {
    //         image: {
    //             png: data.currentUser.image.png,
    //             webp: data.currentUser.image.webp
    //         },
    //         username: data.currentUser.username
    //     },
    //     replies: []
    // };

    // const addComment = () => {
    //     if (content.trim().length === 0) {
    //         inputRef.current.focus();
    //     } else {
    //         props.onAddComment(newComment);
    //         setContent("");
    //     };
    // };

    return (
        <div className="textArea-wrapper">
            {/* <img src="" alt='' /> */}
            <Avatar />
            <textarea
                ref={inputRef}
                rows={!isExpanded ? 1 : 3}
                cols={35}
                placeholder={placeholder}
                onChange={onChange}
                onClick={() => setIsExpanded(prev => !prev)}
                value={value}
                required
            />
            <div >
            <Button onClick={onClick} disabled={disabled} >Send</Button>
            </div>
        </div>
    )
}

export default TextArea;