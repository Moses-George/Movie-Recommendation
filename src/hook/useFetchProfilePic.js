import {useEffect, useState} from "react";
import { onSnapshot, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";


const useFetchProfilePic = (userId) => {

    const [profilePics, setProfilePics] = useState([]); 

    useEffect(() => {
        if (userId) {
            onSnapshot(collection(db, "users", userId, "profileImages"), orderBy(
                'timestamp', 'asc'), (snapshot) => {
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