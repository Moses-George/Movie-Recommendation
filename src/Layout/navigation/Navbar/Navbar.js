import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AccountCircle, Search, Menu, Notifications } from "@mui/icons-material";
import Button from "../../../components/UI/Button/Button";
import SearchModal from "../../../components/UI/Modals/Search/SearchModal";
import Sidebar from "../Sidebar/Sidebar";
import './Navbar.scss';
import { Badge, useMediaQuery, useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut, db } from "../../../firebase";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { useFetchCurrentUserQuery } from "../../../store/service/currentUserSlice";
import useFetchProfilePic from "../../../hook/useFetchProfilePic";
import { navigationData } from "../navigationData";

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState([]);

  const [user] = useAuthState(auth);
  const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Fetch user profile pictures download url
  const imageUrl = useFetchProfilePic(currentUser?.docId);

  const location = useLocation();

  // close sidebar on route change
  useEffect(() => {
    setIsVisible(false);
    setOpenSidebar(false);
  }, [location]);

  useEffect(() => {
    const docId = currentUser?.docId;
    if (docId) {
      const q = query(collection(db, "users", docId, "notifications"), where("read", "==", false));
      onSnapshot(q, (snapshot) => {
        setUnreadNotifs(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });
    }
  }, [currentUser?.docId])


  return (
    <>
      {openSidebar && <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        currentUser={currentUser}
        user={user}
        imageUrl={imageUrl} />}
      {isVisible && <SearchModal onClick={() => setIsVisible(false)} />}
      <header className="header" id="nav" >
        <div className="navbar-left">
          {!isDesktop && <Menu onClick={() => setOpenSidebar(true)} sx={{ fontSize: "35px", color: "#fff" }} />}
          <h2>{isDesktop ? "GEO MOVIES" : "GM"}</h2>
        </div>
        {isDesktop && <nav>
          <ul>
            {navigationData.map(navItem =>
              <li key={navItem.id}>
                <NavLink to={navItem.path} className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                  {navItem.text}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>}
        <div className="nav-right">
          <Search sx={{ fontSize: "30px", color: "#fff" }} onClick={() => setIsVisible(true)} />
          <Link to="/notifications">
            <Badge badgeContent={unreadNotifs?.length} color="error" max={9} invisible={unreadNotifs?.length === 0} > 
              <Notifications sx={{ fontSize: "30px", color: location.pathname.includes("notifications") ? "red" : "#fff" }} />
            </Badge>
          </Link>
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

