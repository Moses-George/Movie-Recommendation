import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AccountCircle, DonutLarge, Search, Movie, Tv, Home, Newspaper, MoreVert, Settings, Logout, Login, Menu } from "@mui/icons-material";
import Button from "../../components/UI/Button";
import SearchModal from "../../components/UI//Modals/SearchModal";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import '../../styles/Navbar/Navbar.scss';
import { Box, MenuItem, useMediaQuery, useTheme, Slide, Divider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth, logOut } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";
import { onSnapshot, collection, orderBy } from "firebase/firestore";

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [profilePics, setProfilePics] = useState([]);

  const [user] = useAuthState(auth);
  const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Fetch user profile pictures download url
  useEffect(() => {
    if (user) {
      const docId = currentUser?.docId;
      onSnapshot(collection(db, "users", docId, "profileImages"), orderBy(
          'timestamp', 'asc'), (snapshot) => {
              setProfilePics(snapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
              })));
          });
    }
}, [user]);


  return (
    <>
      {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} currentUser={currentUser} user={user} profilePics={profilePics} />}
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
          {user && profilePics?.length === 0 && <Link to={`/account/${currentUser?.data.username}`}><AccountCircle sx={{ fontSize: "40px", color: "#fff" }} /></Link>}
          {user && profilePics?.length !==0 &&
            <Link to={`/account/${currentUser?.data.username}`}> <img src={profilePics[0]?.data.imageUrl} alt="" /></Link>
          }
          {isDesktop && user && <Link to="/home" ><Button onClick={logOut} >Logout</Button></Link>} 
        </div>
      </header> 
    </>
  )
}

export default Navbar;

