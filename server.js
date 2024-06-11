const express = require('express');
const cryptoJS = require('crypto-js');
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/node_modules', express.static(__dirname + '/node_modules'));


const user = {
  login: "Alan",
  password: "73a056240baf641c8dc2c9bab20e0c2b457bd6e4" // = "4l4n"
}

// Middleware pour login -> vérifie que l'utili est authentifier avant de lui donner acces à la page sécure
function authenticate(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
  const hashedPassword = cryptoJS.SHA1(req.body.password).toString();
  if (req.body.login === user.login && hashedPassword === user.password) {
    req.session.user = user;
    res.redirect('/secure.html');
  } else {
    res.redirect('/');
  }
});


app.get('/secure.html', authenticate, (req, res) => {
  res.sendFile(__dirname + '/secure.html');
});

app.listen(3000, () => console.log('Server started on port 3000'));
