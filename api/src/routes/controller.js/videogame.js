const axios = require('axios')
const {API_KEY} = process.env;
const { Videogames,Genres } = require('../../db')



const getGameInfo = async () => {
    var pages = [1,2,3,4].map (async (e) => await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`))
    let allPages = await Promise.all(pages) 
    let apiURL = allPages.reduce( (prev,curr) => {
        return prev.concat(curr.data.results);
    },[]
);

const gameApi = apiURL.map(g => {
    return {
        id: g.id,
        name: g.name,
        image: g.background_image,
        released: g.released,
        rating: g.rating,
        genres: g.genres.map( gen => gen.name).join(', '),
        platforms: g.platforms.map(p => p.platform.name).join(', '),
    }
})
return gameApi
}

const getDbInfo1 = async () => {
    return await Videogames.findAll({
        include: [{
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }]
    })
}

const getAllGames = async () => {
    let gamesApi = await getGameInfo();
    let gameDbInfo = await getDbInfo1();
    let infoTotal = gamesApi.concat(gameDbInfo)
    return infoTotal
}

const getGameByName = async (name) => {
    const apiURL = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)
    const gameData = await apiURL.data.results.map(el =>{
        return {
            id: el.id,
            name: el.name,
            image: el.background_image,
            description: el.description,
            rating: el.rating,
            genres: el.genres.map(g => g.name).join(','),
            // platforms : el.platforms.map(p => p.platform.name).join(',')
        }
    }) 
    return gameData
}


module.exports = {
    getAllGames,
    getGameByName,
    getDbInfo1
}