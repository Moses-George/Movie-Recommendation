import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import '../../styles/SingleReview/TextArea.scss';
import Button from "../UI/Button";

const TextArea = ({ placeholder, sendComment, sendReply, value, disabled, setContent, action }) => {

    const { commentId } = useParams();

    const [isExpanded, setIsExpanded] = useState(false);

    const [user] = useAuthState(auth);
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const sendReview = () => {
        if (action === "Reply") {
            sendReply(commentId);
        }
        if (action === "comment") {
            sendComment();
        }
    };

    return (
        <div className="textArea-wrapper">
            {currentUser?.data.imageUrl ? <img src={currentUser?.data.imageUrl} alt="" /> : <Avatar />}
            <textarea
                rows={!isExpanded ? 1 : 3}
                cols={35}
                placeholder={placeholder}
                onChange={(e) => setContent(e.target.value)}
                onClick={() => setIsExpanded(prev => !prev)}
                value={value}
                required
            />
            <div>
                <Button onClick={sendReview} disabled={disabled} > {action} </Button>
            </div>
        </div>
    )
}

export default TextArea;