import { useEffect } from "react";
import "../../styles/Notification/notification.scss";
import Notification from "../../components/Notification/Notification";
import { NotificationsNoneRounded } from "@mui/icons-material";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { onSnapshot, collection, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    useEffect(() => {
        const docId = currentUser?.docId;
        if(docId) {
            const q = query(collection(db, "users", docId, "notifications"), orderBy('createdAt', 'desc'))
            onSnapshot(q, (snapshot) => {
                setNotifications(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
        }
    }, [currentUser?.docId]);

    // Delete Notification
    const deleteNotification = async (id) => {
        try {
            const docId = currentUser?.docId;
            const docRef = doc(db, "users", docId, "notifications",id);
            await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notifications">
            {notifications.length > 0 && <h1>Notifications</h1>}
            <div className="notifications-container">
                {notifications.length > 0 && notifications?.map(notification => <Notification key={notification.id} id={notification.id} notification={notification.data} onDeleteNotification={deleteNotification} />)}
                {notifications.length === 0 && <div className="no-notifications">
                    <h2>No notification yet!</h2>
                    <NotificationsNoneRounded sx={{ fontSize: "130px", color: "#fff" }} />
                    <p>we'll notify you when something new arrives!</p>
                </div>}
            </div>
        </div>
    )
}

export default Notifications;