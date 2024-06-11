const express = require('express');
const cryptoJS = require('crypto-js');
const app = express();

app.use(express.static('public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


const user = {
  login: "Alan",
  password: "73a056240baf641c8dc2c9bab20e0c2b457bd6e4" // = "4l4n"
}

// Middleware pour login
function authenticate(req, res, next) {
  const hashedPassword = cryptoJS.SHA1(req.body.password).toString();
  if (req.body.login === user.login && hashedPassword === user.password) {
    next();
  } else {
    res.status(401).json({ success: false });
  }
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', authenticate, (req, res) => {
  res.json({ success: true });
});

app.get('/secure.html', authenticate, (req, res) => {
  res.sendFile(__dirname + '/public/secure.html');
});

app.listen(3000, () => console.log('Server started on port 3000'));
