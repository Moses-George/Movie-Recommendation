import React, { useEffect, useState } from "react";
import { Avatar, Divider } from "@mui/material";
import '../../styles/Account/Profile.scss';
import { Link } from "react-router-dom";
import { Settings, AddAPhoto, Logout } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { storage, db, logOut, auth } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, collection, addDoc, serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";
import ImagePreview from "../UI/Modals/ImagePreview";

const Profile = () => {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [progressPercent, setProgressPercent] = useState(0);
    const [profilePics, setProfilePics] = useState([]);

    // get user authentication state with the useAuthState hook
    const [user] = useAuthState(auth);

    // Fetch current user from firebase db with user found from the authentication state
    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    // Upload image file to firebase cloud storage and get image download url
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            alert("No image selected!");
        }
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setUrl(downloadUrl);
                    setImage("");
                })
            }
        );
    };

    // Sends image download url immediately after uploaded to cloud storage to user database
    useEffect(() => {
        const addProfilePic = async () => {
            const docId = currentUser?.docId;
            const userRef = doc(db, "users", docId);
            const colRef = collection(userRef, "profileImages");
            await addDoc(colRef, {
                sentAt: serverTimestamp(),
                imageUrl: url
            });
        }
        if (url) {
            addProfilePic();
        }
    }, [url]);

// Fetch user profile pictures download url
    useEffect(() => {
        const docId = currentUser?.docId;
        onSnapshot(collection(db, "users", docId, "profileImages"), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setProfilePics(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
    }, [url]);

    return (
        <>
            {image && progressPercent < 100 && <ImagePreview
                image={image}
                progressPercent={progressPercent}
                onClose={() => setImage(null)}
                onSave={handleSubmit} />}
            <section className="profile">
                <form className="profile-pic">
                    {profilePics.length === 0 ?
                        <Avatar sx={{ width: "10rem", height: "10rem" }} /> :
                        <img src={profilePics[0].data.imageUrl} alt="" />}
                    <label htmlFor="fileInput">
                        <div className="camera">
                            <AddAPhoto sx={{ fontSize: "30px" }} />
                        </div>
                    </label>
                    <input type="file" id="fileInput" onChange={(e) => setImage(e.target.files[0])} />
                </form>
                <Divider sx={{ borderColor: "rgb(49, 49, 49)" }} />
                <div className="account-details">
                    <p>Account Details</p>
                    <Link to="">PROFILE</Link>
                    <Link to="favourites">FAVOURITE MOVIES</Link>
                    <Link to="">USER GUIDE</Link>
                </div>
                <Divider sx={{ borderColor: "rgb(49, 49, 49)" }} />
                <div className="others">
                    <p>Others</p>
                    <Link to="/account/george/settings" className="menu-link" >
                        <Settings />
                        <p> SETTINGS</p>
                    </Link>
                    <Link to="/" onClick={logOut} className="menu-link" >
                        <Logout />
                        <p>Logout </p>
                    </Link>
                </div>
            </section>
        </>
    )
}


export default Profile; 