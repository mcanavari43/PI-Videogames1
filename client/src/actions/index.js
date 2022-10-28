import axios from 'axios';
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY"
export const SORT_RATING = "SORT_RATING"
export const ORDER_CREATED = "ORDER_CREATED"
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const FILTER_GAMES_GENRE = "FILTER_GAMES_GENRE"
export const GET_GAME_DETAIL = "GET_GAME_DETAIL"
export const POST_GAME = 'POST_GAME'
export const GET_CLEAN = "GET_CLEAN"
export const CLEAN_GENRE = "CLEAN_GENRE"
export const CLEAN_GAMES = "CLEAN_GAMES"

export function getAllGames(){
    try{
    return async function(dispatch){
    var json = await axios.get("/videogames");
    return dispatch({
    type: GET_ALL_GAMES,
    payload: json.data
    })
}
}catch(error){
    console.log(error)
}
 }
 export function getAllGenres(){
     try{
    return async function(dispatch){
        const json = await axios.get('/genres'); 
                return dispatch({
                type: GET_ALL_GENRES,
                payload: json.data
            });
        }
    } catch(error){
        console.log(error)
    }
 }

 export function filterGamesGenre(payload){
    console.log(payload)
    return {
        type: FILTER_GAMES_GENRE,
        payload
    }
 }
 

 export function orderCreated(payload){
    console.log(payload)
     return {
         type: ORDER_CREATED,
         payload
     }
 }
export function getGamesByName(name) {
    return async function (dispatch){
        try{
            var json = await axios.get(`/videogames?name=${name}`)
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: json.data
            })
        } catch (error){
            console.log(error)
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: [{msg: "Not found any games"}]
            })
        }
    }
}
export function getDetail(id) {
   try{
       return async function(dispatch) {
           var detail = await axios.get(`/videogame/${id}`)
           return dispatch ({
               type: GET_GAME_DETAIL,
               payload: detail.data
           })
       }
   } catch(error){
       console.log(error)
   }
}

export function postNewGame(payload){
    return async function(dispatch){
        var json = await axios.post(`/videogames`, payload)
        dispatch({
            type: POST_GAME
        })
        console.log(json)
        return json
    }
}
export function sortAlphabetically(payload){
    return {
        type: SORT_ALPHABETICALLY,
        payload
    }
}
export function cleanGenre(){
    return {
        type: CLEAN_GENRE
    }
}
export function cleanGames(){
    return {
        type: CLEAN_GAMES
    }
}
export function getClean(){
    return {
        type: GET_CLEAN
    }
}
export function sortByRating(payload){
    return {
        type: SORT_RATING,
        payload
    }
}