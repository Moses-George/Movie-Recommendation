import React from "react";
import ReactDOM from "react-dom";
import "./FavouriteAdded.scss";

const FavouriteAddedOverlay = ({ message }) => {

    return (
        <div className="favourite-popup__wrapper">
            <div className="favourite-popup">{message}</div>
        </div>
    )
}

const FavouriteAdded = ({ message }) => {

    return (
        <>
            {ReactDOM.createPortal(<FavouriteAddedOverlay message={message} />, document.getElementById("modal-root"))}
        </>
    )
}

export default FavouriteAdded;   