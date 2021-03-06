require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Genres, Videogame } = require("../db");


const gameInDb = async (id) => {
    try {
       return await Videogame.findByPk(id, {
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
				include: {
					model: Genres,
					as: 'genres',
					attributes: ['id', 'name'],
					through: { attributes: [] },
				},
			});
    }
    catch(error) {
      return error
    }
  }
  
  router.get(`/:idVideogame`, async (req, res) => {
      const { idVideogame } = req.params;
    if (idVideogame.includes("-") && typeof idVideogame === "string") {
      let gameAskDb = await gameInDb(idVideogame);
      //let gameFilterId = await gameAskDb.filter( gId => gId.id === idVideogame) 
      return res.status(200).json(gameAskDb)
    } else {
      const allId = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`
      );
      res.json( {
        id: allId.data.id,
        name: allId.data.name,
        image: allId.data.background_image,
        description: allId.data.description,
        released: allId.data.released,
        rating: allId.data.rating,
        platforms: allId.data.platforms.map((e) =>  e.platform.name),
        genres: allId.data.genres.map((e) => {
          return {
              id: e.id,
              name: e.name
          }
      }),
      })
    }
    });
    
    router.post('/', async (req, res) => {
      let {
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        createdInDb,
      } = req.body
  
      let videogameCreated = await Videogame.create({
        name, 
        description,
        released,
        rating,
        platforms,
        createdInDb
      })
  
      let genresInDb = await Genres.findAll({
        where: {name: genres},
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      })
      videogameCreated.addGenres(genresInDb);
      res.send("Videogame created successfully");
    })

    module.exports = router;
























