import React from "react";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import "./Landing.css"
import { getAllGames,getAllGenres } from "../../actions";
import { useEffect } from "react";


const LandingPage = () => {
    const dispatch = useDispatch()
    useEffect ( ()=> {
        dispatch(getAllGames())
        dispatch(getAllGenres());
    },[dispatch])
    return (
        <div className="containerLanding">
            <div className="miniContainer">
                <h1 className="header">Videogames Henry</h1>
                <Link to ='/home'>
                    <button className="boxLanding">Start</button>
                </Link>
            </div>
        </div>
    )   
}
export default LandingPage;
