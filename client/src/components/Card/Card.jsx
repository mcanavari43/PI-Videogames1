import React from "react";
import { Link } from "react-router-dom";
import './Card.css'
export default function Card({name,image,genres,rating,id}){
    return (
    <div className="bigcontainer">
        {
            image ?
            // <img src={image} alt="Not Found" width="350px" height="200px"/> :
            <img src={image} alt="Not Found"/> :
            <img src='https://cdn.pixabay.com/photo/2021/05/06/14/51/gamepad-6233583_960_720.png' alt="Not Found" width="350px" height="200px"/>
        }   
        <div className="galeria">
            <div className="genreCard">
        {
            genres.length ?
            <p>{ genres[0].name ?
            genres.map(genre => genre.name) :
            genres}</p> : <p>No genres</p>
        }   
        </div>
        <a>
                <Link to={`/videogame/${id}`}>
                <h1>{name}</h1>
                </Link>
        </a>
                <h3>{`★ ${rating}`}</h3>
                </div>  
    </div>

   )
}