import { Fragment } from "react"
import ReactDOM from 'react-dom';
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.scss";
import Backdrop from "../../../components/UI/Modals/Backdrop";
import { Avatar } from '@mui/material';
import { ArrowBack, Settings, Login, Logout } from '@mui/icons-material';
import { logOut } from "../../../firebase";
import { navigationData } from "../navigationData";

const SidebarOverlay = ({ openSidebar, setOpenSidebar, currentUser, user, imageUrl }) => {


    return (
        <aside className={openSidebar ? "open-sidebar sidebar" : "sidebar"}>
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
                {user ? (imageUrl ? <img src={imageUrl} alt='profil-pic' /> : <Avatar sx={{ width: "6rem", height: "6rem" }} />) : ""}
                {user && <p>{currentUser?.data.username}</p>}
            </div>
            <ul>
                {navigationData.map(navItem =>
                    <li key={navItem.id}>
                        <NavLink to={navItem.path} className={({ isActive }) => (!isActive ? "unselected" : "active-sidebar-link")}>
                            {navItem.icon}
                            <span>{navItem.text}</span>
                        </NavLink>
                    </li>
                )}
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
        </aside>
    )
}

const Sidebar = ({ setOpenSidebar, currentUser, user, imageUrl, openSidebar }) => {

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={() => setOpenSidebar(false)} />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(
                <SidebarOverlay openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} currentUser={currentUser} user={user} imageUrl={imageUrl} />,
                document.getElementById("modal-root"))}
        </Fragment>
    )
}

export default Sidebar;