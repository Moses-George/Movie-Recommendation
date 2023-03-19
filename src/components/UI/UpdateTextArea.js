import React from "react";
import "./UpdateTextArea.scss";


const UpdateTextArea = ({value, setContent, updateReview}) => {

    return (
        <div className="update-form" >
            <textarea onChange={(e)=> setContent(e.target.value)} value={value} />
            <div className="update-btn">
                <button onClick={updateReview} >UPDATE</button>
            </div>
        </div>
    )
}

export default UpdateTextArea;