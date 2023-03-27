import React from "react";
import { Link } from 'react-router-dom'
import { Twitter, GitHub, WhatsApp, Facebook } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Button from "../../components/UI/Button";
import '../../styles/Footer/Footer.scss';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useFetchCurrentUserQuery } from "../../store/features/currentUserSlice";

const Footer = () => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchCurrentUserQuery(user?.uid);

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <div className="footer">
                <div className="footer-left">
                    <h1>GEO MOVIES</h1>
                    <p>Ugbowo Campus, University of Benin</p>
                    <div className="social-icons">
                        <Link to=""><Twitter sx={{ fontSize: "35px" }} /></Link>
                        <Link to=""><Facebook sx={{ fontSize: "35px" }} /></Link>
                        <Link to=""><WhatsApp sx={{ fontSize: "35px" }} /></Link>
                        <Link to=""><GitHub sx={{ fontSize: "35px" }} /></Link>
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
                    <div className="news-letter">
                        <h3>NEWSLETTER</h3>
                        <form>
                            <TextField label="Enter Email" variant="standard"
                                sx={{ width: "100%", "& .MuiInputBase-root": { backgroundColor: "gray", color: "#fff" } }} />
                            <Button>Subscribe now</Button>
                        </form>
                    </div>
                </div>
            </div>
            <i>Copyright {year} George Moses</i>
        </footer>
    )
}

export default Footer;