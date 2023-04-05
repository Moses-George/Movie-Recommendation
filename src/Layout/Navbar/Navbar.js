import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AccountCircle, Search, Menu } from "@mui/icons-material"; 
import Button from "../../components/UI/Button/Button";
import SearchModal from "../../components/UI/Modals/Search/SearchModal";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import '../../styles/Navbar/Navbar.scss';
import { useMediaQuery, useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth, logOut } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { onSnapshot, collection, orderBy } from "firebase/firestore";
import useFetchProfilePic from "../../hook/useFetchProfilePic";

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const [profilePics, setProfilePics] = useState([]);

  const [user] = useAuthState(auth);
  const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);
  console.log(user)

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Fetch user profile pictures download url
  const imageUrl = useFetchProfilePic(currentUser?.docId);
//   useEffect(() => {
//     if (user && currentUser?.docId) {
//       const docId = currentUser?.docId;
//       console.log(docId)
//       onSnapshot(collection(db, "users", docId, "profileImages"), orderBy(
//           'timestamp', 'asc'), (snapshot) => {
//               setProfilePics(snapshot.docs.map(doc => ({
//                   id: doc.id,
//                   data: doc.data()
//               })));
//           });
//     }
// }, [user, currentUser?.docId]);


  return (
    <>
      {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} currentUser={currentUser} user={user} imageUrl={imageUrl} />}
      {isVisible && <SearchModal onClick={() => setIsVisible(false)} />}
      <header className="header">
        <div className="navbar-left">
          {!isDesktop && <Menu onClick={()=> setOpenSidebar(true)} sx={{ fontSize: "35px", color: "#fff" }} />}
          <h2>{isDesktop ? "GEO MOVIES" : "GM"}</h2>
        </div>
        {isDesktop && <nav>
          <ul>
            <li>
              <NavLink to="/home" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                Tv Shows
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                News
              </NavLink>
            </li>
          </ul>
        </nav>}
        <div className="nav-right"> 
          <Search sx={{ fontSize: "35px", color: "#fff" }} onClick={() => setIsVisible(true)} /> 
          {isDesktop && !user && <Link to="/auth/login" ><Button className="login-btn">Login</Button></Link>}
          {isDesktop && !user && <Link to="/auth/sign-up"><Button>Sign Up</Button></Link>}
          {user && !imageUrl && <Link to={`/account/${currentUser?.data.username}`}><AccountCircle sx={{ fontSize: "40px", color: "#fff" }} /></Link>}
          {user && imageUrl &&
            <Link to={`/account/${currentUser?.data.username}`}> <img src={imageUrl} alt="" /></Link>
          }
          {isDesktop && user && <Link to="/home" ><Button onClick={logOut} >Logout</Button></Link>} 
        </div>
      </header> 
    </>
  )
}

export default Navbar;

