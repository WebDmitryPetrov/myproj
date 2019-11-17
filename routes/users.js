var express = require('express');
var router = express.Router();
var uuid = require('uuid');

let users = require('../models/users')
let films = require('../models/films')

router.post('/users/login', function(req,res,next) {
  const user = users.find(item => item.name === req.body.name)
  if(user && user.password === req.body.password){
  user.token = uuid()
  user.exp = new Date()
  user.exp.setMinutes(user.exp.getMinutes() + 10)
res.send(users);
} else {
  res.status(401).send();
}
next()      
});

let auth = function(req,res,next) {
  const user = users.find(item => item.id === req.params.id)
  if(user && req.body.token === user.token && new Date() < user.exp){
    next()
  } else {
    delete user.token
    res.status(401).send()
  }
}
router.use('/users/:id', auth)

router.get('/users', (req,res,next) => {
    const foundUsers = users.filter(user => {
    for(let key in req.query){
      return (user[key] == req.query[key] || user[key].includes(req.query[key]))?true:false
    }
    return true
  })
    res.send(JSON.stringify(foundUsers))
});
/*router.post('/users/:id/films',(req,res) =>{
  const user = users.find(item => item.id === req.params.id)
  let film = req.body.film
  user.films || (user.films = [])
  user.films.push(film)
  res.send(users)
})*/router.post('/users/:id/films',(req,res) => {
  const film = films.find(film => film.id === req.body.film)
  const user = users.find(item => item.id === req.params.id)
  user.films || (user.films = [])
  user.films.push(film)
  res.send(users)
 })

router.get('/users/:id', (req,res,next) => {
  const user = users.find(item => item.id === req.params.id)
  res.send(JSON.stringify(user))
  next()
});
/*router.get('/users/:id', (req,res) => {
  let user = users.find(user => user.id === req.params.id)
  res.send(JSON.stringify(user))
});
router.put('/users/:id', (req,res) => {
  let user = req.body 
  users = users.filter(item => req.params.id !== item.id)
  users.push(user)
  res.send(JSON.stringify(users))
})*/
router.delete('/users/:id', (req, res) => {
  users = users.filter(item => req.params.id !== item.id)
  res.redirect('/users').send(JSON.stringify(users))
})

/* GET home page. *//*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
