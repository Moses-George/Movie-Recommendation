import { Fragment } from "react"
import ReactDOM from 'react-dom';
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.scss";
import Backdrop from "../Modals/Backdrop";
import { Avatar } from '@mui/material';
import { ArrowBack, Home, Movie, Newspaper, Settings, Tv, Login, Logout } from '@mui/icons-material';
import { logOut } from "../../../firebase";

const SidebarOverlay = ({ setOpenSidebar, currentUser, user, imageUrl }) => {


    return (
        <section className="sidebar">
            <div className="sidebar-header">
                <div className='sidebar-dots'>
                    <span />
                    <span />
                    <span />
                </div>
                <div className='sidebar-arrowback'>
                    <ArrowBack onClick={() => setOpenSidebar(false)} sx={{ color: "#fff", fontSize: "35px" }} />
                </div>
            </div>
            <div className='sidebar-profile'>
                {user ? (imageUrl ? <img src={imageUrl} alt='profil-pic' /> : <Avatar sx={{ width:"6rem", height:"6rem" }} />) : ""}
                {user && <p>{currentUser?.data.username}</p>}
            </div>
            <ul>
                <li>
                    <NavLink to="/home" className={({ isActive }) => (!isActive ? "unselected" : "active-sidebar-link")}>
                        <Home />
                        <span>Home</span>
                    </NavLink> 
                </li>
                <li>
                    <NavLink to="/movies" className={({ isActive }) => (!isActive ? "unselected" : "active-sidebar-link")}>
                        <Movie />
                        <span>Movies</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tv" className={({ isActive }) => (!isActive ? "unselected" : "active-sidebar-link")}>
                        <Tv />
                        <span>Tv Shows</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/news" className={({ isActive }) => (!isActive ? "unselected" : "active-sidebar-link")}>
                        <Newspaper />
                        <span>News</span>
                    </NavLink>
                </li>
            </ul>
            <div className="sidebar-account">
                <p>Account</p>
                <div className="sidebar-account-links">
                    {!user && <Link to="/auth/login" className="menu-link">
                        <Login />
                        <p>Login</p>
                    </Link>}
                    {!user && <Link to="/auth/sign-up" className="menu-link">
                        <Login />
                        <p>Sign up</p>
                    </Link>}
                    {user && <Link to={`/auth${currentUser?.data.username}/settings`} className="menu-link">
                        <Settings />
                        <p>Settings</p>
                    </Link>}
                    {user && <Link to="/home" className="menu-link" onClick={logOut} >
                        <Logout />
                        <p>Logout</p>
                    </Link>}
                </div>
            </div>
        </section>
    )
}

const Sidebar = ({ setOpenSidebar, currentUser, user, imageUrl }) => {

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={() => setOpenSidebar(false)} />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(
                <SidebarOverlay setOpenSidebar={setOpenSidebar} currentUser={currentUser} user={user} imageUrl={imageUrl} />,
                document.getElementById("modal-root"))}
        </Fragment>
    )
}

export default Sidebar;