import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, AccountCircle, Comment, ThumbUp } from "@mui/icons-material";
import "../../styles/Notification/notification.scss";
import useFetchProfilePic from "../../hook/useFetchProfilePic";
import timeAgo from "../../utils/time";

const Notification = ({id, notification, onDeleteNotification }) => {

    const navigate = useNavigate();

    const imageUrl = useFetchProfilePic(notification.senderId);

        // Persist commnt posted time 
        const createdAt = timeAgo(new Date(notification?.createdAt.toDate()));

        // Update notification posted time
        useEffect(()=> {
    
            const myTimer =  setTimeout(()=> {
                timeAgo();
            }, 1000);    
    
            return ()=> {
                clearTimeout(myTimer);
            }
        }, []);

        const navigateToNotificationSource = () => {
            navigate(`/${notification.media.mediaType}/${notification.media.mediaId}/comments/${notification.commentId}`)
        }


    return (
        <div className="notification"  >
            <div className="notification-img">
                {!imageUrl && <AccountCircle sx={{ fontSize: "50px", color: "#fff" }} />}
                {imageUrl && <img src={imageUrl} alt="img" />}
            </div>
            <div className="notification-content" onClick={navigateToNotificationSource} >
                <div className="notification-content-details">
                    <span>{notification.senderName}</span>
                    <span>replied to your comment on</span>
                    <span>{notification.media.mediaName}</span>
                </div>
                <p>{createdAt}</p>
            </div>
            <Delete onClick={()=> onDeleteNotification(id)} sx={{ fontSize: "25px", color: "hsl(358, 79%, 66%)" }} />
        </div>
    )
}

export default Notification;