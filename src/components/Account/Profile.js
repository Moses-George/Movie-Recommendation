import React, { useEffect, useState } from "react";
import { Avatar, Divider } from "@mui/material";
import '../../styles/Account/Profile.scss';
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { Settings, AddAPhoto, Logout } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";
import { storage, db, logOut } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import ImagePreview from "../UI/Modals/ImagePreview";

const Profile = () => {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [progressPercent, setProgressPercent] = useState(0);

    const [user] = useAuthState(auth);
    const { data: currentUser, isFetching, isLoading, refetch } = useFetchCurrentUserQuery(user?.uid);
    // console.log(useFetchCurrentUserQuery(user?.uid))
if (image) {
    console.log(URL.createObjectURL(image))
}

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
        )
    }

    useEffect(() => {
        const updateProfilePic = async () => {
            const docId = currentUser?.docId;
            const userRef = doc(db, "users", docId);
            await updateDoc(userRef, {
                imageUrl: url
            })
        }
        if (url) {
            updateProfilePic();
        }
    }, [url, currentUser?.docId])

    useEffect(() => {
        if (url) {
            refetch();
        }
    }, [refetch, url]);

    return (
        <>
        {image && progressPercent < 100 && <ImagePreview
         image={image} 
         progressPercent={progressPercent}
         onClose={()=> setImage(null)} 
         onSave={handleSubmit} />}
        <section className="profile">
            <form  className="profile-pic">
                {!currentUser?.data.imageUrl ?
                    <Avatar sx={{ width: "10rem", height: "10rem" }} /> :
                    <img src={currentUser?.data.imageUrl} alt="" />}
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