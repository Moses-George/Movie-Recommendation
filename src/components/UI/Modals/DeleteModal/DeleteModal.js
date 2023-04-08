import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import Backdrop from "../Backdrop";
import "./DeleteModal.scss";
import { useParams } from "react-router-dom";

const DeleteModalOverlay = ({ onCancel, onDelete}) => {

    const { commentId } = useParams();
    
    const type = commentId ? "reply" : "comment";

    return (
        <div className="delete-modal">
            <h3>Delete comment</h3>
            <p>{`Are you sure you want to delete this ${type} ? This will remove the ${type} and can't be undone`}</p>
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