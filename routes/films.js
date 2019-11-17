var express = require('express');
var router = express.Router();
var uuid = require('uuid');

let films = require('../models/films')

router.get('/films', (req,res,next) => {
  const foundFilms = films.filter(film => {
  for(let key in req.query){
    return (film[key] == req.query[key] || film[key].includes(req.query[key]))?true:false
  }
  return true
})
  res.send(JSON.stringify(foundFilms))
})
router.get('/films/:id', (req,res) => {
let film = films.find(film => film.id === req.params.id)
res.send(JSON.stringify(film))
})
router.post('/films', (req,res) => {
  let film = req.body
  film.id = uuid()
  films.push(film)
  res.status(201).send(JSON.stringify(films))
})
router.put('/films/:id', (req,res) => {
  let film = req.body 
  films = films.filter(item => req.params.id !== item.id)
  films.push(film)
  res.send(JSON.stringify(films))
})
router.delete('/films/:id', (req, res) => {
  films = films.filter(item => req.params.id !== item.id)
  res.send(JSON.stringify(films))
})

/*router.get('/films', (req,res,next) => {
    const foundfilms = films.filter(film => {
    for(let key in req.query){
      return (film[key] == req.query[key] || film[key].includes(req.query[key]))?true:false
    }
    return true
  })
    res.send(JSON.stringify(foundfilms))
});
router.post('/films/login', function(req,res,next) {
    const film = films.find(item => item.name === req.body.name)
    if(film && film.password === req.body.password){
    film.token = uuid()
  res.send(film.token);
  } else {
    res.status(401).send();
  }
  next()      
});
let auth = function(req,res,next) {
  const film = films.find(item => item.id === req.params.id)
  if(film && req.body.token === film.token){
    next()
  } else {
    res.status(401).send()
  }
}
router.post('/films/:id/films',(req,res) =>{
  const film = films.find(item => item.id === req.params.id)
  if(film && film.token === req.body.token){
    film.films = req.body.film
    res.send(user.films)  
  } else {
    res.status(401).send()
  }
})
router.use('/films/:id', auth)
router.get('/films/:id', (req,res,next) => {
  const film = films.find(item => item.id === req.params.id)
  res.send(JSON.stringify(film))
  next()
});
*/

module.exports = router;
