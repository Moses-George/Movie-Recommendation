import React from "react";
import ReactDOM from 'react-dom';
import '../Modals/SearchModal.scss';
import SearchBar from '../SearchBar';

const Backdrop = ({ onClick }) => {
    return <div onClick={onClick} className="backdrop" />
}

const SearchModalOverlay = ({onClick}) => {

    return (
        <div className="search-modal">
            <SearchBar onClick={onClick} />
            <hr />
            <div className="search-result">
                <p>No History.</p>
            </div>
        </div>
    )
}

const SearchModal = ({ onClick }) => {

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={onClick} />,
                document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<SearchModalOverlay onClick={onClick} />,
                document.getElementById("modal-root"))}
        </>
    )
}

export default SearchModal;