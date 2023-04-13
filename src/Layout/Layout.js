import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navigation/Navbar/Navbar";
import Footer from "./Footer/Footer";
import './Layout.scss';
import Popup from "../components/UI/Modals/Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { showPopUpMessage } from "../store/features/popupMessageSlice";
import { Navigation } from "@mui/icons-material";

const Layout = ({ children }) => {

    // const [showButton, setShowButton] = useState(false);

    const location = useLocation();
    const path = location.pathname;

    const authPage = path.split("/").includes("auth");

    const dispatch = useDispatch();
    const popUpMessage = useSelector((state) => state.popupMessage.message);

    useEffect(() => {
        const timer = setTimeout(() => dispatch(showPopUpMessage("")), 4000);
        return () => clearTimeout(timer);
    }, [popUpMessage, dispatch]);

    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         if (window.pageYOffset > 300) {
    //             setShowButton(true);
    //         } else {
    //             setShowButton(false);
    //         }
    //     })
    // }, []);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <Fragment>
            {popUpMessage && <Popup message={popUpMessage} />}
            {!authPage && <Navbar />}
            <main style={{ height: `${authPage ? "100%" : "auto"}` }} className="main">{children}</main>
            {!authPage && <Footer />}
            {!authPage &&  <div className="scroll-up" onClick={scrollToTop} >
                <Navigation sx={{ fontSize: "2rem", color: 'white' }} />
            </div>}
        </Fragment> 
    )
}

export default Layout;