import React from "react";
import ReactDOM from 'react-dom';
import "../Modals/ImagePreview.scss";
import Button from "../Button";

const Backdrop = ({ onClick }) => {
    return <div onClick={onClick} className="backdrop" />
}

const ImagePreviewOverlay = ({onClose, onSave, image, progressPercent}) => {

    return (
        <div className="imagePreview">
            <img src={`${URL.createObjectURL(image)}`} alt="profile picture" />
            {progressPercent > 0 && <div className="percentage-bar">
                <div className="percentage-bar-loader" style={{width: `${progressPercent}%`}}></div>
            </div>}
            <div className="imagePreview-btn">
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSave}>Save</Button>
            </div>
        </div>
    )
}

const ImagePreview = ({ onClose, onSave, image, progressPercent }) => {

    return (
        <>
            {ReactDOM.createPortal(<Backdrop />,
                document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ImagePreviewOverlay onClose={onClose} onSave={onSave} image={image} progressPercent={progressPercent} />,
                document.getElementById("modal-root"))}
        </>
    )
}

export default ImagePreview;