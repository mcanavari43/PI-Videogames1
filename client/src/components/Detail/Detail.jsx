import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {getDetail,getClean} from '../../actions'
import './Detail.css'

export default function Detail (props) {
    console.log(props) 
            
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getDetail(props.match.params.id))
    return () =>{
        dispatch(getClean())
    }
},[dispatch])
               
const DetailState = useSelector((state) => state.gameDetail)
return (
    <div>
        <div>
            <Link to='/home'>
                <p>Return Home</p>
            </Link>
        </div>              
        {             
            DetailState.length > 0 ?
            <div>
                <div>
                    <header>{`Details of "${DetailState[0].name}"`}</header>
                </div>   
                <div>       
                    <div>
                        {DetailState[0].image ?
                        <img src={DetailState[0].image} alt="Not found" width='100%' height='520px'/> :
                        <img src="" alt="Not found" width="" height=""/>
                        }
                        <div>
                            <div>
                                <h1>Genres: </h1>
                                {
                                    DetailState[0].genres.length ?
                                <h3>{DetailState[0].genres.name ?
                                    DetailState[0].genres : 
                                    DetailState[0].genres}
                                        </h3> :
                                        <h3>No genres assigned to game</h3>
                                }
                            </div>
                            <div>
                                <h1>Platforms: </h1>
                                {DetailState[0].platforms.length ?
                                <h3>{   DetailState[0].platforms.name ? 
                                    DetailState[0].platforms :
                                    DetailState[0].platforms}
                                </h3> : <h3>No platforms registered</h3>
                                }   
                            </div>
                        </div>          
                    </div>
                </div>
                    <div>
                        <h1>About the game:</h1>
                        <h1>{DetailState[0].description.replace(/<\/?[^>]+>/gi, '').replace(/&#39;/g, "'")}</h1>
                        <div>
                            <div>
                                <h1>Released: </h1>
                                <h3>{DetailState[0].released}</h3>
                            </div>
                            <div>
                                <h1>Rating:</h1>
                                <h3>{`★ ${DetailState[0].rating}`}</h3>
                            </div>
                        </div>
                    </div>
            </div> : <p>Loading...</p> 
        }
    </div>
)             
}