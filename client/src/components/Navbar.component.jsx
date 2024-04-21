import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState } from "react";
import "./StyleUtils.style.css";

const Navbar = (props) => {
    const title1 = props.title1;
    const link1 = props.link1;
    const title2 = props.title2;
    const link2 = props.link2;
    const title3 = props.title3;
    const link3 = props.link3;
    const title4 = props.title4;
    const link4 = props.link4;

    return (
        <div className = "navbar">
            <img src="/applogo.png" alt="studyberry" className="logo"></img>
            <ul className="nav-links">
                <li> <Link to={link1} className="link">{title1}</Link></li>
                <li><Link to={link2} className="link">{title2}</Link></li>
                <li><Link to={link3} className="link">{title3}</Link></li>
                <li><Link to={link4} className="link">{title4}</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;