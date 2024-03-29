import React from "react";
import './Button.scss';

const Button = ({ children, className, onClick, disabled }) => {

    return <button className={`button ${className}`} onClick={onClick} disabled={disabled} >{children}</button>
}

export default Button;