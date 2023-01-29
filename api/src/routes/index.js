const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogames,Genres} = require('../db')
const { getAllGames,getGameByName,getDbInfo1 } = require('./controller.js/videogame');
const {API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', function (req,res){
    res.send("Test it's server running")
})
router.get('/videogames', async (req,res) => {
    const {name} = req.query
    let allGames = await getAllGames()
    if(name){
        const foundGameInApi = await getGameByName(name)
        const getNameDb = await getDbInfo1()
        let foundedGameInDb = getNameDb.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
        let all = foundGameInApi.concat(foundedGameInDb)
        if(all.length){
            res.status(200).send(all)
        } else {
            res.status(404).json(['Game not found'])
        }
    } else {
        res.send(allGames)
    }
})

router.get('/genres', async (req,res) => {
    const apiGenreURL = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresApi = await apiGenreURL.data.results.map(el => el.name)

    genresApi.forEach(el => {
        Genres.findOrCreate({
            where: {
                name: el
            }
        })
    });
    const allGenres = await Genres.findAll()
        res.status(200).send(allGenres)
})

router.post('/videogames', async (req,res,next) => {
    const {name,image ,description, released, rating, platforms, genres} = req.body
    try{
    let newGame = await Videogames.create({
        name, image, description, released, rating, platforms
    })
    let genInDb = await Genres.findAll({
        where: {
            name: genres
        }
    })
    await newGame.addGenre(genInDb)
    res.send('New game created')
}catch(error){
next(error)
}
})

router.get('/videogame/:id', async (req,res) => {
    const {id} = req.params
    if(!id.includes('-')) {
        const gameDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const data = await gameDetail.data
        let gameId = [{
            id: data.id,
            name: data.name,
            image: data.background_image,
            released: data.released,
            description: data.description_raw,
            rating: data.rating,
            genres: data.genres.map(g => g.name).join(','),
            platforms : data.platforms.map(p => p.platform.name).join(',')
        }]
        res.send(gameId)
    } else {
        let gameFounded = await Videogames.findByPk(id, {
            include: [{
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }]
        })
        var newArr = []
        newArr.push(gameFounded)
        
        res.send(newArr)
    }
})

module.exports = router;
