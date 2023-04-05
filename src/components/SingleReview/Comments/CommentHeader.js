import { Avatar } from "@mui/material";
import '../../../styles/SingleReview/CommentHeader.scss';
import timeAgo from "../../../utils/time";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { onSnapshot, collection, orderBy } from "firebase/firestore";
import useFetchProfilePic from "../../../hook/useFetchProfilePic";

const CommentHeader = ({ timestamp, username, userId}) => {

    // const [profilePics, setProfilePics] = useState([]);
    const imageUrl = useFetchProfilePic(userId);
    console.log(imageUrl)

    // Persist commnt posted time 
    const sentAt = timeAgo(timestamp);
    console.log(timestamp);

    // Update comment posted time
    useEffect(()=> {

        const myTimer =  setTimeout(()=> {
            timeAgo();
        }, 1000);    

        return ()=> {
            clearTimeout(myTimer);
        }
    }, []);

    // useEffect(() => {
    //     if (userId) {
    //         onSnapshot(collection(db, "users", userId, "profileImages"), orderBy(
    //             'timestamp', 'asc'), (snapshot) => {
    //                 setProfilePics(snapshot.docs.map(doc => ({
    //                     id: doc.id,
    //                     data: doc.data()
    //                 })));
    //             });
    //     }
    // }, [userId]); 

    return (
        <div className="comment-header">
            {imageUrl ? <img src={imageUrl} alt="" /> : <Avatar />}
            <p className="username">{username}</p>
            <p className="createdAt"> {sentAt} </p>
        </div> 
    )
}

export default CommentHeader;