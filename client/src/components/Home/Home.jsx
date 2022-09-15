import React from "react";
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllGames,filterGamesGenre,getAllGenres,orderCreated,sortAlphabetically,sortByRating} from '../../actions'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import SearchBar from "../Searchbar/Searchbar";
import './Home.css'

export default function  Home(){
    const dispatch = useDispatch()
    let allGames = useSelector(state => state.games)
    const allGenres = useSelector(state => state.genres)
    const [currentPage,setCurrentPage] = useState(1)
    const [header, setHeader] = useState('Explore all the Games')
    const [order,setOrder] = useState('Watch games')
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

    const pageNow = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect ( ()=> {
        dispatch(getAllGames())
        dispatch(getAllGenres());
    },[dispatch])
    // const gameDetails = useSelector(state => state.gameDetail)
    // useEffect( () => {
    //         dispatch(getAllGenres())
    //     {
    //         dispatch(getAllGames())
    //     }
    // },[dispatch])

    function handleClick(e){
        e.preventDefault()
        window.location.reload()
    }
    function handleGenre(e){
        e.target.value === 'all' ?
        dispatch(getAllGames()) &&
        setHeader('Explore all the Games') :
        dispatch(filterGamesGenre(e.target.value))
        setCurrentPage(1);
        setHeader(`Filtered by: ${e.target.value} genre`)
    }
    function handleRatingSort(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
        setCurrentPage(1);
        setOrder(`Sorted by: ${e.target.value}`)
        setHeader(`Sorted by: ${e.target.value}`)
    }
    function handleSort(e){
        e.preventDefault();
        dispatch(sortAlphabetically(e.target.value))
        setCurrentPage(1);
        setOrder(`Sorted by: ${e.target.value}`)
        setHeader(`Sorted by: ${e.target.value}`) // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1

    }
    function handleOrderCreated(e){
        e.target.value === 'all' ?
        dispatch(getAllGames()) :
        dispatch(orderCreated(e.target.value))
        setCurrentPage(1)
        setHeader(`Filtered by Origin: ${e.target.value} games`)
    }

    return (
        <div className="header">
            <h1>{header}</h1>
            <SearchBar className='searchbar'setHeader={setHeader} setCurrentPage={setCurrentPage}></SearchBar>
            <div className="container">
                <div className="sort">
                    <div className="rating">
                        <label>Sort By:</label>
                            <select onChange={e => handleRatingSort(e)}>
                                <option hidden value='Rating'>Rating</option>
                                <option value="Highest to Lowest Rating">Highest to Lowest</option>
                                <option value="Lowest to Highest Rating">Lowest to Highest</option>
                            </select>
                            <select onChange={e => handleSort(e)}>
                                <option hidden value='Alphabetically'>Alphabetically</option>
                                <option value="A - Z">A - Z</option>
                                <option value="Z - A">Z - A</option>
                            </select>
                            </div>
                            <div className="origin">
        
                        <label className="filter">Filter By:</label>
                        <select onChange={e => handleOrderCreated(e)}>
                        <option hidden value="origin">Origin</option>
                        <option className="btnAll" value="all">All</option>
                        <option className="btnApi" value="api">Api Existent</option>
                        <option className="btnDb" value="db">Db created</option>
                        </select>
                        <select onChange={e => handleGenre(e)}>
                            <option hidden value="genre">Genres</option>
                            <option value="all">All</option>
                            {
                                allGenres?.map(ge => (
                                    <option key={ge.id} value={ge.name}>{ge.name}</option>
                                ))
                            }
                        
                        </select>
                        
                        </div>
                        <div className="container-options">
                        
                            <label className="option"> Other options: </label>
                            <button className="btnReset" onClick={e => {handleClick(e)}}>Reset Games</button>
                            <Link to='/videogame'>
                                <button className="btnCreate" >Create new game</button>
                            </Link>
                       
                        </div>
                        </div>
                        <div className="paginado">
                    <Pagination 
                        gamesPerPage={gamesPerPage}
                        allGames={allGames.length}
                        pageNow={pageNow}
                    />
                    </div>
                    <div className="containerCards">
                    {
    currentGames?.map((e) => {
        return (
            
            <div className="cards" key={(e.id)}>
            {/* <Link to={'/home/' + e.id}> */}
                
            <Card name={e.name} image={e.image}  rating={e.rating} genres={e.genres} id={e.id}/>

            {/* </Link> */}
            </div>
            );
        })
}
</div>
                    
                </div>
            </div>
    )
}