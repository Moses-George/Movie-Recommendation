import React from "react";
import ReactDOM from "react-dom";
import "./FavouriteAdded.scss";

const FavouriteAddedOverlay = () => {

    return (
        <div className="favourite-popup__wrapper">
            <div className="favourite-popup">Added to Favourite List</div>
        </div>
    )
}

const FavouriteAdded = () => {

    return (
        <>
            {ReactDOM.createPortal(<FavouriteAddedOverlay />, document.getElementById("modal-root"))}
        </>
    )
}

export default FavouriteAdded;   