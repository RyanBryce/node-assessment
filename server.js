const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app  = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
var userCtrl = require('./userCtrl.js');

app.get('url', function(req, res, next) {
  if (true) {

  }
});

app.get('/api/users', (req, res, next)=>{
  if(req.query.favorites){
    res.status(200).send(userCtrl.getUsersByFavorite(req.query.favorites))
  }
  else if(req.query.age){
    res.status(200).send(userCtrl.getUsersByAgeLimit(req.query.age))
  }
  else if(req.query.lastname){
    res.status(200).send(userCtrl.findUserByQuery('last_name', req.query.lastname))
  }
  else if(req.query.email){
    res.status(200).send(userCtrl.findUserByQuery('email', req.query.lastname))
  }
  else {
    res.status(200).send(userCtrl.readAll())
  }
})
app.get('/api/users/:id', (req, res, next) => {
  let userId = req.params.id;
  let user = userCtrl.findUserById(userId)
  if (user) {
    res.status(200).send(user)
  }else {
    res.status(400)
  }
})
app.get('/api/admins', (req, res, next) => {
  let admins = userCtrl.getAdmins()
  res.status(200).send(admins)
})
app.get('/api/nonadmins', (req, res, next) => {
  let nonadmins = userCtrl.getNonAdmins()
  if (nonadmins) {
    res.status(200).send(nonadmins)
  }else {
    end();
  }
})
app.put('/api/users/:id', function (req, res, next) {
  let id = req.params.id
  let user = userCtrl.updateUser(id, req.body);
  res.status(200).json(user);
})
app.post('/api/users', function (req, res, next) {
  let user = userCtrl.createUser(req.body);
  res.status(200).json(user);
})
app.delete('/api/users/:id', (req, res, next) => {
  let id = req.params.id;
  let user = userCtrl.removeUser(id);
  res.status(200).json(user)
})




const port = 3000;
// app.listen(port, () => {
//   console.log(`up and running on part ${port}`)
// })
module.exports = app;
