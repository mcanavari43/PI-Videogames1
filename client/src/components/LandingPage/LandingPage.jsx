import React from "react";
import {Link} from 'react-router-dom';
import "./Landing.css"
const LandingPage = () => {
    return (
        <div className="containerLanding">
            <div className="miniContainer">
                <h1 className="header">Videogames Henry</h1>
                <h3 className="welcome">Welcome</h3>
                <Link to ='/home'>
                    <button className="box">Explore</button>
                </Link>
            </div>
        </div>
    )   
}
export default LandingPage;
