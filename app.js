const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////Login API////////////////

const authenticate = async (username, password) => {

  const user = {
    id: 1,
    username: 'user',
    password: 'pass',
  };

  if (username === user.username && password === user.password) {
    return user;
  } else {
    return null;
  }
};

// set up route to index page
app.get('/', (req, res) => {
  res.render('login');
});

// set route for login
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await authenticate(username, password);
  if (user) {
    // if user put in right password, then they will login
    res.redirect('/cargo');
  } else {
    //if not, it will redirect them back to login page
    res.render('login', { error: 'Invalid username or password' });
  }
});


////////////////Captain Table////////////////
////////////////GET Method////////////////
app.get('/captain', (req, res) => {
  axios.get('http://127.0.0.1:5000/api/captain')
    .then(response => {
      res.render('captain', { captain: response.data });
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching captain data');
    });
});


////////////////POST Method////////////////
app.post('/captain', async function(req, res) {
  const newCaptain = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    c_rank: req.body.c_rank,
    homeplanet: req.body.homeplanet,
  };

  const response = await axios.post('http://127.0.0.1:5000/api/captain/post', newCaptain);
  res.status(200).json(response.data);

});

////////////////DELETE Method////////////////
app.delete('/captain', async function(req, res) {
  const deleteCaptain = {
    id: req.body.id,
  };

  const response = await axios.delete('http://127.0.0.1:5000/api/captain/delete', deleteCaptain);
  res.status(200).json(response.data);
  
});

////////////////PUT Method////////////////
app.put('/captain', async function(req, res) {
  const updateCaptain = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    c_rank: req.body.c_rank,
    homeplanet: req.body.homeplanet,
    id: req.body.id
  };

  const response = await axios.put('http://127.0.0.1:5000/api/captain/put', updateCaptain);
  res.status(200).json(response.data);
  
});

////////////////Cargo Table////////////////
////////////////GET Method////////////////
app.get('/cargo', async (req, res) => {
  axios.get('http://127.0.0.1:5000/api/cargo')
    .then(response => {
      res.render('cargo', { cargo: response.data });
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching cargo data');
    });
});

////////////////POST Method////////////////
app.post('/cargo', async function(req, res) {
  const newCargo = {
    weight: req.body.weight,
    cargotype: req.body.cargotype,
    departure: req.body.departure,
    arrival: req.body.arrival,
    shipid: req.body.shipid
  };

  const response = await axios.post('http://127.0.0.1:5000/api/cargo/post', newCargo);
  res.status(200).json(response.data);
  
});

////////////////DELETE Method////////////////
app.delete('/cargo', async function(req, res) {
  const deleteCargo = {
  id: req.body.id,
  };
  
  const response = await axios.delete('http://127.0.0.1:5000/api/cargo/delete', { data: deleteCargo });
  res.status(200).json(response.data);
  
  });


////////////////PUT Method////////////////
app.put('/cargo', async function(req, res) {
  const updateCargo = {
    id: req.body.id,
    weight: req.body.weight,
    cargotype: req.body.cargotype,
    departure: req.body.departure,
    arrival: req.body.arrival,
    shipid: req.body.shipid
  };

  const response = await axios.put('http://127.0.0.1:5000/api/cargo/put', updateCargo);
  res.status(200).json(response.data);
  
});

////////////////Spaceship Table////////////////
////////////////GET Method////////////////
app.get('/spaceship', (req, res) => {
  // Make a request to the backend to get spaceship data
  axios.get('http://127.0.0.1:5000/api/spaceship')
    .then(response => {
      res.render('spaceship', { spaceship: response.data });
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching spaceship data');
    });
});

////////////////POST Method////////////////
app.post('/spaceship', async function(req, res) {
  const newSpaceship = {
    id: req.body.id,
    maxweight: req.body.maxweight,
    captainid: req.body.captainid
  };

  const response = await axios.post('http://127.0.0.1:5000/api/spaceship/post', newSpaceship);
  res.status(200).json(response.data);

});

////////////////DELETE Method////////////////
app.delete('/spaceship', async function(req, res) {
  const deleteSpaceship = {
    captainid: req.body.captainid
  };

  const response = await axios.put('http://127.0.0.1:5000/api/spaceship/delete', deleteSpaceship);
  res.status(200).json(response.data);
  
});

////////////////PUT Method////////////////
app.put('/spaceship', async function(req, res) {
  const updateSpaceship = {
    id: req.body.id,
    maxweight: req.body.maxweight,
    captainid: req.body.captainid
  };

  const response = await axios.put('http://127.0.0.1:5000/api/spaceship/put', updateSpaceship);
  res.status(200).json(response.data);
  
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});