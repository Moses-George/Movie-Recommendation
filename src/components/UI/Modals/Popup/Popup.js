import React from "react";
import ReactDOM from "react-dom";
import "./Popup.scss";

const PopupOverlay = ({ message }) => {

    return (
        <div className="favourite-popup__wrapper">
            <div className="favourite-popup">{message}</div>
        </div>
    )
}

const Popup = ({ message }) => {

    return (
        <>
            {ReactDOM.createPortal(<PopupOverlay message={message} />, document.getElementById("modal-root"))}
        </>
    )
}

export default Popup;   