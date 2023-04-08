import React from "react";
import { Link } from 'react-router-dom'
import { Twitter, GitHub, WhatsApp, Facebook, LinkedIn } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ReactComponent as Tmdb } from "../../Assets/images/tmdb.svg";
import Button from "../../components/UI/Button/Button";
import './Footer.scss';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/service/currentUserSlice";

const Footer = () => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer">
            <div className="footer-left">
                <h1>GEO MOVIES</h1>
                <p>Ugbowo Campus, University of Benin</p>
                <div className="social-icons">
                    <a href="https://www.com.twitter/GeorgeM_32" target='_blank' rel="noreferrer">
                        <Twitter sx={{ fontSize: "35px" }} />
                    </a>
                    <a href="https://www.linkedin.com/in/george-moses-427601240" target='_blank' rel="noreferrer">
                        <LinkedIn sx={{ fontSize: "35px" }} />
                    </a>
                    <a href="https://wa.me/08165960182" target='_blank' rel="noreferrer">
                        <WhatsApp sx={{ fontSize: "35px" }} />
                    </a>
                    <a href="https://github.com/Moses-George" target='_blank' rel="noreferrer">
                        <GitHub sx={{ fontSize: "35px" }} />
                    </a>
                </div>
            </div>
            <div className="footer-right">
                <div className="quick-links">
                    <h3>QUICK LINKS</h3>
                    <Link to="/movies">Movies</Link>
                    <Link to="/tv">TV Shows</Link>
                    <Link to="">Animations</Link>
                    <Link to="/news">Blog</Link>
                </div>
                <div className="my-account">
                    <h3>ACCOUNTS</h3>
                    <Link to={user ? `/account/${currentUser?.data.username}` : "/auth/login"}>My Account</Link>
                    <Link to="/auth/sign-up">Sign Up</Link>
                    <Link to="/auth/login">Login</Link>
                    <Link to="/news">News</Link>
                </div>
                <div className="copyright">
                    <Tmdb />
                    <p>Copyright {year} George Moses</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;