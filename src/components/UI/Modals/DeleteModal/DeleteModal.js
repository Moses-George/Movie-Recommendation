import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import Backdrop from "../Backdrop";
import "./DeleteModal.scss";

const DeleteModalOverlay = ({ onCancel, onDelete }) => {

    return (
        <div className="delete-modal">
            <h3>Delete comment</h3>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
            <div className="delete-btn">
                <button onClick={onCancel} >NO, CANCEL</button>
                <button onClick={onDelete} >YES, DELETE</button>
            </div>
        </div>
    )
}

const DeleteModal = ({ onCancel, onDelete }) => {

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(
                <DeleteModalOverlay
                    onCancel={onCancel}
                    onDelete={onDelete}
                />,
                document.getElementById("modal-root"))}
        </Fragment>
    )
}

export default DeleteModal;