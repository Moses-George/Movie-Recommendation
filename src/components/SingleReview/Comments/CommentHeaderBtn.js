import React, { Fragment, useState } from "react";
import { Reply } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import '../../../styles/SingleReview/CommentHeaderBtn.scss';

// import classes from '../components/CrudBtn.module.css';
// import { ReactComponent as Reply } from '../Assets/images/icon-reply.svg';
// import { ReactComponent as Delete } from '../Assets/images/icon-delete.svg';
// import { ReactComponent as Edit } from '../Assets/images/icon-edit.svg';
// import DeleteModal from "./UI/DeleteModal";

const CommentHeaderBtn = (props) => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const showTextArea = () => {
        props.setIsReplying(!props.isReplying);
    }

    // const closeDeleteModalHandler = () => {
    //     setConfirmDelete(false);
    // }

    return (
        <Fragment>
            {/* {confirmDelete && <DeleteModal onCancel={closeDeleteModalHandler}
                onDeleteComment={() => props.onDeleteComment(props.type, props.id)} />} */}
            <div className='crud-btn'>
                <button className="reply" onClick={showTextArea} >
                    <Reply /> 
                </button>
                <button className="delete" onClick={() => setConfirmDelete(true)}>
                    <Delete /> 
                </button>
                <button className="edit" onClick={() => props.setIsEditing(true)} >
                    <Edit /> 
                </button>
            </div>
        </Fragment>
    )
}

export default CommentHeaderBtn;