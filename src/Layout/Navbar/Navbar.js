import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AccountCircle, DonutLarge, Search, Movie, Tv, Home, Newspaper, MoreVert, Settings, Logout, Login } from "@mui/icons-material";
import Button from "../../components/UI/Button";
import SearchModal from "../../components/UI//Modals/SearchModal";
import '../../styles/Navbar/Navbar.scss';
import { Box, Menu, MenuItem, useMediaQuery, useTheme, Slide, Divider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";

const Navbar = () => {

    const [anchor, setAnchor] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const [user, loading, error] = useAuthState(auth);
    const { data: currentUser, isFetching, isLoading } = useFetchCurrentUserQuery(user?.uid);

    const theme = useTheme();
    const showNavLink = useMediaQuery(theme.breakpoints.up('lg'));


    return (
        <>
            {isVisible && <SearchModal onClick={() => setIsVisible(false)} />}
            <header className="header">
                <div className="logo">{showNavLink ? "GEO MOVIES" : "GM"}</div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/home" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                                {showNavLink && "Home"} {!showNavLink && <Home sx={{ fontSize: "33px" }} />}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/movies" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                                {showNavLink && "Movie"} {!showNavLink && <Movie sx={{ fontSize: "33px" }} />}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tv" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                                {showNavLink && "Tv Shows"} {!showNavLink && <Tv sx={{ fontSize: "33px" }} />}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                                {showNavLink && "News"} {!showNavLink && <Newspaper sx={{ fontSize: "33px" }} />}
                            </NavLink>
                        </li>
                    </ul>
                </nav> 
                <div className="nav-right">
                    <Search sx={{ fontSize: "35px", color: "#102A43" }} onClick={() => setIsVisible(true)} />
                    {showNavLink && !user && <Link to="/auth/login" ><Button className="login-btn">Login</Button></Link>}
                    {showNavLink && !user && <Link to="/auth/sign-up"><Button>Sign Up</Button></Link>}
                    {showNavLink && user && !currentUser?.data.imageUrl && <Link to={`/account/${currentUser?.data.username}`}><AccountCircle sx={{ fontSize: "40px", color: "#102A43" }} /></Link>}
                    {showNavLink && user && currentUser?.data.imageUrl &&
                        <Link to={`/account/${currentUser?.data.username}`}> <img src={currentUser?.data.imageUrl} alt="" /></Link>
                    }
                    {/* {user && <Link to="/home" ><Button onClick={logOut} >Logout</Button></Link>} */}
                    {showNavLink ? (user && <Link to="/home" ><Button onClick={logOut} >Logout</Button></Link>) :
                        <MoreVert onClick={(e) => setAnchor(e.currentTarget)} sx={{ fontSize: "40px", color: "#fff" }} />}
                    {!showNavLink && <Box >
                        <Menu
                            open={Boolean(anchor)}
                            anchorEl={anchor}
                            onClose={() => setAnchor(null)}
                            keepMounted
                            TransitionComponent={Slide}
                            PaperProps={{
                                style: {
                                    // maxHeight: 40 * 4,
                                    width: "20ch",
                                    // backgroundColor: "black"
                                }
                            }}
                        >
                            {user && <MenuItem>
                                <Link to={`/account/${currentUser?.data.username}`} className="menu-link">
                                    {currentUser?.data.imageUrl ?
                                        <img src={currentUser?.data.imageUrl} alt="" style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} /> :
                                        <AccountCircle sx={{ fontSize: "40px", color: "#fff" }} />}
                                    <p>Profile</p>
                                </Link>
                            </MenuItem>}
                            <Divider />
                            {user && <MenuItem> <Link to="/account/george/settings" className="menu-link" >
                                <Settings />
                                <p>Settings</p>
                            </Link>
                            </MenuItem>}
                            {user && <MenuItem className="menu-link" onClick={logOut}>
                                <Link to="/home" className="menu-link" >
                                    <Logout />
                                    <p>Logout</p>
                                </Link>
                            </MenuItem>}
                            {!user && <MenuItem>
                                <Link to="/auth/login" className="menu-link" >
                                    <Login />
                                    <p>Login</p>
                                </Link>
                            </MenuItem>}
                            {!user && <MenuItem>
                                <Link to="/auth/sign-up" className="menu-link">
                                    <Login />
                                    <p>Sign up</p>
                                </Link>
                            </MenuItem>}
                        </Menu>
                    </Box>}
                </div>
            </header>
        </>
    )
}

export default Navbar;