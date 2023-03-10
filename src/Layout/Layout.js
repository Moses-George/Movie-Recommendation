import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import './Layout.scss'

const Layout = ({ children }) => {

    const location = useLocation();
    const path = location.pathname;

    const authPage = path.split("/").includes("auth");

    return (
        <Fragment>
            {!authPage && <Navbar />}
            <main style={{ height: `${authPage ? "100%" : "auto"}` }} className="main">{children}</main>
            {!authPage && <Footer />}
        </Fragment>
    )
}

export default Layout;