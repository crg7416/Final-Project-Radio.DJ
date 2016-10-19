// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const socketio = require('socket.io');

const router = require('./router.js');

// usual port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// create an app
const app = express();

// redirects any URL requests with /assets to the client folder
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));

// Call copmression
app.use(compression());

// parse form POST requests as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json body requests. These are usually POST requests or
// requests with a body parameter in AJAX
// Alternatively, this might be a web API request from a mobile app,
// another server or another application
app.use(bodyParser.json());

// app.set sets one of the express config options to use ".handlebars" when accessing views
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

// call and use favicon with the favicon path
app.use(favicon(`${__dirname}/../client/favicon.png`));

// call and use the cookie parser library
app.use(cookieParser());

// Create a socket for the app using app.server
const io = socketio(app.server);

// pass our app to our router object to map the routes
router(app);

// Usual "listening" message
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

// Fire up the socket
io.on('connection', (socket) => {
// Hooked up socketio for use when SC gives me an API key & I can import the proper npm library

  // socket.join('room1');
//  socket.on('functionName', (data) => {
//    io.sockets.in('room1').emit('functionName', data);
//  });

  socket.on('disconnect', () => {
    socket.leave('room1');
  });
});
