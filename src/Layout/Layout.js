import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import './Layout.scss';
import Popup from "../components/UI/Modals/Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { showPopUpMessage } from "../store/features/addFavouriteSlice";

const Layout = ({ children }) => {

    const location = useLocation();
    const path = location.pathname;

    const authPage = path.split("/").includes("auth");

    const dispatch = useDispatch();
    const popUpMessage = useSelector((state)=> state.favouriteMessage.message);

    useEffect(() => {
        const timer = setTimeout(() => dispatch(showPopUpMessage("")), 4000);
        return () => clearTimeout(timer);
    }, [popUpMessage]) 

    return (
        <Fragment>
        {popUpMessage && <Popup message={popUpMessage} />}
            {!authPage && <Navbar />}
            <main style={{ height: `${authPage ? "100%" : "auto"}` }} className="main">{children}</main>
            {!authPage && <Footer />}
        </Fragment>
    )
}

export default Layout;