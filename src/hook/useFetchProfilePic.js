import {useEffect, useState} from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


const useFetchProfilePic = (userId) => {

    const [profilePics, setProfilePics] = useState([]); 

    useEffect(() => {
        if (userId) {
            const q = query(collection(db, "users", userId, "profileImages"), orderBy('sentAt', 'desc'))
            onSnapshot(q,  (snapshot) => {
                    setProfilePics(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                });
        }
    }, [userId]); 

    return profilePics[0]?.data.imageUrl;
}

export default useFetchProfilePic;